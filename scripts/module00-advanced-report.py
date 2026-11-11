"""Update the advanced-authoring continuation without claiming manual acceptance."""
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
docs=root/'docs/module-00'
def write(name,text): (docs/name).write_text(text.strip()+'\n',encoding='utf-8')
def append(name,title,text):
    old=(docs/name).read_text(encoding='utf-8').split(title)[0].rstrip()
    write(name,old+'\n\n'+title+'\n\n'+text)

write('ADVANCED-AUTHORING.md',"""
# Advanced authoring and native continuation

10 November 2026. Local frontend drafts only. Module 01 has not started.

| Task | Screen | Implemented on web and native |
|---|---|---|
| Curriculum | EDU-07 | Modules, lessons, heading/paragraph/list blocks, safe bold/emphasis selection, stable ordering, nested removal confirmation, learner preview |
| Resource library | EDU-08 | Real local PDF/TXT/CSV/PNG/JPG selection, <=5MB known size, ten-resource cap, deduplication, bounded text/CSV and image preview |
| Assignment | EDU-14 | Instructions, real due date, ordered rubric criteria/guidance/1–99 points, totals and learner preview |
| Assessment | EDU-17 | Ordered choice/written questions, 2–6 distinct options, answer keys, points/guidance, practice preview; no automatic written grading |
| Grading | EDU-16 | Two 0–5 rubric criteria, useful feedback validation and local total; no grade release |
| Availability | PRO-04 | Recurring weekly windows, invalid/overlapping intervals, excluded dates, 30-minute example fit in Asia/Kolkata |
| Cases | Admissions/marks/reconciliation/bookings/publication kinds | Three evidence/note-gated stages, explicit response choices, mismatch escalation, decline/cancellation drafts, history, offline pause, reset confirmation |
| Fees | INS-23 | Unposted charge drafts and exact integer minor-unit parsing; native removal; illustrative totals |
| Native records | Per-screen registers | Search, status filter, sorting, selection, pagination, detail and empty recovery |
| Timetable | INS-18 | Native editable periods with teacher/room conflicts and removal; no calendar publication |
| Walkthroughs | Forty web / thirty native-eligible paths | Shared reducer/validation; back, draft retention, failure/retry, context/expiry clearing, W33 CSV check |

Web existing /app/educator/editor also uses the advanced controller. Native educators can reach authoring directly from Tasks. Native hidden /workflow-library and /workflow routes expose thirty eligible paths; public marketing and platform operations are excluded.

The shared authoring reducer separates edits from a local snapshot, invalidates prior readiness after changes, blocks saves while offline/conflicted, and supports explicit keep-local or restore-snapshot recovery. This is simulated revision handling, not a server merge. Confirmation precedes nested removal/reset/restore. Draft state clears on leave/reset. Native picker copies can remain in the platform-managed app cache; no durable draft repository or upload was added.

Text/CSV previews are limited to files <=64KB and first 5000 characters; image previews are local. PDF contents are not rendered. No malware scanning, video editor, arbitrary embeds/scripts, full WYSIWYG/collaborative editing, secure offline synchronization or live provider integration. Formatting renders safe text with bold/emphasis. No account, consent grant, publication, reservation, payment, admission or official result is created.

36 tests pass. Web/native lint and TypeScript pass. Both Next production modes build; explicit preview generates 261 pages. Artifact checks cover 180 screen and forty workflow outputs and assert advanced surfaces. Static markup checks cover 220 artifacts, including one page heading. APP-15 Saved Items duplicate heading was corrected. Expo Doctor 1.21.6 passes 20/20; SDK dependency check passes. Android/iOS JS export passes (~4.1MB/~3.9MB, 34 assets). Motion source audit covers 40 files with no unreadable paths.

Installed expo-document-picker ~58.0.4 and expo-file-system ~58.0.13 through Expo install. The command added both modules then returned the existing ignored argon2 build-script warning. Backend build approvals stayed unchanged; installed frontend modules pass diagnostics, lint/types and exports. Native ref typing was corrected to the installed React Native ComponentRef type.

Browser access remains blocked by the previously confirmed saved origin/managed policy. No policy change was supplied, so no bypass or alternate-origin retry was attempted. No webpage screenshots, rendered widths, hydrated interactions, screen readers, device runs or runtime performance measurements. adb/emulator commands were unavailable on PATH; no physical-device connection was verified. Exports compile release JS; review the UI in Expo development mode.
""")

write('PROGRESS-LEDGER.md',"""
# Module 00 progress ledger

Updated 10 November 2026, advanced-authoring continuation. **Partially Complete; manual frontend acceptance remains open. Module 01 has not started.**

All 180 IDs have authored web prototypes; all forty workflows have local web walkthroughs. Thirty native-eligible workflows now have native walkthrough routes. Fully accepted screens/workflows: zero. Shared schemas and domain patterns do not establish 180 bespoke, visually approved screens. first-pass-progress.json preserves initial history.

## Implemented this continuation

- Shared pure authoring model: modules/lessons/structured blocks, safe bold/emphasis, ordering/removal, questions/answer keys, assignments/rubrics/due dates, resource validation, snapshots/dirty state and offline/conflict recovery.
- Matching web/native editors and learner previews on EDU-07/08/14/17, with direct educator task links. Existing web editor uses the new controller; superseded web/native editor and native finance implementations removed.
- Real SDK-matched native document selection/filesystem reads, bounded text/CSV previews and local image previews; known-size/extension checks, duplicate prevention and resource caps. Native app-cache behavior disclosed; no uploads/PDF page rendering.
- Staged admissions/marks/reconciliation/booking/publication response drafts, evidence/notes, explicit recommendation/escalation/decline/cancellation choices, history and offline/reset controls.
- Recurring availability/blackouts/interval checks; rubric grading feedback; exact unposted money parsing and native charge editing/removal.
- Native register search/status/sort/select/paginate/detail, editable timetable conflicts, and thirty native workflows with shared back/retry/context/expiry/CSV behavior.
- Expanded artifact checks and page-heading audit. Fixed APP-15 Saved Items duplicate heading. Preserved backend/database source, existing Git changes, release gates and privacy boundaries. No commit, migration or deployment.

See ADVANCED-AUTHORING.md for routes/capabilities/limits. Existing public/social/learning/guardian/institution prototypes, 180-screen explorer and forty web paths remain.

## Verification

Web/native lint and TypeScript pass; 36 unit/contract/state tests pass. Default and explicit-preview Next builds pass, with 261 preview pages. Artifact checks inspect 180 screen + forty workflow outputs. Static labels/IDs/landmarks/headings/nested-control checks pass all 220 task artifacts. Expo Doctor passes 20/20; Expo SDK compatibility passes. Android/iOS JS exports pass (~4.1MB/~3.9MB, 34 assets). Motion source audit covers 40 files. See VALIDATION.md and retained JSON/text evidence.

Browser QA remains blocked by saved origin/managed policy despite prior retry approval. No policy change or bypass. No screenshots, rendered viewports, hydrated keyboard/focus, screen readers, installed-device tests or runtime performance measurements. adb/emulator commands were unavailable on PATH.

## Main files

packages/contracts/authoring-state.ts; web enterprise authoring/case/availability workbenches, academic/operations/screen dispatch, learning.tsx and enterprise.css; native authoring/availability/evidence/workflows/domain/curated/ui components and hidden workflow routes; SDK dependencies/lockfile; module00-authoring.test.mjs, expanded artifact/accessibility checks and reporting scripts; docs/module-00.

## Exact next tasks within Module 00

1. Restore allowed browser access through user-controlled policy/settings, then run MANUAL-TESTING.md. Do not bypass via alternate origins/tools. Review all ten widths, each of the 180 IDs and forty workflows; record exact defects.
2. Manually exercise EDU-07/08/14/17 formatting/cursor, ordering, nested removal/cancel, answer keys, rubrics, date errors, picker cancel/read failure, snapshots/conflicts and offline recovery. Pure-state tests do not accept these UI behaviors.
3. Review PRO-04 interval/blackout boundaries; case-response branches; EDU-16 grading; INS-23 draft charges; native registers/timetable/thirty workflows. Confirm scope/expiry clears prior content and no wording implies official outcomes.
4. Run Expo development UI on Android/iOS devices or simulators: back/gesture interruptions, provider pickers, keyboard viewport, safe areas, orientation, large text, TalkBack/VoiceOver and reduced motion. Other domain summaries/forms still need per-screen visual/state parity review.
5. Compare the original full state contracts and refine remaining shared-pattern gaps. All PUB-01–22, AUTH-01–16, APP-01–19, STU-01–24, EDU-01–23, PAR-01–15, INS-01–30, PRO-01–11 and ADM-01–20 remain incomplete against final acceptance. Full WYSIWYG/collaboration, PDF contents, provider media and secure offline persistence are not in the local model.
6. Resolve approved identity/content/legal/commercial/consent/retention decisions and missing source documents. Retain proposal labels. Measure browser LCP/INP/CLS and native startup/memory/frame behavior. Obtain user frontend/manual-test acceptance. Stop before Module 01.
""")

for name in ['MODULE-00-COMPLETION.md','VALIDATION.md','MOTION-SYSTEM.md']:
    text=(docs/name).read_text(encoding='utf-8')
    for old,new in [
        ('21 tests','36 tests'),('21 pass','36 pass'),('passes 21','passes 36'),
        ('37 files','40 files'),('approximately 3.9MB/3.7MB','approximately 4.1MB/3.9MB'),
        ('~3.9MB, iOS ~3.7MB','~4.1MB, iOS ~3.9MB'),
        ('scripts/module00-contracts.test.mjs scripts/module00-state.test.mjs','scripts/module00-authoring.test.mjs scripts/module00-contracts.test.mjs scripts/module00-state.test.mjs'),
        ('Full rich text, native picker and provider controls remain open.','Structured rich text and the native picker are authored; full WYSIWYG/collaboration and provider controls remain open.'),
        ('Advanced native parity remains partial.','Advanced authoring shares the web model; full per-screen/device parity remains unaccepted.'),
        ('Shared-pattern feature depth, advanced authoring and native parity remain incomplete.','Advanced authoring now has shared web/native editors; full per-screen state and device parity remain unaccepted.')
    ]:
        if old.startswith('scripts/module00-contracts') and new in text: continue
        text=text.replace(old,new)
    write(name,text)

append('MODULE-00-COMPLETION.md','## Advanced-authoring continuation update','See ADVANCED-AUTHORING.md for the new shared rich block/question/rubric/resource editors, revision handling, case stages, availability, grading and thirty native workflows. 36 tests, Expo Doctor 20/20, SDK compatibility, lint/types, both build modes and native exports pass. No browser/device acceptance; Module 00 remains Partially Complete.')
append('VALIDATION.md','## Advanced diagnostics',"""
Additional commands from apps/mobile: pnpm dlx expo-doctor@latest (1.21.6: 20/20 pass); pnpm exec expo install --check (dependencies up to date). Native exports after controller cleanup: ~4.1MB Android / ~3.9MB iOS, 34 assets. Motion JSON retained in motion-source-results.json: 40 files, unreadable=[]. Unit output in unit-test-results.txt: 36 pass. New artifact assertions verify authoring/case/availability/grading surfaces. Accessibility audit now checks one page heading, found and corrected APP-15 Saved Items duplicate headings.

SDK modules were added via Expo install; the command then returned the existing ignored argon2 build warning. Backend build approvals unchanged. Installed modules pass type/lint/diagnostic/export checks. No adb/emulator on PATH. Native file copies may remain in platform-managed cache; no PDF content renderer or upload. No new browser retry without a policy change; no actual device/viewport/runtime acceptance.
""")
append('MANUAL-TESTING.md','## Advanced authoring and native acceptance',"""
These are unrun acceptance tasks.

1. EDU-07 on web/native: add modules/lessons/blocks; select and bold/emphasize text; reorder each level; cancel/confirm nested removal. Learner preview preserves content/formatting and renders HTML-like text inertly. Check cursor, focus and keyboard.
2. Save a snapshot, edit, simulate offline, attempt save, restore connection, simulate newer revision, inspect both recovery choices. Check reset/restore confirmation and readiness invalidation. Leaving/refreshing resets the in-memory draft.
3. EDU-17: both question types, options/answer key, duplicate/blank options, invalid points, reorder/remove; preview correct/wrong/missing/written responses. No automatic written scoring. EDU-14: invalid/real dates, rubric guidance, points/totals/order.
4. EDU-08: select/cancel valid files, unsupported extensions, >5MB, duplicate attachments, text <=64KB, longer text, images, remove/reselect, leave while reading, ten-resource cap. Native picker may leave app-cache copies. PDF content is not previewed and nothing is uploaded.
5. EDU-16: zero/missing/out-of-range rubric points and brief/useful feedback; total /10 with no release. INS-23: 0.29, too many decimals, >100000, native remove and illustrative totals.
6. PRO-04: adjacent/overlapping/reversed windows, excluded-date restoration and 30-minute start/end boundaries. Cases: proposal/decline/cancellation, match/mismatch/escalation, evidence/notes/final responses. No official outcomes.
7. Native records: search/filter/sort/select/paginate/details; INS-18 teacher/room collisions; context clearing. Open /workflow-library and walk thirty eligible paths using Back/retry/context/expiry and W33 CSV. Open detailed stage editors and test platform Back.
8. Repeat on Android/iOS with keyboard, large text, screen readers, reduced motion, safe areas, orientation, provider pickers and interrupted gestures. Record exact ID, device/width, action and expected/actual result.
""")
append('MOBILE-INFORMATION-ARCHITECTURE.md','## Advanced native parity update','Added native-authoring, native-availability, native-evidence and native-workflows components plus /workflow-library and /workflow routes. Thirty eligible paths share the stage reducer; educator Tasks links authoring directly. Native records and timetable now support editing/review controls. SDK document-picker/filesystem support real local selection and bounded preview; cache copies are disclosed. All device and per-screen acceptance remains open.')
append('WEB-INFORMATION-ARCHITECTURE.md','## Advanced implementations','EDU-07/08/14/17 and existing /app/educator/editor use shared-model authoring. PRO-04 uses recurring availability. Case kinds use staged response reviews; grading uses rubric feedback. Existing scope/failure gates remain. Pure model: packages/contracts/authoring-state.ts. No official outcomes or backend mutations.')
append('COMPONENT-INVENTORY.md','## Advanced component update','AuthoringWorkbench/NativeAuthoring, CaseWorkbench/NativeCaseWorkbench, AvailabilityWorkbench/NativeAvailability, RubricFeedback/NativeEvidence, NativeFinanceDraft and NativeWorkflow/NativeWorkflowLibrary now supplement earlier patterns. Full WYSIWYG/collaboration, PDF contents and provider media remain outside the local model.')
append('THIRD-PARTY-NOTICES.md','## Advanced native dependencies','Added SDK-compatible expo-document-picker ~58.0.4 and expo-file-system ~58.0.13 via Expo install for user-selected local documents and bounded previews. Existing package licenses apply. No external artwork or provider integration added.')
append('REFERENCE-RESEARCH.md','## Advanced SDK references','Reviewed official Expo SDK 58 picker/filesystem APIs: https://docs.expo.dev/versions/v58.0.0/sdk/document-picker/ and https://docs.expo.dev/versions/v58.0.0/sdk/filesystem/ ; consulted https://docs.expo.dev/llms.txt and installed Next.js use-client docs. Installed React Native declarations require ComponentRef<typeof TextInput> for refs. These sources do not establish device acceptance.')
append('ACCESSIBILITY-QA.md','## Advanced static audit','Expanded audit requires one page heading. APP-15 Saved Items inherited a duplicate heading; canonical heading ownership was corrected. Advanced controls use labels, fieldsets, selection state, live notices and error summaries. Formatting cursor behavior, confirmation focus, native picker/keyboard and screen readers remain untested.')

p=docs/'MOBILE-INFORMATION-ARCHITECTURE.md'
write(p.name,p.read_text(encoding='utf-8').replace('No real file picker/upload, video provider','Real local picker/preview added; no upload, video provider').replace('shared academic/case summaries are still less detailed than desktop and are not full native parity.','advanced authoring/cases now share the web model; other per-screen summaries remain subject to parity review.'))
print('Advanced authoring reports updated; accepted counts remain zero.')

import runpy
state_report=root/'scripts/module00-states-report.py'
if state_report.exists() and (docs/'native-screen-plans.json').exists():runpy.run_path(str(state_report))
