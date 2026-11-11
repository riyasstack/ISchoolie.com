# Module 01 v2 — progress ledger

Updated 2026-11-11. **Core workflows implemented and automated checks passing; external verification and manual acceptance pending. Module 01 is not declared complete.**

Module 00 remains user-accepted; its historical acceptance is preserved. Module 02 has not started. Continue only Module 01 from this record.

## Implemented and verified in source/tests

- One central User with separate email/password, institution-scoped Student/Staff identifiers, verified phone and stable provider/subject identities. Contact email does not become a staff email login. Staff type and account category do not grant permissions.
- Argon2id passwords; opaque PostgreSQL sessions with hashed tokens, authVersion/status checks, seven-day absolute and 30-minute idle limits. Refresh rotates credentials without extending absolute lifetime. Session list, individual revoke, logout/everywhere and password change are connected.
- Email registration/verification/recovery; proof owner chooses the final password. Credential changes invalidate outstanding proofs and sessions. Privileged recovery retains mandatory MFA.
- Encrypted TOTP enrollment, confirmation, replay defense, bounded failures, recovery codes, recent step-up and disable restrictions. Privileged accounts require pending-to-verified MFA; enrollment and credential mutations serialize against revocation/password-reset races.
- Institution grants, tenant checks and recent-MFA provisioning. Student IDs preserve leading zeros and institution case policy. Activated Student identities remain RESTRICTED; academic/social access and Student account association remain blocked pending approved safeguarding policy.
- Concurrent institution/year/type TCH/ADM/SUP counters; new and existing Staff IDs; preserved arbitrary legacy IDs. Canonical imported staff sequences advance counters. Numeric aliases with different padding cannot duplicate the same scoped sequence. Staff activation, recovery, revocation and invitation-backed association with an existing account are connected.
- Bounded CSV/JSON import (1–200 rows), preview, row-specific validation/conflict errors, actor-bound draft, expiry, transactional commit and idempotent replay. A commit conflict rolls back all issuance and counter changes. No temporary passwords or permission grants in import reports.
- E.164 phone proof, parent registration/login/recovery, verified mobile login, authenticated phone change and explicit phone linking. Registration grants only the parent category, never a child association. Linking does not change the account category; last usable method cannot be removed.
- Google/GitHub/Apple configuration-driven first-party adapters, stable subject resolution, explicit linking/unlinking and no email-based automatic merge. Signed local issuer and mocked GitHub/Apple tests pass; real providers remain unverified and unconfigured buttons are disabled.
- Native server broker: one-use browser transaction, PKCE/nonce/state validation, opaque device-bound handoff code, exact callback and one-use exchange. No raw session in deep links. Expo uses SecureStore and cookie-free bearer transport, with restoration/logout race protection. No insecure web-storage fallback.
- Offline bootstrap CLI only: initial operator, operator password plus TOTP institution initialization, pending administrator invitation and resend. No public operator creation, default admin password or permanent QA operator created.
- Encrypted transactional email/SMS outbox, pinned transport, leases, bounded retry and expired-proof redaction. Resend mail and Twilio SMS adapters tested with mocked HTTP; explicit local filesystem capture tested. Provider acceptance is not delivery confirmation.
- Next.js live auth pages, server-checked /account, allowlisted same-origin proxy, category-specific forms, MFA/session/login-method screens and scoped credential/import tools. Shared tokens, Animate UI Button and reduced-motion provider reused.
- Expo live access, secure sessions, MFA, recovery, provider and phone/staff association, scoped structured provisioning and reviewed CSV/JSON import. Development prototypes remain previews; production entry uses real access.
- Fifteen additive migrations applied; Prisma validation and datasource/schema diff pass. Existing database/volumes preserved; owned test accounts cleaned.

## QA evidence

| Check | Result |
| --- | --- |
| API unit | 10 tests / 5 suites pass |
| PostgreSQL integration | 41 tests / 8 suites pass |
| Shared contracts | 65 pass, including 59 Module 00 regressions |
| Live Next → API → PostgreSQL HTTP smoke | 33 checks pass, local email/SMS capture only |
| API lint/build | Pass |
| Web lint/types/production build | Pass, 54 generated routes |
| Native lint/types/dependency compatibility | Pass |
| Expo Doctor | 20/20 pass |
| Android / iOS JS+Hermes bundle export | Pass, 34 assets; not signed/device builds |
| Prisma | 15 migrations current; valid schema; no drift |
| New auth motion source audit | No custom motion facts or unreadable files; shared primitive internals excluded |

## Remaining gates — do not mark complete

1. Supply real Google, GitHub, Apple, Resend and Twilio configuration in a secret manager; verify registered callbacks, cancellation/failure, linking and actual recipient delivery. Apple assertion renewal and relay behavior need deployment verification.
2. Browser visual, responsive, keyboard, focus, screen-reader and reduced-motion runtime checks. Prior browser policy rejected localhost; no bypass attempted. Automatic approval review blocked a second QA server with reason “blocked by policy”; the existing preview supported HTTP-only checks.
3. Signed Android/iOS development builds on actual devices: SecureStore, restart/restore, browser cancellation, deep-link cold/warm behavior and session/MFA revocation. Bundle exports and pure client tests do not certify OS behavior.
4. Approve institution/minor safeguarding and recovery policy before lifting restricted Student access or allowing Student association. Parent-child links require a separately authorized relationship workflow; phone ownership does not establish guardianship.
5. Configure verified proxy/IP propagation, production key management/rotation, capture-folder Windows ACLs for development, audit/rate-record retention, monitoring and operational recovery. Proxy traffic currently shares the backend IP limiter; incoming client forwarded-IP headers are deliberately not trusted. Account/IP hashes still require retention/privacy controls.
6. Complete manual test matrix and user acceptance of Module 01. Do not start Module 02.

See [IMPLEMENTATION-REPORT.md](IMPLEMENTATION-REPORT.md), [VALIDATION.md](VALIDATION.md), [CONFIGURATION.md](CONFIGURATION.md), [MANUAL-TESTING.md](MANUAL-TESTING.md) and [progress.json](progress.json).

## Subsequent Module 00 V3 frontend refinement

The user reopened the frontend redesign after this checkpoint. Authentication/provisioning/MFA APIs and database contracts were preserved. The frontend now has distinct Personal/Student/Staff/Parent categories, password visibility, separate restricted administration entry and the V3 design foundation. API regression remains 10 unit/41 integration tests and 33 live HTTP checks passing. Current frontend build/export/visual limitations are recorded in ../module-00/VALIDATION-V3.md and FINAL-DESIGN-REPORT.md (55 default routes; visual/device acceptance pending). No Module 02 backend work was started.
