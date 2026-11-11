"""Keep the current register/workflow/learner-draft closure visible on regeneration."""
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1];docs=root/'docs/module-00'
def write(name,text):(docs/name).write_text(text.strip()+'\n',encoding='utf-8')
def append(name,title,text):
 old=(docs/name).read_text(encoding='utf-8').split(title)[0].rstrip()
 write(name,old+'\n\n'+title+'\n\n'+text)
write('FRONTEND-CLOSURE.md',"""
# Frontend/native parity closure pass

11 November 2026. Module 00 only; manual acceptance remains open.

## Concrete gaps corrected

- Web and native registers now consume the same pure filtering/sorting/pagination/selection model. Filters target a named status/state/decision/access column rather than assuming the last column is status. Natural/numeric sorting is deterministic without depending on native Intl.Collator availability. Both platforms use six-row pages and clamp empty/out-of-range pages.
- Duplicate display names have distinct fixture selection keys. Selection counts disclose how many selected records match current filters. Web export explicitly chooses matching rows or selected rows across filters; native offers the same scopes through the system text share sheet. These are fictional examples, not official exports. A closed share sheet does not prove delivery.
- CSV output is rectangular, with a Data classification column and EXAMPLE ONLY on each row, BOM/Unicode, quote/newline escaping, and neutralization of formula-leading text including leading whitespace/control characters. The W33 parser rejects misplaced quotes and text after a quoted field.
- W33 CSV is part of the stage draft, survives retry/back, and clears on context/expiry reset. Both platforms validate current CSV. Changes to an earlier stage clear downstream drafts and review events. Reopening a reviewed walkthrough starts at the final stage; web and native now both offer it. Failure mode also pauses reviewed web paths consistently.
- STU-13 now has a dedicated learner response task on both platforms: required response title and written response, optional attachment description, real local resource selection/previews, inspection acknowledgement, local snapshot/restore, review/edit and confirmed discard. Native no longer opens the educator studio for learner submissions. No academic attempt, upload, grade or notification is created.
- Resource selection is shared by native authoring and submission. Pending reads are ignored after unmount, reset or restore. Snapshot restore invalidates pending resource reads so late results cannot modify the restored task.
- Admissions/marks/reconciliation/bookings/publication drafts have stage checkpoints and previous/final revision controls. Source details are read-only after stage one; revisiting and changing evidence clears later reviews. Source changes also clear inspection acknowledgement. Stage notes can be revised without duplicating history.

## Boundaries

All drafts and snapshots remain local to the task. Leaving/resetting/scoped expiry clears UI state. Native picker copies may remain in platform-managed cache. PDF contents, provider media, collaboration, secure offline persistence, durable drafts and actual transactions remain outside this local model. Fixture index keys are stable for the current fixed dataset; future live adapters must supply actual stable record IDs.

No backend/database/authentication, deployment, Git commit, Module 01, package installation or backend build-approval change in this pass.

## Evidence and limits

59 pure state/contract/regression tests pass. Web/native lint and TypeScript pass. Default and explicit preview builds pass; 47/2,063 generated pages respectively. Preview coverage remains 180 screen contracts, forty web paths, thirty native paths, 138 eligible native screens, 1,620 applicable state views and 180 explicit N/A decisions. Generated markup checks and their exact current outcomes are in the retained JSON reports and VALIDATION.md.

Expo Doctor 20/20 and SDK compatibility pass. Android/iOS JS exports pass (~4.2MB/~4.0MB, 34 assets). Animate UI source audit covers 45 files. No webpage screenshots, measured viewports, hydrated interactions, screen readers, installed-device tests or runtime performance measurements. The saved browser-origin restriction is unchanged; no bypass or repeat retry. The native share sheet and picker are implemented but unverified on device.
""")
ledger=(docs/'PROGRESS-LEDGER.md').read_text(encoding='utf-8')
marker='## Latest register/workflow/learner closure'
ledger=ledger.split(marker)[0].rstrip()
intro="""
## Latest register/workflow/learner closure

11 November 2026: aligned register filtering/sorting/pagination/selection/export across web/native; corrected CSV serialization/parser edge cases; retained W33 CSV through retry/back and invalidated stale downstream drafts; added dedicated STU-13 learner submission with title/response/attachments/snapshots/review; added revisitable case checkpoints and evidence invalidation. See FRONTEND-CLOSURE.md.

59 tests pass. Web/native lint/types, both web build modes, Expo Doctor 20/20, SDK compatibility and native exports pass. New native sharing is text-only through the OS share sheet and does not verify delivery. No package/backend/auth/deployment/Module 01 changes. Native picker/share sheet, focus, responsive layout and actual device/browser behavior remain unaccepted.

Next exact checks: test duplicate-name row selection and export scopes through filters; inspect CSVs with quotes/newlines/formula-like values; W33 edit -> fail/retry -> back -> context/expiry reset; revise an earlier workflow/case and verify downstream clearing; STU-13 title/response/description, empty and oversize resources, duplicate/remove, save/edit/restore/discard, interrupted reads and expiry. Use MANUAL-TESTING.md and record exact ID/platform/expected/actual results.
"""
write('PROGRESS-LEDGER.md',ledger+'\n\n'+intro)
for name in ['PROGRESS-LEDGER.md','MODULE-00-COMPLETION.md','VALIDATION.md']:
 text=(docs/name).read_text(encoding='utf-8')
 text=text.replace('46 tests','59 tests').replace('46 pass','59 pass').replace('passes 46','passes 59').replace('44 files','45 files').replace('~3.9MB','~4.0MB').replace('4.2MB/3.9MB','4.2MB/4.0MB')
 prefix='node --test scripts/module00-screen-states.test.mjs'
 if 'node --test scripts/module00-closure.test.mjs' not in text:text=text.replace(prefix,'node --test scripts/module00-closure.test.mjs scripts/module00-screen-states.test.mjs')
 write(name,text)
append('VALIDATION.md','## Register/workflow/learner closure regressions',"""
Added scripts/module00-closure.test.mjs: thirteen regressions for named-column filtering, natural/decimal sorting, page clamping, duplicate display labels, selected export scopes, rectangular/escaped/formula-neutralized CSV, strict quote parsing, CSV draft retention, downstream invalidation, final-stage reopening, learner response/attachment/snapshot validation, and case checkpoint revisions. Full suite: 59 pass; unit-test-results.txt retained.

Final build/export commands remain those listed above. Native resource picker was extracted without adding dependencies; Share and AccessibilityInfo use installed React Native APIs. Source checks assert STU-13 contains the dedicated response controls. Native sharing is CSV text, not a .csv file attachment, and the OS result is not proof of delivery. New inline error/focus wiring and resource race guards require device/browser verification.
""")
append('MANUAL-TESTING.md','## Register, CSV, workflow and learner closure acceptance',"""
These are unrun UI acceptance tasks.

1. Open each register family on web/native. Filter a named status, search with whitespace/full-width characters, sort every offered field in both directions and move through six-row pages. Clear filters after an empty result. Check export-scope controls at 320px and large text.
2. Select rows, change filters and verify selected/visible counts. Web export Matching vs Selected; native Share matching vs selected example CSV text. Inspect classification/header/row widths, Unicode, quotes/newlines and formula-like values. Cancel/fail the share sheet; it must not claim delivery. Duplicate display labels must remain independently selectable.
3. W33: change the sample CSV, pause/fail/retry/back and confirm exact text survives. Try misplaced quotes, trailing text after a quoted field, duplicates, missing cells and limits. Change earlier-stage data after later reviews: downstream fields/history must clear. Context/expiry clears CSV as well.
4. Finish a path, select Revisit final stage and confirm it opens the final stage. Select a failure mode after completion: review pauses consistently on web/native. Back must not advance a paused web step.
5. STU-13: required title and written response; optional attachment description; valid/empty/duplicate/>5MB/unsupported files; text/image preview; remove/reselect; inspect acknowledgement after edits; snapshot/save/edit/restore; confirm/cancel discard. Review must never create an academic attempt.
6. Restore/reset/navigate/expire while a resource read is pending. Late picker/read results must not populate a new/restored context. Native copies may remain in the disclosed OS app cache.
7. Revisit case stages and final response. Source fields become read-only after stage one; change them by revisiting it. Earlier evidence changes must remove later checkpoints, history and inspection acknowledgement. Revise notes without duplicated review entries.
8. Test keyboard focus after web errors and controlled dialogs, native spoken error announcements, safe-area/keyboard/large text and physical Android/iOS share/picker behavior. Record ID, platform/width, action and expected/actual result.
""")
append('MODULE-00-COMPLETION.md','## Register/workflow/learner closure update','Added shared register behavior and explicit export scopes, stricter CSV parsing and retained W33 drafts, dependent-review invalidation, revisitable cases and dedicated web/native learner submissions. 59 tests pass. FRONTEND-CLOSURE.md records exact fixes and limits; manual browser/device acceptance remains incomplete. Module 01 has not started.')
append('COMPONENT-INVENTORY.md','## Closure components','Shared register-state.ts; SubmissionWorkbench / NativeSubmission and submission reducer; chooseExampleResource reused by native authoring/submission; case checkpoints/revision controls; retained workflow CSV auxiliary field. No new dependency or backend operation.')
append('MOBILE-INFORMATION-ARCHITECTURE.md','## Closure parity update','Native registers share the web model (six rows, status-column filtering, sort fields, stable fixture selection and explicit matching/selected scopes). OS text sharing does not verify delivery. Learner submission has its own NativeSubmission flow instead of authoring studio. Native authoring/submission share resource selection; case revisions and workflow draft invalidation share pure models.')
append('REFERENCE-RESEARCH.md','## Closure API review','Reviewed installed Next.js use-client documentation and official Expo SDK 58 / React Native 0.88 references before changes: https://docs.expo.dev/versions/v58.0.0/ ; https://docs.expo.dev/versions/v58.0.0/sdk/document-picker/ ; https://docs.expo.dev/versions/v58.0.0/sdk/filesystem/ ; https://reactnative.dev/docs/share ; https://reactnative.dev/docs/accessibilityinfo . Share-sheet outcomes do not establish actual delivery; device behavior remains unverified.')
append('MOTION-SYSTEM.md','## Closure source audit','Animate UI read-only audit covers 45 web files, unreadable=[]. New task controls reuse existing button primitives and static layouts. No new custom animation, frame-timing claim or rendered-motion acceptance.')
progress=json.loads((docs/'progress.json').read_text(encoding='utf-8'))
progress['latest_closure']='Shared registers/export, retained CSV/dependent reviews, dedicated learner submission and revisitable case checkpoints; 59 tests; UI acceptance pending'
(docs/'progress.json').write_text(json.dumps(progress,indent=2),encoding='utf-8')
registry=json.loads((docs/'screen-register.json').read_text(encoding='utf-8'))
for row in registry:
 if row['id']=='STU-13':row['interactions']='Dedicated response title/text/attachment-description draft; local file preview; inspection; snapshot/restore/review/edit/confirmed discard; pending read invalidation'
(docs/'screen-register.json').write_text(json.dumps(registry,indent=2),encoding='utf-8')
print('Closure reports updated; acceptance remains open.')

import runpy
acceptance_report=root/'scripts/module00-acceptance.py'
if acceptance_report.exists():runpy.run_path(str(acceptance_report))
