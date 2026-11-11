# Module 00 V3 design report

Updated 2026-11-11. **Redesign source implemented; visual/device acceptance incomplete.** This is not a claim that all 180 enterprise screens have completed individual visual review. The historical Module 00 acceptance remains preserved and does not approve V3. No new backend module, authorization system, database reset or deployment was introduced.

## Visual redesign

The previous violet/Geist/pastel foundation is replaced with the exact white/blue palette, Inter/system typography, accessible supporting text, consistent controls and calmer separators. This includes structural changes, not only color overrides: an editorial homepage/product composition; three-region wide feed; professional profile introduction/timeline/sidebar; progressive profile setup; distinct authentication categories; a task-based governance register/navigation; native profile and onboarding; and a reusable context-control gallery. Existing learning, authoring, academic, guardian, booking, register and workflow behavior remains in place and receives the shared foundation.

## Color and typography

White #FFFFFF; primary #0071E3; soft grey #F5F5F7; main text #1D1D1F; subtle grey #86868B; soft blue #E8F2FC. Readable muted text #6E6E73 and borders #D2D2D7/#E5E5EA support them. The #2D2B55 logo is retained independently. Token contrast passes for readable roles; subtle grey is not used as the normal body token.

Web uses optimized self-hosted Inter through next/font with Apple system fonts first in the stack. Android directly imports only Inter 400/500/600/700; iOS uses system typography. No Apple font files redistributed. Essential small labels are raised, data uses tabular numerals, and native line-height follows text size. Actual glyph rendering, font shift and native scaling remain unmeasured.

## Authentication

Preserved Module 01 APIs, session transport, CSRF/Origin, secure storage, MFA and privilege boundaries. Personal, Student, Staff and Parent categories have separate visual selection; institution-issued fields keep their exact contract. Password visibility is available. Restricted administration uses a separate /auth/privileged entry. Email/phone proof, activation/recovery, MFA, sessions and login-method tools remain connected. Providers remain disabled when unconfigured. Static SSR and HTTP checks do not certify hydrated form behavior or external provider success.

## Networking and profiles

The feed has profile/context, reading and recommendation regions at wide widths, with mobile collapse, local composer/comments/reactions/saves and explicit scope empty states. No example engagement is labeled live. Profiles have a clear cover/avatar/introduction, self-described/unverified context, About/section timeline/skills and related tasks. Network discovery retains search/filter/request state; communities retain their discussion tasks.

Six progressive profile stages cover identity/headline/status, photo/cover preview, About, skills/interests, education/institution/experience, certifications/achievements, projects/publications/courses/community and privacy/discoverability. Steps validate, go back/forward, save/restore local text snapshots and review. Restored incomplete drafts cannot bypass required fields. PNG/JPEG profile/cover previews are bounded to 2 MB, signature checked and scoped to memory; web object URLs and native picker cache copies are cleaned. No upload, publication, verified affiliation or recommendation service is fabricated.

## Learning and enterprise

Course discovery/detail/player, outline, notes and progress retain their original typed examples with the new visual system and more readable measures. Student learning, educator studio/tasks, guardian authorized-child context, tutor booking/availability and institution registers remain purpose-specific. Tables retain filtering, sorting, columns, selection, pagination and scoped export behavior. Governance has search and task links for identities, institutions, moderation, security, permissions, audit and configuration, with no sensitive data loaded. Owner status never implies permission to read private messages or student records. Platform operations remain web-only.

## Components and motion

See COMPONENT-SYSTEM.md and packages/ui/component-registry.json. Shared Button/Dialog/Tabs/Progress use installed Animate UI primitives; styled tooltip/popover/dropdown, date entry, breadcrumbs and loading skeleton are added to the gallery. Existing domain calendars, media/resource pickers and record tools remain. Native equivalents use platform components; desktop menu/date behavior is not claimed identical on native.

The header brand Fade replaces the timed floating intro. Motion remains subtle around frequent tasks, with shared reduced-motion providers and native System preference. Source audit facts for rare product/vector effects are documented separately from runtime motion verification. No new GSAP, scroll hijacking or decorative infinite loop is introduced.

## Coverage and visual QA

All nine groups accounted for: PUB 22, AUTH 16, APP 19, STU 24, EDU 23, PAR 15, INS 30, PRO 11, ADM 20; total 180. The register includes route, role, layout/component family, mobile/native plan, implementation and QA state for every ID. Forty existing walkthroughs and 138 native-eligible screen plans remain. No blank route is accepted as finished.

**Screenshots inspected: zero. Viewport measurements: zero. Native device runs: zero.** The supported browser denied localhost through a saved permission/managed policy, including the authorized retry. No bypass was attempted. All 21 mandatory review screens and all nine widths are listed as unverified in WEB-VISUAL-QA.md. No new V3 visual acceptance is claimed.

## Tests and performance

Latest executed results and exact commands are in VALIDATION-V3.md, v3-validation.json and output/module-00-v3/qa-summary.json. Passing automated evidence includes 69 shared contract tests (59 prior Module 00, 6 native/auth-import, 4 V3 palette/profile/media), 10 API unit and 41 PostgreSQL integration tests, and 33 live HTTP checks using local capture. Web/native lint/types, default and explicit-preview builds, catalog/state markup checks, Expo Doctor and native exports are run as detailed below. Static checks do not test browser hydration or actual devices.

Web build is 55 generated routes by default and 2,071 with explicit preview. The fixture gate is retained. Generated checks cover 180 screens, 40 workflows, 1,620 applicable state artifacts and 316 locked-state controls. Static accessibility markup covers 220 catalog/workflow documents. Final rerun status is recorded in qa-summary.json; no target compliance is inferred from compilation.

The native font export initially included unused weights; direct subpath imports and the platform-specific font hook reduce export assets from 52 to 38. iOS metadata contains zero TTF assets; Android has the four Inter weights plus its existing symbol font. Local media is bounded; no remote image payloads or trackers added. No measured LCP/INP/CLS, p75 real-user data, native startup/memory/frame profile or performance-target compliance is claimed.

## Significant files

- packages/design-tokens/{tokens.json,foundation.css}; packages/contracts/{profile-onboarding,profile-media}.ts; packages/ui/component-registry.json.
- Web layout/fonts, globals/enterprise/identity/product-v3 styles; public-home, app-shell, network, workspaces, design-lab, product-primitives, identity-access and enterprise profile/media/onboarding components; preview/profile route wiring and restricted auth page.
- Native shared typography/UI, root font/tab configuration, identity-access/tools, profile/onboarding/media and existing native task text/color adoption.
- scripts/module00-v3-report.py, module00-v3.test.mjs, updated homepage/sign-in artifact assertions; docs/module-00 V3 reports/register.

## Remaining work and review

Every ID in SCREEN-COVERAGE.md still requires V3 rendered review, including typography, all applicable component states, focus, touch, responsive overflow and motion. Some existing shared field/register/editorial layouts received foundation rollout rather than an individually composed new screen. The full cross-platform component-state matrix, actual native date/menu equivalents and domain photo/upload/publishing services are not certified complete. Business integrations outside Module 01 remain isolated previews, not completed backend work. The separately named architecture/eight-document/master files were not available; see REFERENCE-RESEARCH.md.

To finish acceptance, enable localhost in the actual saved browser permission/settings, inspect all 21 mandatory exemplars at 320/360/375/390/430/768/1024/1440/1920, fix observed defects, then review each registered domain/state and native-eligible task on Android/iOS. Measure runtime performance under recorded conditions. Do not treat this source checkpoint as manual design approval.

## Manual testing

From D:/WAI use `pnpm --dir apps/web dev`; reuse an existing preview on port 3000 rather than starting duplicates. Open /, /auth/sign-in, /app, /app/profile, /app/profile/onboarding, /courses/design, /app/student/player, /org/example/students, /ops and /design-lab. Development enables fictional domain previews; production denies them unless ISCHOOLIE_UI_PREVIEW=true is explicitly selected for a local review build. Never publish that fixture build as the business application.

Start the API from apps/api using `pnpm start:prod` with existing ignored keys/config for real local auth. Local email/SMS capture is development-only and opt-in; never expose .local-auth or copy its proof secrets into logs. No permanent QA account or default admin password is provided.

Native: `pnpm --dir apps/mobile start`, choose the correct platform/development build and set reachable EXPO_PUBLIC_AUTH_API_URL for authentication (HTTPS required in release). Check all role tabs, profile setup/media, category forms/MFA, keyboard/safe areas/large text, deep links, state clearing, picker interruption and reduced motion. Expo Go/bundle export alone does not certify secure storage or native callbacks.

Stop before another module. User review and manual V3 approval are still required; no other functional backend module was started.
