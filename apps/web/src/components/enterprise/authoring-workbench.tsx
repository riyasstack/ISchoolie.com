"use client";
import { useEffect, useReducer, useRef, useState } from "react";
import Image from "next/image";
import { Button, Badge } from "../ui";
import {
  authorReducer,
  initialAuthor,
  authorErrors,
  validateResource,
  formatSelection,
  inlineParts,
  type AuthorAction,
  type AuthorDocument,
  type Resource,
} from "../../../../../packages/contracts/authoring-state";

export function AuthoringWorkbench({ kind = "editor" }: { kind?: string }) {
  const [state, dispatch] = useReducer(authorReducer, undefined, initialAuthor);
  const [preview, setPreview] = useState(false),
    [errors, setErrors] = useState<string[]>([]),
    [pending, setPending] = useState<AuthorAction | null>(null);
  const summary = useRef<HTMLDivElement>(null),
    urls = useRef<string[]>([]),
    generation = useRef(0);
  useEffect(
    () => () => {
      generation.current++;
      urls.current.forEach((url) => URL.revokeObjectURL(url));
    },
    [],
  );
  function edit(action: AuthorAction) {
    setErrors([]);
    dispatch(action);
  }
  function review() {
    const found = authorErrors(state.doc, kind);
    setErrors(found);
    if (found.length) requestAnimationFrame(() => summary.current?.focus());
    else dispatch({ type: "review", kind });
  }
  async function attach(files: FileList | null) {
    const version = generation.current;
    for (const file of Array.from(files ?? []).slice(
      0,
      Math.max(0, 10 - state.doc.resources.length),
    )) {
      const problem = validateResource(file);
      if (problem) {
        setErrors([problem]);
        continue;
      }
      const resource: Omit<Resource, "id"> = {
        name: file.name,
        size: file.size,
        type: file.type,
      };
      if (/\.(txt|csv)$/i.test(file.name) && file.size <= 65536)
        resource.text = (await file.text()).slice(0, 5000);
      if (version !== generation.current) return;
      if (/^image\/(png|jpeg)$/.test(file.type)) {
        resource.uri = URL.createObjectURL(file);
        urls.current.push(resource.uri);
      }
      edit({ type: "resource-add", resource });
    }
  }
  function order(
    collection: "unit" | "lesson" | "block" | "question" | "rubric",
    id: string,
    label: string,
    index: number,
    length: number,
  ) {
    return (
      <div className="author-order">
        <Button
          type="button"
          className="secondary"
          aria-label={`Move ${label} up`}
          disabled={index === 0}
          onClick={() => edit({ type: "move", collection, id, delta: -1 })}
        >
          ↑
        </Button>
        <Button
          type="button"
          className="secondary"
          aria-label={`Move ${label} down`}
          disabled={index === length - 1}
          onClick={() => edit({ type: "move", collection, id, delta: 1 })}
        >
          ↓
        </Button>
        <Button
          type="button"
          className="secondary"
          onClick={() => setPending({ type: "remove", collection, id })}
        >
          Remove {label}
        </Button>
      </div>
    );
  }
  return (
    <section
      className="advanced-author stack"
      aria-label="Advanced local authoring"
    >
      <div className="author-toolbar">
        <div>
          <span className="section-kicker">
            DRAFT STUDIO / {kind.replaceAll("-", " ")}
          </span>
          <h2>Shape the learning experience.</h2>
          <p>
            In-memory drafts, structured content and learner preview. Nothing is
            published or assigned.
          </p>
        </div>
        <Badge>
          Revision {state.revision} ·{" "}
          {state.dirty ? "Unsaved" : "Snapshot current"}
        </Badge>
      </div>
      <div className="row wrap">
        <Button
          type="button"
          className="secondary"
          aria-pressed={preview}
          onClick={() => setPreview(!preview)}
        >
          {preview ? "Return to editing" : "Learner preview"}
        </Button>
        <Button
          type="button"
          className="secondary"
          disabled={state.offline || state.conflict}
          onClick={() => dispatch({ type: "save" })}
        >
          Save local snapshot
        </Button>
        <Button type="button" onClick={review}>
          Review readiness
        </Button>
        <Button
          type="button"
          className="secondary"
          onClick={() => setPending({ type: "reset" })}
        >
          Discard and reset
        </Button>
      </div>
      <details className="panel">
        <summary>Connection and revision QA controls</summary>
        <div className="row wrap">
          <Button
            type="button"
            className="secondary"
            aria-pressed={state.offline}
            onClick={() => dispatch({ type: "offline" })}
          >
            {state.offline ? "Restore connection" : "Simulate offline"}
          </Button>
          <Button
            type="button"
            className="secondary"
            onClick={() => dispatch({ type: "remote" })}
          >
            Simulate newer revision
          </Button>
        </div>
      </details>
      {state.conflict && (
        <div className="callout">
          <h3>Resolve the simulated revision conflict</h3>
          <p>
            Your unsaved draft remains available. Choose which local content to
            keep.
          </p>
          <div className="row wrap">
            <Button
              type="button"
              onClick={() => dispatch({ type: "resolve-local" })}
            >
              Keep my edits
            </Button>
            <Button
              type="button"
              className="secondary"
              onClick={() => setPending({ type: "resolve-saved" })}
            >
              Restore snapshot
            </Button>
          </div>
        </div>
      )}
      {pending && (
        <div
          className="callout"
          role="region"
          aria-label="Confirm draft change"
        >
          <h3>Confirm this draft change</h3>
          <p>
            {pending.type === "remove"
              ? "This removes the selected item and its nested content."
              : "This replaces the current unsaved content."}
          </p>
          <div className="row">
            <Button
              type="button"
              onClick={() => {
                if (pending.type === "reset") {
                  generation.current++;
                  urls.current.forEach((url) => URL.revokeObjectURL(url));
                  urls.current = [];
                }
                if (pending.type === "resolve-saved") generation.current++;
                edit(pending);
                setPending(null);
              }}
            >
              Confirm change
            </Button>
            <Button
              type="button"
              className="secondary"
              onClick={() => setPending(null)}
            >
              Keep editing
            </Button>
          </div>
        </div>
      )}
      {errors.length > 0 && (
        <div ref={summary} tabIndex={-1} role="alert" className="error-summary">
          <h3>Resolve before review</h3>
          <ul>
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      {preview ? (
        <AuthorPreview doc={state.doc} kind={kind} />
      ) : (
        <>
          <div className="panel form-grid">
            <label>
              Draft title
              <input
                value={state.doc.title}
                maxLength={160}
                onChange={(e) =>
                  edit({ type: "meta", key: "title", value: e.target.value })
                }
              />
            </label>
            {kind !== "resources" && (
              <label>
                Instructions
                <textarea
                  value={state.doc.instructions}
                  maxLength={5000}
                  onChange={(e) =>
                    edit({
                      type: "meta",
                      key: "instructions",
                      value: e.target.value,
                    })
                  }
                />
              </label>
            )}
            {kind === "assignment-builder" && (
              <label>
                Due date
                <input
                  type="date"
                  value={state.doc.due}
                  onChange={(e) =>
                    edit({ type: "meta", key: "due", value: e.target.value })
                  }
                />
              </label>
            )}
          </div>
          {kind === "editor" && (
            <>
              <div className="row between">
                <h3>Curriculum modules</h3>
                <Button
                  type="button"
                  className="secondary"
                  disabled={state.doc.units.length >= 12}
                  onClick={() => edit({ type: "unit-add" })}
                >
                  Add module
                </Button>
              </div>
              {state.doc.units.map((u, ui) => (
                <section className="panel stack" key={u.id}>
                  <label>
                    Module {ui + 1} title
                    <input
                      maxLength={160}
                      value={u.title}
                      onChange={(e) =>
                        edit({
                          type: "unit-title",
                          id: u.id,
                          value: e.target.value,
                        })
                      }
                    />
                  </label>
                  {order(
                    "unit",
                    u.id,
                    `module ${ui + 1}`,
                    ui,
                    state.doc.units.length,
                  )}
                  {u.lessons.map((l, li) => (
                    <section className="author-lesson stack" key={l.id}>
                      <label>
                        Lesson {li + 1} title
                        <input
                          maxLength={160}
                          value={l.title}
                          onChange={(e) =>
                            edit({
                              type: "lesson-title",
                              id: l.id,
                              value: e.target.value,
                            })
                          }
                        />
                      </label>
                      {order(
                        "lesson",
                        l.id,
                        `lesson ${li + 1}`,
                        li,
                        u.lessons.length,
                      )}
                      {l.blocks.map((b, bi) => (
                        <div className="author-block" key={b.id}>
                          <RichBlock
                            label={`${b.kind} block ${bi + 1}`}
                            value={b.text}
                            onChange={(value) =>
                              edit({ type: "block-edit", id: b.id, value })
                            }
                          />
                          {order(
                            "block",
                            b.id,
                            `block ${bi + 1}`,
                            bi,
                            l.blocks.length,
                          )}
                        </div>
                      ))}
                      <div className="row wrap">
                        {(["heading", "paragraph", "list"] as const).map(
                          (block) => (
                            <Button
                              key={block}
                              type="button"
                              className="secondary"
                              disabled={l.blocks.length >= 40}
                              onClick={() =>
                                edit({
                                  type: "block-add",
                                  lesson: l.id,
                                  kind: block,
                                })
                              }
                            >
                              Add {block}
                            </Button>
                          ),
                        )}
                      </div>
                      <p className="metadata">
                        List blocks use one item per line. Content is rendered
                        as text, with no embedded scripts.
                      </p>
                    </section>
                  ))}
                  <Button
                    type="button"
                    className="secondary"
                    disabled={u.lessons.length >= 30}
                    onClick={() => edit({ type: "lesson-add", unit: u.id })}
                  >
                    Add lesson to {u.title || "module"}
                  </Button>
                </section>
              ))}
            </>
          )}
          {kind === "assessment-builder" && (
            <>
              <div className="row between">
                <h3>
                  Question bank ·{" "}
                  {state.doc.questions.reduce(
                    (n, q) => n + (Number(q.points) || 0),
                    0,
                  )}{" "}
                  points
                </h3>
                <div className="row wrap">
                  {(["choice", "response"] as const).map((q) => (
                    <Button
                      key={q}
                      type="button"
                      className="secondary"
                      disabled={state.doc.questions.length >= 50}
                      onClick={() => edit({ type: "question-add", kind: q })}
                    >
                      Add {q === "choice" ? "choice" : "written"} question
                    </Button>
                  ))}
                </div>
              </div>
              {state.doc.questions.map((q, qi) => (
                <section className="panel stack" key={q.id}>
                  <label>
                    Question {qi + 1}
                    <textarea
                      value={q.prompt}
                      maxLength={2000}
                      onChange={(e) =>
                        edit({
                          type: "question-edit",
                          id: q.id,
                          patch: { prompt: e.target.value },
                        })
                      }
                    />
                  </label>
                  <label>
                    Points
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={q.points}
                      onChange={(e) =>
                        edit({
                          type: "question-edit",
                          id: q.id,
                          patch: { points: e.target.value },
                        })
                      }
                    />
                  </label>
                  {q.kind === "choice" && (
                    <fieldset>
                      <legend>
                        Answer options · select the correct answer
                      </legend>
                      {q.options.map((o, oi) => (
                        <div className="author-option" key={oi}>
                          <label>
                            <input
                              type="radio"
                              name={`correct-${q.id}`}
                              checked={q.correct === oi}
                              onChange={() =>
                                edit({
                                  type: "question-edit",
                                  id: q.id,
                                  patch: { correct: oi },
                                })
                              }
                            />
                            Option {oi + 1} is correct
                          </label>
                          <label>
                            Option {oi + 1} text
                            <input
                              value={o}
                              maxLength={500}
                              onChange={(e) =>
                                edit({
                                  type: "question-edit",
                                  id: q.id,
                                  patch: {
                                    options: q.options.map((v, i) =>
                                      i === oi ? e.target.value : v,
                                    ),
                                  },
                                })
                              }
                            />
                          </label>
                        </div>
                      ))}
                      <Button
                        type="button"
                        className="secondary"
                        disabled={q.options.length >= 6}
                        onClick={() =>
                          edit({
                            type: "question-edit",
                            id: q.id,
                            patch: { options: [...q.options, ""] },
                          })
                        }
                      >
                        Add option
                      </Button>
                      <Button
                        type="button"
                        className="secondary"
                        disabled={q.options.length <= 2}
                        onClick={() =>
                          edit({
                            type: "question-edit",
                            id: q.id,
                            patch: {
                              options: q.options.slice(0, -1),
                              correct: Math.min(
                                q.correct,
                                q.options.length - 2,
                              ),
                            },
                          })
                        }
                      >
                        Remove last option
                      </Button>
                    </fieldset>
                  )}
                  <label>
                    {q.kind === "response"
                      ? "Marking guidance"
                      : "Feedback after review"}
                    <textarea
                      value={q.guidance}
                      maxLength={2000}
                      onChange={(e) =>
                        edit({
                          type: "question-edit",
                          id: q.id,
                          patch: { guidance: e.target.value },
                        })
                      }
                    />
                  </label>
                  {order(
                    "question",
                    q.id,
                    `question ${qi + 1}`,
                    qi,
                    state.doc.questions.length,
                  )}
                </section>
              ))}
            </>
          )}
          {kind === "assignment-builder" && (
            <>
              <div className="row between">
                <h3>
                  Rubric ·{" "}
                  {state.doc.rubric.reduce(
                    (n, r) => n + (Number(r.points) || 0),
                    0,
                  )}{" "}
                  points
                </h3>
                <Button
                  type="button"
                  className="secondary"
                  disabled={state.doc.rubric.length >= 20}
                  onClick={() => edit({ type: "rubric-add" })}
                >
                  Add criterion
                </Button>
              </div>
              {state.doc.rubric.map((r, ri) => (
                <section className="panel form-grid" key={r.id}>
                  <label>
                    Criterion {ri + 1}
                    <input
                      value={r.title}
                      maxLength={160}
                      onChange={(e) =>
                        edit({
                          type: "rubric-edit",
                          id: r.id,
                          patch: { title: e.target.value },
                        })
                      }
                    />
                  </label>
                  <label>
                    Maximum points
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={r.points}
                      onChange={(e) =>
                        edit({
                          type: "rubric-edit",
                          id: r.id,
                          patch: { points: e.target.value },
                        })
                      }
                    />
                  </label>
                  <label>
                    Evidence and marking guidance
                    <textarea
                      value={r.guidance}
                      maxLength={2000}
                      onChange={(e) =>
                        edit({
                          type: "rubric-edit",
                          id: r.id,
                          patch: { guidance: e.target.value },
                        })
                      }
                    />
                  </label>
                  {order(
                    "rubric",
                    r.id,
                    `criterion ${ri + 1}`,
                    ri,
                    state.doc.rubric.length,
                  )}
                </section>
              ))}
            </>
          )}
          <section className="panel stack">
            <h3>Resource tray · {state.doc.resources.length}/10</h3>
            <label>
              Select local resources
              <input
                type="file"
                accept=".pdf,.txt,.csv,.png,.jpg,.jpeg"
                multiple
                onChange={(e) => {
                  void attach(e.target.files).catch(() =>
                    setErrors([
                      "Could not read this local resource. Try selecting it again.",
                    ]),
                  );
                  e.target.value = "";
                }}
              />
            </label>
            <p className="metadata">
              Up to 5MB each. Text/CSV previews up to 64KB; the first 5000
              characters are shown. Images preview locally. PDF contents are not
              rendered. No upload occurs.
            </p>
            {state.doc.resources.map((r) => (
              <article className="author-resource" key={r.id}>
                <strong>{r.name}</strong>
                <p>
                  {Math.ceil(r.size / 1024)}KB ·{" "}
                  {r.type || "Unknown media type"}
                </p>
                {r.text !== undefined && <pre>{r.text}</pre>}
                {r.uri && (
                  <Image
                    unoptimized
                    src={r.uri}
                    alt={`Local preview of ${r.name}`}
                    width={360}
                    height={220}
                  />
                )}
                <Button
                  type="button"
                  className="secondary"
                  onClick={() =>
                    edit({ type: "remove", collection: "resource", id: r.id })
                  }
                >
                  Remove {r.name}
                </Button>
              </article>
            ))}
          </section>
        </>
      )}
      <p role="status" className="callout">
        {state.notice ||
          "Draft remains on this screen until you leave or reset."}
      </p>
      {state.reviewed && (
        <div className="callout">
          <h3>Readiness reviewed locally</h3>
          <p>
            No course, assessment, assignment or resource has been published,
            assigned or uploaded.
          </p>
        </div>
      )}
    </section>
  );
}
function Inline({ text }: { text: string }) {
  return (
    <>
      {inlineParts(text).map((part, i) =>
        part.style === "strong" ? (
          <strong key={i}>{part.text}</strong>
        ) : part.style === "emphasis" ? (
          <em key={i}>{part.text}</em>
        ) : (
          part.text
        ),
      )}
    </>
  );
}
function RichBlock({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (text: string) => void;
}) {
  const input = useRef<HTMLTextAreaElement>(null);
  function apply(mark: "**" | "_") {
    const field = input.current;
    if (!field) return;
    const next = formatSelection(
      value,
      field.selectionStart,
      field.selectionEnd,
      mark,
    );
    if (next.text.length > 5000) return;
    onChange(next.text);
    requestAnimationFrame(() => {
      field.focus();
      field.setSelectionRange(next.start, next.end);
    });
  }
  return (
    <div className="stack">
      <label>
        {label}
        <textarea
          ref={input}
          maxLength={5000}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
      <div className="row wrap">
        <Button type="button" className="secondary" onClick={() => apply("**")}>
          Bold selection
        </Button>
        <Button type="button" className="secondary" onClick={() => apply("_")}>
          Emphasize selection
        </Button>
      </div>
    </div>
  );
}
function AuthorPreview({ doc, kind }: { doc: AuthorDocument; kind: string }) {
  const [answers, setAnswers] = useState<Record<string, string>>({}),
    [checked, setChecked] = useState(false);
  return (
    <article className="panel author-preview stack">
      <Badge>LEARNER PREVIEW / NOT ASSIGNED</Badge>
      <h2>{doc.title}</h2>
      <p>{doc.instructions}</p>
      {kind === "editor" &&
        doc.units.map((u) => (
          <section key={u.id}>
            <h3>{u.title}</h3>
            {u.lessons.map((l) => (
              <section key={l.id}>
                <h4>{l.title}</h4>
                {l.blocks.map((b) =>
                  b.kind === "heading" ? (
                    <h5 key={b.id}>
                      <Inline text={b.text} />
                    </h5>
                  ) : b.kind === "list" ? (
                    <ul key={b.id}>
                      {b.text
                        .split("\n")
                        .filter(Boolean)
                        .map((line, i) => (
                          <li key={i}>
                            <Inline text={line} />
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p key={b.id} className="preserve-lines">
                      <Inline text={b.text} />
                    </p>
                  ),
                )}
              </section>
            ))}
          </section>
        ))}
      {kind === "assessment-builder" && (
        <>
          {doc.questions.map((q, i) => (
            <fieldset key={q.id}>
              <legend>
                {i + 1}. {q.prompt} ({q.points} points)
              </legend>
              {q.kind === "choice" ? (
                q.options.map((o, oi) => (
                  <label key={oi}>
                    <input
                      type="radio"
                      name={`answer-${q.id}`}
                      checked={answers[q.id] === String(oi)}
                      onChange={() => {
                        setAnswers({ ...answers, [q.id]: String(oi) });
                        setChecked(false);
                      }}
                    />
                    {o}
                  </label>
                ))
              ) : (
                <label>
                  Written response
                  <textarea
                    value={answers[q.id] ?? ""}
                    onChange={(e) => {
                      setAnswers({ ...answers, [q.id]: e.target.value });
                      setChecked(false);
                    }}
                  />
                </label>
              )}
              {checked && (
                <p role="status">
                  {!answers[q.id]?.trim()
                    ? "No response entered."
                    : q.kind === "choice"
                      ? (Number(answers[q.id]) === q.correct
                          ? "Correct example response. "
                          : "Review the evidence. ") + q.guidance
                      : "Requires educator review; no automatic score."}
                </p>
              )}
            </fieldset>
          ))}
          <Button type="button" onClick={() => setChecked(true)}>
            Check practice responses
          </Button>
        </>
      )}
      {kind === "assignment-builder" && (
        <>
          <p>Due: {doc.due || "Not set"}</p>
          {doc.rubric.map((r) => (
            <section key={r.id}>
              <h3>
                {r.title} · {r.points} points
              </h3>
              <p>{r.guidance}</p>
            </section>
          ))}
        </>
      )}
      <h3>Resources</h3>
      {doc.resources.length ? (
        <ul>
          {doc.resources.map((r) => (
            <li key={r.id}>
              {r.name} · {Math.ceil(r.size / 1024)}KB
            </li>
          ))}
        </ul>
      ) : (
        <p>No resources attached.</p>
      )}
    </article>
  );
}
