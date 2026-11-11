"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowDownUp,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  FileText,
  GraduationCap,
  LockKeyhole,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PageHeading } from "./app-shell";
import {
  ActionLink,
  Avatar,
  Badge,
  Button,
  Empty,
  Meter,
  Modal,
  useNotice,
} from "./ui";
import { roster, courses } from "@/lib/preview";

export function EducatorOverview() {
  return (
    <>
      <PageHeading
        eyebrow="EDUCATOR WORKSPACE"
        title="Good teaching starts with you."
        description="A focused home for your courses, classes, and next ideas."
        action={
          <ActionLink href="/app/educator/editor">
            Open course studio
          </ActionLink>
        }
      />
      <div className="stats-grid">
        {[
          {
            label: "Example course drafts",
            value: "2",
            note: "Ready for your next idea",
          },
          {
            label: "Example lessons",
            value: "4",
            note: "In your course studio",
          },
          { label: "Publishing", value: "Review", note: "No course is live" },
        ].map((s) => (
          <div className="stat-card panel" key={s.label}>
            <small>{s.label}</small>
            <strong>{s.value}</strong>
            <p>{s.note}</p>
          </div>
        ))}
      </div>
      <div className="two-column">
        <section className="panel">
          <div className="row between">
            <h3>Your course studio</h3>
            <Badge>Drafts</Badge>
          </div>
          {courses.slice(0, 2).map((c, i) => (
            <Link className="list-item" href="/app/educator/editor" key={c.id}>
              <span className={`square-icon ${c.color}`}>{i ? "◌" : "Aa"}</span>
              <div>
                <strong>{c.title}</strong>
                <small>Curriculum draft · {i + 2} example lessons</small>
              </div>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </section>
        <section className="panel">
          <h3>Keep the classroom connected.</h3>
          <p className="space-top">
            Prepare thoughtful learning experiences and review your example
            class register.
          </p>
          <div className="quick-links">
            <Link href="/app/educator/editor">
              <FileText size={18} />
              Plan a lesson
              <ChevronRight size={17} />
            </Link>
            <Link href="/org/example/attendance">
              <Users size={18} />
              Preview attendance
              <ChevronRight size={17} />
            </Link>
            <Link href="/app/communities">
              <GraduationCap size={18} />
              Find your teaching community
              <ChevronRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
const children = [
  {
    id: "child-a",
    name: "Aarav",
    initial: "Aarav Shah",
    class: "Grade 10 · Section A",
    attendance: 92,
    subject: "Visual thinking",
    lesson: "Looking beyond the obvious",
    permission: true,
  },
  {
    id: "child-b",
    name: "Diya",
    initial: "Diya Shah",
    class: "Grade 7 · Section B",
    attendance: 0,
    subject: "",
    lesson: "",
    permission: false,
  },
];
export function Guardian({
  initialTab = "Overview",
  selectorOnly = false,
  title = "Closer to their learning world.",
}: { initialTab?: string; selectorOnly?: boolean; title?: string } = {}) {
  const [childId, setChildId] = useState("child-a");
  const child = children.find((c) => c.id === childId)!;
  return (
    <>
      <PageHeading
        eyebrow="GUARDIAN WORKSPACE"
        title={title}
        description="A calm view of the information you’re authorized to see."
      />
      <div id="child-selector" className="child-switcher">
        {children.map((c, i) => (
          <Button
            key={c.id}
            className={`child-button secondary ${childId === c.id ? "selected" : ""}`}
            aria-pressed={childId === c.id}
            onClick={() => setChildId(c.id)}
          >
            <Avatar name={c.initial} color={i} />
            <span>
              {c.name}
              <small>{c.class}</small>
            </span>
            {childId === c.id && <Check size={17} />}
          </Button>
        ))}
      </div>
      <div id="academic-summary">
        {selectorOnly ? (
          <div className="panel">
            <h2>
              {child.name} ·{" "}
              {child.permission
                ? "Example category access"
                : "Awaiting authorization"}
            </h2>
            <p>
              Academic, attendance and school information have separate task
              views. No relationship is verified by this interface.
            </p>
          </div>
        ) : (
          <GuardianChild key={childId} child={child} initialTab={initialTab} />
        )}
      </div>
    </>
  );
}
function GuardianChild({
  child,
  initialTab = "Overview",
}: {
  child: (typeof children)[number];
  initialTab?: string;
}) {
  const [tab, setTab] = useState(initialTab);
  return (
    <div className="stack">
      <div className="callout">
        <ShieldCheck size={17} />
        <p>
          Example family data. No guardian relationship has been verified.
          Switching children resets the detail view.
        </p>
      </div>
      <div className="row between">
        <div>
          <h2>{child.name}’s learning world</h2>
          <p className="metadata">{child.class} · Example institution</p>
        </div>
        <Badge tone={child.permission ? "green" : "amber"}>
          {child.permission
            ? "Example linked context"
            : "Awaiting authorization"}
        </Badge>
      </div>
      {!child.permission ? (
        <Empty title="This view is awaiting authorization">
          Academic categories for {child.name} remain unavailable. Previous
          child details are cleared when you switch.
        </Empty>
      ) : (
        <>
          <div className="filter-row">
            {["Overview", "Attendance", "Learning", "School"].map((t) => (
              <Button
                key={t}
                id={t.toLowerCase()}
                className={`tab ${t === tab ? "selected" : ""}`}
                aria-pressed={t === tab}
                onClick={() => setTab(t)}
              >
                {t}
              </Button>
            ))}
          </div>
          <div className="two-column">
            {(tab === "Overview" || tab === "Attendance") && (
              <section className="panel guardian-attendance">
                <div className="row between">
                  <h3>Attendance at a glance</h3>
                  <CalendarDays size={20} />
                </div>
                <strong>
                  {child.attendance}
                  <span>%</span>
                </strong>
                <p>Example attendance summary · November 2026</p>
                <Meter
                  value={child.attendance}
                  label="Example child attendance 92 percent"
                />
                <div className="row between space-top">
                  <span>23 present · 2 absent</span>
                  <Badge>Read only</Badge>
                </div>
              </section>
            )}
            {(tab === "Overview" || tab === "Learning") && (
              <section className="panel">
                <Badge tone="green">LEARNING IN FOCUS</Badge>
                <h3 className="space-top">{child.subject}</h3>
                <p className="space-top">
                  Current example lesson: {child.lesson}.
                </p>
                <Meter value={42} label="Example child course progress" />
                <p className="metadata space-top">
                  Course progress shared for preview only
                </p>
              </section>
            )}
            {(tab === "Overview" || tab === "School") && (
              <section className="panel">
                <h3>From the school</h3>
                <div className="list-item">
                  <span className="square-icon sand">
                    <CalendarDays size={23} />
                  </span>
                  <div>
                    <strong>Family learning conversation</strong>
                    <small>Example notice · Date to be confirmed</small>
                  </div>
                </div>
                <p>
                  This sample announcement demonstrates an official school
                  communication layout.
                </p>
              </section>
            )}
            <section className="panel">
              <div className="row">
                <LockKeyhole size={19} />
                <h3>Clear privacy boundaries</h3>
              </div>
              <p className="space-top">
                Private messages and staff-only notes are not included. Fees and
                unpublished grades remain unavailable.
              </p>
              <Link href="/trust" className="rail-link">
                How family access works
                <ArrowRight size={16} />
              </Link>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
export function Institution({ view = "students" }: { view?: string }) {
  const recordFocus = useRef<HTMLButtonElement | null>(null);
  const [query, setQuery] = useState(""),
    [cohort, setCohort] = useState("All classes"),
    [sort, setSort] = useState(false),
    [selected, setSelected] = useState<string[]>([]),
    [dense, setDense] = useState(false),
    [record, setRecord] = useState<(typeof roster)[number] | null>(null),
    [attendance, setAttendance] = useState<Record<string, string>>({});
  const notice = useNotice();
  const rows = roster
    .filter(
      (r) =>
        (cohort === "All classes" || r.class === cohort) &&
        `${r.name} ${r.id}`.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name),
    );
  return (
    <>
      <PageHeading
        eyebrow="EXAMPLE INSTITUTION / ACADEMIC OPERATIONS"
        title={
          view === "attendance"
            ? "Attendance register."
            : view === "finance"
              ? "Finance, with a clear trail."
              : "Every learner, thoughtfully supported."
        }
        description={
          view === "attendance"
            ? "Prepare an example register. No official attendance can be finalized."
            : view === "finance"
              ? "A precise view of example charges. No payment or allocation actions are enabled."
              : "A focused directory for private academic records. All rows are fictional."
        }
        action={<Badge tone="amber">Unverified institution preview</Badge>}
      />
      <div className="institution-context">
        <span className="workspace-symbol">EC</span>
        <div>
          <strong>Example Learning Campus</strong>
          <small>Academic year 2026–27 · India Standard Time</small>
        </div>
        <Badge>Example tenant</Badge>
      </div>
      {view === "finance" ? (
        <Finance />
      ) : (
        <>
          <div className="stats-grid">
            {[
              {
                label: "Example records",
                value: roster.length,
                note: "Across two class sections",
              },
              {
                label: view === "attendance" ? "Draft marks" : "Active records",
                value:
                  view === "attendance" ? Object.keys(attendance).length : 4,
                note:
                  view === "attendance"
                    ? "Stored in this page only"
                    : "Example enrollment state",
              },
              {
                label: "Pending review",
                value: "1",
                note: "No approval actions enabled",
              },
            ].map((s) => (
              <div className="panel stat-card" key={s.label}>
                <small>{s.label}</small>
                <strong>{s.value}</strong>
                <p>{s.note}</p>
              </div>
            ))}
          </div>
          <section className="panel register-panel">
            <div className="row between">
              <div>
                <h3>
                  {view === "attendance"
                    ? "Class attendance"
                    : "Student directory"}
                </h3>
                <p className="metadata">
                  Authorized view concept · Example records only
                </p>
              </div>
              <Button
                className="secondary small"
                onClick={() => setDense(!dense)}
                aria-pressed={dense}
              >
                {dense ? "Comfortable view" : "Compact view"}
              </Button>
            </div>
            <div className="filter-row">
              <label className="search-field">
                <Search size={17} />
                <input
                  aria-label="Search student records"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name or record ID"
                />
              </label>
              <label className="sr-only" htmlFor="cohort">
                Filter class
              </label>
              <select
                id="cohort"
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
              >
                {["All classes", "10 A", "10 B"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <Button
                className="secondary small"
                onClick={() => setSort(!sort)}
              >
                <ArrowDownUp size={15} />
                {sort ? "Name Z–A" : "Name A–Z"}
              </Button>
            </div>
            {selected.length > 0 && (
              <div className="selection-bar">
                <strong>{selected.length} selected</strong>
                <Button
                  className="subtle small"
                  onClick={() => setSelected([])}
                >
                  Clear selection
                </Button>
                <span>Bulk mutations disabled in preview</span>
              </div>
            )}
            <div className={`table-wrap ${dense ? "dense" : ""}`}>
              <table>
                <caption className="sr-only">
                  Fictional student records in the example institution
                </caption>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        aria-label="Select all visible rows"
                        checked={
                          rows.length > 0 &&
                          rows.every((r) => selected.includes(r.id))
                        }
                        onChange={(e) =>
                          setSelected(
                            e.target.checked
                              ? [
                                  ...new Set([
                                    ...selected,
                                    ...rows.map((r) => r.id),
                                  ]),
                                ]
                              : selected.filter(
                                  (id) => !rows.some((r) => r.id === id),
                                ),
                          )
                        }
                      />
                    </th>
                    <th>Student</th>
                    <th>Record ID</th>
                    <th>Class</th>
                    <th>
                      {view === "attendance"
                        ? "Draft attendance"
                        : "Enrollment"}
                    </th>
                    <th>
                      <span className="sr-only">View record</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.id}>
                      <td>
                        <input
                          type="checkbox"
                          aria-label={`Select ${r.name}`}
                          checked={selected.includes(r.id)}
                          onChange={() =>
                            setSelected(
                              selected.includes(r.id)
                                ? selected.filter((id) => id !== r.id)
                                : [...selected, r.id],
                            )
                          }
                        />
                      </td>
                      <td>
                        <span className="row">
                          <Avatar name={r.name} color={i} />
                          <strong>{r.name}</strong>
                        </span>
                      </td>
                      <td>
                        <span className="mono">{r.id}</span>
                      </td>
                      <td>{r.class}</td>
                      <td>
                        {view === "attendance" ? (
                          <select
                            aria-label={`Attendance for ${r.name}`}
                            value={attendance[r.id] || ""}
                            onChange={(e) =>
                              setAttendance({
                                ...attendance,
                                [r.id]: e.target.value,
                              })
                            }
                          >
                            <option value="">Unmarked</option>
                            <option>Present</option>
                            <option>Absent</option>
                            <option>Late</option>
                          </select>
                        ) : (
                          <Badge
                            tone={r.status === "Active" ? "green" : "amber"}
                          >
                            {r.status}
                          </Badge>
                        )}
                      </td>
                      <td>
                        <Button
                          className="icon-button"
                          aria-label={`View ${r.name}`}
                          onClick={(event) => {
                            recordFocus.current = event.currentTarget;
                            setRecord(r);
                          }}
                        >
                          <ChevronRight size={17} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className="mobile-records"
              aria-label="Example student summaries"
            >
              {rows.map((r, i) => (
                <article key={r.id} className="mobile-record">
                  <div className="row">
                    <Avatar name={r.name} color={i} />
                    <div>
                      <strong>{r.name}</strong>
                      <small>
                        {r.id} · Class {r.class}
                      </small>
                    </div>
                    <Button
                      className="icon-button"
                      aria-label={`Open summary for ${r.name}`}
                      onClick={(event) => {
                        recordFocus.current = event.currentTarget;
                        setRecord(r);
                      }}
                    >
                      <ChevronRight size={18} />
                    </Button>
                  </div>
                  {view === "attendance" ? (
                    <label>
                      Draft attendance
                      <select
                        value={attendance[r.id] || ""}
                        onChange={(e) =>
                          setAttendance({
                            ...attendance,
                            [r.id]: e.target.value,
                          })
                        }
                      >
                        <option value="">Unmarked</option>
                        <option>Present</option>
                        <option>Absent</option>
                        <option>Late</option>
                      </select>
                    </label>
                  ) : (
                    <Badge tone={r.status === "Active" ? "green" : "amber"}>
                      {r.status}
                    </Badge>
                  )}
                </article>
              ))}
            </div>
            {!rows.length && (
              <Empty title="No matching records">
                Adjust your search or class filter.
              </Empty>
            )}
            <div className="table-footer">
              <span>
                {rows.length} of {roster.length} example records
              </span>
              <span>Page 1 of 1</span>
              {view === "attendance" && (
                <Button
                  className="small"
                  onClick={() =>
                    notice(
                      "Attendance draft kept in this page. No official register was submitted.",
                    )
                  }
                >
                  Keep local draft
                </Button>
              )}
            </div>
          </section>
          <div className="callout space-top">
            <LockKeyhole size={17} />
            <p>
              Official changes, exports, and approvals require authenticated
              institution-scoped permissions. This preview grants no access.
            </p>
          </div>
          <Modal
            open={record !== null}
            returnFocusTo={() => recordFocus.current}
            onOpenChange={(open) => {
              if (!open) setRecord(null);
            }}
            title={record?.name ?? "Example record"}
            description="Fictional academic record · Read-only preview"
          >
            <dl id="record-detail" className="record-details">
              <dt>Record ID</dt>
              <dd>{record?.id}</dd>
              <dt>Class</dt>
              <dd>{record?.class}</dd>
              <dt>Status</dt>
              <dd>{record?.status}</dd>
              <dt>Institution</dt>
              <dd>Example Learning Campus</dd>
            </dl>
            <div className="callout">
              Private contact, guardian evidence, and official academic history
              are omitted.
            </div>
          </Modal>
        </>
      )}
    </>
  );
}
function Finance() {
  return (
    <div className="stack">
      <div className="stats-grid">
        {[
          {
            label: "Example assessed charges",
            value: "₹12,000",
            note: "Unposted preview total",
          },
          {
            label: "Verified allocations",
            value: "Unavailable",
            note: "No payment provider connected",
          },
          {
            label: "Reconciliation",
            value: "Pending",
            note: "Requires authoritative records",
          },
        ].map((s) => (
          <div className="panel stat-card" key={s.label}>
            <small>{s.label}</small>
            <strong>{s.value}</strong>
            <p>{s.note}</p>
          </div>
        ))}
      </div>
      <section className="panel">
        <h3>Example charge schedule</h3>
        <div className="table-wrap">
          <table>
            <caption className="sr-only">
              Unposted fictional fee charges
            </caption>
            <thead>
              <tr>
                <th>Reference</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Posting state</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "EX-F01", name: "Learning resources", amount: "₹4,000" },
                { id: "EX-F02", name: "Academic term", amount: "₹8,000" },
              ].map((f) => (
                <tr key={f.id}>
                  <td className="mono">{f.id}</td>
                  <td>{f.name}</td>
                  <td className="numeric">{f.amount}</td>
                  <td>
                    <Badge tone="amber">Unposted example</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="callout warning">
        No real balance, receipt, payment, or settlement exists. Amounts are
        illustrative interface fixtures, not approved fees or pricing.
      </div>
    </div>
  );
}
export function Professional() {
  const [day, setDay] = useState("10"),
    [slot, setSlot] = useState(""),
    [step, setStep] = useState(0),
    [reserved, setReserved] = useState(false);
  const notice = useNotice();
  return (
    <>
      <PageHeading
        eyebrow="PROFESSIONAL WORKSPACE"
        title="Make time for possibility."
        description="A thoughtful home for your expertise and the people you help grow."
      />
      <div className="professional-layout">
        <aside id="professional-profile" className="panel professional-profile">
          <Avatar name="Dev Patel" color={3} size="large" />
          <h2>Dev Patel</h2>
          <p>Mathematics mentor</p>
          <Badge>Example profile · Unverified</Badge>
          <p>
            I help learners see the ideas behind the equations. Patient
            explanations, visual thinking, and a little curiosity.
          </p>
          <div className="expertise">
            <Badge>Mathematics</Badge>
            <Badge>Visual learning</Badge>
            <Badge>Problem solving</Badge>
          </div>
          <div className="callout">
            Qualification evidence and eligibility must be reviewed before
            tutoring is enabled.
          </div>
        </aside>
        <section id="availability" className="panel booking-panel">
          <div className="row between">
            <div>
              <h3>Preview a session</h3>
              <p className="metadata">
                Mathematics mentoring · 45 minute example
              </p>
            </div>
            <Badge>{step ? "Review" : "Choose a time"}</Badge>
          </div>
          {step === 0 ? (
            <>
              <h4>November 2026</h4>
              <p className="metadata">
                All sample times in Asia/Kolkata (UTC+05:30)
              </p>
              <div className="booking-days">
                {["10", "11", "12", "13", "14"].map((d, i) => (
                  <Button
                    className={`secondary ${day === d ? "selected" : ""}`}
                    key={d}
                    aria-pressed={day === d}
                    onClick={() => {
                      setDay(d);
                      setSlot("");
                      setReserved(false);
                    }}
                  >
                    <small>{["Tue", "Wed", "Thu", "Fri", "Sat"][i]}</small>
                    <strong>{d}</strong>
                  </Button>
                ))}
              </div>
              <label>Available example times</label>
              <div className="time-slots">
                {["09:00", "10:30", "14:00", "16:30"].map((t) => (
                  <Button
                    className={`secondary ${slot === t ? "selected" : ""}`}
                    key={t}
                    aria-pressed={slot === t}
                    onClick={() => {
                      setSlot(t);
                      setReserved(false);
                    }}
                  >
                    {t}
                  </Button>
                ))}
              </div>
              <Button disabled={!slot} onClick={() => setStep(1)}>
                Review example
                <ArrowRight size={16} />
              </Button>
            </>
          ) : (
            <div id="booking-review" className="booking-review">
              <CalendarDays size={32} />
              <h3>
                {day} November · {slot}
              </h3>
              <p>
                45 minute mathematics mentoring
                <br />
                Asia/Kolkata · Example session
              </p>
              <div className="callout warning">
                This does not reserve a slot, collect payment, or authorize
                contact with a learner.
              </div>
              <div className="row">
                <Button
                  className="secondary"
                  onClick={() => {
                    setStep(0);
                    setReserved(false);
                  }}
                >
                  Back
                </Button>
                <Button
                  disabled={reserved}
                  onClick={() => {
                    setReserved(true);
                    notice(
                      "Booking review previewed. No reservation or payment was made.",
                    );
                  }}
                >
                  {reserved ? "Preview reviewed" : "Finish preview"}
                </Button>
              </div>
            </div>
          )}
          <div className="booking-note">
            <ShieldCheck size={17} />
            <p>
              Age, relationship, scheduling conflicts, and payment eligibility
              are checked by future backend workflows.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
export function Operations() {
  const [query, setQuery] = useState("");
  const areas = [
    {
      id: "ADM-02",
      title: "Users & identities",
      description: "Account review and identity context",
      scope: "Purpose-bound",
    },
    {
      id: "ADM-03",
      title: "Institution verification",
      description: "Evidence review and institution decisions",
      scope: "Case approval",
    },
    {
      id: "ADM-05",
      title: "Course moderation",
      description: "Content review with an auditable decision trail",
      scope: "Review only",
    },
    {
      id: "ADM-06",
      title: "Content reports",
      description: "Triage reports, appeals and next actions",
      scope: "Scoped review",
    },
    {
      id: "ADM-16",
      title: "Security events",
      description: "Investigate security signals without exposing secrets",
      scope: "Strong authentication",
    },
    {
      id: "ADM-17",
      title: "Permissions & roles",
      description: "Inspect delegation and permission boundaries",
      scope: "Explicit delegation",
    },
    {
      id: "ADM-19",
      title: "Audit explorer",
      description: "Trace action, purpose and approved scope",
      scope: "Audited access",
    },
    {
      id: "ADM-20",
      title: "Configuration & release",
      description: "Review platform configuration and release readiness",
      scope: "Change approval",
    },
  ].filter((area) =>
    `${area.title} ${area.description}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="Platform governance"
        title="A clear view. A considered action."
        description="A specialist control center for platform stewardship. This is a design preview; no privileged identity or sensitive records are loaded."
        action={<Badge>Restricted access</Badge>}
      />
      <div className="governance-boundary">
        <LockKeyhole size={22} />
        <div>
          <strong>Permissions define the boundary.</strong>
          <p>
            Owner status does not authorize access to private messages,
            children’s records or protected secrets. Every sensitive task
            requires its own approved purpose and scope.
          </p>
        </div>
        <Link className="text-link" href="/auth/privileged">
          Secure sign-in <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="governance-layout">
        <section className="panel">
          <div className="row between wrap">
            <div>
              <h3>Governance workspace</h3>
              <p className="metadata">
                Explore task interfaces with synthetic examples
              </p>
            </div>
            <label className="search-field">
              <Search size={16} />
              <input
                aria-label="Find a governance area"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find a task"
              />
            </label>
          </div>
          <div className="governance-register">
            {areas.map((area) => (
              <Link href={`/preview/${area.id}`} key={area.id}>
                <span className="governance-task-icon">
                  <ShieldCheck size={20} />
                </span>
                <div>
                  <strong>{area.title}</strong>
                  <p>{area.description}</p>
                </div>
                <Badge>{area.scope}</Badge>
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </div>
          {!areas.length && (
            <Empty title="No matching area">
              Try security, users, audit or configuration.
            </Empty>
          )}
        </section>
        <aside className="governance-side">
          <section className="panel">
            <h3>Access checklist</h3>
            {[
              "Verified identity and MFA",
              "Explicit scoped permission",
              "Documented purpose",
              "Reviewable audit trail",
            ].map((value) => (
              <p className="governance-check" key={value}>
                <ShieldCheck size={16} />
                {value}
              </p>
            ))}
          </section>
          <section className="panel">
            <h3>Preview boundaries</h3>
            <p>
              No live analytics, billing totals, account changes or private
              records are shown here.
            </p>
            <Link href="/preview/ADM-14" className="text-link">
              Support workspace <ArrowUpRight size={16} />
            </Link>
          </section>
        </aside>
      </div>
    </>
  );
}
export function Notifications() {
  const [read, setRead] = useState<string[]>([]);
  return (
    <>
      <PageHeading
        eyebrow="NOTIFICATIONS"
        title="The things that matter."
        description="A quiet place for updates from your example learning world."
        action={
          <Button
            className="secondary"
            onClick={() => setRead(["lesson", "community"])}
          >
            Mark examples read
          </Button>
        }
      />
      <section className="panel">
        {[
          {
            id: "lesson",
            title: "A little curiosity is waiting",
            body: "Continue your sample visual thinking lesson.",
            href: "/app/student/player",
          },
          {
            id: "community",
            title: "Find your teaching circle",
            body: "Explore example education communities.",
            href: "/app/communities",
          },
        ].map((n) => (
          <Link
            href={n.href}
            className="notification-row"
            key={n.id}
            onClick={() => setRead([...read, n.id])}
          >
            <span
              className={`notification-dot ${read.includes(n.id) ? "read" : ""}`}
            />
            <div>
              <strong>{n.title}</strong>
              <p>{n.body}</p>
              <small>Example update · No live event</small>
            </div>
            <ArrowUpRight size={18} />
          </Link>
        ))}
      </section>
    </>
  );
}
export function Settings() {
  const [digest, setDigest] = useState(true),
    [discover, setDiscover] = useState(false);
  const notice = useNotice();
  return (
    <>
      <PageHeading
        eyebrow="PREFERENCES"
        title="A world that feels like yours."
        description="Thoughtful choices for how you learn, connect, and stay informed."
      />
      <div className="settings-layout">
        <section className="panel">
          <h3>Your example profile</h3>
          <form
            className="space-top"
            onSubmit={(e) => {
              e.preventDefault();
              notice("Preferences changed for this preview only.");
            }}
          >
            <label>
              Display name
              <input defaultValue="Alex Morgan" required maxLength={100} />
            </label>
            <label>
              Learning interests
              <input
                defaultValue="Visual thinking, science, and creative learning"
                maxLength={200}
              />
            </label>
            <label className="toggle-row">
              <span>
                Learning digest
                <small>Example email preference. No email will be sent.</small>
              </span>
              <input
                type="checkbox"
                checked={digest}
                onChange={(e) => setDigest(e.target.checked)}
              />
            </label>
            <label className="toggle-row">
              <span>
                Public discovery
                <small>
                  Eligibility and privacy approval required before indexing.
                </small>
              </span>
              <input
                type="checkbox"
                checked={discover}
                onChange={(e) => setDiscover(e.target.checked)}
              />
            </label>
            <Button type="submit">Keep preview preferences</Button>
          </form>
        </section>
        <aside className="panel">
          <ShieldCheck size={28} />
          <h3 className="space-top">Your boundaries matter.</h3>
          <p className="space-top">
            These controls demonstrate preference design. They do not alter
            consent records, account security, or public visibility.
          </p>
          <Link href="/trust" className="rail-link">
            Our approach to privacy
            <ArrowRight size={17} />
          </Link>
        </aside>
      </div>
    </>
  );
}
