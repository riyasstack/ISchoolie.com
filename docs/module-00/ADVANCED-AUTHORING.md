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
