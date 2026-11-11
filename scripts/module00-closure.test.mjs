import { test } from "node:test";
import assert from "node:assert/strict";
import {
  registerRows,
  registerView,
  registerStatusColumn,
  selectedRegisterRows,
  exampleRegisterCsv,
  csvCell,
} from "../packages/contracts/register-state.ts";
import {
  flowReducer,
  initialFlow,
  parsePreviewCsv,
  CSV_DRAFT_KEY,
} from "../packages/contracts/frontend-state.ts";
import {
  initialSubmission,
  submissionReducer,
  submissionErrors,
  initialCase,
  advanceCase,
  revisitCase,
  changeCaseDraft,
} from "../packages/contracts/authoring-state.ts";
const query = {
  query: "",
  status: "All",
  sortColumn: 0,
  descending: false,
  page: 0,
};
test("register filters the named status rather than unrelated last-column amounts", () => {
  const columns = ["Name", "Status", "Amount"],
    entries = registerRows([
      ["Learner 10", "Pending", "1.50"],
      ["Learner 2", "Ready", "12.00"],
    ]);
  assert.equal(registerStatusColumn(columns), 1);
  assert.equal(
    registerView(columns, entries, { ...query, status: "Ready" }).matches[0]
      .cells[0],
    "Learner 2",
  );
  assert.equal(registerStatusColumn(["Name", "Amount"]), -1);
});
test("register pagination clamps after filtering and natural sorting is stable across platforms", () => {
  const entries = registerRows(
    Array.from({ length: 15 }, (_, i) => [
      "Learner " + (15 - i),
      i % 2 ? "Ready" : "Pending",
    ]),
  );
  const view = registerView(["Name", "Status"], entries, {
    ...query,
    page: 99,
  });
  assert.equal(view.page, 2);
  assert.equal(view.visible.length, 3);
  assert.equal(view.matches[0].cells[0], "Learner 1");
  const filtered = registerView(["Name", "Status"], entries, {
    ...query,
    page: 99,
    query: " learner 2 ",
  });
  assert.equal(filtered.page, 0);
  assert.equal(filtered.visible.length, 1);
  assert.equal(
    registerView(["Name", "Status"], entries, {
      ...query,
      query: "ＮＯ ＭＡＴＣＨ",
    }).pages,
    1,
  );
});
test("numeric decimal sorting and descending order retain source order for equal values", () => {
  const entries = registerRows([
    ["A", "2.9"],
    ["B", "2.10"],
    ["C", "2.1"],
  ]);
  assert.deepEqual(
    registerView(["Name", "Mark"], entries, {
      ...query,
      sortColumn: 1,
    }).matches.map((r) => r.cells[0]),
    ["B", "C", "A"],
  );
  assert.deepEqual(
    registerView(["Name", "Mark"], entries, {
      ...query,
      sortColumn: 1,
      descending: true,
    }).matches.map((r) => r.cells[0]),
    ["A", "B", "C"],
  );
});
test("duplicate display labels have distinct selection keys; selection survives filters and exports exact scope", () => {
  const entries = registerRows([
    ["Same name", "Ready"],
    ["Same name", "Pending"],
  ]);
  assert.notEqual(entries[0].key, entries[1].key);
  const chosen = selectedRegisterRows(entries, [entries[1].key, "unknown"]);
  assert.equal(chosen.length, 1);
  assert.equal(chosen[0].cells[1], "Pending");
  const filtered = registerView(["Name", "Status"], entries, {
    ...query,
    status: "Ready",
  });
  assert.equal(filtered.matches.length, 1);
  assert.equal(selectedRegisterRows(entries, [entries[1].key]).length, 1);
  assert.ok(exampleRegisterCsv(["Name", "Status"], chosen).includes("Pending"));
  assert.ok(
    !exampleRegisterCsv(["Name", "Status"], chosen).includes('"Ready"'),
  );
});
test("example CSV stays rectangular, roundtrips quotes/newlines and neutralizes prefixed formula text", () => {
  const entries = registerRows([
    ["EX-1", "  =1+1", "10A"],
    ["EX-2", 'Name, "quoted"\nnext line', "10B"],
  ]);
  const csv = exampleRegisterCsv(["id", "name", "class"], entries),
    parsed = parsePreviewCsv(csv);
  assert.deepEqual(parsed.errors, []);
  assert.equal(parsed.headers.length, 4);
  assert.equal(parsed.rows[0][2], "'  =1+1");
  assert.equal(parsed.rows[1][2], 'Name, "quoted"\nnext line');
  for (const text of ["=1", " +1", "\t@SUM(A1)", "\r-1", "\u00a0=1"])
    assert.ok(csvCell(text).startsWith("\"'"));
  assert.equal(csvCell("plain"), '\"plain\"');
});
test("CSV grammar rejects quotes in unquoted fields and trailing text after a closing quote", () => {
  for (const csv of [
    'id,name,class\nEX-1,A"bad,10A',
    'id,name,class\nEX-1,"A"bad,10A',
  ])
    assert.ok(parsePreviewCsv(csv).errors.length);
  assert.deepEqual(parsePreviewCsv('id,name,class\nEX-1,"A" ,10A').errors, []);
});
test("CSV workflow draft survives revisit and changing an earlier stage invalidates downstream data and reviews", () => {
  let state = flowReducer(initialFlow, {
    type: "next",
    draft: { [CSV_DRAFT_KEY]: "id,name,class\nEX-1,A,10A" },
    steps: 3,
  });
  state = flowReducer(state, {
    type: "next",
    draft: { mapping: "old" },
    steps: 3,
  });
  state = flowReducer(state, {
    type: "next",
    draft: { note: "old review" },
    steps: 3,
  });
  state = flowReducer(state, { type: "back" });
  assert.equal(state.step, 2);
  state = flowReducer(state, { type: "back" });
  state = flowReducer(state, { type: "back" });
  assert.ok(state.drafts[0][CSV_DRAFT_KEY].includes("EX-1"));
  state = flowReducer(state, {
    type: "draft-changed",
    draft: { [CSV_DRAFT_KEY]: "id,name,class\nEX-2,B,10B" },
  });
  assert.equal(state.drafts[1], undefined);
  assert.equal(state.drafts[2], undefined);
  assert.deepEqual(state.events, []);
});
test("direct workflow advance also invalidates future drafts when current data changed", () => {
  let state = flowReducer(initialFlow, {
    type: "next",
    draft: { name: "old" },
    steps: 3,
  });
  state = flowReducer(state, {
    type: "next",
    draft: { followup: "stale" },
    steps: 3,
  });
  state = flowReducer(state, { type: "back" });
  state = flowReducer(state, { type: "back" });
  state = flowReducer(state, {
    type: "next",
    draft: { name: "new" },
    steps: 3,
  });
  assert.equal(state.drafts[1], undefined);
  assert.equal(state.events.length, 1);
});
test("learner response requires a title, written content and explicit inspection", () => {
  let state = initialSubmission();
  assert.ok(submissionErrors(state).length);
  state = submissionReducer(state, {
    type: "response",
    value: "A detailed observation and a useful next question.",
  });
  assert.equal(submissionReducer(state, { type: "review" }).reviewed, false);
  state = submissionReducer(state, {
    type: "meta",
    key: "title",
    value: "Observation journal",
  });
  state = submissionReducer(state, { type: "confirmed", value: true });
  state = submissionReducer(state, { type: "review" });
  assert.equal(state.reviewed, true);
  state = submissionReducer(state, {
    type: "response",
    value: "Changed response with another thoughtful question.",
  });
  assert.equal(state.reviewed, false);
  assert.equal(state.confirmed, false);
  const empty = {
    ...initialSubmission(),
    confirmed: true,
    resources: [{ id: "x", name: "empty.txt", size: 0, type: "text/plain" }],
  };
  assert.ok(submissionErrors(empty).length);
});
test("learner attachments enforce caps, types and deduplication without losing existing content", () => {
  let state = initialSubmission();
  state = submissionReducer(state, {
    type: "attach",
    resource: {
      name: "notes.txt",
      size: 20,
      type: "text/plain",
      text: "Evidence",
    },
  });
  state = submissionReducer(state, {
    type: "attach",
    resource: { name: "notes.txt", size: 20, type: "text/plain" },
  });
  assert.equal(state.resources.length, 1);
  assert.match(state.error, /already attached/);
  state = submissionReducer(state, {
    type: "attach",
    resource: { name: "bad.exe", size: 1, type: "application/octet-stream" },
  });
  assert.equal(state.resources.length, 1);
  for (let i = 0; i < 15; i++)
    state = submissionReducer(state, {
      type: "attach",
      resource: {
        name: "file" + i + ".pdf",
        size: 100,
        type: "application/pdf",
      },
    });
  assert.equal(state.resources.length, 10);
  assert.equal(
    submissionReducer({ ...state, confirmed: true }, { type: "review" })
      .reviewed,
    false,
  );
  state = submissionReducer(state, {
    type: "meta",
    key: "title",
    value: "Example evidence",
  });
  state = submissionReducer(state, {
    type: "response",
    value: "A clear observation and useful next question.",
  });
  state = submissionReducer(state, { type: "confirmed", value: true });
  assert.equal(submissionReducer(state, { type: "review" }).reviewed, true);
});
test("learner snapshot is independent of later edits; restore and reset never create an official attempt", () => {
  let state = submissionReducer(initialSubmission(), {
    type: "response",
    value: "First detailed observation journal draft.",
  });
  state = submissionReducer(state, { type: "save" });
  state = submissionReducer(state, {
    type: "response",
    value: "Second detailed observation draft.",
  });
  assert.equal(
    state.snapshot.response,
    "First detailed observation journal draft.",
  );
  state = submissionReducer(state, { type: "restore" });
  assert.equal(state.response, "First detailed observation journal draft.");
  assert.equal(state.reviewed, false);
  assert.deepEqual(
    submissionReducer(state, { type: "reset" }),
    initialSubmission(),
  );
});
test("case revision restores exact stage evidence and source changes invalidate downstream reviews", () => {
  const changedInitial = changeCaseDraft(
    { ...initialCase(), checked: true, note: "Evidence checked.", value: "70" },
    { value: "75" },
  );
  assert.equal(changedInitial.checked, false);
  let state = initialCase();
  for (let i = 0; i < 3; i++)
    state = advanceCase("marks", {
      ...state,
      value: "75",
      checked: true,
      note: "Reviewed example evidence stage " + i,
      decision: "Hold for moderation",
    });
  assert.equal(state.history.length, 4);
  state = revisitCase(state, 1);
  assert.match(state.note, /stage 1/);
  assert.equal(state.outcome, "");
  state = changeCaseDraft(state, { value: "80" });
  assert.equal(state.stage, 0);
  assert.deepEqual(state.checkpoints, {});
  assert.deepEqual(state.history, []);
  assert.equal(state.checked, false);
});
test("case note revision clears only the current and later review checkpoints", () => {
  let state = initialCase();
  for (let i = 0; i < 3; i++)
    state = advanceCase("admissions", {
      ...state,
      checked: true,
      note: "Reviewed example stage " + i,
      decision: "Recommend review",
    });
  state = revisitCase(state, 1);
  state = changeCaseDraft(state, { note: "Updated evidence review note." });
  assert.ok(state.checkpoints[0]);
  assert.equal(state.checkpoints[1], undefined);
  assert.equal(state.checkpoints[2], undefined);
  state = advanceCase("admissions", state);
  assert.equal(state.stage, 2);
  assert.equal(state.note, "");
  assert.equal(state.checked, false);
});
