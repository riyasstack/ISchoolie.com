import { ProfileOnboarding } from "@/components/enterprise/profile-onboarding";
import { ProfileWorkbench } from "@/components/enterprise/social-workbench";
import { getScreen } from "../../../../../../packages/contracts/frontend";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import {
  Feed,
  Network,
  Communities,
  Inbox,
  SavedItems,
} from "@/components/network";
import {
  CourseCatalog,
  LearningPlayer,
  EducatorEditor,
} from "@/components/learning";
import {
  EducatorOverview,
  Guardian,
  Professional,
  Notifications,
  Settings,
} from "@/components/workspaces";
import { requirePreview } from "@/lib/preview-gate";
export default async function AppPage({
  params,
}: {
  params: Promise<{ view?: string[] }>;
}) {
  requirePreview();
  const { view = [] } = await params;
  const route = view.join("/");
  const screens: Record<string, React.ReactNode> = {
    "": <Feed />,
    network: <Network />,
    profile: <ProfileWorkbench spec={getScreen("APP-16")!} />,
    "profile/onboarding": <ProfileOnboarding />,
    communities: <Communities />,
    inbox: <Inbox />,
    student: <CourseCatalog personal />,
    courses: <CourseCatalog />,
    "student/player": <LearningPlayer />,
    educator: <EducatorOverview />,
    "educator/editor": <EducatorEditor />,
    guardian: <Guardian />,
    professional: <Professional />,
    notifications: <Notifications />,
    settings: <Settings />,
    saved: <SavedItems />,
  };
  if (!(route in screens)) notFound();
  return <AppShell>{screens[route]}</AppShell>;
}
