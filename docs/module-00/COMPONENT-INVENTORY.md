# Component inventory

Authored and compiled; not visually accepted.

| Family | Implementation | Current limits |
|---|---|---|
| Brand / identity | Brand, BrandReveal, BrandIntro, original CSS CourseArt | Provisional logo; native app icon still needs original artwork |
| Actions | Animate UI Button, ActionLink, icon actions | More variants, loading/status variants pending |
| Selection / state | Badge, Avatar, Meter, MotionTabs | Avatar initials only; avatar image and overflow states pending |
| Modal / search | Animate UI + Radix Modal, command search, workspace picker | Trigger-based dialogs inherit focus handling; controlled dialog close-focus still needs browser verification |
| Feedback | Persistent live status region, Empty, inline callouts, lab skeleton/error/offline states | Full per-screen state matrix pending; lab is not evidence that every screen handles every state |
| Network | Composer, PostCard, comments, reaction/save state, saved collection, professional cards | No media upload, threaded discussion, permission eligibility, server persistence |
| Learning | Course catalog/card/detail, syllabus disclosure, text player, transcript/resources/notes, lesson outline | No actual video, enrollment, playback state, certificates, or authoritative progress |
| Authoring | Curriculum modules, add-lesson dialog, per-lesson in-memory drafts | No rich-text editor, reordering, uploads, publish/review workflow or durable drafts |
| Institution | Register, filters, sorting, density, selected rows, detail dialog, mobile summaries, draft attendance | No exports, bulk mutation, actual permission check, finalize/correction workflow |
| Family | Child selector, remounted scoped detail, authorized-example/restricted states | No verified relationship, full grade/fee/consent forms |
| Professional | Profile, date/slot selection, review/back state | Availability is a five-day example, not recurring scheduling or booking engine |
| Operations | Denied/restricted console boundary and information architecture | No specialist review queues, sensitive case data or privileged identity |
| Native | Screen, Card, Copy, NativeButton, role tabs, lesson/notes, directory, guardian, register, slot review | Partial role-specific content; no device verification or full role parity |

Native components live separately from DOM components. There is no attempt to import web Animate UI primitives into React Native. Complete combobox/date-picker/calendar/tooltip/toast/stepper/upload/rich-table component families remain open.

## Continuation: domain task surfaces

Added enterprise form/record/academic/social/operations/search workbenches and stateful workflow/screen explorers. Fields validate contact/date/time/number/range/choices; error summary focuses; controlled review/detail dialogs wire return focus. Metadata-only file review, bounded CSV preview, searchable/sortable/paginated example registers, CSV export with formula-prefix escaping, teacher/room conflicts, practice review, submission/grading evidence, credential specimens, local discussions, unposted ledger and case evidence now exist. Curriculum order supports keyboard move controls. Native domain/curated surfaces provide role tasks, shared validated forms, records, local social and preferences. Real native pickers, full rich text, provider controls and advanced per-screen state parity remain incomplete.

## Advanced component update

AuthoringWorkbench/NativeAuthoring, CaseWorkbench/NativeCaseWorkbench, AvailabilityWorkbench/NativeAvailability, RubricFeedback/NativeEvidence, NativeFinanceDraft and NativeWorkflow/NativeWorkflowLibrary now supplement earlier patterns. Full WYSIWYG/collaboration, PDF contents and provider media remain outside the local model.

## State and native task additions

ScreenStateBoundary / NativeScreenStateBoundary; embedded public/native screen modes; ConsentWorkbench with shared native validator; NativeParity task views; native full practice and threaded messages; state matrix and review routes. No new application dependency added.

## Closure components

Shared register-state.ts; SubmissionWorkbench / NativeSubmission and submission reducer; chooseExampleResource reused by native authoring/submission; case checkpoints/revision controls; retained workflow CSV auxiliary field. No new dependency or backend operation.
