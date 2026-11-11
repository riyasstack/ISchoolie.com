"use client";
import { useState } from "react";
import { Button, Badge } from "../ui";
import {
  consentCategories,
  consentDecisions,
  reviewConsent,
} from "../../../../../packages/contracts/native-parity-state";
export function ConsentWorkbench() {
  const [selected, setSelected] = useState<string[]>([]),
    [purpose, setPurpose] = useState(""),
    [expiry, setExpiry] = useState(""),
    [decision, setDecision] = useState(""),
    [confirmed, setConfirmed] = useState(false),
    [notice, setNotice] = useState("");
  return (
    <section className="panel stack">
      <Badge>EXAMPLE CHILD / AARAV</Badge>
      <h2>Review only the intended categories.</h2>
      <p>
        This draft creates no legal consent, verified relationship or actual
        access.
      </p>
      <form
        className="stack"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setNotice(
            reviewConsent({ selected, purpose, expiry, decision, confirmed }),
          );
        }}
      >
        <fieldset>
          <legend>Requested categories</legend>
          {consentCategories.map((category) => (
            <label key={category} className="checkbox-label">
              <input
                type="checkbox"
                checked={selected.includes(category)}
                onChange={() => {
                  setSelected(
                    selected.includes(category)
                      ? selected.filter((c) => c !== category)
                      : [...selected, category],
                  );
                  setNotice("");
                }}
              />
              {category}
            </label>
          ))}
        </fieldset>
        <label>
          Purpose for this draft
          <textarea
            value={purpose}
            maxLength={2000}
            onChange={(e) => {
              setPurpose(e.target.value);
              setNotice("");
            }}
          />
        </label>
        <label>
          Review expiry
          <input
            type="date"
            value={expiry}
            onChange={(e) => {
              setExpiry(e.target.value);
              setNotice("");
            }}
          />
        </label>
        <label>
          Response draft
          <select
            value={decision}
            onChange={(e) => {
              setDecision(e.target.value);
              setNotice("");
            }}
          >
            <option value="">Choose a response</option>
            {consentDecisions.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => {
              setConfirmed(e.target.checked);
              setNotice("");
            }}
          />
          I inspected the example relationship evidence.
        </label>
        <Button type="submit">Review approval draft</Button>
        {notice && (
          <p role="status" className="callout">
            {notice}
          </p>
        )}
      </form>
    </section>
  );
}
