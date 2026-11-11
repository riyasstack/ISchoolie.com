"use client";
import { useReducer, useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  LockKeyhole,
} from "lucide-react";
import { AppShell, PageHeading } from "../app-shell";
import { Badge, Button } from "../ui";
import { Fields } from "./form-workbench";
import contracts from "../../../../../packages/contracts/frontend-workflows.json";
import {
  CSV_DRAFT_KEY,
  DEFAULT_EXAMPLE_CSV,
  flowReducer,
  initialFlow,
  parsePreviewCsv,
  validateDraft,
  type Draft,
  type WorkflowSpec,
} from "../../../../../packages/contracts/frontend";
export const workflowSpecs = contracts as WorkflowSpec[];
function ImportExample({
  csv,
  onChange,
}: {
  csv: string;
  onChange: (value: string) => void;
}) {
  const [inspected, setInspected] = useState<string | null>(null);
  const parsed = parsePreviewCsv(csv);
  return (
    <section className="import-preview">
      <h3>Validate a sample CSV</h3>
      <label>
        Example rows
        <textarea
          value={csv}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          maxLength={50000}
        />
      </label>
      <p className="metadata">
        Required headers: id, name, class. Up to 50 rows. No upload or import is
        performed.
      </p>
      <Button
        type="button"
        className="secondary"
        onClick={() => setInspected(csv)}
      >
        Validate local example
      </Button>
      {parsed.errors.length > 0 ? (
        <ul className="field-error">
          {parsed.errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      ) : (
        <div className="callout">
          {parsed.rows.length} syntactically valid example rows.{" "}
          {inspected === csv
            ? "Inspected locally."
            : "Continue also validates the current text."}
        </div>
      )}
      <div className="responsive-register">
        <table>
          <thead>
            <tr>
              {parsed.headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parsed.rows.slice(0, 5).map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j} data-label={parsed.headers[j]}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
function StageForm({
  workflow,
  index,
  initial,
  onNext,
  onDraft,
}: {
  workflow: WorkflowSpec;
  index: number;
  initial: Draft;
  onNext: (draft: Draft) => void;
  onDraft: (draft: Draft) => void;
}) {
  const stage = workflow.steps[index];
  const [draft, setDraft] = useState(initial),
    [errors, setErrors] = useState<Draft>({});
  const summary = useRef<HTMLDivElement>(null);
  return (
    <form
      className="panel workflow-stage"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const result = validateDraft(stage.fields, draft);
        if (workflow.id === "W33" && index === 0) {
          const parsed = parsePreviewCsv(
            draft[CSV_DRAFT_KEY] ?? DEFAULT_EXAMPLE_CSV,
          );
          if (parsed.errors.length || !parsed.rows.length)
            result.csv =
              parsed.errors.join(" ") || "Add at least one example row.";
        }
        setErrors(result);
        if (Object.keys(result).length) {
          requestAnimationFrame(() => summary.current?.focus());
          return;
        }
        onNext(draft);
      }}
    >
      <div className="row between">
        <Badge>
          STEP {index + 1} OF {workflow.steps.length}
        </Badge>
        <Link href={`/preview/${stage.screenId}`} className="text-link">
          Inspect screen {stage.screenId}
          <ArrowRight size={16} />
        </Link>
      </div>
      <h2>{stage.title}</h2>
      <p>{stage.instruction}</p>
      {Object.keys(errors).length > 0 && (
        <div
          className="callout warning"
          role="alert"
          tabIndex={-1}
          ref={summary}
        >
          <strong>Review the draft</strong>
          <ul>
            {Object.entries(errors).map(([key, message]) => (
              <li key={key}>{message}</li>
            ))}
          </ul>
        </div>
      )}
      {workflow.id === "W33" && index === 0 && (
        <ImportExample
          csv={draft[CSV_DRAFT_KEY] ?? DEFAULT_EXAMPLE_CSV}
          onChange={(csv) => {
            const next = { ...draft, [CSV_DRAFT_KEY]: csv };
            setDraft(next);
            onDraft(next);
          }}
        />
      )}
      <Fields
        fields={stage.fields}
        value={draft}
        onChange={(v) => {
          setDraft(v);
          onDraft(v);
        }}
        errors={errors}
      />
      {workflow.id === "W29" && index === 0 && (
        <div className="sample-assistance">
          <Badge>Example assistance · Not generated</Badge>
          <p>
            Start with what you can observe, describe it specifically, then ask
            a question that could lead to an investigation. This is a fixed
            interface example, not a live AI response.
          </p>
        </div>
      )}
      <div className="callout">
        <LockKeyhole size={16} />
        {stage.boundary}
      </div>
      <Button type="submit">
        {index === workflow.steps.length - 1
          ? "Finish local walkthrough"
          : "Review and continue"}
        <ArrowRight size={16} />
      </Button>
    </form>
  );
}
export function WorkflowPreview({ workflow }: { workflow: WorkflowSpec }) {
  const [state, dispatch] = useReducer(flowReducer, initialFlow),
    [failure, setFailure] = useState("Online example"),
    [generation, setGeneration] = useState(0),
    [context, setContext] = useState("Example context A");
  return (
    <AppShell>
      <Link href="/design-lab/workflows" className="text-link back-link">
        <ArrowLeft size={16} />
        All workflow designs
      </Link>
      <PageHeading
        eyebrow={`${workflow.id} / LOCAL WORKFLOW PROTOTYPE`}
        title={workflow.name}
        description="A connected, stateful walkthrough over fictional context. Finishing never performs an official transaction."
        action={
          <Badge tone="amber">
            {workflow.sensitive
              ? "Consequential steps stay restricted"
              : "Example data only"}
          </Badge>
        }
      />
      <div className="workflow-layout">
        <aside className="panel workflow-outline">
          <h3>Your path</h3>
          <label className="space-top">
            Example scope
            <select
              value={context}
              onChange={(e) => {
                setContext(e.target.value);
                dispatch({ type: "reset" });
                setGeneration(generation + 1);
              }}
            >
              <option>Example context A</option>
              <option>Example context B</option>
            </select>
          </label>
          <ol>
            {workflow.steps.map((s, i) => (
              <li
                key={`${i}-${s.screenId}`}
                aria-current={i === state.step ? "step" : undefined}
              >
                <span>
                  {i < state.step || state.status === "reviewed" ? (
                    <Check size={15} />
                  ) : (
                    i + 1
                  )}
                </span>
                <div>
                  <strong>{s.title}</strong>
                  <small>{s.screenId}</small>
                </div>
              </li>
            ))}
          </ol>
          <label>
            Connection example
            <select
              value={failure}
              onChange={(e) => {
                setFailure(e.target.value);
                if (e.target.value === "Authorization expired")
                  dispatch({ type: "reset" });
              }}
            >
              {[
                "Online example",
                "Offline",
                "Service error",
                "Version conflict",
                "Authorization expired",
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <p className="metadata space-top">
            Failure states preserve reviewed local steps. They do not imply
            server retries or committed changes.
          </p>
        </aside>
        <div>
          {failure === "Online example" && state.status === "reviewed" ? (
            <section className="panel workflow-summary">
              <Badge tone="green">LOCAL WALKTHROUGH REVIEWED</Badge>
              <h2>You’ve inspected this path.</h2>
              <p>
                No account, grant, publication, academic decision, reservation,
                payment, message delivery, or official record was created.
              </p>
              <ol className="audit-timeline">
                {state.events.map((e) => (
                  <li key={e}>
                    <Check size={17} />
                    <span>{e}</span>
                  </li>
                ))}
              </ol>
              <details>
                <summary>Review the example information</summary>
                {Object.entries(state.drafts).map(([stage, draft]) => (
                  <section key={stage}>
                    <h3>{workflow.steps[Number(stage)].title}</h3>
                    <dl className="review-values">
                      {Object.entries(draft).map(([key, value]) => (
                        <div key={key}>
                          <dt>
                            {key === CSV_DRAFT_KEY
                              ? "CSV sample"
                              : (workflow.steps[Number(stage)].fields.find(
                                  (f) => f.key === key,
                                )?.label ?? key)}
                          </dt>
                          <dd>
                            {key === CSV_DRAFT_KEY
                              ? parsePreviewCsv(value).rows.length +
                                " local rows; not imported"
                              : value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                ))}
              </details>
              <Button
                className="secondary"
                onClick={() => dispatch({ type: "back" })}
              >
                Revisit final stage
              </Button>
              <Button
                className="secondary"
                onClick={() => {
                  dispatch({ type: "reset" });
                  setGeneration(generation + 1);
                }}
              >
                <RotateCcw size={16} />
                Restart the local walkthrough
              </Button>
            </section>
          ) : failure === "Online example" ? (
            <StageForm
              key={`${state.step}-${generation}`}
              workflow={workflow}
              index={state.step}
              initial={state.drafts[state.step] ?? {}}
              onDraft={(draft) => dispatch({ type: "draft-changed", draft })}
              onNext={(draft) =>
                dispatch({ type: "next", draft, steps: workflow.steps.length })
              }
            />
          ) : (
            <section className="panel recoverable-state">
              <Badge tone="amber">{failure}</Badge>
              <h2>
                {failure === "Version conflict"
                  ? "Inspect the latest example before continuing."
                  : "This step is paused safely."}
              </h2>
              <p>
                Previously reviewed steps remain in memory. No official action
                is assumed successful. The permitted example draft is preserved
                on retry; expired authorization clears all scoped drafts.
              </p>
              <Button
                className="secondary"
                onClick={() => {
                  setFailure("Online example");
                  setGeneration(generation + 1);
                }}
              >
                Retry local step
              </Button>
            </section>
          )}
          {state.step > 0 && state.status !== "reviewed" && (
            <Button
              className="secondary space-top"
              disabled={failure !== "Online example"}
              onClick={() => dispatch({ type: "back" })}
            >
              <ArrowLeft size={16} />
              Previous reviewed step
            </Button>
          )}
        </div>
      </div>
    </AppShell>
  );
}
export function WorkflowExplorer() {
  const [query, setQuery] = useState("");
  return (
    <AppShell>
      <PageHeading
        eyebrow="MODULE 00 / WORKFLOW EXPLORER"
        title="Follow the whole path."
        description="Forty connected local walkthroughs. All consequential transitions are explicitly non-transactional."
      />
      <div className="explorer-tools">
        <label>
          Find a workflow
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try guardian, admissions, or W33"
          />
        </label>
        <Link className="button secondary" href="/design-lab/screens">
          Explore 180 screen designs
        </Link>
      </div>
      <div className="workflow-catalog">
        {workflowSpecs
          .filter((w) =>
            `${w.id} ${w.name}`.toLowerCase().includes(query.toLowerCase()),
          )
          .map((w) => (
            <Link href={w.route} key={w.id}>
              <Badge>{w.id}</Badge>
              <div>
                <h2>{w.name}</h2>
                <p>{w.steps.map((s) => s.title).join(" → ")}</p>
              </div>
              <span>
                {w.steps.length} steps
                <ArrowRight size={18} />
              </span>
            </Link>
          ))}
      </div>
    </AppShell>
  );
}
