"""Reconcile authored contracts without claiming visual/device acceptance."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1];base=root/'docs/module-00'
screens=json.loads((root/'packages/contracts/frontend-screens.json').read_text(encoding='utf-8'))
flows=json.loads((root/'packages/contracts/frontend-workflows.json').read_text(encoding='utf-8'))
existing=json.loads((base/'screen-register.json').read_text(encoding='utf-8'));source={r['id']:r for r in existing}
progress=json.loads((base/'progress.json').read_text(encoding='utf-8'))
history=base/'first-pass-progress.json'
if not history.exists():history.write_text(json.dumps(progress,indent=2),encoding='utf-8')
assert len(screens)==180 and set(source)=={s['id'] for s in screens}
assert len(flows)==40
prototype_rows=[];progress['screens']=[]
native_special={'player','catalog','my-learning','booking','guardian','attendance','assessment','messages','timetable','timetable-builder','scheduler','credentials','live'}
for s in screens:
 row=source[s['id']]
 row.update(status='authored prototype',route=s['route'],role=s['family'],desktop_layout=s['kind'],
  mobile_web='Responsive task layout authored; browser/viewport QA blocked by saved policy',
  native=('Native task surface / summary at /screen?id='+s['id']+'; device QA pending') if s['native'] else 'Web-only by design',
  components='Domain task renderer, shared fields/records/dialogs, existing design system',
  interactions=('Search/filter/sort/detail/selection/example export; ' if s['rows'] else '')+('Validated local draft and review; ' if s['fields'] else '')+'related-screen navigation; domain-specific task interactions; preview state recovery',
  data_source='Central typed synthetic fixture contract; local memory only',
  accessibility='Source semantics, labels, error messages, focus-return wiring; assistive technology and keyboard walkthrough pending',
  visual_qa='Blocked: saved browser permission/managed policy denied explicitly approved retry',
  dependency='Manual visual/device acceptance, detailed state review, approved domain policies, future backend integration')
 advanced={
  'editor':'Module/lesson/block editing; safe inline formatting; stable order/remove; learner preview; snapshots/offline/conflict recovery',
  'resources':'Real local file selection; bounded text/image preview; size/type/cap/deduplication; remove and readiness',
  'assignment-builder':'Assignment instructions/due date; ordered rubric/guidance/points; learner preview and readiness',
  'assessment-builder':'Choice/written authoring; option validation/answer key/points/guidance; practice preview',
  'grading':'Two-criterion rubric draft; zero/missing/bounds validation; useful feedback; local total',
  'admissions':'Evidence/note-gated intake, request and recommendation draft stages',
  'marks':'Bounded draft marks, moderation and release-review stages',
  'reconciliation':'Reference/amount comparison; match or escalation draft; stage notes/history',
  'bookings':'Proposed time/decline/cancellation draft stages with evidence and history',
  'publication':'Readiness/audience/rights and publication-response draft stages',
 }
 if s['kind'] in advanced:row['interactions']=advanced[s['kind']]+'; context reset; manual acceptance pending'
 if s['id']=='PRO-04':row['interactions']='Recurring weekly windows; excluded dates; overlap validation; 30-minute example fit'
 if s['id']=='INS-23':row['interactions']='Unposted charge draft; exact integer minor units; native removal; illustrative totals'
 prototype_rows.append(row);progress['screens'].append([s['id'],s['route'],s['kind'],row['interactions']])
progress['workflows']={w['id']:w['route']+': '+' -> '.join(step['screenId'] for step in w['steps'])+'; validated local draft/back/retry/review; no official outcome' for w in flows}
progress['status']='Authored frontend prototypes; acceptance incomplete'
progress['browser_qa']='Explicit retry approved by user; saved policy still blocked origin'
native_ids={s['id'] for s in screens if s['native']}
progress['native_workflow_paths']=[w['id'] for w in flows if all(step['screenId'] in native_ids for step in w['steps'])]
progress['advanced_authoring']='Shared web/native curriculum, resource, assessment, assignment, rubric, revision, availability and case draft models; manual acceptance pending'
(base/'progress.json').write_text(json.dumps(progress,indent=2),encoding='utf-8')
(base/'screen-register.json').write_text(json.dumps(prototype_rows,indent=2),encoding='utf-8')
header='# Screen coverage\n\nContinuation status: 180 authored web prototype mappings; 0 accepted screens. No unmapped IDs remain. Authored does not mean complete: visual, interaction, native-device, full state-contract, policy, and manual acceptance remain open. Existing first-pass routes are preserved; /preview/ID provides a stable design-review endpoint. Shared task layouts are purposeful domain patterns, not separate dashboard copies.\n\n'
header+='| Family | Authored prototype mappings | Accepted | Source total |\n|---|---:|---:|---:|\n'
for family in ['PUB','AUTH','APP','STU','EDU','PAR','INS','PRO','ADM']:
 count=sum(s['family']==family for s in screens);header+=f'| {family} | {count} | 0 | {count} |\n'
header+='\nAll 180 entries remain subject to acceptance. Native availability, interactions, data boundary, accessibility, visual QA, and dependencies for each row are in screen-register.json. Some native endpoints provide deliberately limited task summaries, not desktop parity.\n\n| ID | Source screen | Route | Task layout | UI status |\n|---|---|---|---|---|\n'
header+='\n'.join(f'| {s["id"]} | {source[s["id"]]["name"]} | {s["route"]} | {s["kind"]} | Authored prototype; acceptance pending |' for s in screens)
(base/'SCREEN-COVERAGE.md').write_text(header,encoding='utf-8')
wf='# Workflow coverage\n\n40 stateful web walkthroughs authored; 30 native-eligible paths at /workflow?id=Wxx (native /workflow-library). Public marketing/platform operations stay web-only. No backend transaction or official identity, consent, publication, academic, financial, or safeguarding outcome is implemented or simulated as genuine. Pure state transition tests pass; browser click-through and device acceptance remain unverified.\n\n| ID | Workflow | Route | Screen path | Acceptance |\n|---|---|---|---|---|\n'
wf+='\n'.join(f'| {w["id"]} | {w["name"]} | {w["route"]} | '+ ' → '.join(st['screenId'] for st in w['steps'])+' | Local prototype authored; browser/device acceptance pending |' for w in flows)
(base/'WORKFLOW-COVERAGE.md').write_text(wf,encoding='utf-8')
print('Reconciled 180 authored screen mappings and 40 local paths; accepted count remains zero.')
