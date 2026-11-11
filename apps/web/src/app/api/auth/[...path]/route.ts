import type { NextRequest } from "next/server";
const reads = new Set([
  "capabilities",
  "me",
  "mfa/status",
  "sessions",
  "providers",
  "login-methods",
]);
const writes = new Set([
  "register",
  "verify-email",
  "login/email",
  "login/institution",
  "login/parent",
  "login/mobile",
  "login/privileged",
  "activate/institution",
  "logout",
  "logout-all",
  "recovery/email",
  "recovery/reset",
  "recovery/institution",
  "recovery/privileged",
  "identities/claim",
  "mfa/enroll",
  "mfa/confirm",
  "mfa/verify",
  "mfa/recovery-codes",
  "mfa/disable",
  "sessions/revoke",
  "password/change",
  "refresh",
  "providers/unlink",
  "phone/start",
  "phone/confirm",
  "phone/change/start",
  "phone/change/confirm",
  "phone/link/start",
  "phone/link/confirm",
  "login-methods/phone/unlink",
]);
async function forward(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const path = (await context.params).path.join("/");
  const dynamic =
    request.method === "GET"
      ? /^oidc\/(google|github|apple)\/callback$|^oidc\/native\/[0-9a-f-]{36}\/begin$|^institutions\/[0-9a-f-]{36}\/credentials$/i.test(
          path,
        )
      : /^oidc\/(google|github|apple)\/start$|^institutions\/[0-9a-f-]{36}\/(credentials|imports\/preview|imports\/[0-9a-f-]{36}\/commit|credentials\/[0-9a-f-]{36}\/(invite|revoke|recovery))$/i.test(
          path,
        );
  if (!(request.method === "GET" ? reads : writes).has(path) && !dynamic)
    return Response.json(
      { message: "Unknown authentication action" },
      { status: 404 },
    );
  if (
    request.method === "POST" &&
    request.headers.get("origin") !==
      (process.env.AUTH_PUBLIC_ORIGIN ?? "http://localhost:3000")
  )
    return Response.json(
      { message: "Trusted origin required" },
      { status: 403 },
    );
  const limit = /\/imports\/preview$/.test(path) ? 262144 : 16384;
  if (Number(request.headers.get("content-length") ?? 0) > limit)
    return Response.json({ message: "Request too large" }, { status: 413 });
  const body = request.method === "POST" ? await request.text() : undefined;
  if (body && new TextEncoder().encode(body).length > limit)
    return Response.json({ message: "Request too large" }, { status: 413 });
  const headers = new Headers({ "Content-Type": "application/json" });
  for (const key of ["cookie", "x-csrf-token", "origin"]) {
    const value = request.headers.get(key);
    if (value) headers.set(key, value);
  }
  try {
    const query = /^oidc\/(google|github|apple)\/callback$/.test(path)
      ? request.nextUrl.search
      : "";
    if (query.length > 8192)
      return Response.json({ message: "Callback too large" }, { status: 400 });
    const response = await fetch(
      `${process.env.AUTH_API_URL ?? "http://127.0.0.1:4000"}/auth/${path}${query}`,
      {
        method: request.method,
        headers,
        body,
        cache: "no-store",
        redirect: "manual",
        signal: AbortSignal.timeout(30000),
      },
    );
    const output = new Headers({
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    for (const cookie of response.headers.getSetCookie())
      output.append("Set-Cookie", cookie);
    const location = response.headers.get("location");
    if (location) {
      const native =
        process.env.AUTH_NATIVE_REDIRECT_URI ?? "ischoolie://auth-return";
      const allowed =
        location === "/auth/sign-in" ||
        location === "/auth/sign-in?auth_error=provider" ||
        location.startsWith(`${native}?`) ||
        /^https:\/\/(accounts\.google\.com|github\.com|appleid\.apple\.com)\//.test(
          location,
        );
      if (!allowed)
        return Response.json(
          { message: "Unexpected authentication redirect" },
          { status: 502 },
        );
      output.set("Location", location);
    }
    return new Response(await response.text(), {
      status: response.status,
      headers: output,
    });
  } catch {
    return Response.json(
      { message: "The identity service is unavailable. Please try again." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
export const GET = forward;
export const POST = forward;
