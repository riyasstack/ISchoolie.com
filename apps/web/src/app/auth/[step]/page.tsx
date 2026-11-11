import { notFound } from "next/navigation";
import { ScreenPreview } from "@/components/enterprise/screen-preview";
import { getScreen } from "../../../../../../packages/contracts/frontend";
import { requirePreview } from "@/lib/preview-gate";
const ids: Record<string, string> = {
  register: "AUTH-02",
  verify: "AUTH-03",
  purpose: "AUTH-04",
  consent: "AUTH-05",
  "guardian-approval": "AUTH-06",
  learner: "AUTH-07",
  educator: "AUTH-08",
  tutor: "AUTH-09",
  guardian: "AUTH-10",
  institution: "AUTH-11",
  recover: "AUTH-12",
  reset: "AUTH-13",
  sessions: "AUTH-14",
  restricted: "AUTH-15",
  workspaces: "AUTH-16",
};
export default async function AuthDesign({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  requirePreview();
  const { step } = await params;
  const spec = getScreen(ids[step]);
  if (!spec) notFound();
  return <ScreenPreview key={step} spec={spec} />;
}
