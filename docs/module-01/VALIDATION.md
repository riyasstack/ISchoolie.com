# Module 01 validation - 2026-11-11

Local evidence only. No real OAuth provider, email/SMS recipient, browser interaction or native device verification implied.

| Check | Evidence |
| --- | --- |
| API unit | 5 suites, 10 tests passed |
| PostgreSQL integration | 8 suites, 41 tests passed |
| Shared contracts | 65 passed: 59 unchanged Module 00 regressions and 6 native/import tests |
| Live same-origin HTTP | 33 checks; existing Next :3000 to API :4000 to PostgreSQL :5433, local email/SMS capture |
| API | nest build and type-aware oxlint pass |
| Web | ESLint, TypeScript, production Next build pass; 54 generated routes |
| Native | Expo lint, TypeScript, expo install --check pass |
| Expo Doctor | 20/20 checks pass via pnpm dlx expo-doctor |
| Bundle | Android 4.3 MB, iOS 4.1 MB, 34 assets; output/module-01/native-bundle |
| Prisma | Valid schema; 15 migrations current; datasource/schema diff empty |
| Motion source | New auth access/security/CSS: zero custom motion facts/unreadable files. Shared primitive internals and runtime motion excluded. |

Post-QA database inspection: two existing PUBLIC/PENDING accounts preserved; zero platform operators and zero institutions. Owned test fixtures were removed. Only the API process started for QA was stopped; existing web preview and database were preserved.

First legacy index name exceeded PostgreSQL identifier length; separate additive rename migration uses explicit short Prisma map. No applied migration edited. Final drift check empty.

## Reproduce

From D:/WAI PowerShell set `$env:pnpm_config_verify_deps_before_run='false'` to avoid unrelated dependency verification. E2E safety refuses remote/different databases; use existing local ischoolie_dev, never production. Tests clean owned users/institutions.

```powershell
pnpm --dir apps/api build
pnpm --dir apps/api lint
pnpm --dir apps/api test --runInBand
pnpm --dir apps/api test:e2e --runInBand
node --test scripts/*.test.mjs
pnpm --dir apps/web lint
pnpm --dir apps/web exec tsc --noEmit
pnpm --dir apps/web build
pnpm --dir apps/mobile lint
pnpm --dir apps/mobile exec tsc --noEmit
pnpm --dir apps/mobile exec expo install --check
# From apps/mobile:
pnpm dlx expo-doctor
# From root:
pnpm --dir apps/mobile exec expo export --platform android --platform ios --output-dir ../../output/module-01/native-bundle
pnpm --dir apps/api exec prisma validate
pnpm --dir apps/api exec prisma migrate status
pnpm --dir apps/api exec prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code
```

For `node scripts/module01-http-smoke.mjs`, run API with AUTH_LOCAL_DELIVERY=true, AUTH_LOCAL_SMS=true, local keys and trusted origin; use running web preview. Script owns UUID email and reserved QA phone, refuses occupied phone, exercises registration/proof/sessions/MFA/phone/recovery and removes its accounts/captures. Aggregate local IP counters expire normally. No real providers invoked.

## Coverage and limits

Database tests: tenant grants, unauthorized provisioning, concurrent counters, import replay, legacy preservation and canonical sequence collisions, rollback after late conflicts, restricted Student activation, staff association, MFA encryption/replay/recovery/stale-version races, phone attempt limits/recovery/change/link/category isolation, last-method protection, bootstrap serialization, outbox retry/redaction and native handoff replay/binding.

OAuth tests use signed local issuer/stubbed HTTP; Google/GitHub/Apple live flows unverified. Resend/Twilio use stubs; acceptance differs from delivery. Native pure-client tests cover cookie-free transport, secure-store failures and in-flight logout races, not OS keychain.

Node experimental VM/type-less root import warnings do not fail checks. Existing pnpm argon2 ignored-build warning was not bypassed with approve-builds; real hashing works in tests. expo-doctor is a dlx tool, not a local package binary.

Browser policy previously rejected localhost. Automatic approval review also blocked a second Next QA server, reason “blocked by policy.” It was not retried; existing authorized preview supported HTTP tests. Screenshots, keyboard/focus/accessibility, responsive appearance and runtime motion unverified. No signed native build/emulator/physical device used. See MANUAL-TESTING.md.
