import { AuthenticationRegistry, MfaService, OidcAccountResolver, type OidcProfile, type OAuthTokens, type OidcResolveContext } from '@nestjs/authentication';
import { PrismaService } from '../database/prisma.service';
import { SessionAccess } from './session-access';
import { IdentityProof } from './identity-proof';
export declare class IdentityOidcResolver extends OidcAccountResolver {
    private readonly db;
    private readonly access;
    private readonly proof;
    private readonly mfa;
    constructor(db: PrismaService, access: SessionAccess, proof: IdentityProof, mfa: MfaService, registry: AuthenticationRegistry);
    resolveUser(profile: OidcProfile, _tokens: OAuthTokens, context: OidcResolveContext): Promise<{
        id: string;
    } | null>;
}
