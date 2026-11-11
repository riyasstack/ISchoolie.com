import { notFound } from "next/navigation";
import { ScreenPreview } from "@/components/enterprise/screen-preview";
import {
  getScreen,
  screenSpecs,
} from "../../../../../../packages/contracts/frontend";
import { requirePreview } from "@/lib/preview-gate";
export function generateStaticParams() {
  return process.env.ISCHOOLIE_UI_PREVIEW === "true"
    ? screenSpecs.map((s) => ({ id: s.id }))
    : [{ id: "__preview_disabled__" }];
}
export const metadata = { title: "Screen review — iSchoolie UI Preview" };
export default async function ScreenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  requirePreview();
  const { id } = await params;
  const spec = getScreen(id);
  if (!spec) notFound();
  return <ScreenPreview key={id} spec={spec} />;
}
