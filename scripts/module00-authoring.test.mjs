import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  formatSelection,
  inlineParts,
  initialAuthor,
  authorReducer as reduce,
  authorErrors,
  validateResource,
  initialCase,
  advanceCase,
  caseSteps,
  caseDecisions,
  parseMinorUnits,
  reviewGrade,
  availabilityErrors,
  inspectAvailability,
  validDate,
} from "../packages/contracts/authoring-state.ts";
test("inline formatting clamps selection and treats HTML as inert text", () => {
  assert.deepEqual(formatSelection("Evidence", 0, 8, "**"), {
    text: "**Evidence**",
    start: 2,
    end: 10,
  });
  assert.equal(formatSelection("Hi", 999, 999, "_").text, "Hi_text_");
  assert.deepEqual(inlineParts("A **clear** _idea_ <script>x</script>"), [
    { text: "A ", style: "plain" },
    { text: "clear", style: "strong" },
    { text: " ", style: "plain" },
    { text: "idea", style: "emphasis" },
    { text: " <script>x</script>", style: "plain" },
  ]);
});

test("module, lesson and block ordering preserves stable identity and nested content", () => {
  let s = initialAuthor();
  const original = s.doc.units[0];
  s = reduce(s, { type: "unit-add" });
  const id = s.doc.units[1].id;
  s = reduce(s, { type: "lesson-add", unit: id });
  const lesson = s.doc.units[1].lessons[0].id;
  s = reduce(s, { type: "block-add", lesson, kind: "list" });
  const block = s.doc.units[1].lessons[0].blocks[0].id;
  s = reduce(s, {
    type: "block-edit",
    id: block,
    value: "Evidence one\nEvidence two",
  });
  s = reduce(s, { type: "move", collection: "unit", id, delta: -1 });
  assert.equal(
    s.doc.units[0].lessons[0].blocks[0].text,
    "Evidence one\nEvidence two",
  );
  assert.deepEqual(s.doc.units[1], original);
  s = reduce(s, { type: "remove", collection: "unit", id });
  assert.deepEqual(s.doc.units, [original]);
});
test("snapshot is independent of edits; conflict and offline saves do not overwrite it", () => {
  let s = reduce(initialAuthor(), { type: "save" });
  const snapshot = s.saved.title;
  s = reduce(s, { type: "meta", key: "title", value: "Unsaved draft" });
  assert.equal(s.saved.title, snapshot);
  s = reduce(s, { type: "offline" });
  s = reduce(s, { type: "save" });
  assert.equal(s.saved.title, snapshot);
  s = reduce(s, { type: "offline" });
  s = reduce(s, { type: "remote" });
  s = reduce(s, { type: "save" });
  assert.equal(s.saved.title, snapshot);
  s = reduce(s, { type: "review", kind: "editor" });
  assert.equal(s.reviewed, false);
  s = reduce(s, { type: "resolve-local" });
  assert.equal(s.doc.title, "Unsaved draft");
  assert.equal(s.dirty, true);
  s = reduce(s, { type: "save" });
  assert.equal(s.saved.title, "Unsaved draft");
  s = reduce(s, { type: "meta", key: "title", value: "Another unsaved edit" });
  s = reduce(s, { type: "remote" });
  s = reduce(s, { type: "resolve-saved" });
  assert.equal(s.doc.title, "Unsaved draft");
  assert.equal(s.dirty, false);
});
test("review cannot bypass invalid curriculum and edits invalidate prior review", () => {
  let s = reduce(initialAuthor(), { type: "review", kind: "editor" });
  assert.equal(s.reviewed, true);
  s = reduce(s, { type: "block-edit", id: "b4", value: "  " });
  assert.equal(s.reviewed, false);
  s = reduce(s, { type: "review", kind: "editor" });
  assert.equal(s.reviewed, false);
  assert.ok(authorErrors(s.doc, "editor").length);
});
test("assessment validates distinct options, answer key, positive integral points and written guidance", () => {
  let s = initialAuthor();
  assert.deepEqual(authorErrors(s.doc, "assessment-builder"), []);
  for (const patch of [
    { options: ["same", " SAME "] },
    { correct: 7 },
    { points: "0" },
    { points: "1.5" },
    { prompt: " " },
  ]) {
    const next = reduce(s, { type: "question-edit", id: "q5", patch });
    assert.ok(authorErrors(next.doc, "assessment-builder").length);
  }
  s = reduce(s, { type: "question-add", kind: "response" });
  const id = s.doc.questions[1].id;
  s = reduce(s, {
    type: "question-edit",
    id,
    patch: {
      prompt: "Explain your evidence.",
      guidance: "Look for precise observations.",
    },
  });
  assert.deepEqual(authorErrors(s.doc, "assessment-builder"), []);
  s = reduce(s, { type: "move", collection: "question", id, delta: -1 });
  assert.equal(s.doc.questions[0].id, id);
});
test("assignment review requires a real due date and complete bounded rubric scores", () => {
  let s = initialAuthor();
  assert.ok(authorErrors(s.doc, "assignment-builder").length);
  s = reduce(s, { type: "meta", key: "due", value: "2026-02-30" });
  assert.ok(authorErrors(s.doc, "assignment-builder").length);
  s = reduce(s, { type: "meta", key: "due", value: "2026-11-30" });
  assert.deepEqual(authorErrors(s.doc, "assignment-builder"), []);
  s = reduce(s, { type: "rubric-edit", id: "r6", patch: { points: "100" } });
  assert.ok(authorErrors(s.doc, "assignment-builder").length);
});
test("resource admission rejects unsupported and unknown/oversized sizes and deduplicates attachments", () => {
  for (const resource of [
    { name: "x.exe", size: 1 },
    { name: "x.txt", size: NaN },
    { name: "x.pdf", size: 6 * 1024 * 1024 },
    { name: "x.jpg", size: -1 },
  ])
    assert.ok(validateResource(resource));
  let s = initialAuthor();
  const resource = {
    name: "notes.txt",
    size: 42,
    type: "text/plain",
    text: "Evidence",
  };
  s = reduce(s, { type: "resource-add", resource });
  s = reduce(s, { type: "resource-add", resource });
  assert.equal(s.doc.resources.length, 1);
  assert.deepEqual(authorErrors(s.doc, "resources"), []);
  s = reduce(s, {
    type: "remove",
    collection: "resource",
    id: s.doc.resources[0].id,
  });
  assert.ok(authorErrors(s.doc, "resources").length);
});
test("authoring collection limits and reset keep the local draft bounded and clean", () => {
  let s = initialAuthor();
  for (let i = 0; i < 80; i++)
    s = reduce(s, { type: "question-add", kind: "choice" });
  assert.equal(s.doc.questions.length, 50);
  for (let i = 0; i < 20; i++)
    s = reduce(s, {
      type: "resource-add",
      resource: { name: `r${i}.txt`, size: i, type: "text/plain" },
    });
  assert.equal(s.doc.resources.length, 10);
  const ids = s.doc.questions.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length);
  s = reduce(s, { type: "reset" });
  assert.deepEqual(s, initialAuthor());
});
test("all five domain cases require evidence, notes and final response, without official outcomes", () => {
  for (const kind of Object.keys(caseSteps)) {
    let s = initialCase();
    assert.equal(advanceCase(kind, s).stage, 0);
    for (let i = 0; i < 3; i++) {
      s = advanceCase(kind, {
        ...s,
        checked: true,
        note: "Example evidence reviewed carefully.",
        value: kind === "reconciliation" ? "1250.00" : "75",
        reference: "EX-PAY-101",
        date: "2026-11-16",
        time: "09:30",
        decision: caseDecisions[kind][0],
      });
    }
    assert.ok(s.outcome.includes("no official action taken"));
    assert.equal(s.history.length, 4);
    assert.deepEqual(advanceCase(kind, s), s);
  }
});
test("reconciliation mismatches and invalid marks fail; escalation is an explicit alternative", () => {
  const checked = {
    ...initialCase(),
    checked: true,
    note: "Investigate this example discrepancy.",
    reference: "WRONG",
    value: "12.50",
  };
  assert.ok(advanceCase("reconciliation", checked).error);
  assert.equal(
    advanceCase("reconciliation", {
      ...checked,
      decision: "Escalate discrepancy",
    }).stage,
    1,
  );
  for (const value of ["-1", "101", "NaN", "2e1", "1.234"])
    assert.ok(advanceCase("marks", { ...checked, value }).error);
});
test("booking proposals require actual dates/times; decline and cancellation need no fake slot", () => {
  const s = {
    ...initialCase(),
    checked: true,
    note: "Reviewed this example booking request.",
    date: "2026-02-30",
    time: "25:00",
  };
  assert.ok(advanceCase("bookings", s).error);
  assert.equal(
    advanceCase("bookings", { ...s, decision: "Decline request" }).stage,
    1,
  );
  assert.equal(
    advanceCase("bookings", { ...s, decision: "Draft cancellation" }).stage,
    1,
  );
});
test("currency parses decimal strings into exact bounded integer minor units", () => {
  assert.equal(parseMinorUnits("0.29"), 29);
  assert.equal(parseMinorUnits("12.5"), 1250);
  assert.equal(parseMinorUnits("100000.00"), 10000000);
  for (const input of [
    "0",
    "-1",
    "1.234",
    "1e3",
    "NaN",
    "100000.01",
    "",
    " 12",
  ])
    assert.equal(parseMinorUnits(input), null);
});
test("rubric review distinguishes zero from missing marks and requires useful feedback", () => {
  assert.deepEqual(
    reviewGrade(["0", "5"], "Clear evidence; develop the next question."),
    { error: "", total: 5 },
  );
  for (const scores of [["", "5"], ["6", "1"], ["1.5", "3"], ["0"]])
    assert.ok(reviewGrade(scores, "Useful example feedback.").error);
  assert.ok(reviewGrade(["2", "3"], " ").error);
});
test("weekly availability allows adjacency but blocks overlap, reversed windows and excluded dates", () => {
  const slots = [
    { id: "a", day: "Monday", start: "09:00", end: "10:00" },
    { id: "b", day: "Monday", start: "10:00", end: "11:00" },
  ];
  assert.deepEqual(availabilityErrors(slots), []);
  assert.ok(
    availabilityErrors([
      ...slots,
      { id: "c", day: "Monday", start: "09:30", end: "10:30" },
    ]).length,
  );
  assert.ok(
    availabilityErrors([
      { id: "x", day: "Monday", start: "11:00", end: "10:00" },
    ]).length,
  );
  assert.match(inspectAvailability(slots, [], "2026-11-16", "09:30"), /fits/);
  assert.match(
    inspectAvailability(slots, [], "2026-11-16", "10:45"),
    /outside/,
  );
  assert.match(
    inspectAvailability(slots, ["2026-11-16"], "2026-11-16", "09:30"),
    /excluded/,
  );
  assert.equal(validDate("2026-02-30"), false);
  assert.equal(validDate("2028-02-29"), true);
});
test("native workflow eligibility excludes every public-marketing and platform-operations stage", () => {
  const screens = JSON.parse(
    readFileSync(
      new URL("../packages/contracts/frontend-screens.json", import.meta.url),
      "utf8",
    ),
  );
  const workflows = JSON.parse(
    readFileSync(
      new URL("../packages/contracts/frontend-workflows.json", import.meta.url),
      "utf8",
    ),
  );
  const eligible = workflows.filter((w) =>
    w.steps.every((s) => screens.find((x) => x.id === s.screenId)?.native),
  );
  assert.ok(eligible.length > 10);
  for (const w of eligible)
    for (const stage of w.steps) assert.ok(!/^(PUB|ADM)-/.test(stage.screenId));
});
