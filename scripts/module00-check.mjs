import assert from "node:assert/strict";
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(path.join(root, p), "utf8");
const screens = JSON.parse(read("docs/module-00/screen-register.json"));
const progress = JSON.parse(read("docs/module-00/progress.json"));
assert.equal(screens.length, 180);
assert.equal(new Set(screens.map((s) => s.id)).size, 180);
const expected = {
  PUB: 22,
  AUTH: 16,
  APP: 19,
  STU: 24,
  EDU: 23,
  PAR: 15,
  INS: 30,
  PRO: 11,
  ADM: 20,
};
const counts = {};
for (const [family, total] of Object.entries(expected)) {
  const rows = screens.filter((s) => s.role === family);
  assert.equal(rows.length, total);
  counts[family] = {
    complete: 0,
    partial: rows.filter((s) =>
      ["partial prototype", "authored prototype"].includes(s.status),
    ).length,
    pending: rows.filter((s) => s.status === "pending").length,
  };
  for (let i = 1; i <= total; i++)
    assert(
      rows.some((s) => s.id === `${family}-${String(i).padStart(2, "0")}`),
    );
}
for (const row of screens)
  for (const key of [
    "role",
    "desktop_layout",
    "mobile_web",
    "native",
    "components",
    "interactions",
    "data_source",
    "accessibility",
    "visual_qa",
    "dependency",
  ])
    assert(row[key], `${row.id}: missing ${key}`);
const workflowIds = [
  ...read("docs/module-00/WORKFLOW-COVERAGE.md").matchAll(/^\| (W\d{2}) \|/gm),
].map((m) => m[1]);
assert.equal(workflowIds.length, 40);
assert.equal(new Set(workflowIds).size, 40);
const routes = new Set([
  "/",
  "/about",
  "/trust",
  "/institutions",
  "/courses",
  "/courses/design",
  "/auth/sign-in",
  "/app",
  "/app/network",
  "/app/communities",
  "/app/inbox",
  "/app/student",
  "/app/student/player",
  "/app/courses",
  "/app/educator",
  "/app/educator/editor",
  "/app/guardian",
  "/app/professional",
  "/app/notifications",
  "/app/settings",
  "/app/saved",
  "/org/example/students",
  "/org/example/attendance",
  "/org/example/finance",
  "/ops",
  "/design-lab",
]);
for (const row of screens.filter((s) => s.route))
  assert(
    routes.has(row.route.split("#")[0]) || row.route === `/preview/${row.id}`,
    `${row.id}: unknown route ${row.route}`,
  );
const tokens = JSON.parse(read("packages/design-tokens/tokens.json"));
const luminance = (hex) => {
  const rgb = hex
    .replace("#", "")
    .match(/../g)
    .map((v) => parseInt(v, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
};
const contrast = (a, b) => {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
const pairs = [
  ["brand on white", tokens.color.brand, "#ffffff"],
  ["ink on white", tokens.color.ink, "#ffffff"],
  ["secondary on white", tokens.color.muted, "#ffffff"],
  ["success on sage", tokens.color.success, tokens.color.sage],
  ["danger on white", tokens.color.danger, "#ffffff"],
];
const contrastResults = pairs.map(([name, a, b]) => {
  const ratio = contrast(a, b);
  assert(ratio >= 4.5, `${name}: ${ratio}`);
  return { name, ratio: Number(ratio.toFixed(2)) };
});
const css =
  read("apps/web/src/app/globals.css") +
  read("apps/web/src/app/enterprise.css");
assert(css.includes("prefers-reduced-motion"));
assert(!/transition\s*:\s*all\b/.test(css));
assert(!/animation[^;]*\binfinite\b/.test(css));
const gate = read("apps/web/src/lib/preview-gate.ts");
assert(gate.includes("ISCHOOLIE_UI_PREVIEW"));
assert(gate.includes("notFound()"));
const htmlPath = "apps/web/.next/server/app/index.html";
assert(
  existsSync(path.join(root, htmlPath)),
  "Build Next.js before the artifact checks",
);
const html = read(htmlPath);
assert(html.includes("Education opens doors."));
assert(html.includes("Find your next chapter"));
assert(html.includes('id="main-content"'));
assert(!html.includes("To get started, edit"));
const mode = process.argv.includes("--preview")
  ? "preview"
  : "production-default";
const opsHtml = read("apps/web/.next/server/app/ops.html");
if (mode === "production-default") {
  assert(
    !opsHtml.includes("Governance workspace"),
    "Operations preview exposed in a default production prerender",
  );
} else {
  assert(
    opsHtml.includes("Governance workspace"),
    "Explicit preview build did not include the operations boundary",
  );
  assert(/no privileged identity/i.test(opsHtml));
}
const report = {
  kind: "static-source-and-build-artifact-checks",
  mode,
  screenEntries: screens.length,
  partialMappings: progress.screens.length,
  workflowEntries: 40,
  partialWorkflowPaths: Object.keys(progress.workflows).length,
  counts,
  contrastResults,
  passed: true,
  limitations: [
    "No browser rendering or interaction assertions",
    "No viewport measurements",
    "No screen-reader, device, real-user performance, or production authorization tests",
  ],
};
const contracts = JSON.parse(read("packages/contracts/frontend-screens.json"));
const workflows = JSON.parse(
  read("packages/contracts/frontend-workflows.json"),
);
const manifest = JSON.parse(read("apps/web/.next/prerender-manifest.json"));
let checkedScreenArtifacts = 0,
  checkedWorkflowArtifacts = 0;
if (mode === "preview") {
  for (const spec of contracts) {
    assert(
      manifest.routes[spec.route],
      `Missing prerendered route ${spec.route}`,
    );
    const markup = read(`apps/web/.next/server/app/preview/${spec.id}.html`);
    assert(
      markup.includes('id="main-content"'),
      `${spec.id}: missing main content`,
    );
    assert(
      !markup.includes("Contract mismatch"),
      `${spec.id}: fallback renderer`,
    );
    if (
      [
        "editor",
        "resources",
        "assessment-builder",
        "assignment-builder",
      ].includes(spec.kind)
    )
      assert(
        markup.includes("advanced-author") &&
          markup.includes("Save local snapshot"),
        `${spec.id}: advanced authoring surface missing`,
      );
    if (
      [
        "admissions",
        "marks",
        "reconciliation",
        "bookings",
        "publication",
      ].includes(spec.kind)
    )
      assert(
        markup.includes("case-lifecycle"),
        `${spec.id}: staged case review missing`,
      );
    if (spec.id === "PRO-04")
      assert(
        markup.includes("Add weekly window") &&
          markup.includes("Inspect 30-minute fit"),
        "PRO-04: recurring availability missing",
      );
    if (spec.kind === "grading")
      assert(
        markup.includes("Rubric feedback draft"),
        `${spec.id}: rubric feedback missing`,
      );
    if (
      spec.rows.length &&
      [
        "records",
        "assignments",
        "report",
        "admissions",
        "audit",
        "marks",
        "cases",
      ].includes(spec.kind)
    )
      assert(markup.includes("<table"), `${spec.id}: register missing`);
    if (
      spec.fields.length &&
      ["form", "identity", "support", "privacy", "preferences"].includes(
        spec.kind,
      )
    )
      assert(markup.includes("<form"), `${spec.id}: form missing`);
    assert(
      markup.includes('data-state-contract="' + spec.id + '"'),
      "State boundary missing: " + spec.id,
    );
    if (spec.kind === "submission")
      assert(
        markup.includes("submission-workbench") &&
          markup.includes("Response title") &&
          markup.includes("Review local response"),
        "Learner submission task missing: " + spec.id,
      );
    checkedScreenArtifacts++;
  }
  for (const workflow of workflows) {
    assert(manifest.routes[workflow.route], `Missing ${workflow.route}`);
    const markup = read(
      `apps/web/.next/server/app/design-lab/workflows/${workflow.id}.html`,
    );
    assert(
      markup.includes("workflow-stage"),
      `${workflow.id}: active step missing`,
    );
    checkedWorkflowArtifacts++;
  }
} else {
  assert(
    !Object.keys(manifest.routes).some(
      (route) =>
        route.startsWith("/preview/") &&
        route !== "/preview/__preview_disabled__",
    ),
    "Default production build exposed the design catalog screens",
  );
  assert(
    !Object.keys(manifest.routes).some((route) =>
      /^\/design-lab\/workflows\/W\d+/.test(route),
    ),
    "Default production build exposed workflow prototypes",
  );
  assert(
    !Object.keys(manifest.routes).some((route) =>
      /^\/design-lab\/states\/(PUB|AUTH|APP|STU|EDU|PAR|INS|PRO|ADM)-/.test(
        route,
      ),
    ),
    "Default production build exposed screen state fixtures",
  );
  const deniedState = read(
    "apps/web/.next/server/app/design-lab/states/__preview_disabled__/__disabled__.html",
  );
  assert(
    deniedState.includes("NEXT_HTTP_ERROR_FALLBACK;404") &&
      !deniedState.includes("data-state-contract="),
    "Disabled state route must be a not-found response",
  );
  // Cache Components requires a nonempty static-param sample even when gated.
  // Only this synthetic 404 sample is allowed; real screen/workflow IDs stay absent.
  for (const folder of ["preview", "design-lab/workflows"]) {
    const denied = read(
      `apps/web/.next/server/app/${folder}/__preview_disabled__.html`,
    );
    assert(
      denied.includes("NEXT_HTTP_ERROR_FALLBACK;404"),
      `${folder}: disabled sample must be not-found`,
    );
    assert(
      !denied.includes("workflow-stage") &&
        !denied.includes("preview-state-bar"),
      `${folder}: disabled sample contains a task surface`,
    );
  }
}
report.checkedScreenArtifacts = checkedScreenArtifacts;
report.checkedWorkflowArtifacts = checkedWorkflowArtifacts;
writeFileSync(
  path.join(root, "docs/module-00/static-check-results.json"),
  JSON.stringify(report, null, 2) + "\n",
);
writeFileSync(
  path.join(root, `docs/module-00/${mode}-check-results.json`),
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report, null, 2));
