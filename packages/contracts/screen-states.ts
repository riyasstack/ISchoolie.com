import type { ScreenSpec } from "./frontend-state";
export const reviewStates = [
  "Ready",
  "Loading",
  "Empty",
  "Validation",
  "Error",
  "Restricted",
  "Expired",
  "Offline",
  "Conflict",
  "Reviewed",
] as const;
export type ReviewState = (typeof reviewStates)[number];
export type StateCopy = {
  heading: string;
  body: string;
  action: string;
  draft: "retain" | "clear";
};
export type ScreenStateContract = {
  id: string;
  native: boolean;
  states: Partial<Record<ReviewState, StateCopy>>;
  notApplicable: Partial<Record<ReviewState, string>>;
};
const editable = new Set([
  "editor",
  "resources",
  "assessment-builder",
  "assignment-builder",
  "grading",
  "submission",
  "attendance",
  "timetable-builder",
  "booking",
  "bookings",
  "finance",
  "reconciliation",
  "admissions",
  "marks",
  "publication",
  "discussion",
  "messages",
  "feed",
  "profile",
  "directory",
  "network",
  "communities",
  "consent",
  "preferences",
  "settings",
]);
const nouns: Record<string, string> = {
  editor: "curriculum modules",
  resources: "learning resources",
  "assessment-builder": "assessment questions",
  "assignment-builder": "assignment criteria",
  grading: "learning evidence",
  submission: "submission attachments",
  assessment: "practice questions",
  timetable: "scheduled lessons",
  "timetable-builder": "timetable periods",
  booking: "booking requests",
  bookings: "booking requests",
  finance: "unposted charges",
  reconciliation: "statement examples",
  admissions: "application evidence",
  marks: "draft marks",
  publication: "readiness evidence",
  discussion: "discussion replies",
  messages: "permitted conversations",
  feed: "network updates",
  profile: "profile details",
  directory: "eligible directory matches",
  network: "network matches",
  communities: "community previews",
  consent: "consent information",
  credentials: "specimen credentials",
  help: "help articles",
  search: "search results",
  saved: "saved items",
  results: "released-result examples",
  roster: "learner records",
  attendance: "attendance marks",
  notifications: "notifications",
  policy: "policy sections",
  pricing: "proposed plans",
  home: "public highlights",
  course: "course information",
  catalog: "course matches",
  "my-learning": "learning items",
  player: "lesson material",
  guardian: "permitted child information",
};
export function screenStateContract(spec: ScreenSpec): ScreenStateContract {
  const noun =
    nouns[spec.kind] ??
    (spec.rows.length
      ? "scoped records"
      : spec.fields.length
        ? "draft fields"
        : "example content");
  const mutates =
    spec.fields.length > 0 ||
    (editable.has(spec.kind) &&
      (spec.kind !== "finance" || spec.id === "INS-23"));
  const validates =
    spec.fields.length > 0 ||
    new Set([
      "editor",
      "resources",
      "assessment-builder",
      "assignment-builder",
      "grading",
      "submission",
      "timetable-builder",
      "booking",
      "bookings",
      "reconciliation",
      "admissions",
      "marks",
      "publication",
      "discussion",
      "messages",
      "feed",
      "profile",
      "consent",
    ]).has(spec.kind) ||
    (spec.kind === "finance" && spec.id === "INS-23");
  const states: ScreenStateContract["states"] = {
    Ready: {
      heading: spec.name,
      body: spec.summary,
      action: "Inspect example",
      draft: "retain",
    },
    Loading: {
      heading: "Loading " + noun,
      body:
        spec.name +
        " is waiting for its fictional data source. Existing in-screen work is retained and hidden until retry.",
      action: "Cancel loading example",
      draft: "retain",
    },
    Empty: {
      heading: "No " + noun + " to show",
      body:
        "This " +
        spec.name.toLowerCase() +
        " view has no entries in the current example. Restore the synthetic content without creating a real record.",
      action: "Restore example content",
      draft: "retain",
    },
    Error: {
      heading: spec.name + " could not be loaded",
      body: "The example service failed. In-screen drafts are retained; retry does not submit or commit anything.",
      action: "Retry example view",
      draft: "retain",
    },
    Restricted: {
      heading: "Access to " + spec.name.toLowerCase() + " is restricted",
      body: "Previous scoped details and drafts have been cleared. This preview grants no permission; choose the permitted example context to inspect synthetic content again.",
      action: "Return to permitted example context",
      draft: "clear",
    },
    Expired: {
      heading: "Recheck the " + spec.name.toLowerCase() + " context",
      body: "The example session expired. Previous details and drafts were cleared. Restore only the fictional review session; no authentication request occurs.",
      action: "Restore fictional review session",
      draft: "clear",
    },
    Offline: {
      heading: spec.name + " is unavailable offline",
      body:
        "No secure offline cache is implemented for " +
        noun +
        ". The current in-memory view is retained but hidden; restore the example connection to continue.",
      action: "Restore example connection",
      draft: "retain",
    },
    Conflict: {
      heading: "A newer " + spec.name.toLowerCase() + " example exists",
      body: "The local view is retained and hidden. Choose to keep it or discard it and remount the original fixture. No server merge or overwrite occurs.",
      action: "Keep local view",
      draft: "retain",
    },
  };
  const notApplicable: ScreenStateContract["notApplicable"] = {};
  if (validates) {
    states.Validation = {
      heading: "Check the " + spec.name.toLowerCase() + " draft",
      body: "Use the actual task controls below to trigger required-field and domain validation. No artificial fields or validation success are substituted.",
      action: "Return to task",
      draft: "retain",
    };
  } else {
    notApplicable.Validation =
      "No field-validation step applies here; read-only or toggle-only controls do not manufacture validation errors.";
  }
  if (mutates) {
    states.Reviewed = {
      heading: "Local review presentation",
      body:
        "This is a presentation state for " +
        spec.name.toLowerCase() +
        ", not proof of validation. Use the real task review control to validate. No official outcome is created.",
      action: "Return to task",
      draft: "retain",
    };
  } else {
    notApplicable.Reviewed =
      "Read-only screen: no mutation or completion receipt applies.";
  }
  if (spec.family === "PUB") {
    delete states.Restricted;
    delete states.Expired;
    notApplicable.Restricted =
      "This public discovery screen has no identity-specific access gate. Linked private tasks define their own restrictions.";
    notApplicable.Expired =
      "This public screen has no signed-in session to expire. Verification and private task expiry belong to their own screens.";
  }
  return { id: spec.id, native: spec.native, states, notApplicable };
}
export type ScreenReview = {
  view: ReviewState;
  epoch: number;
  scope: "permitted" | "denied";
  session: "active" | "expired";
};
export const initialScreenReview: ScreenReview = {
  view: "Ready",
  epoch: 0,
  scope: "permitted",
  session: "active",
};
export type ScreenReviewAction =
  | { type: "select"; view: ReviewState }
  | { type: "recover"; discard?: boolean }
  | { type: "scope"; scope: "permitted" | "denied" }
  | { type: "reset" };
export function screenReviewReducer(
  s: ScreenReview,
  a: ScreenReviewAction,
): ScreenReview {
  if (a.type === "reset") return { ...initialScreenReview, epoch: s.epoch + 1 };
  if (a.type === "scope")
    return {
      view: a.scope === "denied" ? "Restricted" : "Ready",
      scope: a.scope,
      session: "active",
      epoch: s.epoch + 1,
    };
  if (a.type === "recover")
    return {
      ...initialScreenReview,
      epoch:
        s.epoch +
        (a.discard || s.scope === "denied" || s.session === "expired" ? 1 : 0),
    };
  if (a.view === "Restricted")
    return { ...s, view: a.view, scope: "denied", epoch: s.epoch + 1 };
  if (a.view === "Expired")
    return { ...s, view: a.view, session: "expired", epoch: s.epoch + 1 };
  if (s.scope === "denied" || s.session === "expired") return s;
  return { ...s, view: a.view };
}
export const reviewContentMounted = (s: ScreenReview) =>
  s.scope === "permitted" && s.session === "active";
export const reviewContentVisible = (s: ScreenReview) =>
  reviewContentMounted(s) &&
  ["Ready", "Validation", "Reviewed"].includes(s.view);
