import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { randomUUID, createHash, createHmac } from "node:crypto";
import { readFile, readdir, unlink } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(root, "apps/api/package.json"));
require("dotenv").config({
  path: path.join(root, "apps/api/.env"),
  quiet: true,
});
const { Client } = require("pg");
const db = new Client({ connectionString: process.env.DATABASE_URL });
await db.connect();
const base = process.env.AUTH_SMOKE_ORIGIN ?? "http://localhost:3000";
const email = `http-qa-${randomUUID()}@example.invalid`;
const password = `Test-only-${randomUUID()}`;
const captures = path.join(root, "apps/api/.local-auth");
const ownedFiles = new Set();
const parentPhone = "+12025550126";
const parentName = `HTTP parent ${randomUUID()}`;
let parentId;
let phoneChallenge;
let recoveryCodes = [];
let cookie;
let csrf;
let checks = 0;
const check = (value, label) => {
  assert.ok(value, label);
  checks++;
};
async function call(route, body, extra = {}) {
  return fetch(`${base}/api/auth/${route}`, {
    method: body ? "POST" : "GET",
    headers: {
      ...(body ? { "Content-Type": "application/json", Origin: base } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
      ...extra,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}
async function captured(kind) {
  for (let attempt = 0; attempt < 30; attempt++) {
    for (const file of await readdir(captures)) {
      if (!file.endsWith(".json")) continue;
      const target = path.join(captures, file);
      const message = JSON.parse(await readFile(target, "utf8"));
      if (message.email === email) {
        ownedFiles.add(target);
        if (message.kind === kind) return message.token;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Expected explicit local delivery capture; no message found");
}
function authenticator(secret) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "";
  for (const character of secret.replace(/=+$/, ""))
    bits += alphabet.indexOf(character).toString(2).padStart(5, "0");
  const bytes = [];
  for (let index = 0; index + 8 <= bits.length; index += 8)
    bytes.push(parseInt(bits.slice(index, index + 8), 2));
  const counter = Buffer.alloc(8);
  counter.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 30000)));
  const mac = createHmac("sha1", Buffer.from(bytes)).update(counter).digest();
  return ((mac.readUInt32BE(mac[19] & 15) & 0x7fffffff) % 1000000)
    .toString()
    .padStart(6, "0");
}
async function capturedPhone(id) {
  for (let attempt = 0; attempt < 30; attempt++) {
    for (const file of await readdir(captures)) {
      if (!file.endsWith(".json")) continue;
      const target = path.join(captures, file);
      const message = JSON.parse(await readFile(target, "utf8"));
      if (message.phone === parentPhone && message.challengeId === id) {
        ownedFiles.add(target);
        return message.code;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Expected explicit local SMS capture");
}
try {
  const page = await fetch(`${base}/auth/sign-in`);
  const signInMarkup = await page.text();
  check(page.status === 200 && signInMarkup.includes('id="identity-title"') && signInMarkup.includes("Welcome back."), "Sign-in document");
  check((await call("me")).status === 401, "Anonymous session denied");
  check((await call("anything")).status === 404, "Proxy path allowlist");
  check(
    (
      await call(
        "register",
        { email, password, displayName: "HTTP QA" },
        { Origin: "https://untrusted.invalid" },
      )
    ).status === 403,
    "Untrusted origin denied",
  );
  const capability = await (await call("capabilities")).json();
  check(
    capability.emailDelivery === "LOCAL_CAPTURE_ONLY",
    "Explicit local capture enabled",
  );
  check(
    (await call("register", { email, password, displayName: "HTTP QA" }))
      .status === 201,
    "Registration through Next proxy",
  );
  const verification = await captured("EMAIL_VERIFY");
  check(
    (await call("verify-email", { token: verification, password })).status ===
      201,
    "One-time verification",
  );
  const login = await call("login/email", { email, password });
  check(login.status === 201, "Password sign-in through proxy");
  const header = login.headers.get("set-cookie");
  check(
    header?.includes("HttpOnly") && header.includes("SameSite=Lax"),
    "Cookie flags survive proxy",
  );
  cookie = header.split(";")[0];
  const me = await (await call("me")).json();
  check(
    me.user.email === email && me.permissions.length === 0,
    "Restored public identity has no institutional permissions",
  );
  csrf = me.csrf;
  const enrollment = await call(
    "mfa/enroll",
    { password },
    { "X-CSRF-Token": csrf },
  );
  check(enrollment.status === 201, "Authenticator enrollment through proxy");
  const setup = await enrollment.json();
  const confirmation = await call(
    "mfa/confirm",
    { code: authenticator(setup.secret) },
    { "X-CSRF-Token": csrf },
  );
  check(
    confirmation.status === 201,
    "Authenticator confirmation through proxy",
  );
  const confirmed = await confirmation.json();
  recoveryCodes = confirmed.recoveryCodes;
  check(recoveryCodes.length === 10, "Recovery codes shown once");
  cookie = confirmation.headers.get("set-cookie").split(";")[0];
  const secured = await (await call("me")).json();
  csrf = secured.csrf;
  check(secured.mfa === "verified", "MFA state restored after rotated cookie");
  const methods = await (await call("login-methods")).json();
  check(
    methods.passwordConfigured === true &&
      methods.email.address === email &&
      !JSON.stringify(methods).includes("passwordHash"),
    "Connected methods exclude secret hashes",
  );
  check((await call("sessions")).status === 200, "Session list through proxy");
  const renewal = await call("refresh", {}, { "X-CSRF-Token": csrf });
  check(renewal.status === 201, "Session renewal through proxy");
  cookie = renewal.headers.get("set-cookie").split(";")[0];
  const renewed = await (await call("me")).json();
  csrf = renewed.csrf;
  check(
    renewed.session.expiresAt === secured.session.expiresAt,
    "Renewal retains absolute expiry",
  );
  check((await call("logout", {})).status === 403, "Missing CSRF denied");
  check(
    (await call("logout-all", {}, { "X-CSRF-Token": csrf })).status === 201,
    "Logout everywhere",
  );
  check((await call("me")).status === 401, "Cookie no longer authenticates");
  cookie = undefined;
  check(
    (await call("recovery/email", { email })).status === 201,
    "Recovery through proxy",
  );
  const recovery = await captured("PASSWORD_RESET");
  check(
    (
      await call("recovery/reset", {
        token: recovery,
        password: `${password}-new`,
      })
    ).status === 201,
    "Password reset through proxy",
  );
  check(
    (await call("login/email", { email, password })).status === 401,
    "Old password denied",
  );
  const afterReset = await call("login/email", {
    email,
    password: `${password}-new`,
  });
  check(afterReset.status === 201, "Recovered password accepted");
  check(
    (await afterReset.json()).mfa === "pending",
    "Recovery does not bypass MFA",
  );
  cookie = afterReset.headers.get("set-cookie").split(";")[0];
  const pending = await (await call("me")).json();
  csrf = pending.csrf;
  const step = await call(
    "mfa/verify",
    { code: recoveryCodes[0], recovery: true },
    { "X-CSRF-Token": csrf },
  );
  check(step.status === 201, "Recovery code completes MFA through proxy");
  cookie = step.headers.get("set-cookie").split(";")[0];
  csrf = (await (await call("me")).json()).csrf;
  await call("logout", {}, { "X-CSRF-Token": csrf });
  cookie = undefined;
  check(
    capability.smsDelivery === "LOCAL_CAPTURE_ONLY",
    "Explicit local SMS capture enabled",
  );
  const prior = await db.query(
    'SELECT "userId" FROM "PhoneIdentity" WHERE phone=$1',
    [parentPhone],
  );
  check(prior.rows.length === 0, "Reserved smoke-test phone is unused");
  const phoneStart = await call("phone/start", {
    phone: parentPhone,
    kind: "REGISTER",
    password,
    displayName: parentName,
  });
  check(phoneStart.status === 201, "Parent verification request through proxy");
  phoneChallenge = (await phoneStart.json()).challengeId;
  const phoneCode = await capturedPhone(phoneChallenge);
  check(
    (
      await call("phone/confirm", {
        challengeId: phoneChallenge,
        code: phoneCode,
        password,
      })
    ).status === 201,
    "Parent phone proof through proxy",
  );
  parentId = (
    await db.query('SELECT "userId" FROM "PhoneIdentity" WHERE phone=$1', [
      parentPhone,
    ])
  ).rows[0].userId;
  const parentLogin = await call("login/parent", {
    phone: parentPhone,
    password,
  });
  check(parentLogin.status === 201, "Parent password login through proxy");
  cookie = parentLogin.headers.get("set-cookie").split(";")[0];
  const parent = await (await call("me")).json();
  check(
    parent.user.accountKind === "PARENT" && parent.permissions.length === 0,
    "Parent proof creates no institution or child authority",
  );
  console.log(
    JSON.stringify(
      {
        status: "PASS",
        checks,
        browserExecuted: false,
        delivery: "LOCAL_CAPTURE_ONLY",
      },
      null,
      2,
    ),
  );
} finally {
  const users = await db.query(
    'SELECT id FROM "User" WHERE "emailCanonical" = $1',
    [email],
  );
  for (const { id } of users.rows) {
    await db.query('DELETE FROM "IdentityAudit" WHERE "userId" = $1', [id]);
    await db.query('DELETE FROM "User" WHERE id = $1', [id]);
  }
  if (parentId) {
    await db.query('DELETE FROM "PhoneIdentity" WHERE "userId"=$1', [parentId]);
    await db.query('DELETE FROM "IdentityAudit" WHERE "userId"=$1', [parentId]);
    await db.query('DELETE FROM "User" WHERE id=$1', [parentId]);
  }
  if (phoneChallenge)
    await db.query('DELETE FROM "IdentityPhoneChallenge" WHERE id=$1', [
      phoneChallenge,
    ]);
  const scoped = [
    `phone:${parentPhone}`,
    ...users.rows.flatMap(({ id }) => [`mfa-enroll:${id}`, `mfa:${id}`]),
  ];
  for (const value of scoped)
    await db.query('DELETE FROM "IdentityRateLimit" WHERE key=$1', [
      `account:${createHash("sha256").update(value).digest("hex")}`,
    ]);
  await db.query('DELETE FROM "IdentityRateLimit" WHERE key = $1', [
    `account:${createHash("sha256").update(email).digest("hex")}`,
  ]);
  for (const file of ownedFiles) {
    await db.query('DELETE FROM "IdentityDeliveryMessage" WHERE id = $1', [
      path.basename(file, ".json"),
    ]);
    await unlink(file);
  }
  await db.end();
}
