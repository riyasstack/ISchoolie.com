import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main-content" className="auth-boundary">
      <span className="section-kicker">ISCHOOLIE / NOT AVAILABLE</span>
      <h1>
        A different path
        <br />
        is waiting.
      </h1>
      <p>
        This route is not available. Workspace design previews are
        development-only unless explicitly enabled for a preview build.
      </p>
      <Link href="/" className="button">
        Back to iSchoolie
      </Link>
    </main>
  );
}
