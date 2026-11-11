# Module 01 manual verification

Pending unless separately recorded with environment/device/evidence. HTTP tests do not certify browser/device rows. Keep Module 02 closed.

## Local preview

From D:/WAI run `node scripts/module01-local-secrets.mjs` for missing keys, generate/apply additive Prisma schema if needed, and build API/web. Preserve existing database on 5433. From apps/api run API with AUTH_LOCAL_DELIVERY=true, AUTH_LOCAL_SMS=true and `pnpm start:prod`. From apps/web run `pnpm dev` when no preview already runs. Configure matching exact origins. Local capture sends no real messages.

Open /auth/sign-in, /auth/register, /auth/verify, /auth/recover, /auth/reset, /auth/activate, /auth/sessions. /account redirects unauthenticated users. Inspect short-lived proof captures locally in apps/api/.local-auth without copying secrets into logs/chat. Proof owner chooses final password. Never publish captures.

## Browser matrix

| Check | Expected result |
| --- | --- |
| Public email | Register, verify/final password, sign-in, restore, logout/everywhere, reset; wrong/reused/expired proofs fail. |
| Google/GitHub/Apple | Unconfigured disabled; real configured success/cancel/denial, exact callback and safe errors. Record live separately from mocks. |
| Student IDs | 0001 and alphabetic/slash IDs preserve policy; wrong institution fails; activation remains RESTRICTED without business access. |
| Staff | TCH/ADM/SUP unique by institution/year/type, existing legacy IDs preserved; ADM grants no permissions. |
| Import | Review CSV/JSON; password/role fields rejected; errors name row; late conflict rolls back; replay creates nothing. |
| Provisioning | Scoped grant plus fresh MFA; no cross-tenant access/self-grant/public bootstrap; invite/recovery/revoke scoped. |
| Parent | E.164 proof, attempts/expiry, owner password, login/recovery/change; no child/guardian relation from number. |
| MFA | First-factor enrollment, bounded confirmation, pending denied protected access; replay blocked, recovery one-use, regeneration replaces codes; privileged disable denied. |
| Login methods | Own safe metadata only; fresh-MFA provider/phone links; email conflicts never merge; last-method unlink denied; staff association requires invitation and fresh MFA. |
| Sessions | Restore/rotate/list/revoke; password/reset/everywhere invalidates prior tokens; idle/absolute expiry. |
| Form states | Empty/invalid/loading/error/success/unavailable/expired; double-submit protection; no secrets in notices. |
| Accessibility | Keyboard order, visible focus, labels/errors, screen-reader notices, disclosures, zoom 200%, text scaling. |
| Responsive/motion | Narrow phone/tablet/desktop, long IDs/errors, overflow, reduced-motion setting, touch; Button transitions preserve focus. |
| Mobile browser | Safari/Chrome proof/provider returns, cookies and keyboard. |
| Security | Cross-origin/missing CSRF, native flag with Origin/cookie, unauthorized tenant and invalid credential fail; restricted user blocked from workspaces. |

## Native matrix

Set EXPO_PUBLIC_AUTH_API_URL to reachable HTTPS API for release; no secrets. Use signed Android/iOS development builds with ischoolie://auth-return, not only Expo Go. Record each platform:

1. All categories, activation/recovery/MFA and errors; unconfigured provider unavailable.
2. SecureStore across restart, cold restore, background/foreground, expiry and unavailable storage. Logout defeats in-flight sign-in. No AsyncStorage/cookie fallback.
3. Provider success/cancel, cold/warm link, mismatched/stale/replayed handoff; only initiating AuthSession exchanges. Standalone callback cannot import session token.
4. Rotation/revoke/everywhere, password reset, mandatory privileged MFA, provider/phone/staff links. Bearer never in URL/logs.
5. Scoped provisioning/import with row errors, narrow layout, keyboard avoidance, large text and screen reader. Module 00 prototypes are never authenticated business data.

## External and operational completion

Use controlled Resend/Twilio recipients; record actual delivery, failure/retry/rates and registered environments. Test all three real providers, Apple relay/repeat login, provider-only recovery and last-method rules. Arrange Apple assertion renewal. Receipt/webhook reconciliation is not implemented.

Run offline bootstrap only for authorized real deployment initialization: one operator invite, normal activation/MFA, operator password/TOTP institution creation and invited admin. No default password/public admin endpoint; no fixture credentials for real operators.

Approve safeguarding/guardian/institution-assisted recovery policy before expanded Student access. Before release verify proxy IP trust, TLS/cookies, keys/backup/rotation, worker, capture ACL/retention, audit/rate retention and monitoring. Obtain Module 01 acceptance only after required evidence; do not start Module 02.
