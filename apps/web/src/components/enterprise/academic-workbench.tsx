"use client";
import { practiceQuestions as questions } from "../../../../../packages/contracts/practice";
import { useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  AlertTriangle,
  Plus,
  Trash2,
} from "lucide-react";
import { Button, Badge, Meter, Empty } from "../ui";
import { Fields } from "./form-workbench";
import { SubmissionWorkbench } from "./submission-workbench";
import { reviewGrade } from "../../../../../packages/contracts/authoring-state";
import {
  scheduleConflicts,
  validateDraft,
  type Slot,
  type Draft,
  type ScreenSpec,
} from "../../../../../packages/contracts/frontend";
export function TimetableWorkbench({ spec }: { spec: ScreenSpec }) {
  const [slots, setSlots] = useState<Slot[]>([
      {
        id: "EX-T01",
        day: "Monday",
        period: "09.00",
        teacher: "Ananya Rao",
        room: "Studio A",
        subject: "Visual thinking",
      },
      {
        id: "EX-T02",
        day: "Tuesday",
        period: "10.00",
        teacher: "Kabir Sen",
        room: "Lab B",
        subject: "Science inquiry",
      },
    ]),
    [draft, setDraft] = useState<Draft>({}),
    [errors, setErrors] = useState<Draft>({}),
    [day, setDay] = useState("All days");
  const conflicts = scheduleConflicts(slots),
    editable = spec.kind === "timetable-builder";
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  return (
    <div className={editable ? "task-layout" : "stack"}>
      <section className="panel week-board">
        <div className="row between">
          <div>
            <h2>A considered week.</h2>
            <p className="metadata">
              Example timetable · Asia/Kolkata · UTC+05:30
            </p>
          </div>
          <CalendarDays size={24} />
        </div>
        <label className="space-top">
          Day focus
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            {["All days", ...days].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <div className="week-grid">
          {days
            .filter((d) => day === "All days" || d === day)
            .map((d) => (
              <section key={d}>
                <h3>{d}</h3>
                {["09.00", "10.00", "11.00"].map((period) => (
                  <div className="week-slot" key={period}>
                    <small>{period}</small>
                    {slots
                      .filter((s) => s.day === d && s.period === period)
                      .map((s) => (
                        <article key={s.id} className="schedule-event">
                          <strong>{s.subject}</strong>
                          <span>{s.teacher}</span>
                          <small>{s.room} · Example section</small>
                          {editable && (
                            <Button
                              className="icon-button"
                              aria-label={`Remove ${s.subject} on ${d}`}
                              onClick={() =>
                                setSlots(slots.filter((x) => x.id !== s.id))
                              }
                            >
                              <Trash2 size={15} />
                            </Button>
                          )}
                        </article>
                      ))}
                    {!slots.some((s) => s.day === d && s.period === period) && (
                      <span className="metadata">Unallocated</span>
                    )}
                  </div>
                ))}
              </section>
            ))}
        </div>
        {conflicts.length ? (
          <div className="callout warning" role="alert">
            <AlertTriangle size={18} />
            <strong>{conflicts.length} resource conflict(s)</strong>
            <ul>
              {conflicts.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="callout">
            <Check size={17} />
            No teacher or room overlaps in this local sample. Official calendar
            checks remain unavailable.
          </div>
        )}
      </section>
      {editable && (
        <aside className="panel">
          <h3>Allocate a sample period</h3>
          <form
            className="space-top"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              const found = validateDraft(spec.fields, draft);
              setErrors(found);
              if (Object.keys(found).length) return;
              setSlots([
                ...slots,
                {
                  id: `local-${slots.length}-${Date.now()}`,
                  day: draft.day,
                  period: draft.period,
                  teacher: draft.teacher,
                  room: draft.room,
                  subject: draft.subject,
                },
              ]);
            }}
          >
            <Fields
              fields={spec.fields}
              value={draft}
              onChange={setDraft}
              errors={errors}
            />
            <Button type="submit">
              <Plus size={16} />
              Add local allocation
            </Button>
          </form>
          <p className="metadata space-top">
            Conflicts remain visible until corrected. This tool never publishes
            a timetable.
          </p>
        </aside>
      )}
    </div>
  );
}
export function AssessmentWorkbench() {
  const [index, setIndex] = useState(0),
    [answers, setAnswers] = useState<Record<number, number>>({}),
    [review, setReview] = useState(false);
  return (
    <div className="assessment-layout">
      <section className="panel assessment-question">
        <Badge>Practice only · No official score</Badge>
        <h2>{review ? "Review your reasoning" : questions[index].prompt}</h2>
        <Meter
          value={((review ? 3 : index + 1) / 3) * 100}
          label="Sample question navigation progress"
        />
        {review ? (
          <div className="answer-review">
            {questions.map((q, i) => (
              <article key={q.prompt}>
                <h3>
                  {i + 1}. {q.prompt}
                </h3>
                <p>
                  Your example response:{" "}
                  {q.options[answers[i]] ?? "Not answered"}
                </p>
                <div className="callout">{q.explanation}</div>
              </article>
            ))}
            <Button className="secondary" onClick={() => setReview(false)}>
              Return to questions
            </Button>
          </div>
        ) : (
          <>
            <fieldset className="quiz-options">
              <legend>Choose one example answer</legend>
              {questions[index].options.map((option, i) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    checked={answers[index] === i}
                    onChange={() => setAnswers({ ...answers, [index]: i })}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </fieldset>
            <div className="row between">
              <Button
                className="secondary"
                disabled={index === 0}
                onClick={() => setIndex(index - 1)}
              >
                <ChevronLeft size={16} />
                Previous
              </Button>
              <Button
                disabled={answers[index] === undefined}
                onClick={() => {
                  if (index === 2) setReview(true);
                  else setIndex(index + 1);
                }}
              >
                {index === 2 ? "Review practice" : "Next question"}
                <ChevronRight size={16} />
              </Button>
            </div>
          </>
        )}
      </section>
      <aside className="panel">
        <h3>Your practice</h3>
        <p className="space-top">
          No timer, attempt eligibility, grading, or academic submission is
          authoritative in this preview.
        </p>
        <div className="question-index">
          {questions.map((q, i) => (
            <Button
              key={q.prompt}
              className={index === i ? "" : "secondary"}
              aria-label={`Go to question ${i + 1}`}
              onClick={() => {
                setIndex(i);
                setReview(false);
              }}
            >
              {answers[i] === undefined ? i + 1 : <Check size={16} />}
            </Button>
          ))}
        </div>
        <p className="metadata">Responses are held in this page only.</p>
      </aside>
    </div>
  );
}
export function LearningEvidence({ spec }: { spec: ScreenSpec }) {
  return (
    <div className="evidence-layout">
      <section className="panel evidence-document">
        <div className="document-top">
          <Badge>EXAMPLE LEARNING EVIDENCE</Badge>
          <span>EX-J01 / Unofficial</span>
        </div>
        <h2>Observation journal.</h2>
        <p className="document-lead">Five details. One useful question.</p>
        <section>
          <h3>The task</h3>
          <p>
            Choose an ordinary object and describe five specific details before
            drawing a conclusion. Connect those observations to a question worth
            exploring.
          </p>
        </section>
        <section>
          <h3>Sample learner response</h3>
          <p>
            I noticed the branching veins, a rough edge, changes in color, the
            direction of the stem, and a shadow beneath the leaf. How might
            these details help the leaf capture light?
          </p>
        </section>
        <section>
          <h3>What useful feedback looks like</h3>
          <p>
            Recognize precise observations. Identify one connection to
            investigate. Offer a clear next step without treating the preview as
            an official grade.
          </p>
        </section>
        <div className="rubric-grid">
          <div>
            Observation<span>Specific, describable evidence</span>
          </div>
          <div>
            Reflection<span>Connections and next questions</span>
          </div>
        </div>
      </section>
      {spec.kind === "grading" ? <RubricFeedback /> : <SubmissionWorkbench />}
    </div>
  );
}
function RubricFeedback() {
  const [scores, setScores] = useState(["", ""]),
    [feedback, setFeedback] = useState(""),
    [result, setResult] = useState<{ error: string; total: number | null }>({
      error: "",
      total: null,
    });
  return (
    <section className="panel stack">
      <h2>Rubric feedback draft</h2>
      <form
        className="stack"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setResult(reviewGrade(scores, feedback));
        }}
      >
        {["Precise observation", "Reasoning and next question"].map(
          (criterion, i) => (
            <label key={criterion}>
              {criterion} · 0–5 points
              <input
                type="number"
                min={0}
                max={5}
                step={1}
                value={scores[i]}
                onChange={(e) => {
                  setScores(
                    scores.map((v, index) =>
                      index === i ? e.target.value : v,
                    ),
                  );
                  setResult({ error: "", total: null });
                }}
              />
            </label>
          ),
        )}
        <label>
          Useful feedback
          <textarea
            maxLength={2000}
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
              setResult({ error: "", total: null });
            }}
          />
        </label>
        {result.error && (
          <p role="alert" className="field-error">
            {result.error}
          </p>
        )}
        <Button type="submit">Review rubric draft</Button>
        {result.total !== null && (
          <p role="status" className="callout">
            Local rubric total: {result.total}/10. No grade is released.
          </p>
        )}
      </form>
    </section>
  );
}
export function CredentialWorkbench() {
  const [reference, setReference] = useState(""),
    [inspected, setInspected] = useState(false);
  return (
    <div className="task-layout">
      <section className="specimen-certificate">
        <span className="certificate-watermark">SPECIMEN</span>
        <Badge>NOT ISSUED · NOT VERIFIED</Badge>
        <div className="section-kicker">ISCHOOLIE / EXAMPLE LEARNING</div>
        <h2>
          A little curiosity.
          <br />A meaningful next step.
        </h2>
        <p>Certificate layout concept for an example learner</p>
        <strong>Visual thinking pathway</strong>
        <p>
          No completion, issuer authority, qualification, or accreditation is
          certified by this page.
        </p>
        <div className="certificate-rule" />
        <span>EX-CERT-01 · Draft specimen</span>
      </section>
      <aside className="panel">
        <h3>Inspect a specimen reference</h3>
        <form
          className="space-top"
          onSubmit={(e) => {
            e.preventDefault();
            setInspected(true);
          }}
        >
          <label>
            Example reference
            <input
              value={reference}
              onChange={(e) => {
                setReference(e.target.value);
                setInspected(false);
              }}
              placeholder="EX-CERT-01"
              required
            />
          </label>
          <Button type="submit">Inspect example</Button>
        </form>
        {inspected &&
          (reference === "EX-CERT-01" ? (
            <div className="callout warning space-top" role="status">
              Specimen found. It is not issued, signed, or valid as an academic
              credential.
            </div>
          ) : (
            <Empty title="No specimen found">
              Try the visible example reference. No real credential service is
              connected.
            </Empty>
          ))}
      </aside>
    </div>
  );
}
