import { notFound } from "next/navigation";
import { ScreenPreview } from "@/components/enterprise/screen-preview";
import { requirePreview } from "@/lib/preview-gate";
import {
  getScreen,
  screenSpecs,
} from "../../../../../../../../packages/contracts/frontend";
import {
  reviewStates,
  screenStateContract,
  type ReviewState,
} from "../../../../../../../../packages/contracts/screen-states";
export const metadata = { title: "Screen state review — iSchoolie" };
export function generateStaticParams() {
  return process.env.ISCHOOLIE_UI_PREVIEW === "true"
    ? screenSpecs.flatMap((spec) =>
        reviewStates
          .filter((view) => screenStateContract(spec).states[view])
          .map((view) => ({ id: spec.id, view })),
      )
    : [{ id: "__preview_disabled__", view: "__disabled__" }];
}
export default async function ScreenStatePage({
  params,
}: {
  params: Promise<{ id: string; view: string }>;
}) {
  requirePreview();
  const { id, view } = await params,
    spec = getScreen(id);
  if (
    !spec ||
    !reviewStates.includes(view as ReviewState) ||
    !screenStateContract(spec).states[view as ReviewState]
  )
    notFound();
  return (
    <ScreenPreview
      key={id + view}
      spec={spec}
      initialView={view as ReviewState}
    />
  );
}
