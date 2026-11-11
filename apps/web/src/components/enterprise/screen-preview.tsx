"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, LayoutGrid, ShieldCheck } from "lucide-react";
import { AppShell, PageHeading } from "../app-shell";
import { PublicHome, PublicNav, PublicFooter } from "../public-home";
import { Feed, Network, Communities, SavedItems } from "../network";
import {
  CourseCatalog,
  CourseDetail,
  LearningPlayer,
  EducatorEditor,
} from "../learning";
import {
  Guardian,
  Institution,
  Professional,
  Notifications,
  Settings,
} from "../workspaces";
import { Badge, Empty } from "../ui";
import type { ReviewState } from "../../../../../packages/contracts/screen-states";
import { courses } from "@/lib/preview";
import {
  getScreen,
  screenSpecs,
  type ScreenSpec,
} from "../../../../../packages/contracts/frontend";
import { ProfileOnboarding } from "./profile-onboarding";
import { FormWorkbench } from "./form-workbench";
import { ScreenStateBoundary } from "./screen-state-boundary";
import { ConsentWorkbench } from "./consent-workbench";
import { AuthoringWorkbench } from "./authoring-workbench";
import { CaseWorkbench } from "./case-workbench";
import { AvailabilityWorkbench } from "./availability-workbench";
import {
  authorKinds,
  caseKind,
} from "../../../../../packages/contracts/authoring-state";
import { SearchWorkbench } from "./search-workbench";
import { RecordWorkbench } from "./record-workbench";
import {
  TimetableWorkbench,
  AssessmentWorkbench,
  LearningEvidence,
  CredentialWorkbench,
} from "./academic-workbench";
import {
  DirectoryWorkbench,
  DiscussionWorkbench,
  MessageWorkbench,
  ProfileWorkbench,
} from "./social-workbench";
import {
  EditorialWorkbench,
  FinanceWorkbench,
  LiveWorkbench,
  OverviewWorkbench,
  ResourceWorkbench,
  ReviewWorkbench,
  SafeguardingWorkbench,
} from "./operations-workbench";
import {
  recordLayouts,
  formLayouts,
  supportedKinds,
} from "../../../../../packages/contracts/layout-support";
const recordKinds = new Set(recordLayouts);
const formKinds = new Set(formLayouts);
const ownHeading = new Set([
  "home",
  "course",
  "saved",
  "feed",
  "network",
  "communities",
  "catalog",
  "my-learning",
  "player",
  "editor",
  "guardian",
  "roster",
  "attendance",
  "booking",
  "settings",
  "notifications",
]);
export const supportedScreenKinds = supportedKinds;
export function ScreenBody({ spec }: { spec: ScreenSpec }) {
  if (["AUTH-07", "AUTH-08", "AUTH-09"].includes(spec.id)) return <ProfileOnboarding />;
  if (spec.kind === "consent") return <ConsentWorkbench />;
  if (spec.id === "PRO-04") return <AvailabilityWorkbench />;
  if (authorKinds.has(spec.kind))
    return <AuthoringWorkbench kind={spec.kind} />;
  const lifecycle = caseKind(spec.kind, spec.id);
  if (lifecycle)
    return (
      <div className="stack">
        <CaseWorkbench kind={lifecycle} />
        {spec.rows.length > 0 && <RecordWorkbench spec={spec} />}
      </div>
    );
  if (recordKinds.has(spec.kind))
    return (
      <div className="stack">
        <RecordWorkbench spec={spec} />
        {spec.fields.length > 0 && <FormWorkbench spec={spec} />}
      </div>
    );
  if (formKinds.has(spec.kind)) return <FormWorkbench spec={spec} />;
  switch (spec.kind) {
    case "home":
      return <PublicHome embedded />;
    case "course":
      return <CourseDetail embedded course={courses[0]} />;
    case "search":
    case "help":
      return <SearchWorkbench spec={spec} />;
    case "feed":
      return <Feed />;
    case "network":
      return <Network />;
    case "communities":
      return <Communities />;
    case "saved":
      return <SavedItems />;
    case "catalog":
      return <CourseCatalog />;
    case "my-learning":
      return <CourseCatalog personal />;
    case "player":
      return <LearningPlayer />;
    case "editor":
      return <EducatorEditor />;
    case "guardian":
      return (
        <Guardian
          title={spec.name}
          selectorOnly={spec.id === "PAR-02"}
          initialTab={
            spec.id === "PAR-04"
              ? "Attendance"
              : spec.id === "PAR-08"
                ? "Learning"
                : spec.id === "PAR-10"
                  ? "School"
                  : "Overview"
          }
        />
      );
    case "roster":
      return <Institution view="students" />;
    case "attendance":
      return <Institution view="attendance" />;
    case "booking":
      return <Professional />;
    case "settings":
      return <Settings />;
    case "notifications":
      return <Notifications />;
    case "profile":
      return <ProfileWorkbench spec={spec} />;
    case "directory":
      return <DirectoryWorkbench spec={spec} />;
    case "discussion":
      return <DiscussionWorkbench spec={spec} />;
    case "messages":
      return <MessageWorkbench spec={spec} />;
    case "timetable":
    case "timetable-builder":
      return <TimetableWorkbench spec={spec} />;
    case "assessment":
      return <AssessmentWorkbench />;
    case "submission":
    case "grading":
      return <LearningEvidence spec={spec} />;
    case "portfolio":
      return (
        <div className="stack">
          <EditorialWorkbench spec={spec} />
          <FormWorkbench spec={spec} />
        </div>
      );
    case "credentials":
      return <CredentialWorkbench />;
    case "publication":
    case "verification":
    case "review":
      return <ReviewWorkbench spec={spec} />;
    case "safeguarding":
      return <SafeguardingWorkbench spec={spec} />;
    case "finance":
    case "reconciliation":
      return <FinanceWorkbench spec={spec} />;
    case "overview":
      return <OverviewWorkbench spec={spec} />;
    case "live":
      return <LiveWorkbench spec={spec} />;
    case "resources":
      return <ResourceWorkbench spec={spec} />;
    case "student-feed":
      return (
        <div className="stack">
          <div className="callout">
            <ShieldCheck size={20} />
            Example class updates only. Public student posting, discovery, and
            direct messaging remain restricted.
          </div>
          <EditorialWorkbench
            spec={{
              ...spec,
              sections: [
                [
                  "Observation practice",
                  "Your example class is exploring five precise details and one useful question.",
                ],
                [
                  "From your educator",
                  "Bring one everyday object to the next sample discussion. No live event is scheduled.",
                ],
              ],
            }}
          />
        </div>
      );
    default:
      if (
        [
          "about",
          "mission",
          "trust",
          "pricing",
          "policy",
          "help",
          "event-detail",
        ].includes(spec.kind)
      )
        return (
          <>
            <EditorialWorkbench spec={spec} />
            {spec.fields.length > 0 && <FormWorkbench spec={spec} />}
          </>
        );
      throw new Error(`No renderer for ${spec.id}: ${spec.kind}`);
  }
}
export function ScreenPreview({
  spec,
  initialView = "Ready",
}: {
  spec: ScreenSpec;
  initialView?: ReviewState;
}) {
  const role: Record<string, string> = {
    AUTH: "Identity",
    APP: "Education network",
    STU: "Student",
    EDU: "Educator",
    PAR: "Guardian",
    INS: "Institution",
    PRO: "Professional",
    ADM: "Operations",
  };
  const headingOwned =
    ownHeading.has(spec.kind) &&
    !authorKinds.has(spec.kind) &&
    !caseKind(spec.kind, spec.id);
  const content = (
    <>
      <div className="screen-utility">
        <Link href="/design-lab/screens">
          <ArrowLeft size={15} />
          All screen designs
        </Link>
        <Badge>{spec.id} · Frontend prototype</Badge>
      </div>
      {!headingOwned && (
        <PageHeading
          eyebrow={spec.family + " / " + spec.id}
          title={spec.name}
          description={spec.summary}
        />
      )}
      <ScreenStateBoundary
        spec={spec}
        ownsHeading={headingOwned}
        initialView={initialView}
      >
        <ScreenBody spec={spec} />
      </ScreenStateBoundary>
      <nav className="screen-related" aria-label="Related screen designs">
        {spec.links.map((id) => (
          <Link key={id} href={"/preview/" + id}>
            <span>{id}</span>
            {getScreen(id)?.name}
            <ArrowUpRight size={16} />
          </Link>
        ))}
      </nav>
      <div className="callout space-top">
        <ShieldCheck size={16} />
        {spec.policy}
      </div>
    </>
  );
  return spec.family === "PUB" ? (
    <>
      <PublicNav />
      <main id="main-content" className="content-page">
        {content}
      </main>
      <PublicFooter />
    </>
  ) : (
    <AppShell workspaceRole={role[spec.family] ?? "Education network"}>
      {content}
    </AppShell>
  );
}
export function ScreenExplorer() {
  const [family, setFamily] = useState("All"),
    [query, setQuery] = useState("");
  const results = screenSpecs.filter(
    (s) =>
      (family === "All" || s.family === family) &&
      `${s.id} ${s.name} ${s.summary}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <AppShell>
      <PageHeading
        eyebrow="MODULE 00 / SCREEN EXPLORER"
        title="One ecosystem. Every considered detail."
        description="180 proposed screen contracts. Authored prototypes remain subject to visual, device, policy, and acceptance review."
      />
      <div className="explorer-tools">
        <label>
          Search screen designs
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try admissions, timetable, or STU-14"
          />
        </label>
        <label>
          Workspace
          <select value={family} onChange={(e) => setFamily(e.target.value)}>
            {["All", ...new Set(screenSpecs.map((s) => s.family))].map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>
        <Link className="button secondary" href="/design-lab/workflows">
          40 workflow prototypes
          <ArrowUpRight size={17} />
        </Link>
        <Link className="button secondary" href="/design-lab/states">
          Per-screen state matrix
        </Link>
      </div>
      <div className="explorer-grid">
        {results.map((s) => (
          <Link href={s.route} key={s.id}>
            <div className="row between">
              <Badge>{s.id}</Badge>
              <LayoutGrid size={17} />
            </div>
            <h2>{s.name}</h2>
            <p>{s.summary}</p>
            <span>
              {s.kind.replaceAll("-", " ")}
              <ArrowUpRight size={17} />
            </span>
          </Link>
        ))}
      </div>
      {!results.length && (
        <Empty title="No matching designs">
          Try another title, ID, or workspace.
        </Empty>
      )}
    </AppShell>
  );
}
