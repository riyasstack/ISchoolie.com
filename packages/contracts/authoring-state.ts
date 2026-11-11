/** Module 00 local drafts only. No persistence, publication, payment or permission API. */
export type Block = {
  id: string;
  kind: "heading" | "paragraph" | "list";
  text: string;
};
export function formatSelection(
  text: string,
  start: number,
  end: number,
  mark: "**" | "_",
): { text: string; start: number; end: number } {
  const from = Math.max(0, Math.min(text.length, start)),
    to = Math.max(from, Math.min(text.length, end));
  const selected = text.slice(from, to) || "text";
  return {
    text: text.slice(0, from) + mark + selected + mark + text.slice(to),
    start: from + mark.length,
    end: from + mark.length + selected.length,
  };
}
export function inlineParts(
  text: string,
): { text: string; style: "plain" | "strong" | "emphasis" }[] {
  return text
    .split(/(\*\*[^*]+\*\*|_[^_]+_)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("**") && part.endsWith("**")
        ? { text: part.slice(2, -2), style: "strong" }
        : part.startsWith("_") && part.endsWith("_")
          ? { text: part.slice(1, -1), style: "emphasis" }
          : { text: part, style: "plain" },
    );
}
export type Lesson = { id: string; title: string; blocks: Block[] };
export type Unit = { id: string; title: string; lessons: Lesson[] };
export type Question = {
  id: string;
  prompt: string;
  kind: "choice" | "response";
  options: string[];
  correct: number;
  points: string;
  guidance: string;
};
export type Criterion = {
  id: string;
  title: string;
  points: string;
  guidance: string;
};
export type Resource = {
  id: string;
  name: string;
  size: number;
  type: string;
  text?: string;
  uri?: string;
};
export type AuthorDocument = {
  title: string;
  instructions: string;
  due: string;
  units: Unit[];
  questions: Question[];
  rubric: Criterion[];
  resources: Resource[];
};
export type AuthorState = {
  doc: AuthorDocument;
  saved: AuthorDocument;
  next: number;
  revision: number;
  remote: number;
  dirty: boolean;
  offline: boolean;
  conflict: boolean;
  reviewed: boolean;
  notice: string;
};
// JSON-only draft model: works in Hermes without relying on structuredClone support.
function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
export function initialAuthor(): AuthorState {
  const doc: AuthorDocument = {
    title: "Observation studio",
    instructions: "Describe three observations and explain one connection.",
    due: "",
    units: [
      {
        id: "u1",
        title: "Notice and question",
        lessons: [
          {
            id: "l2",
            title: "Look closely",
            blocks: [
              { id: "b3", kind: "heading", text: "Begin with curiosity" },
              {
                id: "b4",
                kind: "paragraph",
                text: "Observe an everyday object. Write what you can see before making an inference.",
              },
            ],
          },
        ],
      },
    ],
    questions: [
      {
        id: "q5",
        kind: "choice",
        prompt: "Which statement is an observation?",
        options: ["The leaf has five points.", "The leaf must be old."],
        correct: 0,
        points: "2",
        guidance: "An observation describes visible evidence.",
      },
    ],
    rubric: [
      {
        id: "r6",
        title: "Evidence and reasoning",
        points: "5",
        guidance: "Connect a precise observation to a clear explanation.",
      },
    ],
    resources: [],
  };
  return {
    doc,
    saved: clone(doc),
    next: 7,
    revision: 0,
    remote: 0,
    dirty: false,
    offline: false,
    conflict: false,
    reviewed: false,
    notice: "",
  };
}
export const authorKinds = new Set([
  "editor",
  "resources",
  "assessment-builder",
  "assignment-builder",
]);
export type AuthorAction =
  | { type: "meta"; key: "title" | "instructions" | "due"; value: string }
  | { type: "unit-add" }
  | { type: "unit-title"; id: string; value: string }
  | { type: "lesson-add"; unit: string }
  | { type: "lesson-title"; id: string; value: string }
  | { type: "block-add"; lesson: string; kind: Block["kind"] }
  | { type: "block-edit"; id: string; value: string }
  | { type: "question-add"; kind: Question["kind"] }
  | { type: "question-edit"; id: string; patch: Partial<Omit<Question, "id">> }
  | { type: "rubric-add" }
  | { type: "rubric-edit"; id: string; patch: Partial<Omit<Criterion, "id">> }
  | {
      type: "move";
      collection: "unit" | "lesson" | "block" | "question" | "rubric";
      id: string;
      delta: -1 | 1;
    }
  | {
      type: "remove";
      collection:
        "unit" | "lesson" | "block" | "question" | "rubric" | "resource";
      id: string;
    }
  | { type: "resource-add"; resource: Omit<Resource, "id"> }
  | { type: "review"; kind: string }
  | {
      type:
        | "save"
        | "offline"
        | "remote"
        | "resolve-local"
        | "resolve-saved"
        | "reset";
    };
export function validateResource(
  file: Pick<Resource, "name" | "size">,
): string {
  if (!/\.(pdf|txt|csv|png|jpe?g)$/i.test(file.name))
    return "Choose PDF, TXT, CSV, PNG or JPG.";
  if (
    !Number.isFinite(file.size) ||
    file.size < 0 ||
    file.size > 5 * 1024 * 1024
  )
    return "Choose a file with a known size up to 5MB.";
  return "";
}
export function authorErrors(doc: AuthorDocument, kind: string): string[] {
  const errors: string[] = [];
  if (!doc.title.trim()) errors.push("Give this draft a title.");
  if (doc.title.length > 160 || doc.instructions.length > 5000)
    errors.push(
      "Keep the title within 160 and instructions within 5000 characters.",
    );
  if (kind === "editor") {
    if (!doc.units.length) errors.push("Add at least one module.");
    for (const u of doc.units) {
      if (!u.title.trim() || !u.lessons.length)
        errors.push("Each module needs a title and lesson.");
      for (const l of u.lessons)
        if (
          !l.title.trim() ||
          !l.blocks.length ||
          l.blocks.some((b) => !b.text.trim())
        )
          errors.push("Each lesson needs a title and nonempty content blocks.");
    }
  }
  if (kind === "assessment-builder") {
    if (!doc.questions.length) errors.push("Add at least one question.");
    for (const q of doc.questions) {
      if (!q.prompt.trim() || !/^[1-9]\d?$/.test(q.points))
        errors.push("Every question needs a prompt and 1–99 points.");
      if (
        q.kind === "choice" &&
        (q.options.length < 2 ||
          q.options.some((o) => !o.trim()) ||
          new Set(q.options.map((o) => o.trim().toLowerCase())).size !==
            q.options.length ||
          !Number.isInteger(q.correct) ||
          q.correct < 0 ||
          q.correct >= q.options.length)
      )
        errors.push(
          "Choice questions need distinct options and a valid answer key.",
        );
      if (q.kind === "response" && !q.guidance.trim())
        errors.push("Written questions need marking guidance.");
    }
  }
  if (kind === "assignment-builder") {
    if (!doc.instructions.trim()) errors.push("Add assignment instructions.");
    if (
      !doc.rubric.length ||
      doc.rubric.some(
        (r) =>
          !r.title.trim() || !r.guidance.trim() || !/^[1-9]\d?$/.test(r.points),
      )
    )
      errors.push("Add rubric criteria with descriptions and 1–99 points.");
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(doc.due) ||
      Number.isNaN(Date.parse(doc.due)) ||
      new Date(doc.due).toISOString().slice(0, 10) !== doc.due
    )
      errors.push("Choose a valid due date (YYYY-MM-DD).");
  }
  if (kind === "resources" && !doc.resources.length)
    errors.push("Select an example resource before review.");
  return [...new Set(errors)];
}
function moved<T extends { id: string }>(
  items: T[],
  id: string,
  delta: number,
): T[] {
  const index = items.findIndex((x) => x.id === id),
    to = index + delta;
  if (index < 0 || to < 0 || to >= items.length) return items;
  const copy = [...items];
  [copy[index], copy[to]] = [copy[to], copy[index]];
  return copy;
}
export function authorReducer(
  state: AuthorState,
  a: AuthorAction,
): AuthorState {
  if (a.type === "reset") return initialAuthor();
  if (a.type === "offline")
    return {
      ...state,
      offline: !state.offline,
      notice: "Connection mode changed. Draft retained.",
    };
  if (a.type === "remote")
    return {
      ...state,
      remote: state.remote + 1,
      conflict: true,
      reviewed: false,
      notice:
        "A simulated newer revision is available. Resolve it before saving.",
    };
  if (a.type === "resolve-local")
    return {
      ...state,
      revision: state.remote,
      conflict: false,
      dirty: true,
      reviewed: false,
      notice: "Kept this local draft. Save it explicitly.",
    };
  if (a.type === "resolve-saved")
    return {
      ...state,
      doc: clone(state.saved),
      revision: state.remote,
      conflict: false,
      dirty: false,
      reviewed: false,
      notice: "Restored the last local snapshot. This is not a server merge.",
    };
  if (a.type === "save") {
    if (state.offline || state.conflict)
      return {
        ...state,
        notice: "Save is blocked while offline or in conflict. Draft retained.",
      };
    return {
      ...state,
      saved: clone(state.doc),
      revision: state.revision + 1,
      remote: state.revision + 1,
      dirty: false,
      notice: "Snapshot saved in memory for this screen only.",
    };
  }
  if (a.type === "review") {
    const errors = authorErrors(state.doc, a.kind);
    return {
      ...state,
      reviewed: !errors.length && !state.conflict,
      notice: state.conflict
        ? "Resolve the revision conflict before review."
        : errors.join(" ") ||
          "Local review only. Nothing is published or assigned.",
    };
  }
  const doc = clone(state.doc);
  let next = state.next;
  const id = (prefix: string) => prefix + next++;
  if (a.type === "meta") doc[a.key] = a.value;
  if (a.type === "unit-add" && doc.units.length < 12)
    doc.units.push({ id: id("u"), title: "New module", lessons: [] });
  if (a.type === "unit-title")
    doc.units.forEach((u) => {
      if (u.id === a.id) u.title = a.value;
    });
  if (a.type === "lesson-add")
    doc.units.forEach((u) => {
      if (u.id === a.unit && u.lessons.length < 30)
        u.lessons.push({ id: id("l"), title: "New lesson", blocks: [] });
    });
  if (a.type === "lesson-title")
    doc.units.forEach((u) =>
      u.lessons.forEach((l) => {
        if (l.id === a.id) l.title = a.value;
      }),
    );
  if (a.type === "block-add")
    doc.units.forEach((u) =>
      u.lessons.forEach((l) => {
        if (l.id === a.lesson && l.blocks.length < 40)
          l.blocks.push({ id: id("b"), kind: a.kind, text: "" });
      }),
    );
  if (a.type === "block-edit")
    doc.units.forEach((u) =>
      u.lessons.forEach((l) =>
        l.blocks.forEach((b) => {
          if (b.id === a.id) b.text = a.value;
        }),
      ),
    );
  if (a.type === "question-add" && doc.questions.length < 50)
    doc.questions.push({
      id: id("q"),
      kind: a.kind,
      prompt: "",
      options: ["", ""],
      correct: 0,
      points: "1",
      guidance: "",
    });
  if (a.type === "question-edit")
    doc.questions = doc.questions.map((q) =>
      q.id === a.id ? { ...q, ...a.patch } : q,
    );
  if (a.type === "rubric-add" && doc.rubric.length < 20)
    doc.rubric.push({ id: id("r"), title: "", points: "1", guidance: "" });
  if (a.type === "rubric-edit")
    doc.rubric = doc.rubric.map((r) =>
      r.id === a.id ? { ...r, ...a.patch } : r,
    );
  if (a.type === "resource-add") {
    const error = validateResource(a.resource);
    if (error) return { ...state, notice: error };
    if (doc.resources.length >= 10)
      return {
        ...state,
        notice: "Keep up to ten resources in this local draft.",
      };
    if (
      doc.resources.some(
        (r) => r.name === a.resource.name && r.size === a.resource.size,
      )
    )
      return { ...state, notice: "This resource is already attached." };
    doc.resources.push({ ...a.resource, id: id("f") });
  }
  if (a.type === "move" || a.type === "remove") {
    const transform = <T extends { id: string }>(items: T[]) =>
      a.type === "move"
        ? moved(items, a.id, a.delta)
        : items.filter((x) => x.id !== a.id);
    if (a.collection === "unit") doc.units = transform(doc.units);
    if (a.collection === "question") doc.questions = transform(doc.questions);
    if (a.collection === "rubric") doc.rubric = transform(doc.rubric);
    if (a.collection === "resource") doc.resources = transform(doc.resources);
    doc.units.forEach((u) => {
      if (a.collection === "lesson") u.lessons = transform(u.lessons);
      u.lessons.forEach((l) => {
        if (a.collection === "block") l.blocks = transform(l.blocks);
      });
    });
  }
  return {
    ...state,
    doc,
    next,
    dirty: true,
    reviewed: false,
    notice: "Unsaved local changes.",
  };
}

export type CaseKind =
  "admissions" | "marks" | "reconciliation" | "bookings" | "publication";
export const caseSteps: Record<CaseKind, string[]> = {
  admissions: [
    "Check application evidence",
    "Draft information request",
    "Review recommendation",
  ],
  marks: ["Prepare mark sheet", "Moderate results", "Review release draft"],
  reconciliation: [
    "Compare statement",
    "Match reference and amount",
    "Review reconciliation draft",
  ],
  bookings: ["Review request", "Propose a time", "Review booking response"],
  publication: [
    "Check readiness",
    "Review audience and rights",
    "Review publication draft",
  ],
};
export function caseKind(kind: string, id: string): CaseKind | undefined {
  if (
    [
      "admissions",
      "marks",
      "reconciliation",
      "bookings",
      "publication",
    ].includes(kind)
  )
    return kind as CaseKind;
  if (kind === "booking" && id !== "PRO-02") return "bookings";
}
export const caseDecisions: Record<CaseKind, string[]> = {
  admissions: ["Request missing evidence", "Recommend review"],
  marks: ["Hold for moderation", "Recommend release review"],
  reconciliation: ["Propose match", "Escalate discrepancy"],
  bookings: ["Propose new time", "Decline request", "Draft cancellation"],
  publication: ["Return for edits", "Recommend publication review"],
};
export type CaseDraft = {
  checkpoints: Partial<Record<number, CaseCheckpoint>>;
  stage: number;
  note: string;
  checked: boolean;
  value: string;
  reference: string;
  date: string;
  time: string;
  decision: string;
  outcome: string;
  history: string[];
  error: string;
};
export type CaseCheckpoint = Pick<
  CaseDraft,
  "note" | "checked" | "value" | "reference" | "date" | "time" | "decision"
>;
export const initialCase = (): CaseDraft => ({
  checkpoints: {},
  stage: 0,
  note: "",
  checked: false,
  value: "",
  reference: "",
  date: "",
  time: "",
  decision: "",
  outcome: "",
  history: [],
  error: "",
});
export function caseErrors(kind: CaseKind, s: CaseDraft): string[] {
  if (!s.checked) return ["Check the evidence for this stage."];
  if (s.note.trim().length < 10)
    return ["Write a review note of at least ten characters."];
  if (s.stage === 2 && !caseDecisions[kind].includes(s.decision))
    return ["Choose a response draft for the final review."];
  if (
    kind === "marks" &&
    (!/^\d+(\.\d{1,2})?$/.test(s.value) || Number(s.value) > 100)
  )
    return ["Enter a mark from 0 to 100, with at most two decimal places."];
  if (
    kind === "reconciliation" &&
    s.decision !== "Escalate discrepancy" &&
    (s.reference.trim() !== "EX-PAY-101" || s.value !== "1250.00")
  )
    return [
      "Reference and amount must exactly match EX-PAY-101 and 1250.00, or choose an escalation draft.",
    ];
  if (
    kind === "bookings" &&
    !["Decline request", "Draft cancellation"].includes(s.decision) &&
    (!/^\d{4}-\d{2}-\d{2}$/.test(s.date) ||
      Number.isNaN(Date.parse(s.date)) ||
      new Date(s.date).toISOString().slice(0, 10) !== s.date ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(s.time))
  )
    return [
      "Choose a valid proposed date and 24-hour time, or choose a decline/cancellation draft.",
    ];
  return [];
}
export function advanceCase(kind: CaseKind, s: CaseDraft): CaseDraft {
  if (s.outcome) return s;
  const errors = caseErrors(kind, s);
  if (errors.length) return { ...s, error: errors.join(" ") };
  const checkpoint: CaseCheckpoint = {
    note: s.note.trim(),
    checked: s.checked,
    value: s.value,
    reference: s.reference,
    date: s.date,
    time: s.time,
    decision: s.decision,
  };
  const checkpoints = { ...s.checkpoints, [s.stage]: checkpoint };
  const history = Object.entries(checkpoints)
    .filter(([index]) => Number(index) <= s.stage)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([index, c]) => caseSteps[kind][Number(index)] + ": " + c!.note);
  if (s.stage === 2)
    return {
      ...s,
      checkpoints,
      history: [...history, "Response: " + s.decision],
      outcome: `Local ${s.decision.toLowerCase()} draft reviewed; no official action taken.`,
      error: "",
    };
  return {
    ...s,
    ...checkpoints[s.stage + 1],
    checkpoints,
    stage: s.stage + 1,
    history,
    note: checkpoints[s.stage + 1]?.note ?? "",
    checked: checkpoints[s.stage + 1]?.checked ?? false,
    error: "",
  };
}
export function changeCaseDraft(
  s: CaseDraft,
  patch: Partial<CaseCheckpoint>,
): CaseDraft {
  const changed = Object.entries(patch).some(
    ([key, value]) => s[key as keyof CaseCheckpoint] !== value,
  );
  if (!changed) return { ...s, error: "" };
  const sourceChanged = ["value", "reference", "date", "time"].some(
    (key) =>
      key in patch &&
      s[key as keyof CaseCheckpoint] !== patch[key as keyof CaseCheckpoint],
  );
  if (sourceChanged)
    return {
      ...s,
      ...patch,
      stage: 0,
      checkpoints: {},
      outcome: "",
      history: [],
      note: s.stage > 0 ? "" : s.note,
      checked: false,
      error:
        s.stage > 0
          ? "Source details changed. Review the evidence again from stage one."
          : "",
    };
  const checkpoints = Object.fromEntries(
    Object.entries(s.checkpoints).filter(([index]) => Number(index) < s.stage),
  );
  return {
    ...s,
    ...patch,
    checkpoints,
    outcome: "",
    history: s.history.slice(0, s.stage),
    error: "",
  };
}
export function revisitCase(s: CaseDraft, stage: number): CaseDraft {
  if (!Number.isInteger(stage) || stage < 0 || stage > s.stage) return s;
  const checkpoint = s.checkpoints[stage];
  return {
    ...s,
    ...checkpoint,
    stage,
    outcome: "",
    error: "",
    note: checkpoint?.note ?? "",
    checked: checkpoint?.checked ?? false,
  };
}
export function parseMinorUnits(text: string): number | null {
  if (!/^\d{1,6}(\.\d{1,2})?$/.test(text)) return null;
  const [whole, fraction = ""] = text.split(".");
  const minor = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  return minor > 0 && minor <= 10000000 ? minor : null;
}
export function reviewGrade(
  scores: string[],
  feedback: string,
): { error: string; total: number | null } {
  if (
    scores.length !== 2 ||
    scores.some((s) => !/^\d$/.test(s) || Number(s) > 5)
  )
    return { error: "Score both criteria from 0 to 5.", total: null };
  if (feedback.trim().length < 10)
    return {
      error: "Add useful feedback of at least ten characters.",
      total: null,
    };
  return { error: "", total: scores.reduce((n, s) => n + Number(s), 0) };
}
export type Availability = {
  id: string;
  day: string;
  start: string;
  end: string;
};
export const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function minutes(value: string): number | null {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return null;
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}
export function validDate(value: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  );
}
export function availabilityErrors(slots: Availability[]): string[] {
  const errors: string[] = [];
  for (let i = 0; i < slots.length; i++) {
    const a = slots[i],
      start = minutes(a.start),
      end = minutes(a.end);
    if (
      !weekDays.includes(a.day) ||
      start === null ||
      end === null ||
      end <= start
    ) {
      errors.push(`${a.id}: choose a weekday and a valid end after start.`);
      continue;
    }
    for (let j = 0; j < i; j++) {
      const b = slots[j],
        bs = minutes(b.start),
        be = minutes(b.end);
      if (
        a.day === b.day &&
        bs !== null &&
        be !== null &&
        start < be &&
        end > bs
      )
        errors.push(`${a.id} overlaps ${b.id} on ${a.day}.`);
    }
  }
  return errors;
}
export function inspectAvailability(
  slots: Availability[],
  blackouts: string[],
  date: string,
  start: string,
): string {
  if (availabilityErrors(slots).length)
    return "Resolve overlapping or invalid weekly windows first.";
  if (!validDate(date) || minutes(start) === null)
    return "Choose a valid date and 24-hour start time.";
  if (blackouts.includes(date))
    return "This date is excluded from the example availability.";
  const day = weekDays[new Date(date).getUTCDay()],
    minute = minutes(start)!;
  return slots.some(
    (s) =>
      s.day === day &&
      minute >= minutes(s.start)! &&
      minute + 30 <= minutes(s.end)!,
  )
    ? "This 30-minute example fits a window. No reservation is made."
    : "This 30-minute example falls outside the weekly windows.";
}

export type SubmissionSnapshot = {
  title: string;
  description: string;
  response: string;
  resources: Resource[];
  confirmed: boolean;
};
export type SubmissionDraft = SubmissionSnapshot & {
  snapshot: SubmissionSnapshot | null;
  next: number;
  reviewed: boolean;
  notice: string;
  error: string;
};
export const initialSubmission = (): SubmissionDraft => ({
  title: "",
  description: "",
  response: "",
  resources: [],
  confirmed: false,
  snapshot: null,
  next: 1,
  reviewed: false,
  notice: "",
  error: "",
});
export type SubmissionAction =
  | { type: "meta"; key: "title" | "description"; value: string }
  | { type: "response"; value: string }
  | { type: "confirmed"; value: boolean }
  | { type: "attach"; resource: Omit<Resource, "id"> }
  | { type: "remove"; id: string }
  | { type: "save" | "restore" | "review" | "edit" | "reset" };
export function submissionErrors(draft: SubmissionSnapshot): string[] {
  const errors: string[] = [];
  if (!draft.title.trim() || draft.title.length > 160)
    errors.push("Add a response title within 160 characters.");
  if (draft.description.length > 2000)
    errors.push("Keep attachment descriptions within 2000 characters.");
  if (draft.response.length > 5000)
    errors.push("Keep the response within 5000 characters.");
  if (draft.response.trim().length < 20)
    errors.push(
      "Write a response of at least 20 characters. Attachments are optional.",
    );
  if (
    draft.resources.length > 10 ||
    draft.resources.some((r) => validateResource(r))
  )
    errors.push("Use up to ten supported resources of at most 5MB each.");
  if (!draft.confirmed)
    errors.push("Inspect the example task and response before local review.");
  return errors;
}
export function submissionReducer(
  s: SubmissionDraft,
  a: SubmissionAction,
): SubmissionDraft {
  if (a.type === "reset") return initialSubmission();
  if (a.type === "edit")
    return {
      ...s,
      reviewed: false,
      error: "",
      notice: "Return to the local draft. No academic attempt exists.",
    };
  if (a.type === "save")
    return {
      ...s,
      snapshot: clone({
        response: s.response,
        title: s.title,
        description: s.description,
        resources: s.resources,
        confirmed: s.confirmed,
      }),
      notice: "Snapshot kept in this task only. Leaving the task clears it.",
      error: "",
    };
  if (a.type === "restore")
    return s.snapshot
      ? {
          ...s,
          ...clone(s.snapshot),
          reviewed: false,
          error: "",
          notice: "Local snapshot restored; no official submission exists.",
        }
      : { ...s, notice: "Save a local snapshot before restoring." };
  if (a.type === "review") {
    const errors = submissionErrors(s);
    return {
      ...s,
      reviewed: !errors.length,
      error: errors.join(" "),
      notice: errors.length
        ? ""
        : "Response reviewed locally. No submission, grade or notification was created.",
    };
  }
  if (a.type === "response")
    return a.value.length > 5000
      ? { ...s, error: "Keep the response within 5000 characters." }
      : {
          ...s,
          response: a.value,
          reviewed: false,
          confirmed: false,
          error: "",
          notice: "Unsaved response changes.",
        };
  if (a.type === "meta")
    return a.value.length > (a.key === "title" ? 160 : 2000)
      ? { ...s, error: "Keep this field within its displayed limit." }
      : {
          ...s,
          [a.key]: a.value,
          reviewed: false,
          confirmed: false,
          error: "",
          notice: "Unsaved response changes.",
        };
  if (a.type === "confirmed")
    return { ...s, confirmed: a.value, reviewed: false, error: "", notice: "" };
  if (a.type === "remove")
    return {
      ...s,
      resources: s.resources.filter((r) => r.id !== a.id),
      reviewed: false,
      confirmed: false,
      error: "",
      notice: "Attachment removed from this local draft.",
    };
  if (a.type !== "attach") return s;
  const error = validateResource(a.resource);
  if (error) return { ...s, error };
  if (s.resources.length >= 10)
    return { ...s, error: "Use at most ten local attachments." };
  if (
    s.resources.some(
      (r) => r.name === a.resource.name && r.size === a.resource.size,
    )
  )
    return {
      ...s,
      error:
        "This file is already attached. Remove it before selecting a replacement.",
    };
  return {
    ...s,
    resources: [
      ...s.resources,
      {
        ...a.resource,
        text: a.resource.text?.slice(0, 5000),
        id: "EX-ATTACH-" + s.next,
      },
    ],
    next: s.next + 1,
    reviewed: false,
    confirmed: false,
    error: "",
    notice: "Resource attached locally; no upload occurs.",
  };
}
