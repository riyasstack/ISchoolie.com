import { WorkflowExplorer } from "@/components/enterprise/workflow-preview";
import { requirePreview } from "@/lib/preview-gate";
export default function Workflows() {
  requirePreview();
  return <WorkflowExplorer />;
}
