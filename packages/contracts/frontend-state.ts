export interface FieldSpec {
  key: string;
  label: string;
  type: string;
  required: boolean;
  options: string[];
}
export interface ScreenSpec {
  id: string;
  name: string;
  family: string;
  kind: string;
  summary: string;
  fields: FieldSpec[];
  columns: string[];
  rows: string[][];
  links: string[];
  sections: string[][];
  route: string;
  policy: string;
  native: boolean;
}
export type Draft = Record<string, string>;
export interface WorkflowSpec {
  id: string;
  name: string;
  route: string;
  sensitive: boolean;
  steps: {
    screenId: string;
    title: string;
    instruction: string;
    fields: FieldSpec[];
    boundary: string;
  }[];
}
export function validateDraft(fields: FieldSpec[], draft: Draft): Draft {
  const errors: Draft = {};
  for (const f of fields) {
    const v = (draft[f.key] ?? "").trim();
    if (f.required && !v) {
      errors[f.key] = `Enter ${f.label.toLowerCase()}.`;
      continue;
    }
    if (!v) continue;
    if (f.type === "select" && !f.options.includes(v))
      errors[f.key] = "Choose one of the listed example options.";
    if (f.type !== "textarea" && v.length > 500)
      errors[f.key] = "Keep this example field within 500 characters.";
    if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      errors[f.key] = "Use an example address such as learner@example.test.";
    if (f.type === "url") {
      try {
        const u = new URL(v);
        if (!["https:", "http:"].includes(u.protocol))
          errors[f.key] = "Use an http or https address.";
      } catch {
        errors[f.key] = "Enter a complete example web address.";
      }
    }
    if (
      f.type === "date" &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(v) ||
        Number.isNaN(Date.parse(v)) ||
        new Date(v).toISOString().slice(0, 10) !== v)
    )
      errors[f.key] = "Use a valid calendar date in YYYY-MM-DD format.";
    if (f.type === "time" && !/^([01]\d|2[0-3]):[0-5]\d$/.test(v))
      errors[f.key] = "Use a 24-hour time such as 09:30.";
    if (f.type === "number" && (!Number.isFinite(Number(v)) || Number(v) < 0))
      errors[f.key] = "Enter a non-negative number.";
    if (f.type === "textarea" && v.length > 5000)
      errors[f.key] = "Keep the example draft within 5,000 characters.";
  }
  const start = fields.find(
      (f) => /start|from|opens/i.test(f.label) && f.type === "date",
    ),
    end = fields.find(
      (f) => /end|until|closes/i.test(f.label) && f.type === "date",
    );
  if (
    start &&
    end &&
    draft[start.key] &&
    draft[end.key] &&
    draft[end.key] < draft[start.key]
  )
    errors[end.key] = "End date must be on or after start date.";
  return errors;
}
export interface Slot {
  id: string;
  day: string;
  period: string;
  teacher: string;
  room: string;
  subject: string;
}
export function scheduleConflicts(slots: Slot[]): string[] {
  const errors: string[] = [];
  for (let a = 0; a < slots.length; a++)
    for (let b = a + 1; b < slots.length; b++) {
      const x = slots[a],
        y = slots[b];
      if (
        x.day === y.day &&
        x.period === y.period &&
        (x.teacher === y.teacher || x.room === y.room)
      )
        errors.push(
          `${x.subject} and ${y.subject}: ${x.teacher === y.teacher ? "teacher" : "room"} overlap on ${x.day} at ${x.period}.`,
        );
    }
  return errors;
}
export type FlowState = {
  step: number;
  drafts: Record<number, Draft>;
  status: "editing" | "reviewed";
  events: string[];
};
export type FlowAction =
  | { type: "next"; draft: Draft; steps: number }
  | { type: "draft-changed"; draft: Draft }
  | { type: "back" }
  | { type: "reset" };
export const initialFlow: FlowState = {
  step: 0,
  drafts: {},
  status: "editing",
  events: [],
};
export const CSV_DRAFT_KEY = "__previewCsv";
export const DEFAULT_EXAMPLE_CSV =
  "id,name,class\nEX-101,Example learner A,10 A\nEX-102,Example learner B,10 B";
export function parsePreviewCsv(input: string): {
  headers: string[];
  rows: string[][];
  errors: string[];
} {
  if (input.length > 50000)
    return {
      headers: [],
      rows: [],
      errors: ["Keep the sample CSV below 50,000 characters."],
    };
  const matrix: string[][] = [];
  let row: string[] = [],
    cell = "",
    quoted = false,
    closedQuote = false,
    malformed = false;
  const text = input.replace(/^\uFEFF/, "");
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (
      closedQuote &&
      c !== " " &&
      c !== "\t" &&
      c !== "," &&
      c !== "\n" &&
      c !== "\r"
    )
      malformed = true;
    if (closedQuote && (c === " " || c === "\t")) continue;
    if (c === '"') {
      if (quoted && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (quoted) {
        quoted = false;
        closedQuote = true;
      } else if (cell.length || closedQuote) {
        malformed = true;
        cell += c;
      } else quoted = true;
    } else if (c === "," && !quoted) {
      row.push(cell);
      cell = "";
      closedQuote = false;
    } else if ((c === "\n" || c === "\r") && !quoted) {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      if (row.some((v) => v.trim())) matrix.push(row);
      row = [];
      cell = "";
      closedQuote = false;
    } else cell += c;
  }
  if (cell || row.length) {
    row.push(cell);
    if (row.some((v) => v.trim())) matrix.push(row);
  }
  const [headers = [], ...rows] = matrix;
  const normalized = headers.map((h) => h.trim().toLowerCase()),
    errors: string[] = [];
  if (quoted) errors.push("Close the quoted field before continuing.");
  if (malformed)
    errors.push(
      "Use quotes only around a complete CSV field; do not add text after a closing quote.",
    );
  if (!["id", "name", "class"].every((h) => normalized.includes(h)))
    errors.push("Include id, name, and class headers.");
  if (new Set(normalized).size !== normalized.length)
    errors.push("Use unique column headers.");
  if (rows.length > 50) errors.push("Use at most 50 example rows.");
  const seen = new Set<string>();
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].length !== headers.length)
      errors.push(`Row ${i + 2} has a different number of columns.`);
    for (const key of ["name", "class"])
      if (!rows[i][normalized.indexOf(key)]?.trim())
        errors.push(`Row ${i + 2} needs ${key}.`);
    const id = rows[i][normalized.indexOf("id")]?.trim();
    if (!id) errors.push(`Row ${i + 2} needs an id.`);
    else if (seen.has(id)) errors.push(`Duplicate example id ${id}.`);
    else seen.add(id);
  }
  return { headers, rows, errors };
}
/** Local presentation state. No submitted/paid/approved business state exists. */
export function flowReducer(state: FlowState, action: FlowAction): FlowState {
  if (action.type === "reset")
    return { ...initialFlow, drafts: {}, events: [] };
  if (action.type === "draft-changed") {
    if (state.status === "reviewed") return state;
    const before = state.drafts[state.step] ?? {};
    const changed = Object.keys({ ...before, ...action.draft }).some(
      (key) => before[key] !== action.draft[key],
    );
    return {
      ...state,
      drafts: {
        ...Object.fromEntries(
          Object.entries(state.drafts).filter(
            ([key]) => !changed || Number(key) <= state.step,
          ),
        ),
        [state.step]: { ...action.draft },
      },
      events: changed
        ? state.events.filter((_, index) => index < state.step)
        : state.events,
    };
  }
  if (action.type === "back")
    return {
      ...state,
      step:
        state.status === "reviewed" ? state.step : Math.max(0, state.step - 1),
      status: "editing",
    };
  if (
    state.status === "reviewed" ||
    action.steps < 1 ||
    state.step >= action.steps
  )
    return state;
  const final = state.step === action.steps - 1;
  const updated = flowReducer(state, {
    type: "draft-changed",
    draft: action.draft,
  });
  return {
    step: final ? state.step : state.step + 1,
    drafts: updated.drafts,
    status: final ? "reviewed" : "editing",
    events: [
      ...new Set([
        ...updated.events,
        `Step ${state.step + 1} reviewed locally`,
      ]),
    ],
  };
}
