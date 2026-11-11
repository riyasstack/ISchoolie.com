"use client";
import Link from "next/link";
import { useState } from "react";
import { AuthoringWorkbench } from "./enterprise/authoring-workbench";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  Play,
  Search,
  LockKeyhole,
} from "lucide-react";
import { PageHeading } from "./app-shell";
import {
  ActionLink,
  Avatar,
  Badge,
  Button,
  Empty,
  Meter,
  useNotice,
} from "./ui";
import { CourseArt, PublicNav, PublicFooter } from "./public-home";
import { courses, lessons, type Course } from "@/lib/preview";
export function CourseCatalog({ personal = false }: { personal?: boolean }) {
  const [search, setSearch] = useState(""),
    [category, setCategory] = useState("All");
  const results = courses.filter(
    (c) =>
      (!personal || c.progress > 0) &&
      (category === "All" || c.category === category) &&
      `${c.title} ${c.teacher}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow={personal ? "MY LEARNING" : "FOLLOW YOUR CURIOSITY"}
        title={
          personal
            ? "Your next chapter is waiting."
            : "Something new starts here."
        }
        description={
          personal
            ? "Pick up where you left off. Make a little room for discovery."
            : "Explore ideas and practical skills, with people who care about teaching."
        }
        action={
          personal ? (
            <ActionLink href="/courses" secondary>
              Discover courses
            </ActionLink>
          ) : (
            <Badge>Example catalog</Badge>
          )
        }
      />
      {personal && (
        <div className="learning-banner">
          <div>
            <Badge tone="green">CONTINUE YOUR JOURNEY</Badge>
            <h2>
              The art of
              <br />
              thinking clearly.
            </h2>
            <p>Lesson 3 · Looking beyond the obvious</p>
            <ActionLink href="/app/student/player">
              Continue learning
            </ActionLink>
          </div>
          <div className="learning-banner-art">
            Aa<span>Curiosity is a practice.</span>
          </div>
        </div>
      )}
      <div className="filter-row">
        <label className="search-field">
          <Search size={17} />
          <input
            aria-label="Search courses"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses or educators"
          />
        </label>
        <label className="sr-only" htmlFor="category">
          Course category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {["All", ...new Set(courses.map((c) => c.category))].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <span className="metadata">{results.length} courses</span>
      </div>
      <div className="course-grid">
        {results.map((c) => (
          <Link
            href={personal ? "/app/student/player" : `/courses/${c.id}`}
            className="course-card"
            key={c.id}
          >
            <CourseArt color={c.color} mark={c.mark} />
            <div className="course-meta">
              <small>{c.category}</small>
              <h3>{c.title}</h3>
              <p>{c.teacher}</p>
              <div className="row between">
                <span>
                  {c.lessons} lessons · {c.duration}
                </span>
                <ArrowRight size={17} />
              </div>
              {personal && (
                <div className="space-top">
                  <Meter
                    value={c.progress}
                    label={`${c.title} example progress ${c.progress} percent`}
                  />
                  <small>{c.progress}% · Example progress</small>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
      {!results.length && (
        <Empty title="A different curiosity?">
          Try another search or choose a different category.
        </Empty>
      )}
    </>
  );
}
export function CourseDetail({
  course,
  embedded = false,
}: {
  course: Course;
  embedded?: boolean;
}) {
  const Content = embedded ? "div" : "main";
  return (
    <>
      {!embedded && <PublicNav />}
      <Content
        className={embedded ? undefined : "content-page"}
        id={embedded ? undefined : "main-content"}
      >
        <Link href="/courses" className="text-link">
          <ArrowLeft size={16} />
          All learning
        </Link>
        <div className="course-detail-layout">
          <section>
            <div className="section-kicker">{course.category}</div>
            <h1>{course.title}.</h1>
            <p className="lead">{course.description}</p>
            <div className="row">
              <Avatar name={course.teacher} />
              <div>
                <strong>{course.teacher}</strong>
                <p className="metadata">
                  Example educator · Qualifications not verified
                </p>
              </div>
            </div>
            <div className="course-facts">
              <span>
                <BookOpen size={17} />
                {course.lessons} lessons
              </span>
              <span>
                <Clock size={17} />
                {course.duration}
              </span>
              <span>At your own pace</span>
            </div>
            <h3>What you’ll explore</h3>
            <ul className="outcome-list">
              <li>
                <Check size={17} />
                Notice patterns and ask more useful questions.
              </li>
              <li>
                <Check size={17} />
                Develop a personal practice of observation.
              </li>
              <li>
                <Check size={17} />
                Connect your ideas to a small, meaningful project.
              </li>
            </ul>
            <h3>A look inside</h3>
            <div className="syllabus">
              {[
                "Foundations of curiosity",
                "From observation to ideas",
                "Make something meaningful",
              ].map((m, i) => (
                <details key={m} open={i === 0}>
                  <summary>
                    <span>
                      0{i + 1} · {m}
                    </span>
                    <ChevronDown size={16} />
                  </summary>
                  <p>{lessons.slice(i * 2, i * 2 + 2).join(" · ")}</p>
                </details>
              ))}
            </div>
          </section>
          <aside className="course-purchase panel">
            <CourseArt color={course.color} mark={course.mark} />
            <Badge>Frontend course concept</Badge>
            <h3>Give your curiosity a little space.</h3>
            <p>
              Explore a sample text lesson. Pricing, access, and enrollment are
              not active.
            </p>
            <ActionLink href="/app/student/player">
              Open sample lesson
            </ActionLink>
            <small>No payment. No enrollment created.</small>
          </aside>
        </div>
      </Content>
      {!embedded && <PublicFooter />}
    </>
  );
}
export function LearningPlayer() {
  const [active, setActive] = useState(2),
    [tab, setTab] = useState("Overview"),
    [notes, setNotes] = useState(""),
    [completed, setCompleted] = useState<number[]>([0, 1]),
    [outline, setOutline] = useState(true);
  const notice = useNotice();
  return (
    <>
      <Link href="/app/student" className="text-link back-link">
        <ArrowLeft size={16} />
        Back to my learning
      </Link>
      <div className="player-heading">
        <div>
          <div className="section-kicker">THE ART OF THINKING CLEARLY</div>
          <h1>{lessons[active]}</h1>
        </div>
        <Badge>Sample text lesson</Badge>
      </div>
      <div className="player-layout">
        <div>
          <div className="lesson-stage">
            <span className="lesson-number">CHAPTER 0{active + 1}</span>
            <div className="lesson-circles" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <h2>{lessons[active]}.</h2>
            <p>
              What changes when you take
              <br />a little more time to look?
            </p>
            <Badge>Text preview · Video not connected</Badge>
          </div>
          <div className="player-controls">
            <span>
              Lesson {active + 1} of {lessons.length} · Example course
            </span>
            <Button
              className="secondary small"
              onClick={() =>
                setCompleted(
                  completed.includes(active)
                    ? completed.filter((x) => x !== active)
                    : [...completed, active],
                )
              }
            >
              {completed.includes(active) ? (
                <Check size={16} />
              ) : (
                <span className="circle-check" />
              )}
              {completed.includes(active)
                ? "Marked in preview"
                : "Mark read in preview"}
            </Button>
          </div>
          <div className="filter-row" aria-label="Lesson panels">
            {["Overview", "Transcript", "Notes", "Resources"].map((t) => (
              <Button
                key={t}
                className={`tab ${tab === t ? "selected" : ""}`}
                aria-pressed={tab === t}
                onClick={() => setTab(t)}
              >
                {t}
              </Button>
            ))}
          </div>
          <section className="lesson-reading">
            {tab === "Overview" ? (
              <>
                <h3>A different way to see.</h3>
                <p>
                  Choose an ordinary object nearby. Before naming it, spend a
                  minute noticing its edges, its texture, and the way light
                  falls across it. What would you tell someone who has never
                  seen it?
                </p>
                <h4>Try this small practice</h4>
                <p>
                  Write down five observations. Then ask one question that has
                  more than one possible answer. Your question is the beginning
                  of an idea.
                </p>
                <div className="callout">
                  Sample instructional content for interface evaluation. No
                  official learning progress is recorded.
                </div>
              </>
            ) : tab === "Transcript" ? (
              <>
                <h3>Sample transcript</h3>
                <p>
                  <strong>00:00 — Begin with what is here.</strong>
                  <br />
                  Curiosity begins with attention. Look at something familiar as
                  if you are seeing it for the first time.
                </p>
                <p>
                  <strong>00:35 — Stay with the question.</strong>
                  <br />
                  You do not have to reach an answer immediately. Sometimes the
                  most useful step is another observation.
                </p>
              </>
            ) : tab === "Notes" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  notice("Notes kept in this page preview only.");
                }}
              >
                <label>
                  Your lesson notes
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="What did you notice?"
                    maxLength={5000}
                  />
                </label>
                <Button type="submit">Keep in this preview</Button>
                <small>Notes reset when you leave this page.</small>
              </form>
            ) : (
              <>
                <h3>Observation practice</h3>
                <p>
                  1. Choose one everyday object.
                  <br />
                  2. List five details without judging them.
                  <br />
                  3. Sketch the connections between your observations.
                  <br />
                  4. Write one question to explore next.
                </p>
                <Badge>Inline sample resource · No download</Badge>
              </>
            )}
          </section>
          <div className="row between space-top">
            <Button
              className="secondary"
              disabled={active === 0}
              onClick={() => setActive(active - 1)}
            >
              <ArrowLeft size={16} />
              Previous
            </Button>
            <Button
              disabled={active === lessons.length - 1}
              onClick={() => setActive(active + 1)}
            >
              Next lesson
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
        <aside id="course-outline" className="course-outline panel">
          <div className="row between">
            <h3>Course outline</h3>
            <Button
              className="icon-button"
              aria-expanded={outline}
              aria-label="Toggle course outline"
              onClick={() => setOutline(!outline)}
            >
              <ChevronDown size={18} />
            </Button>
          </div>
          <p className="metadata">
            {completed.length} of {lessons.length} sample lessons read
          </p>
          <Meter
            value={(completed.length / lessons.length) * 100}
            label="Local example lesson progress"
          />
          {outline && (
            <div className="lesson-list">
              {lessons.map((l, i) => (
                <button
                  className={i === active ? "active" : ""}
                  key={l}
                  onClick={() => setActive(i)}
                  aria-current={i === active ? "step" : undefined}
                >
                  <span className="lesson-index">
                    {completed.includes(i) ? (
                      <Check size={15} />
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </span>
                  <span>
                    {l}
                    <small>
                      {i < 3 ? "Foundations" : "Your practice"} · Sample lesson
                    </small>
                  </span>
                  {i === active && <Play size={12} />}
                </button>
              ))}
            </div>
          )}
          <div className="callout space-top">
            <LockKeyhole size={17} />
            <p>
              Official completion and certification require verified enrollment
              and backend progress.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
export function EducatorEditor() {
  return (
    <>
      <PageHeading
        eyebrow="EDUCATOR / CURRICULUM"
        title="Build a path worth following."
        description="Structured content, stable ordering, learner preview and local readiness review."
      />
      <AuthoringWorkbench />
    </>
  );
}
