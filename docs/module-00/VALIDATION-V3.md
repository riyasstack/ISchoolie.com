# Module 00 V3 validation

Local runs on 2026-11-11, Windows, Node 24.20, Next 16.4.5, Expo 58 / RN 0.88.1. These are source, compiler, HTTP and generated-markup results; no browser interaction/device evidence is implied.

| Check | Result |
| --- | --- |
| Shared contracts | 69 tests pass: 59 prior Module 00, 6 native/auth-import, 4 V3 palette/profile/media |
| API regression | 10 unit tests / 5 suites; 41 PostgreSQL integration tests / 8 suites pass |
| Existing same-origin auth/proxy | 33 HTTP checks pass; local capture only |
| Representative document routes | 16/16 HTTP 200 with main landmark; no browser executed |
| Web lint and types | Pass |
| Native lint and types | Pass |
| Default web build | Pass, 55 generated routes; fixture gates retained |
| Explicit preview build | Pass, 2,071 generated routes |
| Catalog/workflow markup | 180 screens + 40 workflows pass |
| Static label/ID/landmark checks | 220 documents pass |
| Applicable-state markup | 1,620 artifacts; final results in v3-validation.json |
| Restricted/expired control markup | 316 artifacts; final results in v3-validation.json |
| Expo Doctor | 20/20 checks pass |
| SDK dependency compatibility | Pass |
| Android/iOS JS+Hermes exports | Pass; approximately 4.4 MB / 4.1 MB; 38 shared output assets |
| Font export refinement | Four Inter weights on Android; zero TTF assets in iOS metadata |
| Motion source audit | 58 files, five facts, zero unreadable files; primitive internals excluded |
| Database | Valid schema, 15 existing migrations current, no schema drift; no new V3 migration |
| Diff whitespace | Pass |

The smoke initially failed an obsolete assertion against the old sign-in slogan; the assertion now checks the current document heading/structure, and all 33 checks pass. A temporary native font import error and duplicate-import warnings were corrected before final lint/types. The first Inter barrel import included 18 weights; direct Android imports/platform-specific font loading reduce the output to four weights and none on iOS. These are source/export improvements, not measured device performance.

Use `$env:pnpm_config_verify_deps_before_run='false'` in PowerShell for the installed workspace tools. Existing pnpm argon2 ignored-build warnings were not bypassed with approve-builds. Actual Argon2 regression tests pass. Node's experimental VM/type-less-import and Metro color-environment warnings are non-failing.

Executed commands:

```powershell
node --test scripts/*.test.mjs
pnpm --dir apps/api test --runInBand
pnpm --dir apps/api test:e2e --runInBand
node scripts/module01-http-smoke.mjs
pnpm --dir apps/web lint
pnpm --dir apps/web exec tsc --noEmit
pnpm --dir apps/web build
node scripts/module00-check.mjs
$env:ISCHOOLIE_UI_PREVIEW='true'
pnpm --dir apps/web build
node scripts/module00-check.mjs --preview
python scripts/module00-a11y-source.py
python scripts/module00-state-artifacts.py
python scripts/module00-locked-controls.py
pnpm --dir apps/mobile lint
pnpm --dir apps/mobile exec tsc --noEmit
pnpm --dir apps/mobile exec expo install --check
# From apps/mobile:
pnpm dlx expo-doctor
# From root:
pnpm --dir apps/mobile exec expo export --platform android --platform ios --output-dir ../../output/module-00-v3/native-bundle
# From apps/web:
pnpm dlx @animate-ui/cli@latest audit src/components src/app --json
# From root:
pnpm --dir apps/api exec prisma validate
pnpm --dir apps/api exec prisma migrate status
pnpm --dir apps/api exec prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --exit-code
git diff --check
python scripts/module00-v3-report.py
```

The HTTP smoke uses the already running Next service on port 3000 and an owned API QA process with development-only email/SMS capture. It creates and cleans owned fixtures; no real provider messages or privileged bootstrap are performed. The existing database/volumes and pre-existing accounts are preserved. Do not run these fixtures on production.

Browser policy still denies localhost after the explicitly authorized retry. Screenshots inspected: zero; required viewport measurements: zero; native devices/emulators used: zero. No LCP/INP/CLS, native startup, frame, screen-reader or visual-acceptance result is claimed. See WEB-VISUAL-QA.md and MOBILE-VISUAL-QA.md.
