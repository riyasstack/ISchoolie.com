"use client";
import { useState } from "react";
import { Button, Badge } from "../ui";
import {
  advanceCase,
  caseSteps,
  caseDecisions,
  initialCase,
  changeCaseDraft,
  revisitCase,
  type CaseKind,
} from "../../../../../packages/contracts/authoring-state";
export function CaseWorkbench({ kind }: { kind: CaseKind }) {
  const [draft, setDraft] = useState(initialCase),
    [reset, setReset] = useState(false),
    [offline, setOffline] = useState(false);
  const update = (patch: Partial<typeof draft>) =>
    setDraft(changeCaseDraft(draft, patch));
  return (
    <section
      className="panel stack case-lifecycle"
      aria-label={`${kind} draft lifecycle`}
    >
      <div className="row between">
        <div>
          <span className="section-kicker">LOCAL CASE DESK</span>
          <h2>{caseSteps[kind][draft.stage]}</h2>
        </div>
        <Badge>Stage {draft.stage + 1}/3</Badge>
      </div>
      {draft.stage > 0 && (
        <p className="metadata">
          Source details are read-only here. Revisit stage one to change
          evidence.
        </p>
      )}
      <ol className="case-stages">
        {caseSteps[kind].map((label, i) => (
          <li key={label} aria-current={draft.stage === i ? "step" : undefined}>
            {i < draft.stage ? "✓ " : ""}
            {label}
          </li>
        ))}
      </ol>
      <div className="row wrap">
        <Button
          type="button"
          className="secondary"
          disabled={draft.stage === 0}
          onClick={() => setDraft(revisitCase(draft, draft.stage - 1))}
        >
          Revisit previous stage
        </Button>
        {draft.outcome && (
          <Button
            type="button"
            className="secondary"
            onClick={() => setDraft(revisitCase(draft, draft.stage))}
          >
            Revise final response
          </Button>
        )}
      </div>
      <div className="callout">
        {kind === "admissions"
          ? "Example application EX-APP-101: transcript present; guardian consent evidence awaits review. Draft a request or recommendation; do not mark a learner admitted."
          : kind === "marks"
            ? "Example learner EX-101 · Science inquiry · maximum 100. Moderation and release remain local review stages."
            : kind === "reconciliation"
              ? "Example statement line: EX-PAY-101 · 1250.00. Compare the reference and exact amount. No bank statement is imported and no charge is settled."
              : kind === "bookings"
                ? "Example request EX-BOOK-101 · 30-minute observation studio. A proposed date/time is a response draft, not a confirmed slot."
                : "Review sample content, intended audience and resource rights. No content or timetable is published."}
      </div>
      {!draft.outcome && (
        <form
          className="form-grid"
          onSubmit={(e) => {
            e.preventDefault();
            if (!offline) setDraft(advanceCase(kind, draft));
          }}
        >
          <label className="span-all">
            Response draft
            <select
              value={draft.decision}
              onChange={(e) => update({ decision: e.target.value })}
            >
              <option value="">Choose a local response</option>
              {caseDecisions[kind].map((decision) => (
                <option key={decision}>{decision}</option>
              ))}
            </select>
          </label>
          {kind === "marks" && (
            <label>
              Draft mark out of 100
              <input
                type="number"
                min={0}
                max={100}
                step="0.01"
                value={draft.value}
                disabled={draft.stage > 0}
                onChange={(e) => update({ value: e.target.value })}
              />
            </label>
          )}
          {kind === "reconciliation" && (
            <>
              <label>
                Statement reference
                <input
                  value={draft.reference}
                  disabled={draft.stage > 0}
                  onChange={(e) => update({ reference: e.target.value })}
                />
              </label>
              <label>
                Statement amount
                <input
                  inputMode="decimal"
                  value={draft.value}
                  disabled={draft.stage > 0}
                  onChange={(e) => update({ value: e.target.value })}
                />
              </label>
            </>
          )}
          {kind === "bookings" && (
            <>
              <label>
                Proposed date
                <input
                  type="date"
                  value={draft.date}
                  disabled={draft.stage > 0}
                  onChange={(e) => update({ date: e.target.value })}
                />
              </label>
              <label>
                Proposed time
                <input
                  type="time"
                  value={draft.time}
                  disabled={draft.stage > 0}
                  onChange={(e) => update({ time: e.target.value })}
                />
              </label>
            </>
          )}
          <label className="span-all">
            Stage review note
            <textarea
              maxLength={2000}
              value={draft.note}
              onChange={(e) => update({ note: e.target.value })}
            />
          </label>
          <label className="checkbox-label span-all">
            <input
              type="checkbox"
              checked={draft.checked}
              onChange={(e) => update({ checked: e.target.checked })}
            />
            I checked the example evidence for this stage.
          </label>
          {draft.error && (
            <p role="alert" className="field-error span-all">
              {draft.error}
            </p>
          )}
          <Button type="submit" disabled={offline}>
            Review this stage locally
          </Button>
        </form>
      )}
      {draft.outcome && (
        <p role="status" className="callout">
          {draft.outcome}
        </p>
      )}
      <details open={draft.history.length > 0}>
        <summary>Local review history ({draft.history.length})</summary>
        <ol>
          {draft.history.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ol>
      </details>
      <div className="row wrap">
        <Button
          type="button"
          className="secondary"
          aria-pressed={offline}
          onClick={() => setOffline(!offline)}
        >
          {offline ? "Restore connection" : "Simulate offline"}
        </Button>
        <Button
          type="button"
          className="secondary"
          onClick={() => setReset(true)}
        >
          Start another response draft
        </Button>
      </div>
      {offline && (
        <p role="status">
          Offline simulation: draft retained; stage review is paused.
        </p>
      )}
      {reset && (
        <div className="callout">
          <p>Discard the current response and local history?</p>
          <Button
            type="button"
            onClick={() => {
              setDraft(initialCase());
              setReset(false);
            }}
          >
            Discard response
          </Button>
          <Button
            type="button"
            className="secondary"
            onClick={() => setReset(false)}
          >
            Keep draft
          </Button>
        </div>
      )}
    </section>
  );
}
