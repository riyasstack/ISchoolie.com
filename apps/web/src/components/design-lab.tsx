"use client";
import { useState } from "react";
import { Check, Plus, ArrowUpRight, LockKeyhole } from "lucide-react";
import {
  Hint,
  ContextPopover,
  ActionMenu,
  DateField,
  Breadcrumbs,
  LoadingSkeleton,
} from "./product-primitives";
import { BrandReveal } from "./public-home";
import { PageHeading } from "./app-shell";
import { Avatar, Badge, Button, Empty, Meter, Modal, useNotice } from "./ui";
export function DesignLab() {
  const [state, setState] = useState("Ready"),
    [progress, setProgress] = useState(42);
  const notice = useNotice();
  const [date, setDate] = useState("");
  return (
    <>
      <PageHeading
        eyebrow="DESIGN LAB / PROPOSED SYSTEM"
        title="Connected knowledge. Considered detail."
        description="The actual foundation components and state contracts used in this preview."
      />
      <Breadcrumbs
        items={[
          { label: "Education network", href: "/app" },
          { label: "Design system" },
        ]}
      />
      <section className="panel space-top">
        <h3>Context & control</h3>
        <p>
          Styled accessible primitives with local examples. No account settings
          are changed.
        </p>
        <div className="row wrap space-top">
          <Hint label="The same action remains available by keyboard focus.">
            <Button
              className="secondary"
              onClick={() =>
                notice(
                  "Use Tab to focus and Enter or Space to activate this control.",
                )
              }
            >
              Keyboard hint
            </Button>
          </Hint>
          <ContextPopover
            title="A little context"
            trigger={
              <Button className="secondary">Open contextual panel</Button>
            }
          >
            <p>
              This panel keeps a small explanation beside its trigger. Escape
              closes it and returns focus.
            </p>
          </ContextPopover>
          <ActionMenu
            label="Example actions"
            trigger={<Button className="secondary">More options</Button>}
            items={[
              { label: "Reset example date", onSelect: () => setDate("") },
              {
                label: "Explain preview scope",
                onSelect: () =>
                  notice(
                    "Local component examples. Nothing is published or applied to an account.",
                  ),
              },
              {
                label: "Publish — unavailable",
                disabled: true,
                onSelect: () => {},
              },
            ]}
          />
        </div>
        <div className="space-top">
          <DateField label="Example date" value={date} onChange={setDate} />
          <p className="metadata">
            {date ? `Selected locally: ${date}` : "No date selected"}
          </p>
        </div>
        <div className="space-top">
          <h4>Loading skeleton specimen</h4>
          <LoadingSkeleton label="Static loading skeleton specimen" />
        </div>
      </section>
      <div className="lab-grid">
        <section className="panel">
          <h3>Palette</h3>
          <div className="swatches">
            {[
              "#FFFFFF",
              "#0071E3",
              "#F5F5F7",
              "#1D1D1F",
              "#86868B",
              "#E8F2FC",
            ].map((c) => (
              <div key={c}>
                <span style={{ background: c }} />
                <code>{c}</code>
              </div>
            ))}
          </div>
          <p className="metadata">
            Module 00 V3 palette. Existing violet logo preserved separately;
            interactive accents use blue.
          </p>
        </section>
        <section className="panel">
          <h3>Typography</h3>
          <h2 className="space-top">A world of possibility.</h2>
          <p className="space-top">
            Inter across the web and Android. Native system typography on Apple
            platforms.
          </p>
          <p className="mono space-top">EX-001 · 42% · 10 NOV 2026</p>
        </section>
        <section className="panel">
          <h3>Actions & feedback</h3>
          <div className="row wrap space-top">
            <Button onClick={() => notice("Example action completed locally.")}>
              <Plus size={16} />
              Primary action
            </Button>
            <Button
              className="secondary"
              onClick={() => notice("Secondary action feedback preview.")}
            >
              Secondary
            </Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="row space-top">
            <Badge tone="green">Ready</Badge>
            <Badge tone="amber">Pending</Badge>
            <Badge tone="red">Restricted</Badge>
            <Avatar name="Ananya Rao" />
          </div>
        </section>
        <section className="panel">
          <h3>Overlay choreography</h3>
          <p className="space-top">
            Animate UI + Radix: focus trap, Escape, click-outside, and focus
            restoration.
          </p>
          <Modal
            title="A considered interaction"
            description="This is the same animated dialog used for composition, search, and record detail."
            trigger={
              <Button className="secondary space-top">
                Open example dialog
                <ArrowUpRight size={16} />
              </Button>
            }
          >
            <label>
              Example input
              <input placeholder="Try keyboard navigation" />
            </label>
            <p className="space-top">
              Press Escape to close and return focus to the trigger.
            </p>
          </Modal>
        </section>
        <section className="panel">
          <h3>Progress</h3>
          <div className="space-top">
            <Meter value={progress} label="Adjustable example progress" />
          </div>
          <label className="space-top">
            Example progress: {progress}%
            <input
              type="range"
              value={progress}
              min="0"
              max="100"
              onChange={(e) => setProgress(Number(e.target.value))}
            />
          </label>
        </section>
        <section className="panel">
          <h3>Connected knowledge</h3>
          <BrandReveal />
          <p className="metadata">
            The first-visit mark reveal is decorative, finite, and skipped for
            reduced motion or data saving.
          </p>
        </section>
      </div>
      <section className="panel space-top">
        <div className="row between">
          <h3>Universal screen state preview</h3>
          <label>
            State
            <select value={state} onChange={(e) => setState(e.target.value)}>
              {[
                "Ready",
                "Loading",
                "Empty",
                "Validation error",
                "Service error",
                "Restricted",
                "Offline",
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="space-top">
          {state === "Ready" ? (
            <div className="callout">
              <Check size={18} />
              Example content is ready.
            </div>
          ) : state === "Loading" ? (
            <div
              className="skeleton"
              role="status"
              aria-label="Example loading state"
            >
              <span />
              <span />
              <span />
            </div>
          ) : state === "Empty" ? (
            <Empty title="A little space for something new">
              Example empty state with clear recovery.
            </Empty>
          ) : state === "Validation error" ? (
            <label>
              Course title
              <input aria-invalid="true" aria-describedby="lab-error" />
              <span id="lab-error" className="field-error">
                Enter a title before continuing.
              </span>
            </label>
          ) : state === "Restricted" ? (
            <div className="callout">
              <LockKeyhole size={20} />
              You need an authorized relationship to view this information.
            </div>
          ) : (
            <div className="callout warning">
              <strong>
                {state === "Offline"
                  ? "You appear to be offline."
                  : "This example service is unavailable."}
              </strong>
              <p>
                No changes have been submitted. Your draft stays on this page.
              </p>
              <Button
                className="secondary small space-top"
                onClick={() => setState("Ready")}
              >
                Retry preview
              </Button>
            </div>
          )}
        </div>
      </section>
      <p className="metadata space-top">
        Use the operating system’s reduced-motion setting to inspect the real
        fallback. This gallery does not replace per-screen QA.
      </p>
    </>
  );
}
