# Module 01 configuration

Keep credentials in ignored environment files or a secret manager. Never put server secrets in NEXT_PUBLIC/EXPO_PUBLIC values. Adapters compiling does not establish live verification.

| Application | Variable | Meaning |
| --- | --- | --- |
| API | DATABASE_URL | Existing PostgreSQL; local database uses 5433/ischoolie_dev. Never log value. |
| API | HOST / PORT | Defaults 127.0.0.1 / 4000; external binding needs network controls. |
| API | NODE_ENV | Production enables Secure/__Host cookies; local capture unavailable. |
| API | AUTH_TRUSTED_ORIGINS | Exact comma-separated browser origins, default http://localhost:3000. |
| API | AUTH_MFA_KEYS or AUTH_MFA_KEY | Encryption keyring, first writes, previous keys decrypt. Each secret at least 32 characters; retain old keys until records no longer need them. |
| API | AUTH_PROOF_KEY | At least 32 characters for keyed SMS proofs; rotation invalidates pending phone proofs. |
| API | AUTH_DELIVERY_KEYS | Comma-separated encryption secrets, first writes, older keys retained for pending outbox. At least 32 characters each. |
| API | AUTH_LOCAL_DELIVERY / AUTH_LOCAL_SMS | Literal true enables development-only email/SMS filesystem capture. Never production. |
| API | AUTH_EMAIL_TRANSPORT | resend to select Resend mail. |
| API | AUTH_RESEND_API_KEY / AUTH_EMAIL_FROM | Resend credential and verified sender. |
| API | AUTH_SMS_TRANSPORT | twilio to select Twilio SMS. |
| API | AUTH_TWILIO_ACCOUNT_SID / AUTH_TWILIO_AUTH_TOKEN / AUTH_TWILIO_FROM | Twilio account, credential and approved sender; verify regional recipient permissions. |
| API | AUTH_WEB_ORIGIN | Web origin for emailed proof links; HTTPS in production. |
| API | AUTH_DELIVERY_WORKER | Literal true enables 30-second bounded outbox retry worker. Immediate dispatch still runs on enqueue. |
| API | AUTH_GOOGLE_CLIENT_ID / AUTH_GOOGLE_CLIENT_SECRET | Enables Google when both exist. |
| API | AUTH_GITHUB_CLIENT_ID / AUTH_GITHUB_CLIENT_SECRET | Enables GitHub when both exist. |
| API | AUTH_APPLE_CLIENT_ID / AUTH_APPLE_CLIENT_SECRET | Apple service/client identifier and signed assertion; arrange secure assertion renewal. |
| API | AUTH_OIDC_CALLBACK_ORIGIN | Public Next origin; callback /api/auth/oidc/{google,github,apple}/callback. |
| API | AUTH_NATIVE_REDIRECT_URI | Exact native callback; default ischoolie://auth-return, match app scheme. |
| API | AUTH_BOOTSTRAP_ENABLED | Explicit true only for authorized offline bootstrap; disable afterward. |
| Next server | AUTH_API_URL | Server-only API address, default http://127.0.0.1:4000. |
| Next server | AUTH_PUBLIC_ORIGIN | Exact browser POST Origin, default http://localhost:3000. |
| Native build | EXPO_PUBLIC_AUTH_API_URL | Nonsecret reachable API URL; release requires HTTPS. Device loopback is the device itself. |
| QA script | AUTH_SMOKE_ORIGIN | Web origin, default http://localhost:3000. |

Run `node scripts/module01-local-secrets.mjs` from the root to append missing random development keys to ignored apps/api/.env. It prints no secrets and preserves existing keys. Use production secret management rather than copying local keys.

## Providers

Register exact HTTPS callbacks above. Google needs an OAuth client, consent/test users and minimal identity/email scopes. GitHub uses OAuth app credentials and identity/email access, never repository scope. Apple needs service/app configuration, approved return URL and an unexpired signed client assertion. Implementation requests openid with query response mode; private relay and real callbacks need verification. Name/email are not stable identity keys.

Native browser authorization uses the server broker and same provider web callback, followed by an opaque device-bound handoff. Configure signed app identifiers and register ischoolie in development/production builds. SecureStore/AuthSession need actual device testing; Expo Go alone cannot certify callbacks/keychain. Universal/app links and OS credential entitlements remain unverified.

Resend needs approved sender/domain and controlled recipients. Twilio needs a valid SID/token, sender and allowed recipients. Check actual inbox/handset receipt separately from provider acceptance. Receipt/webhook reconciliation is not implemented. Enable retry worker or run retry-delivery under operational supervision. Queued messages retain original transport; capture flags cannot later turn queued local messages into real sends.

## Offline bootstrap

Build API, then from apps/api run `node dist/auth/bootstrap.cli.js operator` (or institution, resend, retry-delivery). Supply JSON over stdin from a protected source, never secret command arguments or a committed file.

- operator: email, displayName. Creates one pending operator and delivers activation; no default password. Activate and enroll MFA through normal access.
- institution: actorEmail, password, code (current unused operator TOTP), institutionCode, institutionName, adminEmail, adminName. Requires active operator password/MFA; creates pending invited admin with scoped grants.
- resend: email. Reissues only a pending privileged activation.
- retry-delivery: no input needed; drains eligible outbox using configured transports.

Do not create a real operator merely for QA. Tests clean isolated fixtures. Public signup cannot create institutions/operators/grants.

## Local infrastructure and deployment limits

Existing PostgreSQL is 127.0.0.1:5433; compose declares 5434. Preserve volume/mappings. Redis 6380 is not used by identity. No reset/recreate required.

Start API from apps/api so captures land in its ignored .local-auth directory. Captures contain short-lived secrets, are not real messages, must not be served/logged/committed and need Windows ACL protection. POSIX modes do not establish Windows ACLs. HTTP smoke removes only its owned captures/accounts; ordinary captures need retention/deletion.

Before multi-user release configure trusted proxy and verified client-IP propagation. Next ignores client-supplied forwarded IP; backend IP limits aggregate proxy traffic. Configure TLS, encryption key backup/rotation, audit/rate retention and monitoring. Minimal successful security events are persisted, not a complete SIEM or delivery receipt pipeline.
