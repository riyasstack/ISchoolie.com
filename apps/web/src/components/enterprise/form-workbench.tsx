"use client";
import { useRef, useState } from "react";
import { FileText, Check, ShieldCheck, Upload } from "lucide-react";
import { Button, Badge, Modal } from "../ui";
import {
  validateDraft,
  type Draft,
  type FieldSpec,
  type ScreenSpec,
} from "../../../../../packages/contracts/frontend";
export function Fields({
  fields,
  value,
  onChange,
  errors = {},
}: {
  fields: FieldSpec[];
  value: Draft;
  onChange: (draft: Draft) => void;
  errors?: Draft;
}) {
  return (
    <>
      {fields.map((f) => (
        <label key={f.key} htmlFor={`field-${f.key}`}>
          {f.label}
          {f.required && <span className="field-required">Required</span>}
          {f.type === "textarea" ? (
            <textarea
              id={`field-${f.key}`}
              value={value[f.key] ?? ""}
              maxLength={5000}
              aria-invalid={!!errors[f.key]}
              aria-describedby={errors[f.key] ? `error-${f.key}` : undefined}
              onChange={(e) => onChange({ ...value, [f.key]: e.target.value })}
            />
          ) : f.type === "select" ? (
            <select
              id={`field-${f.key}`}
              value={value[f.key] ?? ""}
              aria-invalid={!!errors[f.key]}
              aria-describedby={errors[f.key] ? `error-${f.key}` : undefined}
              onChange={(e) => onChange({ ...value, [f.key]: e.target.value })}
            >
              <option value="">Choose an example</option>
              {f.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              id={`field-${f.key}`}
              type={
                ["date", "time", "email", "url", "number"].includes(f.type)
                  ? f.type
                  : "text"
              }
              autoComplete="off"
              value={value[f.key] ?? ""}
              maxLength={500}
              min={f.type === "number" ? 0 : undefined}
              aria-invalid={!!errors[f.key]}
              aria-describedby={errors[f.key] ? `error-${f.key}` : undefined}
              onChange={(e) => onChange({ ...value, [f.key]: e.target.value })}
            />
          )}{" "}
          {errors[f.key] && (
            <span id={`error-${f.key}`} className="field-error">
              {errors[f.key]}
            </span>
          )}
        </label>
      ))}
    </>
  );
}
export function LocalFiles() {
  const [files, setFiles] = useState<string[]>([]),
    [error, setError] = useState("");
  return (
    <div className="local-files">
      <label>
        <Upload size={18} /> Attach an example resource
        <input
          type="file"
          accept=".pdf,.txt,.csv,.png,.jpg,.jpeg"
          multiple
          onChange={(e) => {
            const chosen = Array.from(e.target.files ?? []);
            const invalid = chosen.some(
              (f) =>
                f.size > 5 * 1024 * 1024 ||
                !/\.(pdf|txt|csv|png|jpe?g)$/i.test(f.name),
            );
            setError(
              invalid
                ? "Choose PDF, text, CSV, or image files up to 5MB each."
                : "",
            );
            setFiles(invalid ? [] : chosen.map((f) => f.name));
          }}
        />
      </label>
      <p className="metadata">
        Filenames remain local. No upload, scanning, or institutional storage
        occurs.
      </p>
      {error && (
        <p role="alert" className="field-error">
          {error}
        </p>
      )}
      {files.map((n) => (
        <p key={n}>
          <FileText size={14} />
          {n}
        </p>
      ))}
    </div>
  );
}
export function FormWorkbench({ spec }: { spec: ScreenSpec }) {
  const [draft, setDraft] = useState<Draft>({}),
    [errors, setErrors] = useState<Draft>({}),
    [saved, setSaved] = useState(false),
    [review, setReview] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const reviewTrigger = useRef<HTMLButtonElement>(null);
  const fields = spec.fields.length
    ? spec.fields
    : [
        {
          key: "review-note",
          label: "Review note",
          type: "textarea",
          required: true,
          options: [],
        },
      ];
  return (
    <div className="task-layout">
      <section className="panel task-form">
        <div className="row between">
          <h2>
            {["identity"].includes(spec.kind)
              ? "Your next step"
              : "Prepare a local draft"}
          </h2>
          <Badge tone={saved ? "green" : "amber"}>
            {saved ? "Draft reviewed locally" : "Not submitted"}
          </Badge>
        </div>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const result = validateDraft(fields, draft);
            setErrors(result);
            if (Object.keys(result).length) {
              requestAnimationFrame(() => summary.current?.focus());
              return;
            }
            setReview(true);
          }}
        >
          <div
            ref={summary}
            tabIndex={-1}
            role={Object.keys(errors).length ? "alert" : undefined}
          >
            {Object.keys(errors).length > 0 && (
              <div className="callout warning">
                <strong>Review the highlighted fields</strong>
                <ul>
                  {Object.entries(errors).map(([key, error]) => (
                    <li key={key}>
                      <a href={`#field-${key}`}>{error}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Fields
            fields={fields}
            value={draft}
            errors={errors}
            onChange={(v) => {
              setDraft(v);
              setSaved(false);
            }}
          />
          {["resources", "submission", "portfolio"].includes(spec.kind) && (
            <LocalFiles />
          )}
          <div className="row wrap">
            <Button ref={reviewTrigger} type="submit">
              Review example draft
            </Button>
            <Button
              className="secondary"
              type="button"
              onClick={() => {
                setDraft({});
                setErrors({});
                setSaved(false);
              }}
            >
              Clear draft
            </Button>
          </div>
          <p className="metadata" role="status">
            {saved
              ? "Reviewed in this page only. No official action occurred."
              : "Edits are held in memory and reset when this screen or context changes."}
          </p>
        </form>
      </section>
      <aside className="task-aside">
        <section className="panel">
          <ShieldCheck size={26} />
          <h3>Clear before consequential.</h3>
          <p>{spec.policy}</p>
          <ul className="task-checks">
            <li>
              <Check size={16} />
              Check the purpose and active context.
            </li>
            <li>
              <Check size={16} />
              Review required information and evidence.
            </li>
            <li>
              <Check size={16} />
              Keep the draft separate from an official record.
            </li>
          </ul>
        </section>
        {spec.sections.map(([title, body]) => (
          <section className="panel" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </section>
        ))}
      </aside>
      <Modal
        open={review}
        returnFocusTo={() => reviewTrigger.current}
        onOpenChange={setReview}
        title="Review your example draft"
        description="Nothing is sent to a server, published, approved, or signed."
      >
        <dl className="review-values">
          {fields.map((f) => (
            <div key={f.key}>
              <dt>{f.label}</dt>
              <dd>{draft[f.key] || "Not provided"}</dd>
            </div>
          ))}
        </dl>
        <div className="callout warning">
          This preview cannot create an account, grant consent, change grades,
          admit a learner, or move funds.
        </div>
        <Button
          className="space-top"
          onClick={() => {
            setSaved(true);
            setReview(false);
          }}
        >
          Finish local review
        </Button>
      </Modal>
    </div>
  );
}
