import { AppShell } from "@/components/app-shell";
import { DesignLab } from "@/components/design-lab";
import { requirePreview } from "@/lib/preview-gate";
export default function Lab() {
  requirePreview();
  return (
    <AppShell>
      <DesignLab />
    </AppShell>
  );
}
