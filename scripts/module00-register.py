"""Build traceability from the supplied PDF text. Never infer completed coverage."""
import json, re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
text = (root / 'docs/module-00/blueprint-extracted.txt').read_text(encoding='utf-8')
section = text[text.index('9.1 PUB screen inventory'):text.index('10. Critical screen-level design and field contracts', text.index('9.1 PUB screen inventory'))]
# Names verified against blueprint pages 29-36. Explicit separators avoid PDF column artifacts.
groups = {
'PUB': 'Home|About|Mission and Vision|Trust and Safety|Explore Network|Discover People|Discover Teachers|Educator Public Profile|Explore Courses|Course Detail|Discover Institutions|Institution Public Profile|Explore Communities|Community Preview|Events|Opportunities|Pricing|Become Educator|Register Institution|Resources and Help|Contact and Support|Legal and Privacy',
'AUTH': 'Sign In|Register Account|Contact Verification|Choose Purpose|Age and Consent|Guardian Approval|Learner Onboarding|Educator Onboarding|Tutor Onboarding|Guardian Onboarding|Institution Application|Forgot Password|Reset Credentials|Session Management|Account Restricted|Workspace Picker',
'APP': 'Unified Home|Global Search|Notifications|Inbox|Conversation|Compose Post|Post Detail|My Network|People Search|Community Discovery|Community Detail|Course Catalog|Course Detail|Event Detail|Saved Items|Profile Viewer|Account Settings|Privacy Center|Help and Report',
'STU': 'Student Overview|Academic Profile|Portfolio|Connections|Student Feed|Create Learning Post|My Communities|Student Course Search|Enrolled Courses|Learning Player|Course Progress|Assignments|Submit Assignment|Assessment Attempt|Grades and Feedback|Certificates|My Classrooms|Class Schedule|Attendance View|School Announcements|Find Tutors|Tutor Booking|Events and Opportunities|Student Settings',
'EDU': 'Educator Overview|Professional Profile|Educator Feed|Teaching Network|My Courses|Create Course|Curriculum Editor|Resource Library|Course Publish Review|Course Enrollments|Institution Classes|Class Roster|Class Announcements|Assignment Builder|Submissions Inbox|Grade and Feedback|Assessment Builder|Live Class Scheduler|Live Class Host|Attendance Register|Timetable|Teaching Analytics|Educator Settings',
'PAR': 'Guardian Overview|Child Selector|Child Academic Summary|Child Attendance|Child Timetable|Child Assignments|Child Grades|Child Course Progress|Child Fees|School Announcements|Teacher Communication|Guardian Approvals|Child Link Request|Family Notification Settings|Guardian Account Settings',
'INS': 'Institution Overview|Public Institution Profile|Verification Status|Institution Settings|Institution Users and Roles|Staff Directory|Staff Assignments|Student Directory|Student Record Detail|Guardian Links|Admissions Cycles|Application Inbox|Admission Detail|Academic Years and Terms|Departments and Programs|Classes and Sections|Subjects and Teaching|Timetable Builder|Timetable Publisher|Attendance Management|Examinations|Marks and Results|Fees and Billing|Payment Reconciliation|Institution Announcements|Institution Communities|Library Transport Hostel|Staff Leave|Reports and Exports|Institution Audit and Support',
'PRO': 'Professional Dashboard|Tutor Public Profile|Service Editor|Availability Calendar|Booking Requests|Booking Detail|Live Tutoring Session|Learner Messages|Earnings|Payouts and Tax|Professional Analytics',
'ADM': 'Platform Overview|User Management|Institution Verification|Educator Verification|Course Moderation|Content Reports|Moderation Case|Safeguarding Cases|Appeals|Communities Oversight|Orders and Transactions|Refunds and Payouts|Subscriptions and Plans|Support Inbox|Support Case|Security Events|Permissions and Roles|Platform Metrics|Audit Log Explorer|Configuration and Release',
}
rows=[]
for group, names in groups.items():
    for i,name in enumerate(names.split('|'),1):
        sid=f'{group}-{i:02}'
        assert sid in section, sid
        rows.append(dict(id=sid,name=name,status='pending',route=None))
assert len(rows)==180
progress_path=root/'docs/module-00/progress.json'
progress=json.loads(progress_path.read_text(encoding='utf-8')) if progress_path.exists() else {'screens':[], 'workflows':{}}
updates={entry[0]:entry for entry in progress['screens']}
for row in rows:
    update=updates.get(row['id'])
    row.update(role=row['id'].split('-')[0], desktop_layout=update[2] if update else 'Pending design',
        mobile_web='Responsive CSS authored; viewport QA not run' if update else 'Pending',
        native='Partial native foundation; see MOBILE-INFORMATION-ARCHITECTURE.md' if row['id'] in {'APP-01','APP-04','APP-09','STU-01','STU-09','STU-10','PAR-01','PAR-02','INS-20','PRO-04','PRO-06'} else 'Not implemented',
        components=update[2] if update else 'Pending component contract',
        interactions=update[3] if update else 'Not implemented',
        data_source='Typed fixture / in-memory preview' if update else 'None',
        accessibility='Semantics authored; interaction and assistive technology QA pending',
        visual_qa='Not run: browser origin approval declined',
        dependency='Design acceptance, full screen-state contract, approved policies; future backend authorization')
    if update:row.update(status='partial prototype',route=update[1])
(root/'docs/module-00/screen-register.json').write_text(json.dumps(rows,indent=2),encoding='utf-8')
header='# Screen coverage\n\nSource: EPB v1.1, pages 29-36. All entries are proposed, not approved. No screen has passed all Module 00 quality gates. Partial prototypes are meaningful authored views, not completed screens. Pending entries have no implemented route. Hashes identify real controls/views, not separate pages. See screen-register.json for every row’s role, layout, mobile/native availability, components, interactions, fixture, accessibility, visual QA, and dependencies.\n\n'
header+='| Family | Fully complete | Partial prototype mappings | Pending |\n|---|---:|---:|---:|\n'
for group in groups:
    subset=[r for r in rows if r['role']==group];partial=sum(r['status']=='partial prototype' for r in subset)
    header+=f'| {group} | 0 | {partial} | {len(subset)-partial} |\n'
header+='\nAll 180 IDs remain incomplete against the full quality gate. Each of the following rows is an explicit unfinished-work entry.\n\n| ID | Source name | Route / view | UI status | Interaction / remaining scope |\n|---|---|---|---|---|\n'
(root/'docs/module-00/SCREEN-COVERAGE.md').write_text(header+'\n'.join(f'| {r["id"]} | {r["name"]} | {r["route"] or "Pending design"} | {r["status"]} | {r["interactions"]} |' for r in rows),encoding='utf-8')
work=text[text.index('W01 Learner identity registration'):text.index('7.01 Learner identity registration')]
workflows=re.findall(r'^(W\d{2}) (.*)',work,re.M)
assert len(workflows)==40
(root/'docs/module-00/WORKFLOW-COVERAGE.md').write_text('# Workflow coverage\n\nSource: EPB v1.1, pages 19-27. 40 source workflows registered; no complete end-to-end frontend acceptance claimed. Backend workflows are outside Module 00. Paths below are partial local prototypes; sensitive transitions remain unavailable.\n\n| ID | Source register entry | Frontend status |\n|---|---|---|\n'+'\n'.join(f'| {sid} | {name} | {progress["workflows"].get(sid,"Pending frontend design and implementation")} |' for sid,name in workflows),encoding='utf-8')
print('Registered 180 screens and 40 workflows')
if (root/'packages/contracts/frontend-screens.json').exists():
    import subprocess,sys
    subprocess.run([sys.executable,str(root/'scripts/module00-reconcile.py')],check=True)
