import { ScreenExplorer } from "@/components/enterprise/screen-preview";
import { requirePreview } from "@/lib/preview-gate";
export default function Explorer() {
  requirePreview();
  return <ScreenExplorer />;
}
