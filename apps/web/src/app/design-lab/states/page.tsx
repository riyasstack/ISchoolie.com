import Link from "next/link";
import { requirePreview } from "@/lib/preview-gate";
import { AppShell, PageHeading } from "@/components/app-shell";
import { screenSpecs } from "../../../../../../packages/contracts/frontend";
import {
  reviewStates,
  screenStateContract,
} from "../../../../../../packages/contracts/screen-states";
export const metadata = { title: "Per-screen state matrix — iSchoolie" };
export default function StateMatrix() {
  requirePreview();
  return (
    <AppShell>
      <PageHeading
        eyebrow="MODULE 00 / STATE CONTRACTS"
        title="Recovery is part of the task."
        description="Explicit state applicability, local-draft rules and review routes for all 180 screens. Generated HTML is not browser or device acceptance."
      />
      <Link href="/design-lab/screens" className="text-link">
        Return to screen explorer
      </Link>
      <div className="state-matrix">
        {screenSpecs.map((spec) => {
          const contract = screenStateContract(spec);
          return (
            <section className="panel stack" key={spec.id}>
              <h2>
                {spec.id} · {spec.name}
              </h2>
              <p>
                {spec.native
                  ? "Native review controls authored"
                  : "Web-only by design"}
              </p>
              <div className="row wrap">
                {reviewStates
                  .filter((view) => contract.states[view])
                  .map((view) => (
                    <Link
                      className="button secondary"
                      key={view}
                      href={"/design-lab/states/" + spec.id + "/" + view}
                    >
                      {view}
                    </Link>
                  ))}
              </div>
              {Object.entries(contract.notApplicable).map(([state, reason]) => (
                <p className="metadata" key={state}>
                  {state} — {reason}
                </p>
              ))}
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
