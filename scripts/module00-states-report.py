"""Current per-screen state and native parity continuation."""
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1];docs=root/'docs/module-00'
contracts=json.loads((docs/'screen-state-contracts.json').read_text(encoding='utf-8'))
plans=json.loads((docs/'native-screen-plans.json').read_text(encoding='utf-8'))
count=sum(len(c['states']) for c in contracts);na=sum(len(c['notApplicable']) for c in contracts)
def write(name,text):(docs/name).write_text(text.strip()+'\n',encoding='utf-8')
def append(name,title,text):
 old=(docs/name).read_text(encoding='utf-8').split(title)[0].rstrip()
 write(name,old+'\n\n'+title+'\n\n'+text)
write('STATE-COVERAGE.md',"""# Per-screen state coverage

11 November 2026. 180 contracts, """+str(count)+""" applicable state views and """+str(na)+""" explicit N/A decisions. The web matrix is /design-lab/states; individual variants use /design-lab/states/ID/State. All 138 native-eligible detail routes expose the same state contract.

Temporary loading/empty/error/offline/conflict states retain the mounted task behind a hidden boundary. Restriction/expiry clear it. Recovery keeps the task generation unless the user discards it; scoped-context changes always reset it. This is local presentation logic, not authorization, secure caching or a server merge. Validation presents the actual task instead of manufacturing fields. Reviewed explicitly says it is not proof of validation; the real task control performs validation.

Generated HTML and reducer checks do not establish hydrated focus, browser interactions or native device parity. Acceptance remains zero. screen-state-contracts.json contains headings, actions, retention rules and N/A reasons for every ID; native-screen-plans.json identifies native routing patterns.

| Screen | Applicable states | N/A | Native |
|---|---|---|---|
"""+'\n'.join('| '+c['id']+' | '+', '.join(c['states'])+' | '+', '.join(c['notApplicable'])+' | '+('Authored; device unverified' if c['native'] else 'Web-only')+' |' for c in contracts))

write('PROGRESS-LEDGER.md',"""# Module 00 progress ledger

Updated 11 November 2026, per-screen state/native parity continuation. **Partially Complete: implementation and automated evidence expanded; manual frontend acceptance remains open. Module 01 has not started.**

180 authored web screen contracts; forty local web workflows; thirty native-eligible workflows; 138 native-eligible screen plans. All ten review states are accounted for per screen: 1,678 applicable views and 122 explicit N/A decisions. No screen or workflow is accepted merely because its route builds.

## Implemented this continuation

- Shared per-screen state copy/actions/applicability and a recovery reducer. Temporary failures keep the task mounted but hidden; scope denial/expiry remove scoped UI and remount it fresh on explicit fictional recovery. Conflict keep/discard choices behave differently. Validation uses the actual task, not a fabricated review-note form.
- Canonical web home/course previews now participate in state review through embedded content modes, while their original public routes remain standalone. Added /design-lab/states and per-ID/state review URLs.
- All native detail paths use a common state boundary. Reused lesson/catalog content is embedded instead of nesting safe areas/scroll screens or bypassing review controls.
- Added native guardian category tasks, profiles, tutor discovery, discussions, search/help, granular approval drafts, portfolios, specimen inspection, overview checklists and evidence review. Public tutor profile routes to its native profile task.
- Native messages have separate channel drafts; web/native practice shares the same three questions. Web guardian routes start in the relevant category. Web/native approval drafts share whitelist/date/evidence validation.
- Native plans fail visibly for an unsupported empty task; shared form/register/editorial surfaces remain explicit. Existing advanced authoring, picker, timetable, rubric, case, finance and workflow prototypes retained.

## Automated evidence and limits

46 tests pass, including every screen/state contract, retention/clearing/recovery, native eligibility/plans, consent boundaries and shared practice data. Web/native lint and TypeScript pass. Default web build passes (47 generated pages) with preview/state fixtures denied; explicit preview builds 2,121 pages, including 1,678 state variants. Canonical 180-screen + forty-workflow artifact and markup checks pass. See state-artifact-results.json for the complete generated-state audit and STATE-COVERAGE.md for every ID. Expo Doctor passes 20/20; SDK dependency check and Android/iOS JS exports pass (~4.2MB/~3.9MB, 34 assets). Motion audit covers 44 files.

No browser-policy change was supplied. The previously confirmed saved origin/managed restriction remains; no bypass or repeated retry. No webpage screenshots, rendered widths, hydrated keyboard/focus, screen-reader sessions or physical/simulated device run. adb/emulator remain unavailable on PATH. No runtime performance metrics. Native exports compile release JS where the development preview is gated.

## Main files

packages/contracts/{screen-states,practice,native-parity-state}.ts; web screen-state-boundary/consent-workbench/screen-preview, public-home/learning/workspaces components and state routes; native-screen-states/native-parity/native-domain/native-ui; state tests, variant HTML audit and report scripts; generated state/native-plan evidence.

## Exact next work, Module 00 only

1. Restore allowed browser access through user-controlled policy/settings. Do not bypass via alternate origins/tools. Open /design-lab/states and manually inspect every applicable state and N/A decision, plus all original 180 screens and forty workflows.
2. Edit a real draft, enter Error/Offline/Conflict, recover and confirm values/cursor/focus. Test conflict discard, restriction, expiry and scoped-context changes; prior private fields must disappear and return fresh. Check dialogs/portals, keyboard traps and live announcements while changing states.
3. On Android/iOS development builds, review all 138 native plans and thirty paths. Test embedded lesson/catalog back behavior, child/category changes, profile editing, discovery empty states, channel drafts, consent decisions and resource picker interruption. Validate large text, screen readers, rotation, safe areas, reduced motion and keyboard viewport.
4. Compare the authored per-screen contracts with the original detailed UX source. Shared forms/registers/editorial patterns and newly dedicated views still need visual and interaction acceptance. Fix exact-ID defects discovered by manual review; no blanket native parity claim.
5. Approved identity/content/legal/commercial/consent/retention/source decisions remain dependencies. Full WYSIWYG/collaboration, PDF content rendering, live provider media and secure offline persistence remain outside the local frontend model.
6. Measure browser LCP/INP/CLS and native startup/memory/frame behavior, complete manual design acceptance and record user approval. Stop before Module 01.
""")

for name in ['MODULE-00-COMPLETION.md','VALIDATION.md']:
 text=(docs/name).read_text(encoding='utf-8')
 text=text.replace('10 November 2026 continuation.','11 November 2026 continuation.')
 for old,new in [('36 tests','46 tests'),('36 pass','46 pass'),('passes 36','passes 46'),('261 generated pages','2,121 generated pages'),('261 pages','2,121 pages'),('43 generated pages','47 generated pages'),('~4.1MB','~4.2MB'),('4.1MB/3.9MB','4.2MB/3.9MB'),('40 files','44 files')]:text=text.replace(old,new)
 command='node --test scripts/module00-authoring.test.mjs'
 if 'node --test scripts/module00-screen-states.test.mjs' not in text:text=text.replace(command,'node --test scripts/module00-screen-states.test.mjs scripts/module00-authoring.test.mjs')
 write(name,text)

append('MODULE-00-COMPLETION.md','## Per-screen state/native parity continuation','11 November 2026: all 180 screens have state contracts with 1,678 applicable views and 122 explicit N/A decisions. All 138 native-eligible detail routes use the shared recovery/clearing rules. Dedicated native task views and shared practice/consent logic replace prior summaries. 46 tests pass. See STATE-COVERAGE.md and state-artifact-results.json. Manual browser/device acceptance remains unrun; Module 01 has not started.')
append('VALIDATION.md','## Per-screen state QA',"""
Additional command: python scripts/module00-state-artifacts.py checks the generated 1,678 variants for task-specific recovery headings, selected state, labels, unique IDs, one effective page heading/main and retained-vs-cleared task markup. It strips runtime script blocks and ignores only the explicitly hidden task wrapper for heading checks; this is not browser-computed visibility. Retention/remount behavior is exercised by pure reducer tests, not a hydrated interaction test.

Focused final command: python scripts/module00-locked-controls.py verifies all 360 restricted/expired variants disable ordinary state choices until explicit recovery. The native reviewer controls default to collapsed and expose expanded accessibility state, keeping task content near the top of the screen.

node --test scripts/module00-screen-states.test.mjs scripts/module00-authoring.test.mjs scripts/module00-contracts.test.mjs scripts/module00-state.test.mjs: 46 pass. Retained evidence: screen-state-contracts.json, native-screen-plans.json, state-artifact-results.json, unit-test-results.txt, preview/production-default checks, canonical a11y-source-results.json and motion-source-results.json.

Default build generates 47 pages and denies real state fixtures. Preview builds 2,121 pages (including Next partial shells), with 1,678 actual state variants. Native exports ~4.2MB Android/~3.9MB iOS, 34 assets; Expo Doctor 20/20 and compatible SDK dependencies. No browser/device/runtime performance acceptance.
""")
append('MANUAL-TESTING.md','## Per-screen states and native parity acceptance',"""
1. Open /design-lab/states. For each ID, inspect every supported state and the stated N/A reasons. Ready pages must retain their actual task and relevant heading; read-only views must not acquire invented validation fields or mutation receipts.
2. Edit actual form/authoring/message data, then enter Loading/Empty/Error/Offline/Conflict. The task should be hidden and unfocusable, then return with the same local values on retry. Conflict discard must return a fresh fixture. Test with dialogs open/closed, keyboard focus and screen-reader announcements.
3. Enter Restricted/Expired or switch scoped context. Prior task fields must be removed, ordinary state selection must not bypass the lock, and explicit fictional recovery must start fresh. Verify child-specific filters, replies, notes and file references clear.
4. Native /screen?id=ID exposes the same contract for all 138 eligible screens. Check embedded player/catalog without nested scroll/safe-area shells, platform back, task-local keyboard behavior and cleared scope.
5. Inspect PAR-02/03/04/08/10 category differences, profile edit/review, tutor discovery/filter/interest, community replies, search/help exclusions, approval category/date/evidence validation, portfolio add/remove, specimen mismatch and evidence checklists.
6. Complete the same three practice questions on web/native, including previous/jump/review/clear. Switch native message channels with unposted drafts; they must remain separate and never indicate actual delivery.
7. Repeat at all ten browser widths and actual Android/iOS large text, screen readers, reduced motion, rotation, keyboard, safe areas and interrupted picker/gesture cases. Record exact ID/state, action and expected/actual results. These remain unrun manual acceptance tasks.
""")
append('MOBILE-INFORMATION-ARCHITECTURE.md','## Per-screen state and task parity update','All 138 eligible detail routes use NativeScreenStateBoundary and embedded Screen content. NativeParity adds guardian categories, profile/discovery/discussion/search/help/consent/portfolio/credentials/overview/evidence tasks; threaded messages retain per-channel drafts, and practice uses the shared three-question fixture. native-screen-plans.json distinguishes dedicated and shared field/register/editorial paths. No device acceptance or blanket parity claim.')
append('WEB-INFORMATION-ARCHITECTURE.md','## Per-screen state routes','Added /design-lab/states and /design-lab/states/[id]/[view], gated before rendering. Canonical home/course previews use embedded content under the state boundary; original public routes remain standalone. Per-screen applicable states render actual task controls; read-only N/A decisions are explicit. Scoped restriction/expiry clear the child task, while temporary recovery preserves it.')
append('ACCESSIBILITY-QA.md','## State variant source checks','Canonical 220 artifacts and the generated state variants are audited separately. Hidden task markup is excluded from state-heading counts, but IDs and labels are still checked. These assertions do not establish browser hydration, actual focus containment/restoration, portal hiding, screen-reader behavior or CSS-computed visibility.')
append('COMPONENT-INVENTORY.md','## State and native task additions','ScreenStateBoundary / NativeScreenStateBoundary; embedded public/native screen modes; ConsentWorkbench with shared native validator; NativeParity task views; native full practice and threaded messages; state matrix and review routes. No new application dependency added.')
append('MOTION-SYSTEM.md','## 11 November source audit','Animate UI read-only audit covers 44 files with unreadable=[]; source motion facts remain limited to the existing finite global CSS effects. State skeletons are static and recovery controls use the existing animated button primitives. No frame timing or browser motion review.')

# Preserve states/plans in the machine-readable ledger and register.
progress=json.loads((docs/'progress.json').read_text(encoding='utf-8'))
progress['state_contracts']={'screens':180,'applicable':count,'not_applicable':na,'native_screens':138,'manual_acceptance':'pending'}
(docs/'progress.json').write_text(json.dumps(progress,indent=2),encoding='utf-8')
registry=json.loads((docs/'screen-register.json').read_text(encoding='utf-8'))
by_id={c['id']:c for c in contracts};by_plan={p['id']:p for p in plans}
for row in registry:
 row['state_contract']={'applicable':list(by_id[row['id']]['states']),'not_applicable':by_id[row['id']]['notApplicable'],'evidence':'screen-state-contracts.json; state-artifact-results.json'}
 row['native_plan']=by_plan[row['id']]['plan']
(docs/'screen-register.json').write_text(json.dumps(registry,indent=2),encoding='utf-8')
print('11 November state/native reports updated; manual acceptance stays open.')

# Keep current totals consistent after capability-applicability refinements.
for path in docs.glob('*.md'):
 text=path.read_text(encoding='utf-8')
 text=text.replace('1,678','1,620').replace('1,664','1,620').replace('122 explicit','180 explicit').replace('136 explicit','180 explicit').replace('2,121','2,063').replace('2,107','2,063').replace('360 restricted','316 restricted')
 path.write_text(text,encoding='utf-8')

import runpy
closure=root/'scripts/module00-closure-report.py'
if closure.exists():runpy.run_path(str(closure))
