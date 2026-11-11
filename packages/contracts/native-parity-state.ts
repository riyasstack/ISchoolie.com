import type { ScreenSpec } from "./frontend-state";
export const nativeParityKinds = new Set([
  "guardian",
  "profile",
  "directory",
  "discussion",
  "search",
  "support",
  "consent",
  "portfolio",
  "credentials",
  "overview",
  "review",
  "verification",
]);
export const consentCategories = ["Academics", "Attendance", "School notices"];
export const consentDecisions = [
  "Allow selected categories",
  "Decline request",
];
export function reviewConsent(draft: {
  selected: string[];
  purpose: string;
  expiry: string;
  decision: string;
  confirmed: boolean;
}): string {
  const { selected, purpose, expiry, decision, confirmed } = draft;
  const dateValid =
    /^\d{4}-\d{2}-\d{2}$/.test(expiry) &&
    !Number.isNaN(Date.parse(expiry)) &&
    new Date(expiry).toISOString().slice(0, 10) === expiry;
  if (
    !confirmed ||
    purpose.trim().length < 10 ||
    purpose.length > 2000 ||
    !dateValid ||
    !consentDecisions.includes(decision) ||
    selected.some((c) => !consentCategories.includes(c)) ||
    (decision === consentDecisions[0] && !selected.length)
  )
    return "Check relationship evidence, purpose, date, response and selected categories.";
  return (
    "Local " +
    decision.toLowerCase() +
    " draft reviewed. No consent or access granted."
  );
}
const specialized = new Set([
  "player",
  "catalog",
  "my-learning",
  "editor",
  "resources",
  "assessment-builder",
  "assignment-builder",
  "finance",
  "grading",
  "submission",
  "admissions",
  "marks",
  "reconciliation",
  "bookings",
  "publication",
  "booking",
  "feed",
  "student-feed",
  "saved",
  "network",
  "communities",
  "notifications",
  "settings",
  "roster",
  "course",
  "attendance",
  "assessment",
  "messages",
  "timetable",
  "timetable-builder",
  "scheduler",
  "live",
]);
export function nativeScreenPlan(spec: ScreenSpec): string {
  if (!spec.native) return "web-only";
  if (nativeParityKinds.has(spec.kind)) return "native-" + spec.kind;
  if (specialized.has(spec.kind)) return "native-" + spec.kind;
  if (spec.rows.length && spec.fields.length) return "records-and-form";
  if (spec.rows.length) return "records";
  if (spec.fields.length) return "validated-form";
  if (spec.sections.length) return "editorial";
  throw new Error("No native task surface for " + spec.id);
}
