"""Build the honest V3 source coverage register; never certifies visual QA."""
import json
from pathlib import Path
from collections import Counter

ROOT = Path(__file__).resolve().parents[1]
DOC = ROOT / 'docs/module-00'
specs = json.loads((ROOT/'packages/contracts/frontend-screens.json').read_text(encoding='utf-8'))
old = {s['id']: s for s in json.loads((DOC/'screen-register.json').read_text(encoding='utf-8'))}
recomposed = {'home', 'feed', 'profile'}
onboarding = {'AUTH-07', 'AUTH-08', 'AUTH-09'}
register = []
for spec in specs:
    previous = old[spec['id']]
    status = 'Recomposed V3 prototype' if spec['kind'] in recomposed or spec['id'] in onboarding else 'V3 foundation applied; detailed visual review incomplete'
    register.append({
        'id': spec['id'], 'name': spec['name'], 'route': spec['route'], 'role': spec['family'],
        'layout_family': spec['kind'], 'component_family': 'Progressive profile setup' if spec['id'] in onboarding else previous['components'],
        'mobile_behavior': 'Responsive/native source updated; nine required web widths unmeasured',
        'expo_availability': previous['native'], 'native_plan': previous['native_plan'],
        'implemented_state': status, 'visual_qa_state': 'BLOCKED: saved browser policy denies localhost; no screenshot inspected',
        'accessibility_state': 'Source semantics/contrast checks; runtime keyboard, screen reader and resizing pending',
        'acceptance': 'Incomplete V3 review; not accepted', 'data_boundary': 'Isolated typed fixtures; no business backend added',
        'dependency': 'Rendered visual/device inspection and per-screen review; domain integrations remain outside this redesign',
    })
(DOC/'screen-coverage-v3.json').write_text(json.dumps(register,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
counts = Counter(s['role'] for s in register)
lines = ['# Module 00 V3 screen coverage', '', 'All 180 IDs are accounted for. Foundation rollout is not visual acceptance. No V3 screen is reported fully accepted while browser/device review is blocked. Historical Module 00 acceptance remains in module-acceptance.json.', '', '| Group | IDs | Entries | V3 visually accepted |', '| --- | --- | ---: | ---: |']
for family, count in counts.items():
    lines.append(f'| {family} | {family}-01 to {family}-{count:02d} | {count} | 0 |')
lines += ['', 'Full machine-readable fields: [screen-coverage-v3.json](screen-coverage-v3.json). Canonical fixture routes stay gated in production. Live account routes /auth/sign-in, /auth/register, /auth/verify, /auth/recover, /auth/reset, /auth/activate, /auth/sessions and /auth/privileged use the preserved Module 01 implementation. They do not turn the 16 AUTH preview contracts into live business workflows.', '', '| ID | Screen | Route | Layout | V3 implementation | Visual/accessibility |', '| --- | --- | --- | --- | --- | --- |']
for row in register:
    lines.append(f"| {row['id']} | {row['name']} | {row['route']} | {row['layout_family']} | {row['implemented_state']} | Visual blocked; runtime a11y pending |")
(DOC/'SCREEN-COVERAGE.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')

def write(name, text):
    (DOC/name).write_text(text.strip()+'\n', encoding='utf-8')

write('DESIGN-AUDIT.md', '''# Module 00 V3 design audit

Audited actual source on 2026-11-11. Rendered-interface audit blocked by saved localhost browser policy; observations below are code findings, not visual claims.

| Category | Before | Correction |
| --- | --- | --- |
| Color | Violet interaction anchor and competing sage/peach/lavender surfaces | Exact blue/white palette, semantic supporting neutrals; violet logo preserved separately |
| Typography | Geist, Georgia artwork/display treatments, essential 8-11px labels | Optimized Inter/system stack; native platform typography; essential small labels raised; intentional body/page scales |
| Layout | Homepage organized around repeated promotional panels | New split editorial hero, original product scene, open product columns, role tabs, learning and trust sections |
| Networking | Feed plus one rail; shallow profile header/section cards | Wide three-region feed; scopes/empty views; profile introduction, section timeline, skills and contextual sidebar |
| Authentication | Combined Student/Staff and public administrator category; no password visibility | Distinct Personal/Student/Staff/Parent selection, separate restricted entry, password visibility; preserved API calls |
| Profile onboarding | Generic one-page field workbench | Six progressive grouped stages covering introduction, story, history, featured work, appearance/privacy, review; local snapshot/restore |
| Enterprise | Owner page mostly a large restriction message; network sidebar inherited | Dedicated governance register/search/checklist and operations navigation; all sensitive access remains unavailable |
| Mobile | Inconsistent direct colors, font sizes and native text families | Shared palette, Android Inter weights, iOS system text, role tabs and native progressive profile setup |
| Motion | Legacy timed floating intro and varied component timings | Header logo uses library Fade; existing shared Button/Tabs/Dialog/Progress and reduced-motion providers retained; no forced intro |
| QA | Historical Module 00 acceptance could be mistaken for V3 acceptance | Separate V3 register; every screenshot/viewport/device check explicitly unverified |

Remaining risks: all nine rendered widths, native scaling/keyboards, focus behavior, detailed component/state consistency and all 180 per-screen design reviews require actual inspection. Foundation propagation does not mean every screen was individually redesigned or accepted.
''')
write('VISUAL-DIRECTION.md', '''# Module 00 V3 visual direction

Concept: a considered learning world. Education networking is the core; learning and institution work are recognizable parts of the same product.

White is the primary canvas. Blue denotes actions and selected context. Black headings, accessible neutral supporting text, thin separators and restrained geometry establish hierarchy. The existing violet logo remains an independent brand asset, not an interaction color.

Marketing uses an editorial split hero and original product composition. Feed width prioritizes reading and collapses side regions on small screens. Profiles use a cover/introduction and a coherent section timeline. Learning separates discovery, course decision and lesson outline. Enterprise registers favor row scanning and task context. Governance uses purpose/access boundaries and navigable task areas rather than decorative metrics.

Reference implementations: homepage, live authentication, profile/onboarding, feed, shared learning treatments and governance. Other existing domain tasks receive the shared foundation and retain their original interactions. All need rendered approval. No production publication or another backend module is authorized by this redesign.
''')
write('COLOR-SYSTEM.md', '''# Module 00 V3 color system

Source of truth: packages/design-tokens/tokens.json and foundation.css.

| Role | Exact value | Use |
| --- | --- | --- |
| White | #FFFFFF | Dominant page, account, document and panel canvas |
| Primary | #0071E3 | Actions, links, active context, focus |
| Soft surface | #F5F5F7 | Quiet navigation, grouped secondary surfaces |
| Main text | #1D1D1F | Headings, body, data |
| Subtle grey | #86868B | Decorative/disabled nonessential treatment, not normal small text |
| Soft blue | #E8F2FC | Selected context and informational emphasis |
| Accessible muted | #6E6E73 | Readable secondary copy |
| Border / soft border | #D2D2D7 / #E5E5EA | Controls and quiet separators |
| Preserved logo | #2D2B55 | Existing logo/wordmark only |

Measured token contrast against white: primary 4.70:1, main text 16.83:1, readable muted 5.07:1. Subtle grey fails normal-text AA and is not the readable secondary token. Semantic green/red remain for actual success/error states. Existing compatibility names sage/lavender map to soft blue; peach/sand map to soft grey. Legacy surface alias remains soft grey; new white canvas uses background/white roles. No palette value is silently changed to satisfy contrast.

This is token arithmetic, not computed-style/runtime accessibility certification. Native uses the same JSON palette. The original logo is not silently recolored; the blue introductory/product artwork is a UI concept, not a replacement approved logo.
''')
write('TYPOGRAPHY-SYSTEM.md', '''# Module 00 V3 typography

Web uses next/font/google Inter, display swap and built-in self-hosting. The CSS stack starts with -apple-system/BlinkMacSystemFont, then optimized Inter, Segoe UI/Roboto/Helvetica/Arial. No SF Pro files redistributed. The previous Geist and Georgia display treatments are removed from the product foundation.

Android uses @expo-google-fonts/inter (400/500/600/700), loaded through existing expo-font. ProductText resolves the correct weight and line height. iOS keeps native system typography. Native text remains scalable; no maxFontSizeMultiplier cap was added. Inputs and role tab labels use the same platform font direction. Font-loading errors fall back to platform behavior; actual device acceptance is pending.

Hero: approximately 44-72px desktop, 38-56px narrow layouts. Marketing sections 32-52px; app titles 32px/27px mobile; sections 18-22px; body 16-18px; labels 14px; readable metadata 12-14px. Primarily 400/500/600, with 700 only for existing justified brand/emphasis. Heading tracking is tighter than body; long text uses comfortable line height and bounded measure. Data tables use tabular numerals.

Inter is SIL Open Font License 1.1; see https://rsms.me/inter/ and bundled @expo-google-fonts/inter license files. Apple fonts remain OS-provided. Font shift/actual glyph quality, 200% zoom and device text scaling still need rendered measurement.
''')
write('SPACING-AND-LAYOUT.md', '''# Module 00 V3 spacing and layout

Shared 4px-based scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80. Control radius 10px, card 16px, dialog 20px. Main controls 46-48px; compact controls retain 44px minimum targets. Elevation is reserved for floating dialogs and the product demonstration.

Marketing max composition 1440px, editorial content around 1280px. Feed has a bounded reading column with contextual rails; a third region appears at wide widths. Institution/governance can use broader content than feed. Course detail separates decision information from enrollment concept; lesson content uses a reading measure and outline. Profiles separate story from contextual actions. Small screens collapse columns rather than squeeze sidebars.

Required widths 320/360/375/390/430/768/1024/1440/1920 are authored breakpoint intentions, not tested viewport measurements. Registers retain horizontal scrolling where a real table needs it. No generic global overflow hiding is used to claim layout correctness.
''')
write('COMPONENT-SYSTEM.md', '''# Module 00 V3 component system

Shared web implementation remains apps/web/src/components/ui.tsx, product-v3.css, foundation.css and the existing enterprise workbenches. Native implementation remains native-ui.tsx and platform task components; DOM primitives are not reused in Expo. packages/ui/component-registry.json records source ownership and unverified states.

Styled families: Button/IconButton, fields/password/phone/institution entry, native selects/combobox-like pickers, search, check/radio/switch patterns, textarea, tabs, disclosures, dialog/sheet-equivalent navigation, notice/alerts, progress/stepper, avatars/badges, professional/course/community/institution/feed surfaces, data registers/pagination, schedules, upload/resource pickers, empty/error/loading states and workspace navigation. Underlying field/state models remain unchanged.

Default, selected, disabled, validation/error, local success and loading are authored where meaningful. Web uses browser-native field keyboard semantics and Radix focus ownership for dialogs; Button/Tabs/Dialog/Progress use Animate UI. Pointer hover is fine-pointer gated in the new stylesheet. Focus rings are immediate. Native uses accessible Pressable/TextInput and system reduced-motion-aware Reanimated feedback.

Additional styled web primitives in product-primitives.tsx cover tooltip, contextual popover, dropdown actions, native-browser date field, breadcrumbs and a static loading skeleton. They are exercised in the design gallery. Full cross-platform parity, every component-state screenshot, runtime keyboard/assistive technology acceptance and remote media upload remain unverified. Local profile/cover selection is implemented with bounded PNG/JPEG previews and cleanup. Existing table/filter/calendar/resource workflows are product components rather than a newly packaged universal component library. Native selection equivalents are not automatically feature-identical to desktop menus; browser-native date selection is not a new OS date picker on Android/iOS.
''')
write('MOTION-SYSTEM.md', '''# Module 00 V3 motion

Installed Animate UI skill reviewed; @animate-ui/react 2.4.3, Motion 14.11.0 and Radix retained. No blanket codemod, backend change or GSAP installation. Header brand reveal now uses library Fade with a visible 0.7 starting opacity; it never covers the page or delays inputs. Existing Button press, animated Tabs, Dialog and Progress use primitive motion with AnimateUIProvider reducedMotion=user, tempo 0.85 and ReducedMotionConfig.

Motion gate: subtle for authentication/enterprise; spatial/state feedback for tabs and overlays; limited expressive branding. No new hand-tuned Motion springs or scroll hijacking. CSS retains finite vector/course demonstration effects and reduced-motion media handling. Native uses Reanimated with ReduceMotion.System and the shared press-scale/duration tokens; no DOM motion in Expo.

Source audit saved under output/module-00-v3/motion-source-results.json. The obsolete timed intro was removed (seven prior facts to five before the added context primitives). Color/shadow transitions are small control paints; the 650ms product entrance and 800ms small SVG reveal are finite rare presentation effects, not menu/input delays. These facts are not counted as defects or an animation score. It does not see primitive internals or certify frame timing, keyboard retargeting, hover/touch behavior or reduced-motion runtime. Actual browser motion inspection is blocked. Device frame/startup measurements remain pending.
''')
print(json.dumps({'screens':len(register),'groups':dict(counts),'visually_accepted':0}))

write('REFERENCE-RESEARCH.md', '''# Module 00 V3 reference research

Reviewed official current page text/documentation on 2026-11-11. No reference screenshot, authenticated LinkedIn interior, motion frame or reference viewport was inspected. Textual information architecture is evidence; a brand's rendered typography/spacing is not inferred from it.

| Sources inspected | Useful pattern / adaptation | Unsuitable / access, mobile and licensing limits |
| --- | --- | --- |
| [Apple](https://www.apple.com/), [HIG](https://developer.apple.com/design/human-interface-guidelines.md), [Fonts](https://developer.apple.com/fonts/) | Short focused product paths, platform guidance, readable hierarchy; adapt with original education copy and native system type | No copied logo/product imagery or redistributed SF files. Visual precision still needs our rendered QA. |
| [Clerk sign-in](https://clerk.com/components/sign-in), [switcher](https://clerk.com/components/organization-switcher), [organization profile](https://clerk.com/components/organization-profile) | Category/proof progression, explicit workspace context and grouped account tasks | UI reference only; no Clerk auth migration, no treating a workspace switch as permission. Keep native controls/touch targets. |
| [LinkedIn](https://www.linkedin.com/) | Public identity/discovery/join entry points; adapt professional identity and network vocabulary | Public page only; authenticated feed/profile UI unavailable for inspection. No claimed interior visual observations, logo reuse or unrestricted student networking. |
| [Linear](https://linear.app/) | Focused product navigation and task-oriented information grouping | Marketing text is not proof of application spacing/motion. Avoid importing dark/agent-centric styling into education ERP. |
| [Animate UI](https://animate-ui.com/), [docs](https://animate-ui.com/docs) | Primitive motion ownership; retain Button/Tabs/Dialog/Progress and reduced-motion provider | No broad codemod needed; do not put DOM primitives in Expo. Existing installed skill and package licenses apply. |
| [Udemy](https://www.udemy.com/), [Coursera](https://www.coursera.org/) | Search, course categories, learning goals and clear course decision hierarchy | Do not borrow promotions, ratings, prices, certification claims or thumbnails. Use original clearly labeled course examples. |
| [Notion](https://www.notion.com/), [Stripe](https://stripe.com/), [Figma](https://www.figma.com/) | Clear product areas, workspace/task grouping and enterprise information architecture | No vendor integration/endorsement implied; no imported artwork or unsuitable marketing gradients. Our complex tables/forms remain task-specific. |
| [Inter](https://rsms.me/inter/), [Expo Font](https://docs.expo.dev/versions/v58.0.0/sdk/font/) | Open-licensed cross-platform text, explicit platform font loading | Inter OFL included by package; retain system fonts on iOS, test scaling. |
| [Expo FileSystem](https://docs.expo.dev/versions/v58.0.0/sdk/filesystem/), [DocumentPicker](https://docs.expo.dev/versions/v58.0.0/sdk/document-picker/), [Image](https://docs.expo.dev/versions/v58.0.0/sdk/image/) | Bounded local file/image previews with platform APIs | Device picker, cache cleanup and interrupted selection need device verification; no remote upload service claimed. |

Repository references inspected: Module 00 screen/state/workflow/native registers, previous design/architecture/research docs, Module 01 identity ledger/security boundaries, installed Next font/Server-Client docs, Expo SDK 58 guidance. The available 105-page Enterprise Product Blueprint v1.1 was inspected through existing extraction and selected core architecture/identity/screen sections. Its annex contains consolidated master material; this is not a separately supplied ISCHOOLIE-MASTER-001 file.

An additional 25-page iSchoolie - Learn. Teach. Connect. Grow.pdf was located; first-page text extraction returned encoded glyph names rather than readable prose. Its content is not claimed read.

Unavailable as standalone named files in the checked workspace/Downloads: iSchoolie_Complete_Web_Mobile_UIUX_Architecture_v1_0.pdf, iSchoolie_Complete_8_Document_Set.pdf and ISCHOOLIE-MASTER-001. Their contents are not claimed read. The current user request controls the palette/redesign scope; PDF instructions remain reference material.
''')

review_screens = [
    ('Public homepage','/'),('Main login','/auth/sign-in'),('Student login','/auth/sign-in, Student category'),
    ('Staff login','/auth/sign-in, Staff category'),('Parent login','/auth/sign-in, Parent category'),
    ('Professional onboarding','/app/profile/onboarding; /preview/AUTH-08'),('Completed professional profile','/app/profile; /preview/EDU-02'),
    ('Education feed','/app'),('Post composer','/app, composer dialog'),('My Network','/app/network'),
    ('Community detail','/preview/APP-11'),('Course catalog','/courses'),('Course detail','/courses/design'),
    ('Learning player','/app/student/player'),('Student dashboard','/preview/STU-01'),('Educator dashboard','/app/educator'),
    ('Guardian overview','/app/guardian'),('Tutor booking','/app/professional'),('Institution dashboard','/preview/INS-01'),
    ('Institution data table','/org/example/students'),('Platform governance','/ops'),
]
qa_lines = ['# Module 00 V3 web visual QA', '', '**Blocked. Zero screenshots inspected.** Supported browser navigation to http://localhost:3000 was denied by saved permission/managed policy, including the retry after explicit user authorization. No alternate browser surface, origin, CDP, screenshot harness or other bypass was used.', '', 'All nine required widths are unverified: 320, 360, 375, 390, 430, 768, 1024, 1440, 1920. CSS breakpoint/source review is not a viewport test.', '', '| Required screen | Path | Rendered QA |', '| --- | --- | --- |']
qa_lines += [f'| {name} | {route} | Not visually inspected |' for name,route in review_screens]
qa_lines += ['', 'For each screen inspect actual font/glyph quality, size/weight/tracking/line-height, hierarchy/alignment, spacing, exact palette, computed contrast, focus/motion, mobile reflow and all form states. Fix and capture again after browser access is enabled. Only source/build/markup evidence is currently available. No Core Web Vitals compliance claimed.']
write('WEB-VISUAL-QA.md','\n'.join(qa_lines))
write('MOBILE-VISUAL-QA.md', '''# Module 00 V3 mobile visual QA

**No emulator, signed device run or native screenshot inspected.** Android/iOS JS+Hermes bundle export, Expo Doctor, lint and types are compile/source evidence only. Mobile browser widths are all unverified; see WEB-VISUAL-QA.md.

Implemented source: shared palette and geometry, ProductText with platform/weight-aware Inter on Android and system iOS text, scaled line-height, role-specific tabs, separate auth categories/password visibility, profile screen, progressive local onboarding with profile/cover image preview, existing task/register/learning/guardian/tutor parity. Native picker copies only a selected image, bounds type/size/header and removes its temporary cache copy after reading. Actual OS behavior is unverified.

Required device matrix: five role tab sets; access/activation/recovery/MFA; profile setup/save/restore/photo/cover/remove; screen-state restriction/expiry clearing; safe areas and keyboard avoidance; rotation/large text; TalkBack/VoiceOver; reduced motion; back/deep links; interrupted picker and cache cleanup; low-end startup/scroll/frame behavior. No platform-owner console is added to native. Release still uses the real Module 01 access entry, while development prototypes stay isolated.
''')
write('ACCESSIBILITY-QA.md', '''# Module 00 V3 accessibility QA

Source/build checks are not WCAG certification. Token arithmetic: primary on white 4.70:1, main text on white 16.83:1, readable muted on white 5.07:1. The mandatory #86868B is reserved for nonessential/disabled treatment because it fails normal small-text AA.

Implemented: visible immediate focus rings, explicit form labels, linked inline errors, password visibility state/labels, category pressed states, semantic headings/main landmarks, Radix dialog focus ownership, native accessible roles/selected/disabled state, user-reduced-motion provider and media fallback, native text scaling and bounded file inputs. Local profile review revalidates required fields after snapshot restoration. Blob URLs/cache copies are scoped and cleared; identity/consent boundaries remain intact.

Generated-HTML checks cover label associations, duplicate IDs, nested links/buttons and landmarks across the screen/workflow catalog, plus state boundary/locked-choice attributes. These checks do not run hydration, keyboard, screen-reader or computed layout. Final command/results are recorded in FINAL-DESIGN-REPORT.md and output/module-00-v3/qa-summary.json.

Unverified: actual focus order/restoration after steps and dialogs, error announcements on every platform, zoom/large text, contrast over media/disabled states, all nine viewport widths, VoiceOver/TalkBack, pointer-vs-touch motion, and whether every component state meets acceptance. No visual or assistive-technology pass is claimed.
''')

# Keep the forty historical workflow rows intact, adding a current-scope note once.
workflow_path=DOC/'WORKFLOW-COVERAGE.md'
workflow_text=workflow_path.read_text(encoding='utf-8')
note='''\n## Module 00 V3 continuation - 2026-11-11

All forty existing typed local walkthroughs are retained. V3 shared tokens, typography, controls and task surfaces apply to them; profile onboarding also has dedicated progressive web/native screens. Real Module 01 authentication remains separate from fictional walkthroughs. None of the forty paths is newly visually accepted. Browser/device click-through remains blocked/unverified, and no backend or official academic/financial/privileged outcome is produced by a preview.\n'''
if '## Module 00 V3 continuation' not in workflow_text:
    workflow_path.write_text(workflow_text+note,encoding='utf-8')

components=['Button','Icon button','Input','Password input','Phone input','Institution selector','Combobox','Search','Select','Checkbox','Radio','Switch','Textarea','Tabs','Segmented control','Accordion','Tooltip','Popover','Dropdown menu','Dialog','Sheet','Drawer','Toast','Alert','Progress','Stepper','Breadcrumb','Avatar','Badge','Profile card','Course card','Community card','Institution card','Feed card','Media preview','Data table','Pagination','Calendar','Date picker','Navigation sidebar','Mobile bottom navigation','Workspace switcher','Notification item','File uploader','Loading skeleton','Empty state','Error state']
unpackaged=set()
component_rows=[]
for name in components:
    component_rows.append({'name':name,'status':'Dedicated reusable cross-platform primitive incomplete' if name in unpackaged else 'Existing implementation/family styled; runtime state review pending','web_owner':'apps/web/src/components/ui.tsx and enterprise/domain task components','native_owner':'apps/mobile/src/components/native-ui.tsx and native task equivalents','states':'Default/selected/disabled/loading/error/success where applicable; full hover/focus/pressed matrix not visually verified','keyboard':'Browser/platform primitives and explicit labels; runtime review pending','reduced_motion':'Shared providers/media/native System preference; runtime review pending'})
ui=ROOT/'packages/ui'
ui.mkdir(exist_ok=True)
(ui/'component-registry.json').write_text(json.dumps(component_rows,indent=2)+'\n',encoding='utf-8')

write('FINAL-DESIGN-REPORT.md', '''# Module 00 V3 design report

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
''')

ledger=DOC/'PROGRESS-LEDGER.md'
existing=ledger.read_text(encoding='utf-8')
if '# Module 00 V3 progress' not in existing:
    ledger.write_text('''# Module 00 V3 progress

Reopened by the user's V3 redesign request on 2026-11-11. **Source redesign implemented; rendered visual/device review and manual acceptance incomplete.** The historical accepted Module 00 ledger below is preserved as history; its previous Module 01 authorization statements are superseded by the later Module 01 request/implementation.

Current source: exact palette/Inter-system typography; recomposed homepage, feed/profile/onboarding, distinct auth categories and governance; native typography/profile/onboarding/media; shared controls and domain style rollout. Authentication/backend/database contracts preserved. No new backend module.

Current evidence and remaining work: FINAL-DESIGN-REPORT.md, WEB-VISUAL-QA.md, MOBILE-VISUAL-QA.md, screen-coverage-v3.json and v3-progress.json. All 180 IDs accounted for, none individually visually accepted for V3. Browser policy still denied the user's explicitly authorized retry. Do not bypass it. No screenshot or device pass claimed.

Next: complete the mandatory 21-screen/nine-width rendered matrix and per-screen/state review, correct observed defects and collect native-device evidence. Some shared domain layouts and the cross-platform component-state matrix remain individually unreviewed. Obtain V3 manual acceptance before another module.

---

## Historical accepted Module 00 ledger

'''+existing,encoding='utf-8')

progress={'module':'00','version':'V3','date':'2026-11-11','status':'source_redesign_implemented_visual_and_device_acceptance_incomplete','historical_acceptance_preserved':True,'module_01_implementation_preserved':True,'new_backend_module_started':False,'screens_accounted_for':180,'native_eligible_plans':138,'workflow_paths':40,'visually_accepted':0,'screenshots_inspected':0,'viewports_tested':[],'required_viewports':[320,360,375,390,430,768,1024,1440,1920],'browser':'saved_permission_denied_even_after_authorized_retry','native_device_runs':0,'manual_approval':False,'remaining':['rendered_21_exemplars_and_all_registered_screen_states','individual_shared_layout_refinement_after_review','native_device_qa_and_component_state_parity','runtime_performance_measurement','manual_user_acceptance']}
(DOC/'v3-progress.json').write_text(json.dumps(progress,indent=2)+'\n',encoding='utf-8')
