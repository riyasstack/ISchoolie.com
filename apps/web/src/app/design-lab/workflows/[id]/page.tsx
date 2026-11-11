import { notFound } from "next/navigation";
import { WorkflowPreview } from "@/components/enterprise/workflow-preview";
import specs from "../../../../../../../packages/contracts/frontend-workflows.json";
import type { WorkflowSpec } from "../../../../../../../packages/contracts/frontend";
import { requirePreview } from "@/lib/preview-gate";
export function generateStaticParams() {
  return process.env.ISCHOOLIE_UI_PREVIEW === "true"
    ? specs.map((w) => ({ id: w.id }))
    : [{ id: "__preview_disabled__" }];
}
export default async function Workflow({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  requirePreview();
  const { id } = await params;
  const workflow = (specs as WorkflowSpec[]).find((w) => w.id === id);
  if (!workflow) notFound();
  return <WorkflowPreview key={id} workflow={workflow} />;
}
