# Validation record

11 November 2026 continuation. Source, compilation, unit and artifact checks only; no browser/device interaction acceptance.

| Check | Command (root unless indicated) | Result |
|---|---|---|
| Contracts/coverage | `python scripts/module00-expand.py`; `python scripts/module00-reconcile.py` | 180 authored screen mappings, 40 local paths; zero accepted |
| Web lint/type | `pnpm --filter web lint`; `pnpm --filter web exec tsc --noEmit` | Pass |
| Native lint/type | `pnpm --filter mobile lint`; `pnpm --filter mobile exec tsc --noEmit` | Pass |
| Pure state/contract tests | `node --test scripts/module00-closure.test.mjs scripts/module00-screen-states.test.mjs scripts/module00-authoring.test.mjs scripts/module00-contracts.test.mjs scripts/module00-state.test.mjs` | 59 pass |
| Default build | From apps/web, with preview env absent: `.\node_modules\.bin\next.cmd build` | Pass; 47 generated pages, no real per-ID screen/workflow prerenders |
| Production artifact gate | `node scripts/module00-check.mjs` after default build | Pass; real preview IDs absent, disabled placeholders checked for not-found digest/no task surface |
| Explicit preview build | From apps/web: `$env:ISCHOOLIE_UI_PREVIEW='true'; .\node_modules\.bin\next.cmd build` | Pass; 2,063 generated pages |
| Preview artifacts | `node scripts/module00-check.mjs --preview` | Pass; 180 screen + 40 workflow artifacts, route/renderer/domain integrity, five token contrast pairs |
| Markup accessibility | `python scripts/module00-a11y-source.py` after preview build | 220 artifacts pass labels/IDs/main/nested buttons and anchors |
| Native export | From apps/mobile: `.\node_modules\.bin\expo.cmd export --platform android --platform ios --output-dir ../../output/module-00/native-bundle` | Pass; Android ~4.2MB, iOS ~4.0MB, 34 assets; no native binary/device run |
| Motion source audit | From apps/web: `pnpm --config.verify-deps-before-run=false dlx @animate-ui/cli@latest audit src --json` | CLI 2.4.0; 45 files, unreadable list empty; see MOTION-SYSTEM.md |

Set `$env:pnpm_config_verify_deps_before_run='false'` when using installed pnpm scripts in this workspace. Current output retained in production-default-check-results.json, preview-check-results.json, static-check-results.json and a11y-source-results.json; the motion source findings are summarized in MOTION-SYSTEM.md. Latest .next is the explicit preview build for manual review.

## Failures corrected during this continuation

- Static HTML exposed duplicate main-content IDs from the streaming loading fallback. Converted fallback to a status div; actual content retains one main.
- Audience TabsHighlight default children mode cloned a TabsTrigger into itself. Parent mode now renders a single trigger; duplicate IDs/nested buttons cleared in all 220 audited artifacts.
- Cache Components rejects empty generateStaticParams arrays. Disabled production uses a synthetic parameter that the server gate rejects with notFound. Static per-screen metadata avoids the gated route's uncached metadata prerender failure. Default build and exclusion checks pass after these fixes.
- Earlier type/lint issues in new local surfaces were corrected; final lint/type runs pass. Starter compatibility fixes and existing font network requirements remain documented in first-pass history.

## Limits and warnings

User approved browser retry, but saved browser-origin/managed policy still denied localhost. No alternate-host/browser/automation bypass. No screenshots, hydrated browser errors, focus/keyboard runs, screen readers, viewport measurements, or physical-device sessions were performed.

Tests cover actual pure form/CSV/timetable/workflow/public-state functions. They do not prove actual authorization, tenant isolation, delivery, payment, publication or backend security. The CSV preview supports common quoted fields and bounded input, not a certified complete RFC parser. Metadata-only uploads never send files. Static HTML cannot certify runtime accessibility. Native export compiles release JavaScript in which development previews are disabled; device review uses Expo development mode.

Node emits a typeless-package module reparsing warning for test imports of TypeScript modules; Metro emits inherited NO_COLOR/FORCE_COLOR warnings. Neither prevented checks. No module-system/backend install-script policy was changed merely to hide warnings. No measured runtime performance targets are claimed.

## Advanced diagnostics


Additional commands from apps/mobile: pnpm dlx expo-doctor@latest (1.21.6: 20/20 pass); pnpm exec expo install --check (dependencies up to date). Native exports after controller cleanup: ~4.2MB Android / ~4.0MB iOS, 34 assets. Motion JSON retained in motion-source-results.json: 45 files, unreadable=[]. Unit output in unit-test-results.txt: 59 pass. New artifact assertions verify authoring/case/availability/grading surfaces. Accessibility audit now checks one page heading, found and corrected APP-15 Saved Items duplicate headings.

SDK modules were added via Expo install; the command then returned the existing ignored argon2 build warning. Backend build approvals unchanged. Installed modules pass type/lint/diagnostic/export checks. No adb/emulator on PATH. Native file copies may remain in platform-managed cache; no PDF content renderer or upload. No new browser retry without a policy change; no actual device/viewport/runtime acceptance.

## Per-screen state QA


Additional command: python scripts/module00-state-artifacts.py checks the generated 1,620 variants for task-specific recovery headings, selected state, labels, unique IDs, one effective page heading/main and retained-vs-cleared task markup. It strips runtime script blocks and ignores only the explicitly hidden task wrapper for heading checks; this is not browser-computed visibility. Retention/remount behavior is exercised by pure reducer tests, not a hydrated interaction test.

Focused final command: python scripts/module00-locked-controls.py verifies all 316 restricted/expired variants disable ordinary state choices until explicit recovery. The native reviewer controls default to collapsed and expose expanded accessibility state, keeping task content near the top of the screen.

node --test scripts/module00-closure.test.mjs scripts/module00-screen-states.test.mjs scripts/module00-authoring.test.mjs scripts/module00-contracts.test.mjs scripts/module00-state.test.mjs: 59 pass. Retained evidence: screen-state-contracts.json, native-screen-plans.json, state-artifact-results.json, unit-test-results.txt, preview/production-default checks, canonical a11y-source-results.json and motion-source-results.json.

Default build generates 47 pages and denies real state fixtures. Preview builds 2,063 pages (including Next partial shells), with 1,620 actual state variants. Native exports ~4.2MB Android/~4.0MB iOS, 34 assets; Expo Doctor 20/20 and compatible SDK dependencies. No browser/device/runtime performance acceptance.

## Register/workflow/learner closure regressions


Added scripts/module00-closure.test.mjs: thirteen regressions for named-column filtering, natural/decimal sorting, page clamping, duplicate display labels, selected export scopes, rectangular/escaped/formula-neutralized CSV, strict quote parsing, CSV draft retention, downstream invalidation, final-stage reopening, learner response/attachment/snapshot validation, and case checkpoint revisions. Full suite: 59 pass; unit-test-results.txt retained.

Final build/export commands remain those listed above. Native resource picker was extracted without adding dependencies; Share and AccessibilityInfo use installed React Native APIs. Source checks assert STU-13 contains the dedicated response controls. Native sharing is CSV text, not a .csv file attachment, and the OS result is not proof of delivery. New inline error/focus wiring and resource race guards require device/browser verification.

## Module 00 V3 current evidence

See VALIDATION-V3.md and v3-validation.json. Earlier evidence above describes the historical accepted scope and does not certify V3. Current source includes the new palette, Inter/system fonts, profile/onboarding/media, auth categories and governance work. Browser/device visual acceptance remains incomplete.
