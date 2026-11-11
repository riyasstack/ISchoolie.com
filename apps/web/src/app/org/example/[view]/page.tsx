import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Institution } from "@/components/workspaces";
import { requirePreview } from "@/lib/preview-gate";
export default async function InstitutionPage({
  params,
}: {
  params: Promise<{ view: string }>;
}) {
  requirePreview();
  const { view } = await params;
  if (!["students", "attendance", "finance"].includes(view)) notFound();
  return (
    <AppShell>
      <Institution view={view} />
    </AppShell>
  );
}
