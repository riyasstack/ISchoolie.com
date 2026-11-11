# Manual testing — Module 00 partial preview

Run from PowerShell in D:\WAI. Current environment already has dependencies. pnpm 12's automatic dependency verification can try to reinstall unrelated workspace dependencies, so use the explicit command below. This does not approve blocked install scripts or alter the backend policy.

```powershell
cd D:\WAI
$env:pnpm_config_verify_deps_before_run = 'false'
pnpm --filter web dev
```

The server prints its actual URL. An existing server for this checkout was observed at `http://localhost:3000`; do not start duplicates or stop an unrelated process. Open that URL yourself. Browser retry was approved, but saved origin/managed policy still blocked access, so all interactive tests below are **unrun acceptance tasks**.

For a compiled preview (set the flag before building as well as starting):

```powershell
cd D:\WAI
$env:pnpm_config_verify_deps_before_run = 'false'
$env:ISCHOOLIE_UI_PREVIEW = 'true'
pnpm --filter web build
pnpm --filter web start
```

Keep `ISCHOOLIE_UI_PREVIEW` absent in real production. Normal production builds intentionally exclude the workspace/lab preview. The UI gate is not authentication. Sign-in is not connected and no credentials are required or collected.

## Guided web walkthrough

1. Open `/`. Confirm readable hero text immediately, proposed logo, coherent product composition, and visible preview labels. On a new tab-session visit, check the small non-blocking knowledge-mark reveal. Navigate away/back and ensure it does not replay. Disable JavaScript and confirm public core content remains readable.
2. Use the public mobile menu at 320, 360, 375, 390, and 430px. Confirm all actions are reachable. Check desktop/tablet at 768, 1024, 1280, 1440, and 1920px. No document horizontal scrolling should occur.
3. In the audience section, select each audience with pointer and arrow keys. Check highlight/panel continuity and that only current content takes keyboard focus. Explore About, Trust, and Institutions; confirm no verified partner or commercial policy claim.
4. Open `/courses`. Search `science`, change category, test an empty query result, then clear filters. Open all four course details; unknown IDs should return not-found. Expand/collapse the syllabus and open the sample text lesson. No enrollment or purchase should be claimed.
5. Open `/app`. Compose a thought; submit empty/whitespace-only text, then valid text. Confirm valid text becomes a local example post. Appreciate, discuss, and add an example comment. Save the post and open Saved Items; remove it there. Refresh and confirm this in-memory content resets.
6. Press Ctrl K (Cmd K on macOS). Search `Ananya`, `science`, and a nonsense term. Navigate a result. Verify Escape and click-outside dismissal, focus containment, and return to the control that opened search.
7. Collapse and expand the desktop sidebar. Open mobile navigation and switch workspace. Confirm route/breadcrumb/current-link state and that the dialog closes. No switch should claim an account or permission change.
8. Open `/app/network`. Search by name, filter subject, preview/undo a connection request. Profiles must remain labeled unverified examples. `/app/communities` should allow a local request preview without exposing private discussions.
9. Open `/app/student` then the player. Select each lesson, previous/next, read markers, transcript, notes, and resources. Notes should remain while changing lesson panels but reset when leaving the page. No real video playback, certificate, or official progress is promised.
10. Open `/app/educator/editor`. Edit two lessons and switch between them. Add a lesson to each module; test duplicate/blank names. Close dialogs with Escape; ensure focus returns correctly. No actual course publication or durable draft is claimed.
11. Open `/app/guardian`. Change a detail tab, switch Aarav → Diya, and confirm previous academic information disappears. Switch back and confirm Overview resets. Diya must remain awaiting authorization. Private child messages, unpublished grades, and staff-only notes must not appear.
12. Open `/org/example/students`. Search, filter class, sort both directions, switch density, select visible rows and clear selection. Open a detail dialog and test focus restoration. At phone width use stacked record summaries; no tiny squeezed table is required.
13. Open `/org/example/attendance`. Draft per-row marks, filter and return, open details, and keep the local draft. Navigate away/back: marks must reset. No official register is finalized. On finance, confirm two unposted illustrative charges total ₹12,000 and no payment/receipt/settlement action exists.
14. Open `/app/professional`. Pick a day/time, review, go back, change day, and confirm slot selection resets. Finish review; it must explicitly say that no reservation or payment occurred. Qualifications remain unverified.
15. Open Notifications and mark examples read; follow links. Open Inbox and Operations: contact and privileged records remain restricted. Check `/app/settings` controls and required name. Settings do not change real visibility, consent, or account security.
16. Open `/design-lab`. Inspect palette, typography, buttons, disabled states, dialog, adjustable progress, and Ready/Loading/Empty/Validation/Service error/Restricted/Offline samples. Retry should return to Ready. Lab samples are not proof of full screen-state coverage.
17. Turn on OS reduced motion, refresh, and repeat buttons, audience tabs, dialogs, player, and first visit. Large movement and decorative intro should be suppressed. Repeat rapidly and inspect intermediate frames. Test 200% browser zoom, keyboard-only use, NVDA/VoiceOver, visible focus, and no focus clipped at card edges.

## Native walkthrough

```powershell
cd D:\WAI
$env:pnpm_config_verify_deps_before_run = 'false'
pnpm --filter mobile start
```

Use a compatible Expo Go/development client or an Android emulator. Windows cannot run an iOS simulator; iOS requires a physical device or a macOS environment. Native preview is gated by `__DEV__`, so a production bundle export does not enable the UI in a release app.

1. Confirm iSchoolie Preview name, white splash, safe areas, five labeled tabs, and Example Data header. Inspect the original proposed launcher artwork and adaptive cropping; device appearance remains unverified.
2. On Student: open courses and lesson, write notes, move lessons, test keyboard dismissal/back, search directory, preview/undo requests, and inspect restricted inbox.
3. In Profile choose Guardian; switch children and confirm restricted child clears prior details. Choose Institution staff and mark example attendance. Choose Tutor and review a time without reserving it. Educator/Guardian/Tutor secondary tab content is incomplete; record discrepancies rather than accepting the labels as full parity.
4. Test Android back/gesture behavior, iOS safe areas and keyboard, large system fonts, TalkBack/VoiceOver, and reduced motion. No actual device behavior has yet been verified.

For review with ChatGPT, report the route, viewport/device, action, expected result, actual result, and screenshot if useful. Do not enter real child, institution, financial, or credential information into fixtures. Keep all follow-up work within Module 00 until frontend acceptance.

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

## Advanced authoring and native acceptance


These are unrun acceptance tasks.

1. EDU-07 on web/native: add modules/lessons/blocks; select and bold/emphasize text; reorder each level; cancel/confirm nested removal. Learner preview preserves content/formatting and renders HTML-like text inertly. Check cursor, focus and keyboard.
2. Save a snapshot, edit, simulate offline, attempt save, restore connection, simulate newer revision, inspect both recovery choices. Check reset/restore confirmation and readiness invalidation. Leaving/refreshing resets the in-memory draft.
3. EDU-17: both question types, options/answer key, duplicate/blank options, invalid points, reorder/remove; preview correct/wrong/missing/written responses. No automatic written scoring. EDU-14: invalid/real dates, rubric guidance, points/totals/order.
4. EDU-08: select/cancel valid files, unsupported extensions, >5MB, duplicate attachments, text <=64KB, longer text, images, remove/reselect, leave while reading, ten-resource cap. Native picker may leave app-cache copies. PDF content is not previewed and nothing is uploaded.
5. EDU-16: zero/missing/out-of-range rubric points and brief/useful feedback; total /10 with no release. INS-23: 0.29, too many decimals, >100000, native remove and illustrative totals.
6. PRO-04: adjacent/overlapping/reversed windows, excluded-date restoration and 30-minute start/end boundaries. Cases: proposal/decline/cancellation, match/mismatch/escalation, evidence/notes/final responses. No official outcomes.
7. Native records: search/filter/sort/select/paginate/details; INS-18 teacher/room collisions; context clearing. Open /workflow-library and walk thirty eligible paths using Back/retry/context/expiry and W33 CSV. Open detailed stage editors and test platform Back.
8. Repeat on Android/iOS with keyboard, large text, screen readers, reduced motion, safe areas, orientation, provider pickers and interrupted gestures. Record exact ID, device/width, action and expected/actual result.

## Per-screen states and native parity acceptance


1. Open /design-lab/states. For each ID, inspect every supported state and the stated N/A reasons. Ready pages must retain their actual task and relevant heading; read-only views must not acquire invented validation fields or mutation receipts.
2. Edit actual form/authoring/message data, then enter Loading/Empty/Error/Offline/Conflict. The task should be hidden and unfocusable, then return with the same local values on retry. Conflict discard must return a fresh fixture. Test with dialogs open/closed, keyboard focus and screen-reader announcements.
3. Enter Restricted/Expired or switch scoped context. Prior task fields must be removed, ordinary state selection must not bypass the lock, and explicit fictional recovery must start fresh. Verify child-specific filters, replies, notes and file references clear.
4. Native /screen?id=ID exposes the same contract for all 138 eligible screens. Check embedded player/catalog without nested scroll/safe-area shells, platform back, task-local keyboard behavior and cleared scope.
5. Inspect PAR-02/03/04/08/10 category differences, profile edit/review, tutor discovery/filter/interest, community replies, search/help exclusions, approval category/date/evidence validation, portfolio add/remove, specimen mismatch and evidence checklists.
6. Complete the same three practice questions on web/native, including previous/jump/review/clear. Switch native message channels with unposted drafts; they must remain separate and never indicate actual delivery.
7. Repeat at all ten browser widths and actual Android/iOS large text, screen readers, reduced motion, rotation, keyboard, safe areas and interrupted picker/gesture cases. Record exact ID/state, action and expected/actual results. These remain unrun manual acceptance tasks.

## Register, CSV, workflow and learner closure acceptance


These are unrun UI acceptance tasks.

1. Open each register family on web/native. Filter a named status, search with whitespace/full-width characters, sort every offered field in both directions and move through six-row pages. Clear filters after an empty result. Check export-scope controls at 320px and large text.
2. Select rows, change filters and verify selected/visible counts. Web export Matching vs Selected; native Share matching vs selected example CSV text. Inspect classification/header/row widths, Unicode, quotes/newlines and formula-like values. Cancel/fail the share sheet; it must not claim delivery. Duplicate display labels must remain independently selectable.
3. W33: change the sample CSV, pause/fail/retry/back and confirm exact text survives. Try misplaced quotes, trailing text after a quoted field, duplicates, missing cells and limits. Change earlier-stage data after later reviews: downstream fields/history must clear. Context/expiry clears CSV as well.
4. Finish a path, select Revisit final stage and confirm it opens the final stage. Select a failure mode after completion: review pauses consistently on web/native. Back must not advance a paused web step.
5. STU-13: required title and written response; optional attachment description; valid/empty/duplicate/>5MB/unsupported files; text/image preview; remove/reselect; inspect acknowledgement after edits; snapshot/save/edit/restore; confirm/cancel discard. Review must never create an academic attempt.
6. Restore/reset/navigate/expire while a resource read is pending. Late picker/read results must not populate a new/restored context. Native copies may remain in the disclosed OS app cache.
7. Revisit case stages and final response. Source fields become read-only after stage one; change them by revisiting it. Earlier evidence changes must remove later checkpoints, history and inspection acknowledgement. Revise notes without duplicated review entries.
8. Test keyboard focus after web errors and controlled dialogs, native spoken error announcements, safe-area/keyboard/large text and physical Android/iOS share/picker behavior. Record ID, platform/width, action and expected/actual result.

## Module 00 V3 review

Use FINAL-DESIGN-REPORT.md, WEB-VISUAL-QA.md and MOBILE-VISUAL-QA.md for the current redesign. Open /app/profile, /app/profile/onboarding and /auth/privileged in addition to the existing catalog/workflow paths. Review local photo/cover selection, remove/cancel/invalid/oversize files, save/restore text-only snapshots, and required-field revalidation before profile review. Inspect the new context-control gallery at /design-lab. All nine widths and all twenty-one required exemplar screens still need rendered review; the saved browser policy denied the authorized retry. V3 is not accepted by the historical Module 00 approval.
