import { notFound } from "next/navigation";
/** Server-only preview boundary. This is deliberately not authentication. */
export function requirePreview() {
  if (
    process.env.NODE_ENV !== "development" &&
    process.env.ISCHOOLIE_UI_PREVIEW !== "true"
  )
    notFound();
}
