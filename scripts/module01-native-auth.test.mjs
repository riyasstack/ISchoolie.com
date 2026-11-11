import test from "node:test";
import assert from "node:assert/strict";
import {
  NativeIdentityClient,
  nativeCallback,
} from "../packages/contracts/native-auth-client.ts";
import { identityImportRows } from "../packages/contracts/identity-import.ts";
const token = "A".repeat(43);
test("native tokens use only the secure adapter and explicit cookie-free bearer transport", async () => {
  let stored = null;
  const calls = [];
  const client = new NativeIdentityClient(
    "https://identity.invalid",
    {
      get: async () => stored,
      set: async (value) => {
        stored = value;
      },
      clear: async () => {
        stored = null;
      },
    },
    async (url, options) => {
      calls.push({ url, options });
      return Response.json(
        url.endsWith("/login/email")
          ? { token, mfa: "none" }
          : { user: { id: "u" } },
      );
    },
  );
  await client.restore();
  const result = await client.request("login/email", {
    email: "qa@example.invalid",
    password: "private",
  });
  assert.equal(stored, token);
  assert.equal(result.token, undefined);
  await client.request("me");
  assert.equal(calls[1].options.credentials, "omit");
  assert.equal(calls[1].options.headers.Authorization, `Bearer ${token}`);
  assert.equal(calls[1].options.headers.Cookie, undefined);
  await client.request("logout", {});
  assert.equal(stored, null);
});
test("a rejected second factor retains the pending credential; expired restoration clears it", async () => {
  let stored = token;
  const client = new NativeIdentityClient(
    "https://identity.invalid",
    {
      get: async () => stored,
      set: async (value) => {
        stored = value;
      },
      clear: async () => {
        stored = null;
      },
    },
    async () => Response.json({ message: "Denied" }, { status: 401 }),
  );
  await client.restore();
  await assert.rejects(client.request("mfa/verify", { code: "000000" }));
  assert.equal(stored, token);
  await assert.rejects(client.request("me"));
  assert.equal(stored, null);
});
test("failed secure persistence revokes the unusable token and does not sign in", async () => {
  const calls = [];
  let cleared = false;
  const client = new NativeIdentityClient(
    "https://identity.invalid",
    {
      get: async () => null,
      set: async () => {
        throw new Error("locked");
      },
      clear: async () => {
        cleared = true;
      },
    },
    async (url, options) => {
      calls.push({ url, options });
      return Response.json({ token });
    },
  );
  await assert.rejects(
    client.request("login/email", {}),
    /Secure session storage/,
  );
  assert.equal(cleared, true);
  assert.equal(calls[1].url, "https://identity.invalid/auth/logout");
  assert.equal(calls[1].options.headers.Authorization, `Bearer ${token}`);
});
test("logout defeats an in-flight login response and stale restoration", async () => {
  let stored = null;
  let release;
  const pending = new Promise((resolve) => {
    release = resolve;
  });
  const client = new NativeIdentityClient(
    "https://identity.invalid",
    {
      get: async () => stored,
      set: async (value) => {
        stored = value;
      },
      clear: async () => {
        stored = null;
      },
    },
    async () => {
      await pending;
      return Response.json({ token });
    },
  );
  const login = client.request("login/email", {});
  await client.clear();
  release();
  await assert.rejects(login, /Session changed/);
  assert.equal(stored, null);
});
test("native callbacks require the exact destination, initiating state, broker and unique fields", () => {
  const base = "ischoolie://auth-return";
  const url = `${base}?state=owned&broker=transaction&code=${token}`;
  assert.equal(nativeCallback(url, base, "owned", "transaction"), token);
  assert.throws(() => nativeCallback(url, base, "different", "transaction"));
  assert.throws(() =>
    nativeCallback(
      url.replace("auth-return", "other"),
      base,
      "owned",
      "transaction",
    ),
  );
  assert.throws(() =>
    nativeCallback(`${url}&state=owned`, base, "owned", "transaction"),
  );
});
test("credential CSV preserves identifiers, quoted names and staff fields without passwords", () => {
  const rows = identityImportRows(
    'kind,displayName,contactEmail,identifier,staffType,hiringYear\nSTUDENT,"Learner, A",contact@example.invalid,0001,,\nSTAFF,Teacher,teacher@example.invalid,,TCH,2026',
  );
  assert.deepEqual(rows, [
    {
      kind: "STUDENT",
      displayName: "Learner, A",
      contactEmail: "contact@example.invalid",
      identifier: "0001",
    },
    {
      kind: "STAFF",
      displayName: "Teacher",
      contactEmail: "teacher@example.invalid",
      staffType: "TCH",
      hiringYear: 2026,
    },
  ]);
  assert.throws(() =>
    identityImportRows(
      "kind,displayName,contactEmail,password\nSTAFF,A,a@example.invalid,secret",
    ),
  );
  assert.throws(() =>
    identityImportRows(
      'kind,displayName,contactEmail\nSTUDENT,"Bad"tail,a@example.invalid',
    ),
  );
  assert.throws(() =>
    identityImportRows(
      JSON.stringify(Array.from({ length: 201 }, () => ({ kind: "STAFF" }))),
    ),
  );
});
