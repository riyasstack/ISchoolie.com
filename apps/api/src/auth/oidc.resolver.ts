import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  AuthenticationRegistry,
  MfaService,
  OidcAccountResolver,
  type OidcProfile,
  type OAuthTokens,
  type OidcResolveContext,
} from '@nestjs/authentication';
import { PrismaService } from '../database/prisma.service';
import { SessionAccess } from './session-access';
import { IdentityProof } from './identity-proof';
import { canonicalEmail } from './identity.util';
@Injectable()
export class IdentityOidcResolver extends OidcAccountResolver {
  constructor(
    private readonly db: PrismaService,
    private readonly access: SessionAccess,
    private readonly proof: IdentityProof,
    private readonly mfa: MfaService,
    registry: AuthenticationRegistry,
  ) {
    super();
    registry.registerHandler('oidc', this);
  }
  async resolveUser(
    profile: OidcProfile,
    _tokens: OAuthTokens,
    context: OidcResolveContext,
  ) {
    if (
      !['google', 'github', 'apple'].includes(profile.provider) ||
      !profile.subject ||
      profile.subject.length > 255
    )
      throw new ForbiddenException('Provider identity refused');
    const linkTo =
      context.linkTo ??
      (this.proof.nativeActor
        ? { id: this.proof.nativeActor.userId }
        : undefined);
    if (linkTo) {
      if (!this.proof.request)
        throw new ForbiddenException(
          'Linking requires a verified browser session',
        );
      const actor =
        this.proof.nativeActor ??
        (await this.access.require(this.proof.request, { fresh: true }));
      if (actor.userId !== linkTo.id)
        throw new ForbiddenException('Linking account changed');
      try {
        const linkedUser = await this.db.$transaction(async (tx) => {
          await tx.$queryRaw`SELECT id FROM "User" WHERE id = ${actor.userId}::uuid FOR UPDATE`;
          const current = await tx.identitySession.findFirst({
            where: {
              id: actor.id,
              userId: actor.userId,
              mfa: 'verified',
              user: {
                status: 'ACTIVE',
                authVersion: Number(actor.metadata?.authVersion),
              },
            },
          });
          if (!current) throw new ForbiddenException('Linking session expired');
          const existing = await tx.providerIdentity.findUnique({
            where: {
              provider_subject: {
                provider: profile.provider,
                subject: profile.subject,
              },
            },
          });
          if (existing && existing.userId !== actor.userId)
            throw new ForbiddenException(
              'Provider already belongs to another identity',
            );
          if (!existing)
            await tx.providerIdentity.create({
              data: {
                userId: actor.userId,
                provider: profile.provider,
                subject: profile.subject,
              },
            });
          await tx.identityAudit.create({
            data: { userId: actor.userId, type: 'PROVIDER_LINKED' },
          });
          const updated = await tx.user.update({
            where: { id: actor.userId },
            data: { authVersion: { increment: 1 } },
          });
          await tx.identitySession.deleteMany({
            where: { userId: actor.userId },
          });
          return updated;
        });
        this.proof.prove(linkedUser);
      } catch (error) {
        if ((error as { code?: string }).code === 'P2002')
          throw new BadRequestException('This provider slot is already linked');
        throw error;
      }
      return { id: actor.userId };
    }
    const existing = await this.db.providerIdentity.findUnique({
      where: {
        provider_subject: {
          provider: profile.provider,
          subject: profile.subject,
        },
      },
      include: { user: true },
    });
    if (existing) {
      if (existing.user.status !== 'ACTIVE') return null;
      if (
        (await this.access.privileged(existing.userId)) &&
        !(await this.mfa.isEnrolled(existing.userId))
      )
        return null;
      this.proof.prove(existing.user);
      return { id: existing.userId };
    }
    const email =
      profile.emailVerified && profile.email
        ? canonicalEmail(profile.email)
        : undefined;
    if (
      email &&
      (await this.db.user.findFirst({
        where: {
          OR: [
            { emailCanonical: email },
            { email: { equals: email, mode: 'insensitive' } },
          ],
        },
      }))
    )
      throw new ForbiddenException(
        'Sign in to the existing account and explicitly link this provider',
      );
    try {
      const user = await this.db.user.create({
        data: {
          email,
          emailCanonical: email,
          emailVerifiedAt: email ? new Date() : undefined,
          displayName: profile.name?.slice(0, 100) ?? null,
          status: 'ACTIVE',
          accountKind: 'PUBLIC',
          providers: {
            create: { provider: profile.provider, subject: profile.subject },
          },
        },
      });
      this.proof.prove(user);
      return { id: user.id };
    } catch (error) {
      if ((error as { code?: string }).code === 'P2002')
        throw new ForbiddenException(
          'Identity conflict. Sign in and link explicitly.',
        );
      throw error;
    }
  }
}
