# Frontend/native parity closure pass

11 November 2026. Module 00 only; manual acceptance remains open.

## Concrete gaps corrected

- Web and native registers now consume the same pure filtering/sorting/pagination/selection model. Filters target a named status/state/decision/access column rather than assuming the last column is status. Natural/numeric sorting is deterministic without depending on native Intl.Collator availability. Both platforms use six-row pages and clamp empty/out-of-range pages.
- Duplicate display names have distinct fixture selection keys. Selection counts disclose how many selected records match current filters. Web export explicitly chooses matching rows or selected rows across filters; native offers the same scopes through the system text share sheet. These are fictional examples, not official exports. A closed share sheet does not prove delivery.
- CSV output is rectangular, with a Data classification column and EXAMPLE ONLY on each row, BOM/Unicode, quote/newline escaping, and neutralization of formula-leading text including leading whitespace/control characters. The W33 parser rejects misplaced quotes and text after a quoted field.
- W33 CSV is part of the stage draft, survives retry/back, and clears on context/expiry reset. Both platforms validate current CSV. Changes to an earlier stage clear downstream drafts and review events. Reopening a reviewed walkthrough starts at the final stage; web and native now both offer it. Failure mode also pauses reviewed web paths consistently.
- STU-13 now has a dedicated learner response task on both platforms: required response title and written response, optional attachment description, real local resource selection/previews, inspection acknowledgement, local snapshot/restore, review/edit and confirmed discard. Native no longer opens the educator studio for learner submissions. No academic attempt, upload, grade or notification is created.
- Resource selection is shared by native authoring and submission. Pending reads are ignored after unmount, reset or restore. Snapshot restore invalidates pending resource reads so late results cannot modify the restored task.
- Admissions/marks/reconciliation/bookings/publication drafts have stage checkpoints and previous/final revision controls. Source details are read-only after stage one; revisiting and changing evidence clears later reviews. Source changes also clear inspection acknowledgement. Stage notes can be revised without duplicating history.

## Boundaries

All drafts and snapshots remain local to the task. Leaving/resetting/scoped expiry clears UI state. Native picker copies may remain in platform-managed cache. PDF contents, provider media, collaboration, secure offline persistence, durable drafts and actual transactions remain outside this local model. Fixture index keys are stable for the current fixed dataset; future live adapters must supply actual stable record IDs.

No backend/database/authentication, deployment, Git commit, Module 01, package installation or backend build-approval change in this pass.

## Evidence and limits

59 pure state/contract/regression tests pass. Web/native lint and TypeScript pass. Default and explicit preview builds pass; 47/2,063 generated pages respectively. Preview coverage remains 180 screen contracts, forty web paths, thirty native paths, 138 eligible native screens, 1,620 applicable state views and 180 explicit N/A decisions. Generated markup checks and their exact current outcomes are in the retained JSON reports and VALIDATION.md.

Expo Doctor 20/20 and SDK compatibility pass. Android/iOS JS exports pass (~4.2MB/~4.0MB, 34 assets). Animate UI source audit covers 45 files. No webpage screenshots, measured viewports, hydrated interactions, screen readers, installed-device tests or runtime performance measurements. The saved browser-origin restriction is unchanged; no bypass or repeat retry. The native share sheet and picker are implemented but unverified on device.
