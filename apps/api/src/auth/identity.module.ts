import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@nestjs/authentication';
import { PrismaModule } from '../database/prisma.module';
import { IdentityController } from './identity.controller';
import { SessionAccess, trustedOrigins } from './session-access';
import { IdentityService } from './identity.service';
import { IdentityDelivery } from './identity.delivery';
import { PostgresSessionStore } from './session.store';
import { IdentitySessionProvider } from './session.provider';
import { IdentitySecurityStore } from './security.store';
import { IdentityMfaController } from './mfa.controller';
import { ProvisioningController } from './provisioning.controller';
import { ProvisioningService } from './provisioning.service';
import { IdentityBootstrap } from './bootstrap.service';
import { IdentitySessionsController } from './sessions.controller';
import { IdentityPhoneController } from './phone.controller';
import { IdentityPhoneService } from './phone.service';
import { IdentityProof } from './identity-proof';
import { oidcProviders } from './oidc.config';
import { IdentityOidcController } from './oidc.controller';
import { IdentityOidcResolver } from './oidc.resolver';
import { NativeBrokerService } from './native-broker.service';
import { MailModule } from '@nestjs/mail';
import { identityMailOptions } from './delivery.config';
import { IdentityLoginMethodsController } from './login-methods.controller';

@Module({
  imports: [
    PrismaModule,
    MailModule.forRootAsync({ useFactory: identityMailOptions }),
    AuthenticationModule.forRootAsync({
      useFactory: () => {
        const keys = (
          process.env.AUTH_MFA_KEYS ??
          process.env.AUTH_MFA_KEY ??
          ''
        )
          .split(',')
          .map((key) => key.trim())
          .filter(Boolean);
        if (!keys.length || keys.some((key) => key.length < 32))
          throw new Error(
            'AUTH_MFA_KEY or AUTH_MFA_KEYS is required; run the local-secret setup for development',
          );
        return {
          allowInMemoryStorage: false,
          oidc: {
            providers: oidcProviders(),
            callbackUrl: `${process.env.AUTH_OIDC_CALLBACK_ORIGIN ?? 'http://localhost:3000'}/api/auth/oidc/:provider/callback`,
            redirectAfterLogin: '/auth/sign-in',
            cookie: {
              secure: process.env.NODE_ENV === 'production',
              path: '/',
            },
          },
          mfa: {
            encryption: { keys },
            issuer: 'iSchoolie',
            window: 1,
            maxAttempts: 5,
            lockoutWindow: '15m',
            pendingTtl: '10m',
            recoveryCodes: 10,
          },
          session: {
            cookieName:
              process.env.NODE_ENV === 'production'
                ? '__Host-ischoolie'
                : 'ischoolie-dev',
            absoluteTtl: '7d',
            idleTtl: '30m',
            cookie: {
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
            },
            trustedOrigins: trustedOrigins(),
          },
        };
      },
    }),
  ],
  controllers: [
    IdentityController,
    IdentityMfaController,
    ProvisioningController,
    IdentitySessionsController,
    IdentityPhoneController,
    IdentityOidcController,
    IdentityLoginMethodsController,
  ],
  providers: [
    IdentityService,
    IdentityDelivery,
    PostgresSessionStore,
    IdentitySessionProvider,
    IdentitySecurityStore,
    SessionAccess,
    ProvisioningService,
    IdentityBootstrap,
    IdentityPhoneService,
    IdentityProof,
    IdentityOidcResolver,
    NativeBrokerService,
  ],
})
export class IdentityModule {}
