"""Reconcile human-readable continuation reports; coverage stays generated separately."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]
docs = root / 'docs/module-00'

def write(name, content):
    (docs / name).write_text(content.strip() + '\n', encoding='utf-8')

write('PROGRESS-LEDGER.md', r'''
# Module 00 progress ledger

Updated 10 November 2026. **Partially Complete; frontend acceptance remains open. Module 01 has not started.**

All 180 inventory IDs now have authored, directly addressable web prototypes at `/preview/ID`, up from 44 partial mappings. All 40 workflows now have local draft/review walkthroughs at `/design-lab/workflows/Wxx`, up from eleven paths. There are zero fully accepted screens or workflows. Shared domain surfaces implement related tasks; these are not 180 separately designed, visually approved pages. The previous status is preserved in first-pass-progress.json. SCREEN-COVERAGE.md and screen-register.json identify every screen, kind, interactions, and acceptance dependency; WORKFLOW-COVERAGE.md lists every local path.

## Implemented in this continuation

- Typed screen/workflow contracts, explicit domain content, related-screen links, searchable screen/workflow explorers, seventeen public discovery aliases, and onboarding/recovery/restriction design views. No second identity system.
- Web domain surfaces for validated forms and file-metadata review; searchable/sortable/filterable/paginated records and example CSV export; teacher/room timetable conflicts; practice questions/review; submission/grading evidence; credential specimens; local messages/discussions; profiles/directories; operations evidence cases; unposted charges; resources; editorial and policy drafts; scoped search/help.
- Stateful local workflow stages preserve drafts across back/retry, validate before advancing, clear on context/auth expiry, and deduplicate local review events. W33 includes bounded CSV parsing; W29 uses a fixed, labeled study-assistance example. No provider, payment, publication, authorization, or official-record outcomes are fabricated.
- Web loading/empty/error/restricted/expired/offline/conflict review controls, child/tenant clearing, responsive stacked registers, accessible error-summary focus, controlled-dialog focus return, keyboard lesson ordering.
- Native role-specific task hubs and screen library, forms/validation/review, stacked record details, local feed/saves/connections/communities/alerts/preferences, roster/unposted ledger/lesson drafts, practice/messages/schedule surfaces, context clearing, hidden detail routes and back navigation. Public marketing and broad operations stay out of the native catalog. Some shared native summaries and advanced task parity remain partial.
- Original proposed launcher artwork and SVG mark; starter assets preserved. Animate UI primitives retained; parent-mode tab highlight corrects nested trigger markup. Root loading fallback no longer duplicates the main landmark.
- Default and explicit-preview production builds pass. Cache Components uses a disabled placeholder parameter with a checked not-found response when previews are off. This is a preview build gate, not security authorization.

## Major files

`packages/contracts/{frontend.ts,frontend-state.ts,frontend-screens.json,frontend-workflows.json,layout-support.ts}`; `apps/web/src/components/enterprise/*`; `apps/web/src/app/{preview,discover,auth,design-lab}`; `apps/web/src/app/enterprise.css`; existing `ui.tsx`, `app-shell.tsx`, `learning.tsx`, root layout; `apps/mobile/src/components/{native-domain,native-curated,native-ui,preview-context}.tsx`; native router and app.json; proposed assets; `scripts/module00-{expand.py,reconcile.py,contracts.test.mjs,a11y-source.py,check.mjs,icon.py,report.py}`. Existing backend/database source and Git work preserved; no commit, deployment, migration, or Module 01 work.

## Validation actually performed

- Web and native lint/TypeScript: pass.
- 21 pure state/contract tests: pass, including all 180 form schemas and all 40 local workflow paths.
- Default production build and exclusion checks: pass. Explicit preview build: 261 generated pages; 180 screen + 40 workflow artifact checks pass.
- Static label/ID/landmark/nested-interactive-element audit: all 220 task artifacts pass. This is not browser accessibility acceptance.
- Android and iOS JS/Hermes export: pass; reported approximately 3.9MB and 3.7MB, 34 assets. No installed app or signed build tested.
- Read-only Animate UI source audit: 37 files. Five token contrast pairs checked. Proposed launcher artwork visually inspected as an image only.
- Zero webpage screenshots, rendered viewport checks, browser interactions, screen-reader sessions, or device sessions. User approved retry; the browser still rejected localhost under a saved permission/managed policy. No bypass attempted.

## Exact next work within Module 00

1. Resolve the saved browser-origin restriction through the user's browser policy/settings, then run MANUAL-TESTING.md. Do not retry via another hostname/tool/browser as a workaround. Review `/design-lab/screens` and `/design-lab/workflows`, then each family at the ten requested widths. Record defects per exact ID.
2. Exercise hydrated forms, keyboard tabs, dialog trapping/return focus, route back/forward, expired/context resets, CSV edge cases, teacher/room conflicts, lesson ordering and native back/keyboard handling. Static/unit checks cannot accept these interactions.
3. Review every ID in SCREEN-COVERAGE.md against the original state contract. All PUB-01–22, AUTH-01–16, APP-01–19, STU-01–24, EDU-01–23, PAR-01–15, INS-01–30, PRO-01–11 and ADM-01–20 remain incomplete against full acceptance. Expand shared task patterns where screen-specific depth is missing; do not equate route existence with completion.
4. Deepen rich curriculum/resource editing, file selection/preview (native currently lacks a real picker), assessment authoring, granular admissions/exam/result/fee/booking case lifecycles, and screen-specific offline/conflict states. Current local review patterns are deliberately nonofficial and not full feature parity.
5. Run physical Android/iOS or simulators with large text, reduced motion, screen readers, safe areas, orientation, interrupted gestures and low-end scrolling. Native release export disables development previews; use the development server for review.
6. Obtain approved logo/content, commercial/legal/privacy/retention/consent decisions, approved role/privacy contracts, integration fixtures and any missing referenced source documents before removing proposal labels. No live auth/provider/payment integration is claimed.
7. Measure browser startup/LCP/INP/CLS and native startup/memory/frame behavior. Complete visual/accessibility/performance acceptance and record user approval. Stop at Module 00.
''')

write('MODULE-00-COMPLETION.md', r'''
# Module 00 implementation report

## 1. Module 00 status

**Partially Complete.** All inventory entries now have authored web prototypes and local workflow paths. Final visual, interaction, native parity and device acceptance remain open. No Module 01 work.

## 2. Design quality

Proposed Connected Knowledge identity: #2D2B55 anchor, warm white surfaces, sage/peach/lavender accents, Geist web typography and native system type. Domain-specific registers, evidence views, timetables, learning, conversations and editorial forms extend the initial identity. Original proposed launcher mark added. Web visual quality remains unverified.

## 3. Motion system

Animate UI React/Motion/Radix buttons, dialogs, tabs, entrances and progress remain integrated. Parent-mode audience highlight fixes nested button/duplicate ID output. Finite hero/intro and reduced-motion alternatives remain; native press motion respects system reduction. Source audit covers 37 files; runtime smoothness and full intro continuity are unverified.

## 4. Screen coverage

| Family | Authored prototypes | Fully accepted | Unmapped IDs |
|---|---:|---:|---:|
| PUB | 22 | 0 | 0 |
| AUTH | 16 | 0 | 0 |
| APP | 19 | 0 | 0 |
| STU | 24 | 0 | 0 |
| EDU | 23 | 0 | 0 |
| PAR | 15 | 0 | 0 |
| INS | 30 | 0 | 0 |
| PRO | 11 | 0 | 0 |
| ADM | 20 | 0 | 0 |
| Total | 180 | 0 | 0 |

All 180 IDs remain incomplete against the full quality gates; all 40 workflows are local review walkthroughs, zero accepted end-to-end workflows. SCREEN-COVERAGE.md and WORKFLOW-COVERAGE.md provide exact ID mappings. Shared task patterns are reused, not 180 bespoke approved layouts.

## 5. Web implementation

Canonical `/preview/[id]`, screen/workflow explorers, forty workflow routes, public `/discover/[slug]` aliases, and `/auth/[step]` design routes supplement the existing public/workspace/course routes. Domain forms, records, academic, social, search and operations components implement local interactions. Production previews require the explicit build flag; the gate does not authenticate anyone.

## 6. Expo mobile implementation

Role-specific hubs, native task library/detail routes, forms, records, local social/preferences/alerts, practice, messages, scope reset and back navigation supplement existing lesson/guardian/attendance/booking views. Marketing and broad admin excluded. Android/iOS JavaScript exports pass; zero devices/simulators tested. Advanced native parity remains partial.

## 7. Component library

Existing shell/navigation/feed/course/player/dialog primitives now include schema fields/error summaries, review dialogs, metadata-only file review, CSV preview/export, registers/detail sheets, timetable conflict editor, practice reviewer, evidence grading, credential specimen, discussion composer, case evidence, unposted ledger, workflow stepper and native task surfaces. Full rich text, native picker and provider controls remain open.

## 8. Responsive QA

Zero rendered viewports tested. Authored stacked records, one-column forms/evidence, responsive workflow rails and timetable grid supplement the initial responsive shell. All ten requested widths remain acceptance tasks.

## 9. Visual QA

No webpages rendered or inspected. User approved browser retry; saved origin/managed policy still blocked localhost. No bypass attempted. Only the original proposed launcher image was visually inspected.

## 10. Performance

Explicit web preview build generated 261 pages; default production also builds. Latest Android/iOS exports reported approximately 3.9MB/3.7MB bundles and 34 assets. These are compilation/artifact measurements, not startup, LCP, INP, CLS, memory or frame-time results.

## 11. Accessibility

All 220 screen/workflow HTML artifacts pass static labels, unique IDs, one-main and nested-button/link checks. Fixed duplicate streaming main IDs and nested audience-tab triggers. Controlled dialog return focus and form-error focus are wired. Five token contrast pairs pass the recorded thresholds. No hydrated keyboard/focus, screen-reader or device acceptance performed.

## 12. Testing

Web/native lint and TypeScript pass; `node --test scripts/module00-contracts.test.mjs scripts/module00-state.test.mjs` passes 21 tests. Both web build modes and `node scripts/module00-check.mjs` / `--preview` pass. `python scripts/module00-a11y-source.py` passes 220 artifacts. Android+iOS Expo export passes. VALIDATION.md contains exact commands and limitations.

## 13. Files changed

Shared contracts; web enterprise components, routes and CSS; refinements to root layout/tabs/editor/dialogs; native domain/curated/context/router/icon files; coverage, test, audit and report scripts; docs/module-00. PROGRESS-LEDGER.md lists primary paths. Backend/database/infrastructure source preserved; no commits or deployment.

## 14. Remaining work

All screen IDs await full acceptance. Shared-pattern feature depth, advanced authoring and native parity remain incomplete. Browser/device visual, keyboard, screen-reader and performance review is unrun. Approved business/legal/consent content and integration fixtures are still dependencies. No live provider/auth/payment or official transaction work is represented as done.

## 15. Local running commands

```powershell
cd D:\WAI
$env:pnpm_config_verify_deps_before_run = 'false'
pnpm --filter web dev
# Separate terminal:
pnpm --filter mobile start
```

Open the printed web URL, then `/design-lab/screens` and `/design-lab/workflows`. For a compiled preview, set `$env:ISCHOOLIE_UI_PREVIEW='true'` before web build and start. Keep it absent in production. See MANUAL-TESTING.md.

## 16. Manual testing checklist

Use MANUAL-TESTING.md: original public/workspace walkthrough plus per-ID screen/state review, workflow draft/back/reset/expiry, CSV/conflicts, lesson ordering, modal focus, responsive widths, and native device checks. Record route/ID, viewport/device, action, expected/actual result and screenshot where available. All steps remain unrun acceptance tasks.

## 17. Next step

Continue Module 00 acceptance and remaining depth from PROGRESS-LEDGER.md. Stop before Module 01; frontend design and manual testing require the user's approval.
''')

write('VALIDATION.md', r'''
# Validation record

10 November 2026 continuation. Source, compilation, unit and artifact checks only; no browser/device interaction acceptance.

| Check | Command (root unless indicated) | Result |
|---|---|---|
| Contracts/coverage | `python scripts/module00-expand.py`; `python scripts/module00-reconcile.py` | 180 authored screen mappings, 40 local paths; zero accepted |
| Web lint/type | `pnpm --filter web lint`; `pnpm --filter web exec tsc --noEmit` | Pass |
| Native lint/type | `pnpm --filter mobile lint`; `pnpm --filter mobile exec tsc --noEmit` | Pass |
| Pure state/contract tests | `node --test scripts/module00-contracts.test.mjs scripts/module00-state.test.mjs` | 21 pass |
| Default build | From apps/web, with preview env absent: `.\node_modules\.bin\next.cmd build` | Pass; 43 generated pages, no real per-ID screen/workflow prerenders |
| Production artifact gate | `node scripts/module00-check.mjs` after default build | Pass; real preview IDs absent, disabled placeholders checked for not-found digest/no task surface |
| Explicit preview build | From apps/web: `$env:ISCHOOLIE_UI_PREVIEW='true'; .\node_modules\.bin\next.cmd build` | Pass; 261 generated pages |
| Preview artifacts | `node scripts/module00-check.mjs --preview` | Pass; 180 screen + 40 workflow artifacts, route/renderer/domain integrity, five token contrast pairs |
| Markup accessibility | `python scripts/module00-a11y-source.py` after preview build | 220 artifacts pass labels/IDs/main/nested buttons and anchors |
| Native export | From apps/mobile: `.\node_modules\.bin\expo.cmd export --platform android --platform ios --output-dir ../../output/module-00/native-bundle` | Pass; Android ~3.9MB, iOS ~3.7MB, 34 assets; no native binary/device run |
| Motion source audit | From apps/web: `pnpm --config.verify-deps-before-run=false dlx @animate-ui/cli@latest audit src --json` | CLI 2.4.0; 37 files, unreadable list empty; see MOTION-SYSTEM.md |

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
''')

write('MOBILE-INFORMATION-ARCHITECTURE.md', r'''
# Native mobile information architecture

Expo SDK 58 / React Native 0.88.1 / Expo Router 58 / Reanimated 4.7.1 retained. Native lint, TypeScript and Android/iOS JS export pass. No device or simulator launch is claimed.

Main routes are role-specific Home/Overview, Network/Classes, Learn/Tasks, Inbox/Messages and Profile/Account. Hidden `/lesson`, `/screen?id=ID` and `/screen-library` provide task details. Detail routes offer back-to-workspace navigation with a fallback when history is absent. Role change remounts context and clears local saves. Public marketing and broad platform operations are excluded from the native catalog.

| Context | Authored content |
|---|---|
| Student | Learning home/player, feed/saves, educator discovery, assignments/records, practice, timetable, communities and preferences |
| Educator | Class/task hubs, roster details, local lesson editor, forms/review, evidence and academic task summaries |
| Guardian | Child-scoped home, academic/school task links, clearing on child change and restricted child example |
| Tutor | Booking/time review, role task links for availability/session/earnings, local messages and forms |
| Institution staff | Class/attendance task groups, roster and local marks, alerts, unposted ledger and scoped forms |
| Platform operations | No broad native console |

native-domain.tsx selects explicit role task IDs and dispatches typed forms, records, practice, local messages and schedules. native-curated.tsx supplies feed/saves/discovery/communities/alerts/preferences/roster/ledger/lesson-edit/course surfaces. This extends actual role content beyond the initial label-only tabs, but shared academic/case summaries are still less detailed than desktop and are not full native parity.

Screen/Card/Copy/Button primitives use safe areas, keyboard avoidance, scalable text, shared tokens, and reduced-motion press feedback. Choice buttons expose selection semantics. Original proposed 1024px launcher/adaptive artwork replaces starter references in app.json; source starter assets remain on disk. Device launcher/splash cropping is unverified.

Data is memory-only. No real file picker/upload, video provider, push delivery, signed-in deep links, meeting, payment, offline synchronization or official record finalization. Release export disables development preview UI. Device acceptance must cover back/gestures, keyboard, safe areas, rotation, large fonts, TalkBack/VoiceOver, reduced motion, interrupted gestures and low-end scrolling.
''')

appendices = {
'WEB-INFORMATION-ARCHITECTURE.md': '''
## Continuation: full inventory routing

All 180 canonical `/preview/ID` routes now dispatch explicit contracts from packages/contracts/frontend-screens.json through enterprise/screen-preview.tsx. Unsupported kinds throw rather than rendering a placeholder. Related tasks have direct ID links; `/design-lab/screens` is searchable by family and text. `/design-lab/workflows` links all forty `/design-lab/workflows/Wxx` draft/review paths. Seventeen `/discover/[slug]` public aliases and `/auth/[step]` onboarding/recovery/restriction designs supplement existing routes. Auth designs are preview-gated and create no identity system. Default production excludes real preview IDs; Cache Components' disabled sample produces not-found. Shared domain patterns are partial prototypes, not fully accepted bespoke pages.
''',
'COMPONENT-INVENTORY.md': '''
## Continuation: domain task surfaces

Added enterprise form/record/academic/social/operations/search workbenches and stateful workflow/screen explorers. Fields validate contact/date/time/number/range/choices; error summary focuses; controlled review/detail dialogs wire return focus. Metadata-only file review, bounded CSV preview, searchable/sortable/paginated example registers, CSV export with formula-prefix escaping, teacher/room conflicts, practice review, submission/grading evidence, credential specimens, local discussions, unposted ledger and case evidence now exist. Curriculum order supports keyboard move controls. Native domain/curated surfaces provide role tasks, shared validated forms, records, local social and preferences. Real native pickers, full rich text, provider controls and advanced per-screen state parity remain incomplete.
''',
'MOTION-SYSTEM.md': '''
## Continuation source audit

Read-only Animate UI CLI 2.4.0 audit covers 37 source files with no unreadable paths. CSS findings remain finite: hover background/shadow, hero 650ms compositor transform/opacity, intro 1000ms compositor, mark-path 800ms paint animation. Reduced-motion source paths remain present. Audience highlight now uses parent mode: default child cloning had produced nested tab buttons/duplicate IDs, corrected and verified in generated HTML. No runtime frame measurements or rendered animation review; full brand-to-header continuity remains unaccepted.
''',
'DESIGN-VISION.md': '''
## Continuation identity assets

Added an original geometric proposed launcher mark, generated from authored vector geometry into native icon/adaptive foreground PNGs and a web SVG. The mark was visually inspected as an image; device cropping remains unverified. Starter source assets are preserved. All branding, pricing, policies and specimen credentials remain proposals/examples pending approval.
''',
'THIRD-PARTY-NOTICES.md': '''
## Continuation assets

No additional application dependency was introduced in this continuation. Proposed launcher/foreground PNGs and web proposed-mark SVG are original code-authored geometric artwork, generated by scripts/module00-icon.py with Pillow. Starter assets remain preserved. No external photo, accreditation logo or partner mark was added.
''',
'REFERENCE-RESEARCH.md': '''
## Continuation technical references

Reviewed installed Next.js documentation for layouts/pages, Cache Components and generateStaticParams, including the nonempty-parameter requirement and notFound placeholder guidance. Consulted official Expo SDK 58 reference, Router and app-config documentation before native route/config changes: https://docs.expo.dev/versions/v58.0.0/ ; https://docs.expo.dev/router/introduction/ ; https://docs.expo.dev/versions/v58.0.0/config/app/ . These technical references do not establish device QA or product approval.
'''
}
for name, appendix in appendices.items():
    path = docs / name
    current = path.read_text(encoding='utf-8')
    marker = appendix.strip().splitlines()[0]
    current = current.split(marker)[0].rstrip()
    write(name, current + '\n\n' + appendix.strip())

for name, title, body in [
 ('VISUAL-QA.md', 'Visual QA', 'Zero webpages rendered or visually inspected. User explicitly approved retrying browser QA, but the saved origin/managed policy still blocked localhost. No workaround attempted. Only the proposed launcher artwork was inspected as an image. Review every screen family, all 40 workflows, typography, table/form density, dialog placement and error/restricted states after browser access is restored.'),
 ('ACCESSIBILITY-QA.md', 'Accessibility QA', 'All 220 generated task artifacts pass static labels, duplicate IDs, single main landmark and nested interactive element checks. Fixed duplicate streaming main IDs and nested audience-tab triggers. Error-summary focus and controlled-dialog return focus are wired in source. Token contrast ratios: 13.22, 15.08, 5.58, 5.68 and 6.26 for the five recorded pairs. No hydrated keyboard/focus, computed browser contrast, screen reader, large-text or native accessibility acceptance; these remain required.'),
 ('RESPONSIVE-QA.md', 'Responsive QA', 'Zero rendered viewports tested. Source implements stacked narrow registers, single-column forms/evidence, responsive workflow rails and timetable cells, plus existing shell/dialog/bottom navigation adaptations. Required browser widths remain 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 and 1920px. Verify overflow, zoom, long labels/errors, keyboard viewport, tap targets and reduced motion. Native safe areas/orientation/large type remain unverified.')
]:
    write(name, f'# {title}\n\n10 November 2026 continuation.\n\n{body}\n\nSee VALIDATION.md for source checks and MANUAL-TESTING.md for acceptance steps. No final acceptance is claimed.')

manual = (docs/'MANUAL-TESTING.md').read_text(encoding='utf-8').replace('Browser automation was declined, so', 'Browser retry was approved, but saved origin/managed policy still blocked access, so').replace('The launcher icon remains a starter asset pending design.', 'Inspect the original proposed launcher artwork and adaptive cropping; device appearance remains unverified.')
marker = '## Continuation: inventory and workflow acceptance'
manual = manual.split(marker)[0].rstrip()
write('MANUAL-TESTING.md', manual + r'''

## Continuation: inventory and workflow acceptance

These are unrun browser/device acceptance tasks, not already verified behavior.

1. Open `/design-lab/screens`. Search/filter each family; open every ID and confirm domain title, records/fields, related links and return navigation. SCREEN-COVERAGE.md is the 180-ID checklist. Check every available loading/empty/error/restricted/expired/offline/conflict mode and retry path; some reused public views do not expose the generic state harness.
2. Test required whitespace, invalid email/URL/date/time, negative numbers, invalid date ranges, long inputs and valid optional blank fields. Confirm visible error summary and focus. Open/close review dialogs with keyboard; verify focus trapping and restoration to the exact trigger.
3. Filter/sort/paginate/select register rows. Open details, return focus and export example CSV. Test empty results and clear filters. At phone widths confirm stacked rows retain field labels.
4. Find the timetable screen using explorer search. Give two entries the same day/period and teacher, then room; verify conflicts appear and clear after a real separation. Reorder educator lessons with move controls and confirm edit identity follows each lesson.
5. Open `/design-lab/workflows`. Walk all W01–W40: invalid Continue stays put; valid draft advances; Back retains fields; retry retains an unreviewed draft; context switch/auth expiry clears prior content; repeated final review does not duplicate events. Terminal wording must remain local and never claim enrollment, payment, publication, delivery or official record changes.
6. In W33, test valid id/name/class CSV, quoted commas and newlines, duplicate IDs/headers, missing columns/cells, oversized input and >50 records. Errors should prevent local advancement. No import is sent. In W29 confirm assistance is labeled a fixed example, not generated advice.
7. Review public pricing/legal/contact and onboarding aliases. Proposed text must stay visibly provisional; auth designs must not collect real credentials or claim access. Confirm existing real auth/backend behavior is untouched.
8. In guardian/tenant scope controls, edit data then switch contexts or choose denied context. Prior details/drafts must disappear. Local preview clearing is not proof of server authorization.
9. Repeat at all ten widths, reduced motion, 200% zoom and keyboard-only. Check audience tabs specifically for one focusable trigger per tab, arrow navigation and selected panel behavior.
10. Start Expo development mode. Change all five roles, inspect each task hub and `/screen-library`, open detail and Back, edit fields with keyboard visible, test large text and screen readers, save/feed/request/alerts/preferences, child change clearing, orientation and interrupted gestures. Broad ADM/public marketing should remain unavailable. Native release export does not expose this development preview.

Record screen/workflow ID, platform/viewport, action, expected result, actual result and screenshot/video where available. Submit defects against the exact ID; do not mark all routes accepted based on a representative sample.
''')

research = docs/'REFERENCE-RESEARCH.md'
research.write_text(research.read_text(encoding='utf-8').replace('Browser origin approval for the local preview was declined; no alternate browser or automation route was used.', 'Browser retry was approved in the continuation, but saved origin/managed policy still denied localhost; no alternate browser or automation route was used.'), encoding='utf-8')

import runpy
advanced_report = root/'scripts/module00-advanced-report.py'
if advanced_report.exists(): runpy.run_path(str(advanced_report))
