# Web information architecture

Public: `/`, `/about`, `/trust`, `/institutions`, `/courses`, `/courses/[id]` (design, science, writing, math), and the honest `/auth/sign-in` boundary. Public course data is labeled as a concept. Sign-in collects no credentials.

Development preview: `/app` feed; `/app/network`; `/app/communities`; `/app/inbox` restricted state; `/app/saved`; `/app/notifications`; `/app/settings`; `/app/courses`; `/app/student`; `/app/student/player`; `/app/educator`; `/app/educator/editor`; `/app/guardian`; `/app/professional`; `/org/example/students`; `/org/example/attendance`; `/org/example/finance`; `/ops` denied state; `/design-lab`.

The catch-all app route uses an explicit whitelist and returns not-found for unknown paths. It does not generate fake screens from the 180-entry inventory. Route modules are server components; client-owned feature components hold preview interactions. Root Suspense supports this installed Next.js version's Cache Components/prerender rules. Public About and course detail routes enumerate known static params.

`requirePreview()` rejects app, institution, operations, and lab routes in production unless `ISCHOOLIE_UI_PREVIEW=true` is explicitly set for the preview build/runtime. This is a development preview gate, not authentication. Keep the flag off in production. A real backend must later authorize every route and object. Native release builds separately gate the preview with `__DEV__`.

The shell contains contextual navigation, workspace preview dialog, breadcrumbs, search, notifications, preferences, a collapsible desktop sidebar, and role-adapted mobile quick navigation. The narrow navigation dialog uses the shared accessible primitive. Root preview context stores public example posts/saves only; it does not contain institution/child records. Route changes key the page body so scoped form state resets. Guardian child changes remount child detail.

`src/lib/preview.ts` contains typed course/post interfaces and reusable fixtures. Further extraction into formal data adapters and smaller per-domain modules is still needed. Some low-volume fixture data remains local to role components; no comprehensive API-contract package is claimed. The catch-all currently references several feature families; measured bundle splitting is an open performance task.

Screen-register fragments identify actual controls/views. A dialog fragment is an inspection identifier, not a promise that pasting a fragment opens the dialog. Full deep-link, back-navigation, safe-draft, and scroll-restoration contracts remain pending.

## Continuation: full inventory routing

All 180 canonical `/preview/ID` routes now dispatch explicit contracts from packages/contracts/frontend-screens.json through enterprise/screen-preview.tsx. Unsupported kinds throw rather than rendering a placeholder. Related tasks have direct ID links; `/design-lab/screens` is searchable by family and text. `/design-lab/workflows` links all forty `/design-lab/workflows/Wxx` draft/review paths. Seventeen `/discover/[slug]` public aliases and `/auth/[step]` onboarding/recovery/restriction designs supplement existing routes. Auth designs are preview-gated and create no identity system. Default production excludes real preview IDs; Cache Components' disabled sample produces not-found. Shared domain patterns are partial prototypes, not fully accepted bespoke pages.

## Advanced implementations

EDU-07/08/14/17 and existing /app/educator/editor use shared-model authoring. PRO-04 uses recurring availability. Case kinds use staged response reviews; grading uses rubric feedback. Existing scope/failure gates remain. Pure model: packages/contracts/authoring-state.ts. No official outcomes or backend mutations.

## Per-screen state routes

Added /design-lab/states and /design-lab/states/[id]/[view], gated before rendering. Canonical home/course previews use embedded content under the state boundary; original public routes remain standalone. Per-screen applicable states render actual task controls; read-only N/A decisions are explicit. Scoped restriction/expiry clear the child task, while temporary recovery preserves it.
