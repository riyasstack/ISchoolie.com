"use client";
import { useReducer, type ReactNode } from "react";
import { Button, Badge } from "../ui";
import {
  initialScreenReview,
  reviewStates,
  screenReviewReducer,
  screenStateContract,
  reviewContentMounted,
  reviewContentVisible,
  type ReviewState,
} from "../../../../../packages/contracts/screen-states";
import type { ScreenSpec } from "../../../../../packages/contracts/frontend";
export function ScreenStateBoundary({
  spec,
  children,
  ownsHeading = false,
  initialView = "Ready",
}: {
  spec: ScreenSpec;
  children: ReactNode;
  ownsHeading?: boolean;
  initialView?: ReviewState;
}) {
  const [state, dispatch] = useReducer(
      screenReviewReducer,
      initialView,
      (view) =>
        screenReviewReducer(initialScreenReview, { type: "select", view }),
    ),
    contract = screenStateContract(spec),
    copy = contract.states[state.view]!;
  const visible = reviewContentVisible(state);
  const Heading = ownsHeading && !visible ? "h1" : "h2";
  return (
    <section
      className="screen-state-boundary"
      aria-label={spec.id + " state review"}
      data-state-contract={spec.id}
      data-state-view={state.view}
    >
      <div className="state-review-controls">
        <label>
          Example state for {spec.id}
          <select
            value={state.view}
            onChange={(e) =>
              dispatch({ type: "select", view: e.target.value as ReviewState })
            }
          >
            {reviewStates
              .filter((s) => contract.states[s])
              .map((s) => (
                <option
                  key={s}
                  disabled={
                    (state.scope === "denied" || state.session === "expired") &&
                    s !== state.view
                  }
                >
                  {s}
                </option>
              ))}
          </select>
        </label>
        {["PAR", "INS", "ADM"].includes(spec.family) && (
          <label>
            Fictional scoped context
            <select
              value={state.scope}
              onChange={(e) =>
                dispatch({
                  type: "scope",
                  scope: e.target.value as "permitted" | "denied",
                })
              }
            >
              <option value="permitted">Permitted example</option>
              <option value="denied">Awaiting authorization</option>
            </select>
          </label>
        )}
        <Badge>
          {state.view} ·{" "}
          {copy.draft === "clear"
            ? "Scoped drafts cleared"
            : "In-screen work retained"}
        </Badge>
      </div>
      {state.view !== "Ready" && (
        <section
          className={
            "panel recovery-panel " +
            (state.view === "Loading" ? "skeleton" : "")
          }
          aria-live="polite"
        >
          <Heading>{copy.heading}</Heading>
          <p>{copy.body}</p>
          {state.view === "Loading" && (
            <div className="state-skeleton" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          )}
          <div className="row wrap">
            <Button
              type="button"
              className="secondary"
              onClick={() => dispatch({ type: "recover" })}
            >
              {copy.action}
            </Button>
            {state.view === "Conflict" && (
              <Button
                type="button"
                className="secondary"
                onClick={() => dispatch({ type: "recover", discard: true })}
              >
                Discard local view and reload fixture
              </Button>
            )}
          </div>
        </section>
      )}
      {reviewContentMounted(state) && (
        <div key={state.epoch} hidden={!visible} className="state-task-content">
          {children}
        </div>
      )}
      {Object.keys(contract.notApplicable).length > 0 && (
        <details className="state-applicability">
          <summary>States that do not apply</summary>
          <ul>
            {Object.entries(contract.notApplicable).map(([name, reason]) => (
              <li key={name}>
                {name}: {reason}
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
