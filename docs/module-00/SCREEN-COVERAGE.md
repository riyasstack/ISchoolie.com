# Module 00 V3 screen coverage

All 180 IDs are accounted for. Foundation rollout is not visual acceptance. No V3 screen is reported fully accepted while browser/device review is blocked. Historical Module 00 acceptance remains in module-acceptance.json.

| Group | IDs | Entries | V3 visually accepted |
| --- | --- | ---: | ---: |
| PUB | PUB-01 to PUB-22 | 22 | 0 |
| AUTH | AUTH-01 to AUTH-16 | 16 | 0 |
| APP | APP-01 to APP-19 | 19 | 0 |
| STU | STU-01 to STU-24 | 24 | 0 |
| EDU | EDU-01 to EDU-23 | 23 | 0 |
| PAR | PAR-01 to PAR-15 | 15 | 0 |
| INS | INS-01 to INS-30 | 30 | 0 |
| PRO | PRO-01 to PRO-11 | 11 | 0 |
| ADM | ADM-01 to ADM-20 | 20 | 0 |

Full machine-readable fields: [screen-coverage-v3.json](screen-coverage-v3.json). Canonical fixture routes stay gated in production. Live account routes /auth/sign-in, /auth/register, /auth/verify, /auth/recover, /auth/reset, /auth/activate, /auth/sessions and /auth/privileged use the preserved Module 01 implementation. They do not turn the 16 AUTH preview contracts into live business workflows.

| ID | Screen | Route | Layout | V3 implementation | Visual/accessibility |
| --- | --- | --- | --- | --- | --- |
| PUB-01 | Home | /preview/PUB-01 | home | Recomposed V3 prototype | Visual blocked; runtime a11y pending |
| PUB-02 | About | /preview/PUB-02 | about | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-03 | Mission and Vision | /preview/PUB-03 | mission | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-04 | Trust and Safety | /preview/PUB-04 | trust | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-05 | Explore Network | /preview/PUB-05 | feed | Recomposed V3 prototype | Visual blocked; runtime a11y pending |
| PUB-06 | Discover People | /preview/PUB-06 | directory | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-07 | Discover Teachers | /preview/PUB-07 | directory | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-08 | Educator Public Profile | /preview/PUB-08 | profile | Recomposed V3 prototype | Visual blocked; runtime a11y pending |
| PUB-09 | Explore Courses | /preview/PUB-09 | catalog | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-10 | Course Detail | /preview/PUB-10 | course | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-11 | Discover Institutions | /preview/PUB-11 | directory | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-12 | Institution Public Profile | /preview/PUB-12 | profile | Recomposed V3 prototype | Visual blocked; runtime a11y pending |
| PUB-13 | Explore Communities | /preview/PUB-13 | communities | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-14 | Community Preview | /preview/PUB-14 | discussion | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-15 | Events | /preview/PUB-15 | events | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-16 | Opportunities | /preview/PUB-16 | opportunities | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-17 | Pricing | /preview/PUB-17 | pricing | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-18 | Become Educator | /preview/PUB-18 | form | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-19 | Register Institution | /preview/PUB-19 | form | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-20 | Resources and Help | /preview/PUB-20 | help | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-21 | Contact and Support | /preview/PUB-21 | support | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PUB-22 | Legal and Privacy | /preview/PUB-22 | policy | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| AUTH-01 | Sign In | /preview/AUTH-01 | identity | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| AUTH-02 | Register Account | /preview/AUTH-02 | identity | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| AUTH-03 | Contact Verification | /preview/AUTH-03 | identity | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| AUTH-04 | Choose Purpose | /preview/AUTH-04 | identity | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| AUTH-05 | Age and Consent | /preview/AUTH-05 | identity | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| AUTH-06 | Guardian Approval | /preview/AUTH-06 | identity | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| AUTH-07 | Learner Onboarding | /preview/AUTH-07 | identity | Recomposed V3 prototype | Visual blocked; runtime a11y pending |
| AUTH-08 | Educator Onboarding | /preview/AUTH-08 | identity | Recomposed V3 prototype | Visual blocked; runtime a11y pending |
| AUTH-09 | Tutor Onboarding | /preview/AUTH-09 | identity | Recomposed V3 prototype | Visual blocked; runtime a11y pending |
| AUTH-10 | Guardian Onboarding | /preview/AUTH-10 | identity | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| AUTH-11 | Institution Application | /preview/AUTH-11 | identity | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| AUTH-12 | Forgot Password | /preview/AUTH-12 | identity | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| AUTH-13 | Reset Credentials | /preview/AUTH-13 | identity | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| AUTH-14 | Session Management | /preview/AUTH-14 | identity | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| AUTH-15 | Account Restricted | /preview/AUTH-15 | identity | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| AUTH-16 | Workspace Picker | /preview/AUTH-16 | identity | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| APP-01 | Unified Home | /preview/APP-01 | feed | Recomposed V3 prototype | Visual blocked; runtime a11y pending |
| APP-02 | Global Search | /preview/APP-02 | search | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| APP-03 | Notifications | /preview/APP-03 | notifications | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| APP-04 | Inbox | /preview/APP-04 | messages | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| APP-05 | Conversation | /preview/APP-05 | messages | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| APP-06 | Compose Post | /preview/APP-06 | feed | Recomposed V3 prototype | Visual blocked; runtime a11y pending |
| APP-07 | Post Detail | /preview/APP-07 | feed | Recomposed V3 prototype | Visual blocked; runtime a11y pending |
| APP-08 | My Network | /preview/APP-08 | connections | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| APP-09 | People Search | /preview/APP-09 | network | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| APP-10 | Community Discovery | /preview/APP-10 | communities | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| APP-11 | Community Detail | /preview/APP-11 | discussion | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| APP-12 | Course Catalog | /preview/APP-12 | catalog | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| APP-13 | Course Detail | /preview/APP-13 | course | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| APP-14 | Event Detail | /preview/APP-14 | event-detail | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| APP-15 | Saved Items | /preview/APP-15 | saved | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| APP-16 | Profile Viewer | /preview/APP-16 | profile | Recomposed V3 prototype | Visual blocked; runtime a11y pending |
| APP-17 | Account Settings | /preview/APP-17 | settings | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| APP-18 | Privacy Center | /preview/APP-18 | privacy | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| APP-19 | Help and Report | /preview/APP-19 | support | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-01 | Student Overview | /preview/STU-01 | overview | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-02 | Academic Profile | /preview/STU-02 | form | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-03 | Portfolio | /preview/STU-03 | portfolio | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-04 | Connections | /preview/STU-04 | connections | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-05 | Student Feed | /preview/STU-05 | student-feed | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-06 | Create Learning Post | /preview/STU-06 | form | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-07 | My Communities | /preview/STU-07 | communities | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-08 | Student Course Search | /preview/STU-08 | catalog | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-09 | Enrolled Courses | /preview/STU-09 | my-learning | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-10 | Learning Player | /preview/STU-10 | player | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-11 | Course Progress | /preview/STU-11 | player | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-12 | Assignments | /preview/STU-12 | assignments | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-13 | Submit Assignment | /preview/STU-13 | submission | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-14 | Assessment Attempt | /preview/STU-14 | assessment | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-15 | Grades and Feedback | /preview/STU-15 | results | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-16 | Certificates | /preview/STU-16 | credentials | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-17 | My Classrooms | /preview/STU-17 | classes | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-18 | Class Schedule | /preview/STU-18 | timetable | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-19 | Attendance View | /preview/STU-19 | attendance-summary | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-20 | School Announcements | /preview/STU-20 | announcements | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-21 | Find Tutors | /preview/STU-21 | directory | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-22 | Tutor Booking | /preview/STU-22 | booking | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-23 | Events and Opportunities | /preview/STU-23 | opportunities | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| STU-24 | Student Settings | /preview/STU-24 | preferences | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-01 | Educator Overview | /preview/EDU-01 | overview | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-02 | Professional Profile | /preview/EDU-02 | profile | Recomposed V3 prototype | Visual blocked; runtime a11y pending |
| EDU-03 | Educator Feed | /preview/EDU-03 | feed | Recomposed V3 prototype | Visual blocked; runtime a11y pending |
| EDU-04 | Teaching Network | /preview/EDU-04 | connections | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-05 | My Courses | /preview/EDU-05 | course-manager | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-06 | Create Course | /preview/EDU-06 | form | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-07 | Curriculum Editor | /preview/EDU-07 | editor | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-08 | Resource Library | /preview/EDU-08 | resources | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-09 | Course Publish Review | /preview/EDU-09 | publication | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-10 | Course Enrollments | /preview/EDU-10 | records | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-11 | Institution Classes | /preview/EDU-11 | classes | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-12 | Class Roster | /preview/EDU-12 | roster | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-13 | Class Announcements | /preview/EDU-13 | form | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-14 | Assignment Builder | /preview/EDU-14 | assignment-builder | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-15 | Submissions Inbox | /preview/EDU-15 | submissions | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-16 | Grade and Feedback | /preview/EDU-16 | grading | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-17 | Assessment Builder | /preview/EDU-17 | assessment-builder | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-18 | Live Class Scheduler | /preview/EDU-18 | scheduler | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-19 | Live Class Host | /preview/EDU-19 | live | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-20 | Attendance Register | /preview/EDU-20 | attendance | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-21 | Timetable | /preview/EDU-21 | timetable | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-22 | Teaching Analytics | /preview/EDU-22 | report | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| EDU-23 | Educator Settings | /preview/EDU-23 | preferences | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PAR-01 | Guardian Overview | /preview/PAR-01 | guardian | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PAR-02 | Child Selector | /preview/PAR-02 | guardian | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PAR-03 | Child Academic Summary | /preview/PAR-03 | guardian | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PAR-04 | Child Attendance | /preview/PAR-04 | guardian | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PAR-05 | Child Timetable | /preview/PAR-05 | timetable | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PAR-06 | Child Assignments | /preview/PAR-06 | assignments | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PAR-07 | Child Grades | /preview/PAR-07 | results | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PAR-08 | Child Course Progress | /preview/PAR-08 | guardian | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PAR-09 | Child Fees | /preview/PAR-09 | finance | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PAR-10 | School Announcements | /preview/PAR-10 | guardian | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PAR-11 | Teacher Communication | /preview/PAR-11 | messages | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PAR-12 | Guardian Approvals | /preview/PAR-12 | consent | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PAR-13 | Child Link Request | /preview/PAR-13 | form | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PAR-14 | Family Notification Settings | /preview/PAR-14 | preferences | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PAR-15 | Guardian Account Settings | /preview/PAR-15 | preferences | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-01 | Institution Overview | /preview/INS-01 | overview | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-02 | Public Institution Profile | /preview/INS-02 | profile | Recomposed V3 prototype | Visual blocked; runtime a11y pending |
| INS-03 | Verification Status | /preview/INS-03 | verification | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-04 | Institution Settings | /preview/INS-04 | form | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-05 | Institution Users and Roles | /preview/INS-05 | permissions | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-06 | Staff Directory | /preview/INS-06 | records | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-07 | Staff Assignments | /preview/INS-07 | form | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-08 | Student Directory | /preview/INS-08 | roster | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-09 | Student Record Detail | /preview/INS-09 | roster | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-10 | Guardian Links | /preview/INS-10 | review | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-11 | Admissions Cycles | /preview/INS-11 | form | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-12 | Application Inbox | /preview/INS-12 | admissions | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-13 | Admission Detail | /preview/INS-13 | review | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-14 | Academic Years and Terms | /preview/INS-14 | structure | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-15 | Departments and Programs | /preview/INS-15 | structure | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-16 | Classes and Sections | /preview/INS-16 | classes | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-17 | Subjects and Teaching | /preview/INS-17 | structure | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-18 | Timetable Builder | /preview/INS-18 | timetable-builder | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-19 | Timetable Publisher | /preview/INS-19 | publication | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-20 | Attendance Management | /preview/INS-20 | attendance | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-21 | Examinations | /preview/INS-21 | form | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-22 | Marks and Results | /preview/INS-22 | marks | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-23 | Fees and Billing | /preview/INS-23 | finance | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-24 | Payment Reconciliation | /preview/INS-24 | reconciliation | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-25 | Institution Announcements | /preview/INS-25 | form | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-26 | Institution Communities | /preview/INS-26 | communities | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-27 | Library Transport Hostel | /preview/INS-27 | campus | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-28 | Staff Leave | /preview/INS-28 | leave | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-29 | Reports and Exports | /preview/INS-29 | report | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| INS-30 | Institution Audit and Support | /preview/INS-30 | audit | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PRO-01 | Professional Dashboard | /preview/PRO-01 | overview | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PRO-02 | Tutor Public Profile | /preview/PRO-02 | booking | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PRO-03 | Service Editor | /preview/PRO-03 | form | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PRO-04 | Availability Calendar | /preview/PRO-04 | booking | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PRO-05 | Booking Requests | /preview/PRO-05 | bookings | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PRO-06 | Booking Detail | /preview/PRO-06 | booking | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PRO-07 | Live Tutoring Session | /preview/PRO-07 | live | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PRO-08 | Learner Messages | /preview/PRO-08 | messages | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PRO-09 | Earnings | /preview/PRO-09 | earnings | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PRO-10 | Payouts and Tax | /preview/PRO-10 | payout | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| PRO-11 | Professional Analytics | /preview/PRO-11 | report | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-01 | Platform Overview | /preview/ADM-01 | overview | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-02 | User Management | /preview/ADM-02 | records | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-03 | Institution Verification | /preview/ADM-03 | verification | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-04 | Educator Verification | /preview/ADM-04 | verification | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-05 | Course Moderation | /preview/ADM-05 | review | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-06 | Content Reports | /preview/ADM-06 | cases | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-07 | Moderation Case | /preview/ADM-07 | review | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-08 | Safeguarding Cases | /preview/ADM-08 | safeguarding | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-09 | Appeals | /preview/ADM-09 | review | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-10 | Communities Oversight | /preview/ADM-10 | records | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-11 | Orders and Transactions | /preview/ADM-11 | reconciliation | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-12 | Refunds and Payouts | /preview/ADM-12 | payout | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-13 | Subscriptions and Plans | /preview/ADM-13 | pricing | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-14 | Support Inbox | /preview/ADM-14 | cases | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-15 | Support Case | /preview/ADM-15 | support | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-16 | Security Events | /preview/ADM-16 | audit | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-17 | Permissions and Roles | /preview/ADM-17 | permissions | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-18 | Platform Metrics | /preview/ADM-18 | report | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-19 | Audit Log Explorer | /preview/ADM-19 | audit | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
| ADM-20 | Configuration and Release | /preview/ADM-20 | release | V3 foundation applied; detailed visual review incomplete | Visual blocked; runtime a11y pending |
