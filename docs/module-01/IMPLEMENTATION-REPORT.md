# Module 01 v2 implementation report

**Status: core workflows implemented; partially complete against the full definition of done.** Automated checks pass. Live providers, browser/device QA, deployment controls and manual acceptance remain. Module 00 acceptance is preserved. Module 02 has not started.

| Requested area | Result |
| --- | --- |
| Architecture | Central User; separate login methods; one versioned opaque session system across web/native. User category, login method and tenant permission remain separate. |
| Public authentication | Email registration/verification/login/recovery; Google/GitHub/Apple adapters and explicit linking. Real provider credentials absent; mocked/signed-local tests are separate from live verification. |
| Student login | Institution-scoped lookup, preserved IDs, trusted provisioning and activation. Activated students remain RESTRICTED. Institution-assisted recovery authorized; unrestricted student access/association unavailable. |
| Staff login | TCH/ADM/SUP atomic issuance and scoped sequences, existing legacy IDs, activation/login/recovery/revoke. Contact email is delivery only; ADM never grants administrative permissions. |
| Parent login | Verified E.164 mobile plus password; bounded OTP registration/recovery/change. No automatic child links. Other nonstudent accounts can explicitly link a phone without reclassification. |
| Institution provisioning | Locked tenant grants plus recent MFA; offline bootstrap; scoped forms and CSV/JSON preview/commit. Legacy/canonical sequence collisions and row errors handled. |
| Account linking | Stable provider subjects, fresh-MFA provider/phone links, invitation-backed staff association, last-credential unlink protection. Matching email/name never merges identities. Student association unavailable. |
| Security | Argon2id, version/status invalidation, hashed sessions/proofs, Origin/CSRF, default guard, encrypted MFA/outbox, replay/rate limits. Restricted/pending MFA sessions cannot reach general protected routes. Minimal successful audit events exist; enterprise retention/monitoring remains. |
| Database | Fifteen additive migrations including MFA, grants, phone proofs, native broker, outbox, challenge version and legacy staff uniqueness. No reset; no drift. |
| Backend | First-party Nest authentication/MFA/OIDC and mail interfaces, PostgreSQL stores, explicit session transport, provisioning policy, local/Resend/Twilio delivery and CLI bootstrap. |
| Next.js | Live auth pages and /account server gate, same-origin allowlisted proxy, category/activation/recovery/security/provisioning screens; shared motion/tokens reused. Other Module 00 auth previews stay previews. |
| Expo | SecureStore bearer sessions; live forms, MFA, recovery, provider broker, sessions/login methods, structured provisioning/import. Release requires HTTPS API configuration. OS/device verification pending. |
| Configuration | Capabilities distinguish UNCONFIGURED, CONFIGURED_UNVERIFIED and LOCAL_CAPTURE_ONLY. No credentials fabricated/printed; providers fail closed when absent. |
| Testing | 10 API unit + 41 PostgreSQL integration + 65 shared tests; 33 live HTTP checks; API/web/native lint/types/builds, 20/20 Expo Doctor and Android/iOS exports pass. |
| Blockers | Real service credentials/delivery/callback environments, browser access/devices, safeguarding policy, deployment IP trust/key/retention/monitoring. Not counted as live verification. |
| Manual QA / next step | Follow MANUAL-TESTING.md and close ledger gates before Module 01 acceptance. No Module 02 work. |

## API surface

Repository conventions adapt the requested conceptual endpoints to /auth. Next proxies an explicit subset under /api/auth; native uses the API with X-iSchoolie-Client: native and bearer authorization. Native cannot fall back to cookies or supply a browser Origin. Browser writes require exact configured Origin; authenticated writes also require session-bound CSRF. Web sessions use HttpOnly cookies; raw tokens are returned only to explicit native transport.

| Group | Endpoints beneath /auth |
| --- | --- |
| Capability / identity | GET capabilities, me |
| Email / privileged | POST register, verify-email, login/email, login/privileged, recovery/email, recovery/privileged, recovery/reset |
| Institution | POST login/institution, activate/institution, recovery/institution, identities/claim |
| Phone | POST phone/start, phone/confirm, login/parent, login/mobile, phone/change/start, phone/change/confirm, phone/link/start, phone/link/confirm |
| Sessions | GET sessions; POST refresh, logout, logout-all, sessions/revoke, password/change |
| MFA | GET mfa/status; POST mfa/enroll, mfa/confirm, mfa/verify, mfa/recovery-codes, mfa/disable |
| Login methods | GET login-methods, providers; POST login-methods/phone/unlink, providers/unlink |
| OAuth | POST oidc/:provider/start; GET oidc/:provider/callback; POST native/oidc/start; GET oidc/native/:id/begin; POST native/oidc/exchange |
| Provisioning | GET/POST institutions/:institutionId/credentials; POST credentials/:identityId/invite, /recovery, /revoke beneath that institution; POST institutions/:institutionId/imports/preview, imports/:importId/commit |

OAuth callbacks carry standard authorization codes; native callbacks carry opaque one-use handoff codes and initiating state, never session tokens. Provider identity resolves after server verification. Outbox payloads are encrypted and removed after capture/provider acceptance or proof expiry. Twilio retries can deliver more than once after ambiguous network failure; no exactly-once SMS claim. Delivery receipt/webhook reconciliation is not implemented.

## Files changed

- apps/api/prisma/schema.prisma and additive migrations: security/provisioning persistence and constraints.
- apps/api/src/auth/: identity/sessions, MFA, provisioning, phone, OIDC/native broker, login methods, encrypted delivery, bootstrap services/controllers/stores.
- API app wiring, main entry, package/Jest configuration and apps/api/test/* security coverage.
- apps/web/src/components/identity-{access,security}.tsx, src/lib/identity-client.ts, src/app/api/auth/[...path]/route.ts, connected auth/account pages and identity.css.
- apps/mobile/src/components/identity-{context,access,tools}.tsx, access/callback/layout routes, package/plugin/scheme configuration and profile entry.
- packages/contracts/{native-auth-client,identity-import,identity-methods}.ts, scripts/module01-*, .gitignore, dependency lockfile and docs/module-01/*.

Existing staged baseline preserved; no commit, index reset, deployment or real administrator bootstrap performed. Generated API output exists from local builds. Owned test identities are cleaned; no demo privileged password/account supplied.
