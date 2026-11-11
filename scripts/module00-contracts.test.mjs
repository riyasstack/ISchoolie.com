import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  validateDraft,
  scheduleConflicts,
  parsePreviewCsv,
  flowReducer,
  initialFlow,
} from "../packages/contracts/frontend-state.ts";
import {
  supportedKinds,
  recordLayouts,
} from "../packages/contracts/layout-support.ts";
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
const field = (
  type = "text",
  label = "Example field",
  key = "example",
  options = [],
) => ({ key, label, type, required: true, options });
const fill = (fields) =>
  Object.fromEntries(
    fields.map((f) => [
      f.key,
      f.type === "email"
        ? "example@example.test"
        : f.type === "url"
          ? "https://example.test"
          : f.type === "date"
            ? "2026-11-10"
            : f.type === "time"
              ? "09:30"
              : f.type === "number"
                ? "1"
                : f.type === "select"
                  ? f.options[0]
                  : "Fictional example review",
    ]),
  );
test("all 180 source IDs have unique routes, supported renderers, valid references and domain content", () => {
  assert.equal(screens.length, 180);
  assert.equal(new Set(screens.map((s) => s.id)).size, 180);
  assert.equal(new Set(screens.map((s) => s.route)).size, 180);
  for (const s of screens) {
    assert(supportedKinds.has(s.kind), `${s.id}: missing renderer ${s.kind}`);
    assert(s.summary.trim().length > 0);
    assert(s.policy.includes("No") || s.policy.includes("no"));
    for (const id of s.links) assert(screens.some((x) => x.id === id));
    if (recordLayouts.includes(s.kind)) {
      assert(s.rows.length > 0, `${s.id} needs records`);
      for (const row of s.rows)
        assert.equal(row.length, s.columns.length, `${s.id} column mismatch`);
    }
    assert.equal(new Set(s.fields.map((f) => f.key)).size, s.fields.length);
  }
});
test("native screen catalog excludes public marketing and broad platform operations", () => {
  for (const spec of screens.filter((s) => ["PUB", "ADM"].includes(s.family)))
    assert.equal(spec.native, false);
});
test("every screen form accepts a syntactically valid fictional draft", () => {
  for (const spec of screens)
    assert.deepEqual(
      validateDraft(spec.fields, fill(spec.fields)),
      {},
      spec.id,
    );
});
test("required whitespace and malformed contacts, URLs, dates, times and negative numbers fail safely", () => {
  for (const [f, v] of [
    [field(), " "],
    [field("email"), "person@"],
    [field("url"), "javascript:alert(1)"],
    [field("date"), "2026-02-30"],
    [field("time"), "25:00"],
    [field("number"), "-1"],
  ])
    assert(validateDraft([f], { example: v }).example, `${f.type} should fail`);
});
test("academic and leave date ranges cannot end before their start", () => {
  const fields = [
    field("date", "Start date", "start"),
    field("date", "End date", "end"),
  ];
  assert(validateDraft(fields, { start: "2026-11-11", end: "2026-11-10" }).end);
  assert.deepEqual(
    validateDraft(fields, { start: "2026-11-10", end: "2026-11-10" }),
    {},
  );
});
test("optional empty fields do not block a local review", () => {
  assert.deepEqual(
    validateDraft([{ ...field("url"), required: false }], {}),
    {},
  );
});
test("timetable detects shared-teacher and shared-room overlaps, but permits distinct days/resources", () => {
  const a = {
    id: "a",
    day: "Monday",
    period: "09.00",
    teacher: "Teacher A",
    room: "Studio A",
    subject: "Visual thinking",
  };
  assert.equal(
    scheduleConflicts([a, { ...a, id: "b", room: "Lab B", subject: "Science" }])
      .length,
    1,
  );
  assert.equal(
    scheduleConflicts([
      a,
      { ...a, id: "b", teacher: "Teacher B", subject: "Science" },
    ]).length,
    1,
  );
  assert.deepEqual(
    scheduleConflicts([a, { ...a, id: "b", day: "Tuesday" }]),
    [],
  );
  assert.deepEqual(
    scheduleConflicts([
      a,
      { ...a, id: "b", teacher: "Teacher B", room: "Lab B" },
    ]),
    [],
  );
});
test("CSV preview supports BOM, CRLF, quoted commas, escaped quotes and multiline cells", () => {
  const parsed = parsePreviewCsv(
    '\uFEFFid,name,class\r\nEX-1,"Example, learner",10 A\r\nEX-2,"A ""quoted""\nname",10 B',
  );
  assert.deepEqual(parsed.errors, []);
  assert.equal(parsed.rows[0][1], "Example, learner");
  assert.equal(parsed.rows[1][1], 'A "quoted"\nname');
});
test("CSV preview rejects duplicate identifiers, missing headers, broken widths and unclosed quotes", () => {
  for (const csv of [
    "id,name,class\nEX-1,A,10A\nEX-1,B,10B",
    "name,class\nA,10A",
    "id,name,class\nEX-1,A",
    'id,name,class\nEX-1,"A,10A',
  ])
    assert(parsePreviewCsv(csv).errors.length > 0);
});
test("CSV preview has bounded size and row count", () => {
  assert(parsePreviewCsv("x".repeat(50001)).errors.length);
  assert(
    parsePreviewCsv(
      "id,name,class\n" +
        Array.from({ length: 51 }, (_, i) => `EX-${i},Example,10A`).join("\n"),
    ).errors.length,
  );
});
test("workflow drafts survive back navigation and repeated reviews do not duplicate local events", () => {
  let state = flowReducer(initialFlow, {
    type: "draft-changed",
    draft: { note: "Example draft" },
  });
  assert.equal(state.step, 0);
  assert.equal(state.drafts[0].note, "Example draft");
  state = flowReducer(state, {
    type: "next",
    draft: state.drafts[0],
    steps: 2,
  });
  state = flowReducer(state, { type: "back" });
  state = flowReducer(state, {
    type: "next",
    draft: state.drafts[0],
    steps: 2,
  });
  assert.equal(state.events.length, 1);
});
test("context reset removes all prior workflow drafts and events", () => {
  let state = flowReducer(initialFlow, {
    type: "next",
    draft: { context: "Example A" },
    steps: 2,
  });
  state = flowReducer(state, { type: "reset" });
  assert.deepEqual(state, {
    step: 0,
    drafts: {},
    status: "editing",
    events: [],
  });
});
test("all forty local paths can be reviewed, preserve stage data, and never emit an official outcome", () => {
  assert.equal(workflows.length, 40);
  assert.equal(new Set(workflows.map((w) => w.id)).size, 40);
  for (const workflow of workflows) {
    let state = { ...initialFlow, drafts: {}, events: [] };
    assert(workflow.steps.length >= 3);
    for (const step of workflow.steps) {
      assert(screens.some((s) => s.id === step.screenId));
      const draft = fill(step.fields);
      assert.deepEqual(validateDraft(step.fields, draft), {}, workflow.id);
      state = flowReducer(state, {
        type: "next",
        draft,
        steps: workflow.steps.length,
      });
    }
    assert.equal(state.status, "reviewed");
    assert.equal(state.events.length, workflow.steps.length);
    assert.equal(Object.keys(state.drafts).length, workflow.steps.length);
    assert.equal(
      flowReducer(state, {
        type: "next",
        draft: {},
        steps: workflow.steps.length,
      }),
      state,
    );
    assert(
      !JSON.stringify(state.events).match(
        /paid|published|approved|admitted|issued|delivered/i,
      ),
    );
  }
});
