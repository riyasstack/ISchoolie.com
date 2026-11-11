import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import {
  reviewStates,
  screenStateContract,
  screenReviewReducer,
  initialScreenReview,
  reviewContentMounted,
  reviewContentVisible,
} from "../packages/contracts/screen-states.ts";
import { practiceQuestions } from "../packages/contracts/practice.ts";
import {
  nativeScreenPlan,
  reviewConsent,
} from "../packages/contracts/native-parity-state.ts";
const screens = JSON.parse(
  readFileSync(
    new URL("../packages/contracts/frontend-screens.json", import.meta.url),
    "utf8",
  ),
);
const contracts = screens.map(screenStateContract);
test("every one of 180 screens accounts for every state, with an action or explicit N/A reason", () => {
  assert.equal(contracts.length, 180);
  for (const c of contracts)
    for (const state of reviewStates) {
      assert.notEqual(
        Boolean(c.states[state]),
        Boolean(c.notApplicable[state]),
        c.id + " " + state,
      );
      if (c.states[state])
        for (const field of ["heading", "body", "action", "draft"])
          assert.ok(c.states[state][field], c.id + " " + state + " " + field);
    }
});
test("temporary failure states retain the same content generation for all screen contracts", () => {
  for (const c of contracts)
    for (const view of ["Loading", "Empty", "Error", "Offline", "Conflict"]) {
      assert.equal(c.states[view].draft, "retain");
      let state = screenReviewReducer(initialScreenReview, {
        type: "select",
        view,
      });
      assert.equal(state.epoch, 0);
      assert.equal(reviewContentMounted(state), true);
      assert.equal(reviewContentVisible(state), false);
      state = screenReviewReducer(state, { type: "recover" });
      assert.equal(state.epoch, 0);
      assert.equal(reviewContentVisible(state), true);
    }
});
test("restriction and expiry unmount prior content, reject ordinary ready selection and require explicit recovery", () => {
  for (const c of contracts)
    for (const view of ["Restricted", "Expired"]) {
      if (!c.states[view]) {
        assert.ok(c.notApplicable[view]);
        continue;
      }
      assert.equal(c.states[view].draft, "clear");
      let state = screenReviewReducer(initialScreenReview, {
        type: "select",
        view,
      });
      assert.equal(state.epoch, 1);
      assert.equal(reviewContentMounted(state), false);
      state = screenReviewReducer(state, { type: "select", view: "Ready" });
      assert.equal(state.view, view);
      state = screenReviewReducer(state, { type: "recover" });
      assert.equal(state.epoch, 2);
      assert.equal(reviewContentVisible(state), true);
    }
});
test("conflict discard remounts the fixture while keep-local preserves the current generation", () => {
  const conflict = screenReviewReducer(initialScreenReview, {
    type: "select",
    view: "Conflict",
  });
  assert.equal(screenReviewReducer(conflict, { type: "recover" }).epoch, 0);
  assert.equal(
    screenReviewReducer(conflict, { type: "recover", discard: true }).epoch,
    1,
  );
});
test("scope switches and reset clear local content even when returning to a permitted example", () => {
  let state = screenReviewReducer(initialScreenReview, {
    type: "scope",
    scope: "denied",
  });
  assert.equal(state.epoch, 1);
  assert.equal(reviewContentMounted(state), false);
  state = screenReviewReducer(state, { type: "scope", scope: "permitted" });
  assert.equal(state.epoch, 2);
  state = screenReviewReducer(state, { type: "reset" });
  assert.equal(state.epoch, 3);
});
test("read-only screens do not invent required review-note fields or mutation receipts", () => {
  const home = contracts.find((c) => c.id === "PUB-01");
  assert.ok(home.notApplicable.Validation);
  assert.ok(home.notApplicable.Reviewed);
  assert.ok(home.notApplicable.Restricted);
  assert.ok(home.notApplicable.Expired);
  const editor = contracts.find((c) => c.id === "EDU-07");
  for (const spec of screens.filter(
    (s) =>
      ["network", "directory", "communities"].includes(s.kind) &&
      !s.fields.length,
  ))
    assert.ok(screenStateContract(spec).notApplicable.Validation, spec.id);
  assert.ok(contracts.find((c) => c.id === "PAR-09").notApplicable.Validation);
  assert.ok(editor.states.Validation);
  assert.match(editor.states.Reviewed.body, /not proof of validation/);
  for (const c of contracts)
    assert.ok(!JSON.stringify(c).includes("review-note"));
});
test("native contracts exactly match native eligibility, preserving the public/operations boundary", () => {
  const native = contracts.filter((c) => c.native);
  assert.equal(native.length, screens.filter((s) => s.native).length);
  for (const c of native) assert.ok(!/^(PUB|ADM)-/.test(c.id));
});
test("web/native practice fixture has three valid distinct questions and consistent answer keys", () => {
  assert.equal(practiceQuestions.length, 3);
  for (const q of practiceQuestions) {
    assert.equal(new Set(q.options).size, q.options.length);
    assert.ok(q.answer >= 0 && q.answer < q.options.length);
    assert.ok(q.explanation.length > 20);
  }
});
test("every native-eligible screen has an explicit task plan, and unsupported empty tasks fail visibly", () => {
  for (const spec of screens) {
    const plan = nativeScreenPlan(spec);
    assert.equal(plan === "web-only", !spec.native, spec.id);
  }
  assert.throws(
    () =>
      nativeScreenPlan({
        id: "EX-UNKNOWN",
        kind: "unknown",
        native: true,
        rows: [],
        fields: [],
        sections: [],
      }),
    /No native task surface/,
  );
});
test("consent drafts require scoped categories, real dates, relationship evidence and explicit choices", () => {
  const valid = {
    selected: ["Academics"],
    purpose: "Inspect academic summary examples.",
    expiry: "2026-12-01",
    decision: "Allow selected categories",
    confirmed: true,
  };
  assert.match(reviewConsent(valid), /No consent or access granted/);
  for (const patch of [
    { selected: [] },
    { selected: ["Private inbox"] },
    { purpose: " " },
    { expiry: "2026-02-30" },
    { decision: "Grant everything" },
    { confirmed: false },
  ])
    assert.match(reviewConsent({ ...valid, ...patch }), /^Check/);
  assert.match(
    reviewConsent({ ...valid, decision: "Decline request", selected: [] }),
    /No consent or access granted/,
  );
});
// Persist source evidence separately from browser/device acceptance.
writeFileSync(
  new URL("../docs/module-00/screen-state-contracts.json", import.meta.url),
  JSON.stringify(contracts, null, 2) + "\n",
);
writeFileSync(
  new URL("../docs/module-00/native-screen-plans.json", import.meta.url),
  JSON.stringify(
    screens.map((spec) => ({
      id: spec.id,
      native: spec.native,
      plan: spec.id === "PRO-02" ? "native-profile" : nativeScreenPlan(spec),
      acceptance: "Unverified on device",
    })),
    null,
    2,
  ) + "\n",
);
