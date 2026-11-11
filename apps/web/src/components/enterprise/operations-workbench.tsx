"use client";
import { parseMinorUnits } from "../../../../../packages/contracts/authoring-state";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  Check,
  LockKeyhole,
  ShieldCheck,
  FileCheck2,
  ArrowUpRight,
  VideoOff,
  MicOff,
  AlertTriangle,
} from "lucide-react";
import { Badge, Button, Modal } from "../ui";
import { FormWorkbench } from "./form-workbench";
import { RecordWorkbench } from "./record-workbench";
import type { ScreenSpec } from "../../../../../packages/contracts/frontend";
export function ReviewWorkbench({ spec }: { spec: ScreenSpec }) {
  const reviewTrigger = useRef<HTMLButtonElement>(null);
  const [checked, setChecked] = useState<string[]>([]),
    [review, setReview] = useState(false);
  const checks = [
    "Purpose and scoped context recorded",
    "Evidence requirements identified",
    "Policy reference and reviewer separation checked",
    "No official outcome inferred from this preview",
  ];
  return (
    <div className="stack">
      <div className="case-header">
        <span className="case-icon">
          {spec.family === "ADM" ? (
            <LockKeyhole size={26} />
          ) : (
            <FileCheck2 size={26} />
          )}
        </span>
        <div>
          <Badge tone="amber">
            {spec.family === "ADM"
              ? "Synthetic training case"
              : "Example review"}
          </Badge>
          <h2>{spec.name}</h2>
          <p>
            EX-{spec.id} · No privileged identity · No actual evidence loaded
          </p>
        </div>
      </div>
      <div className="case-layout">
        <section className="panel">
          <h3>Evidence and purpose</h3>
          {spec.sections.map(([title, body]) => (
            <article className="evidence-section" key={title}>
              <h4>{title}</h4>
              <p>{body}</p>
            </article>
          ))}
          <h3 className="space-top">Review readiness</h3>
          <div className="checklist">
            {checks.map((c) => (
              <label key={c}>
                <input
                  type="checkbox"
                  checked={checked.includes(c)}
                  onChange={() =>
                    setChecked(
                      checked.includes(c)
                        ? checked.filter((x) => x !== c)
                        : [...checked, c],
                    )
                  }
                />
                <span>{c}</span>
              </label>
            ))}
          </div>
          <Button
            className="secondary"
            ref={reviewTrigger}
            disabled={checked.length !== checks.length}
            onClick={() => setReview(true)}
          >
            Inspect readiness summary
          </Button>
          <ol className="audit-timeline">
            <li>
              <span>01</span>
              <div>
                <strong>Example intake prepared</strong>
                <p>Only synthetic reference and context are visible.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Evidence review required</strong>
                <p>Authority, policy, and purpose must be established.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Official decision unavailable</strong>
                <p>
                  A local review cannot change an institutional or platform
                  record.
                </p>
              </div>
            </li>
          </ol>
        </section>
        <FormWorkbench spec={spec} />
      </div>
      <Modal
        open={review}
        returnFocusTo={() => reviewTrigger.current}
        onOpenChange={setReview}
        title="Readiness review"
        description="All checklist items have been inspected locally. No decision is approved or applied."
      >
        <ul className="task-checks">
          {checked.map((c) => (
            <li key={c}>
              <Check size={16} />
              {c}
            </li>
          ))}
        </ul>
        <div className="callout warning">
          This training interface has no authority to publish, approve,
          moderate, grant, or settle anything.
        </div>
      </Modal>
    </div>
  );
}
export function FinanceWorkbench({ spec }: { spec: ScreenSpec }) {
  const [charges, setCharges] = useState([
      { id: "EX-F01", label: "Learning resources", minor: 400000 },
      { id: "EX-F02", label: "Academic term", minor: 800000 },
    ]),
    [label, setLabel] = useState(""),
    [amount, setAmount] = useState(""),
    [error, setError] = useState("");
  const total = charges.reduce((sum, c) => sum + c.minor, 0);
  const money = (minor: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(minor / 100);
  return (
    <div className="stack">
      <div className="finance-summary">
        <div>
          <small>UNPOSTED EXAMPLE CHARGES</small>
          <strong>{money(total)}</strong>
          <p>Illustrative interface total · No real balance</p>
        </div>
        <div>
          <Badge tone="amber">Provider disconnected</Badge>
          <p>
            Verified allocation, settlement, and receipt states are unavailable.
          </p>
        </div>
      </div>
      <section className="panel">
        <h2>
          {spec.kind === "reconciliation"
            ? "Evidence before allocation."
            : "A clear, unposted schedule."}
        </h2>
        <div className="responsive-register">
          <table>
            <caption className="sr-only">Unposted fictional charges</caption>
            <thead>
              <tr>
                <th>Reference</th>
                <th>Charge</th>
                <th>Example amount</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {charges.map((c) => (
                <tr key={c.id}>
                  <td data-label="Reference">{c.id}</td>
                  <td data-label="Charge">{c.label}</td>
                  <td data-label="Example amount" className="numeric">
                    {money(c.minor)}
                  </td>
                  <td data-label="State">
                    <Badge tone="amber">Unposted example</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="callout warning space-top">
          No payment, fee assessment, adjustment, tax computation, balance, or
          settlement is genuine. Amounts are illustrative fixtures.
        </div>
      </section>
      {spec.id === "INS-23" && (
        <section className="panel">
          <h3>Explore a charge draft</h3>
          <form
            className="charge-form space-top"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              const minor = parseMinorUnits(amount);
              if (!label.trim() || minor === null) {
                setError(
                  "Enter a label and a positive example amount up to 100,000 with at most two decimal places.",
                );
                return;
              }
              setCharges([
                ...charges,
                {
                  id: `EX-LOCAL-${charges.length + 1}`,
                  label: label.trim(),
                  minor,
                },
              ]);
              setLabel("");
              setAmount("");
              setError("");
            }}
          >
            <label>
              Charge label
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                maxLength={100}
              />
            </label>
            <label>
              Illustrative INR amount
              <input
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
            <Button type="submit">Add unposted example</Button>
            {error && (
              <p role="alert" className="field-error">
                {error}
              </p>
            )}
          </form>
        </section>
      )}
      {spec.rows.length > 0 && <RecordWorkbench spec={spec} />}
    </div>
  );
}
export function OverviewWorkbench({ spec }: { spec: ScreenSpec }) {
  const [done, setDone] = useState<string[]>([]);
  return (
    <div className="overview-workbench">
      <section className="overview-intro">
        <div className="section-kicker">A CLEARER NEXT STEP</div>
        <h2>
          {spec.family === "ADM"
            ? "Purpose before access."
            : spec.family === "INS"
              ? "Keep your institution in focus."
              : spec.family === "PRO"
                ? "Your expertise, thoughtfully shared."
                : "A little progress, every day."}
        </h2>
        <p>{spec.summary}</p>
        <Badge>
          {spec.family === "ADM"
            ? "Synthetic training console"
            : "Example workspace"}
        </Badge>
      </section>
      <div className="overview-grid">
        {spec.sections.map(([title, body], i) => (
          <section className="panel" key={title}>
            <span className="overview-number">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
            <label className="inline-check">
              <input
                type="checkbox"
                checked={done.includes(title)}
                onChange={() =>
                  setDone(
                    done.includes(title)
                      ? done.filter((x) => x !== title)
                      : [...done, title],
                  )
                }
              />
              Reviewed locally
            </label>
          </section>
        ))}
      </div>
      <section className="panel">
        <h3>Continue in your workspace</h3>
        <div className="destination-grid">
          {spec.links.map((id) => (
            <Link href={`/preview/${id}`} key={id}>
              <span>{id}</span>
              <strong>
                {id.startsWith("INS")
                  ? "Institution task"
                  : id.startsWith("EDU")
                    ? "Teaching task"
                    : id.startsWith("PRO")
                      ? "Professional task"
                      : "Learning task"}
              </strong>
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
export function EditorialWorkbench({ spec }: { spec: ScreenSpec }) {
  const [selected, setSelected] = useState(0);
  const sections = spec.sections.length
    ? spec.sections
    : [
        [
          "People, knowledge, and possibility",
          "Education grows through thoughtful connections between learners, educators, families, and institutions.",
        ],
        [
          "One identity, clear boundaries",
          "Public professional identity never grants private academic access.",
        ],
        [
          "Designed with care",
          "This is a proposed frontend experience. Policies, claims, and official capabilities require approval.",
        ],
      ];
  return (
    <div className="editorial-workbench">
      <div className="editorial-lead">
        <ShieldCheck size={32} />
        <h2>{spec.summary}</h2>
        <p>
          {spec.id === "PUB-22"
            ? "Draft structure only. No final terms, consent instrument, or legal notice is effective."
            : "Thoughtful education begins with people and the boundaries that protect them."}
        </p>
      </div>
      <div
        className={spec.kind === "pricing" ? "plan-grid" : "editorial-sections"}
      >
        {sections.map(([title, body], i) => (
          <section key={title} className="panel">
            <span className="section-kicker">
              {spec.kind === "pricing" ? "OFFERING CONCEPT" : `0${i + 1}`}
            </span>
            <h3>{title}</h3>
            <p>{body}</p>
            {spec.kind === "pricing" && (
              <>
                <strong className="price-pending">
                  Terms pending approval
                </strong>
                <Button
                  className="secondary"
                  aria-pressed={selected === i}
                  onClick={() => setSelected(i)}
                >
                  {selected === i
                    ? "Selected for comparison"
                    : "Compare this concept"}
                </Button>
              </>
            )}
          </section>
        ))}
      </div>
      {spec.kind === "pricing" && (
        <div className="callout space-top" role="status">
          Selected: {sections[selected][0]}. No price, subscription, checkout,
          or entitlement is created.
        </div>
      )}
    </div>
  );
}
export function LiveWorkbench({ spec }: { spec: ScreenSpec }) {
  const [status, setStatus] = useState("Readiness not checked");
  return (
    <div className="task-layout">
      <section className="live-preview">
        <div className="live-viewport">
          <VideoOff size={45} />
          <h2>A considered learning space.</h2>
          <p>Live media is not connected.</p>
          <Badge>Example room · No participant tokens</Badge>
        </div>
        <div className="live-controls">
          <Button className="secondary" disabled>
            <MicOff size={17} />
            Microphone unavailable
          </Button>
          <Button className="secondary" disabled>
            <VideoOff size={17} />
            Camera unavailable
          </Button>
          <Button
            onClick={() =>
              setStatus(
                "Provider unavailable. No meeting was started and no media permissions were requested.",
              )
            }
          >
            Check example readiness
          </Button>
        </div>
        <p role="status" className="callout warning">
          <AlertTriangle size={17} />
          {status}
        </p>
      </section>
      <aside className="task-aside">
        {spec.sections.map(([title, body]) => (
          <section className="panel" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </section>
        ))}
      </aside>
    </div>
  );
}
export function SafeguardingWorkbench({ spec }: { spec: ScreenSpec }) {
  return (
    <div className="stack">
      <section className="restricted-hero">
        <LockKeyhole size={40} />
        <h2>Evidence stays protected.</h2>
        <p>
          Safeguarding content is redacted. A synthetic training context cannot
          grant specialist access or disclose child evidence.
        </p>
        <div className="restriction-grid">
          {[
            "Named specialist scope",
            "Approved purpose",
            "Restricted retention",
            "Audited escalation",
          ].map((item) => (
            <div key={item}>
              <ShieldCheck size={18} />
              {item}
            </div>
          ))}
        </div>
      </section>
      <FormWorkbench spec={spec} />
    </div>
  );
}
export function ResourceWorkbench({ spec }: { spec: ScreenSpec }) {
  return (
    <div className="stack">
      <FormWorkbench spec={spec} />
      {spec.rows.length > 0 && <RecordWorkbench spec={spec} />}
    </div>
  );
}
