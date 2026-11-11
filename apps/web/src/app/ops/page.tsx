import { AppShell } from "@/components/app-shell";
import { Operations } from "@/components/workspaces";
import { requirePreview } from "@/lib/preview-gate";
export default function OperationsPage() {
  requirePreview();
  return (
    <AppShell>
      <Operations />
    </AppShell>
  );
}
