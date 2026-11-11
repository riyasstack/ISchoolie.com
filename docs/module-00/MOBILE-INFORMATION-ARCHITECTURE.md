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

native-domain.tsx selects explicit role task IDs and dispatches typed forms, records, practice, local messages and schedules. native-curated.tsx supplies feed/saves/discovery/communities/alerts/preferences/roster/ledger/lesson-edit/course surfaces. This extends actual role content beyond the initial label-only tabs, but advanced authoring/cases now share the web model; other per-screen summaries remain subject to parity review.

Screen/Card/Copy/Button primitives use safe areas, keyboard avoidance, scalable text, shared tokens, and reduced-motion press feedback. Choice buttons expose selection semantics. Original proposed 1024px launcher/adaptive artwork replaces starter references in app.json; source starter assets remain on disk. Device launcher/splash cropping is unverified.

Data is memory-only. Real local picker/preview added; no upload, video provider, push delivery, signed-in deep links, meeting, payment, offline synchronization or official record finalization. Release export disables development preview UI. Device acceptance must cover back/gestures, keyboard, safe areas, rotation, large fonts, TalkBack/VoiceOver, reduced motion, interrupted gestures and low-end scrolling.

## Advanced native parity update

Added native-authoring, native-availability, native-evidence and native-workflows components plus /workflow-library and /workflow routes. Thirty eligible paths share the stage reducer; educator Tasks links authoring directly. Native records and timetable now support editing/review controls. SDK document-picker/filesystem support real local selection and bounded preview; cache copies are disclosed. All device and per-screen acceptance remains open.

## Per-screen state and task parity update

All 138 eligible detail routes use NativeScreenStateBoundary and embedded Screen content. NativeParity adds guardian categories, profile/discovery/discussion/search/help/consent/portfolio/credentials/overview/evidence tasks; threaded messages retain per-channel drafts, and practice uses the shared three-question fixture. native-screen-plans.json distinguishes dedicated and shared field/register/editorial paths. No device acceptance or blanket parity claim.

## Closure parity update

Native registers share the web model (six rows, status-column filtering, sort fields, stable fixture selection and explicit matching/selected scopes). OS text sharing does not verify delivery. Learner submission has its own NativeSubmission flow instead of authoring studio. Native authoring/submission share resource selection; case revisions and workflow draft invalidation share pure models.
