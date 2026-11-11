"use client";
import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, KeyRound, ShieldCheck } from "lucide-react";
import { Button } from "./ui";
import {
  identityApi as api,
  type IdentitySnapshot,
} from "@/lib/identity-client";
import { IdentitySecurity } from "./identity-security";
export type IdentityMode =
  | "login"
  | "institution"
  | "parent"
  | "privileged"
  | "register"
  | "verify"
  | "recover"
  | "reset"
  | "activate"
  | "phoneRegister"
  | "phoneRecover"
  | "phoneConfirm"
  | "staffRecover"
  | "privilegedRecover";
const titles: Record<IdentityMode, string> = {
  login: "Welcome back.",
  institution: "Your institution, connected.",
  parent: "Your verified mobile, connected.",
  privileged: "Authorized access, securely.",
  register: "Your next chapter starts here.",
  verify: "Verify your email.",
  recover: "Let’s get you back in.",
  reset: "A fresh start, securely.",
  activate: "Activate your issued account.",
  phoneRegister: "Verify your parent account.",
  phoneRecover: "Recover with your mobile.",
  phoneConfirm: "Confirm your mobile number.",
  staffRecover: "Recover your staff access.",
  privilegedRecover: "Recover your authorized account.",
};
const actions: Record<IdentityMode, string> = {
  login: "Email sign-in",
  institution: "Student / staff",
  parent: "Verified mobile",
  privileged: "Administrator / operator",
  register: "Create account",
  verify: "Verify email",
  recover: "Forgot password?",
  reset: "Reset with token",
  activate: "Activate invitation",
  phoneRegister: "Create parent account",
  phoneRecover: "Recover mobile sign-in",
  phoneConfirm: "Confirm mobile code",
  staffRecover: "Staff recovery",
  privilegedRecover: "Privileged recovery",
};
export function IdentityAccess({
  initialMode = "login",
}: {
  initialMode?: IdentityMode;
}) {
  const [credentialKind, setCredentialKind] = useState("STUDENT");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<IdentityMode>(initialMode);
  const [identity, setIdentity] = useState<IdentitySnapshot | null>(null);
  const [restoring, setRestoring] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [delivery, setDelivery] = useState("UNCONFIGURED");
  const [sms, setSms] = useState("UNCONFIGURED");
  const [providers, setProviders] = useState<Record<string, string>>({});
  const [challenge, setChallenge] = useState("");
  useEffect(() => {
    let live = true;
    void api<IdentitySnapshot>("me")
      .then((value) => {
        if (live) setIdentity(value);
      })
      .catch(() => {})
      .finally(() => {
        if (live) setRestoring(false);
      });
    void api<{
      emailDelivery: string;
      smsDelivery: string;
      providers: Record<string, string>;
    }>("capabilities")
      .then((value) => {
        if (live) {
          setDelivery(value.emailDelivery);
          setSms(value.smsDelivery);
          setProviders(value.providers);
        }
      })
      .catch(() => {});
    if (new URLSearchParams(window.location.search).get("auth_error"))
      setTimeout(() => {
        if (live)
          setError(
            "Provider sign-in could not be completed. Try again or use another sign-in method.",
          );
      }, 0);
    return () => {
      live = false;
    };
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    const token = String(data.get("token") ?? "");
    const phone = String(data.get("phone") ?? "");
    const displayName = String(data.get("displayName") ?? "");
    const routes = {
      login: "login/email",
      institution: "login/institution",
      parent: "login/parent",
      privileged: "login/privileged",
      register: "register",
      verify: "verify-email",
      recover: "recovery/email",
      reset: "recovery/reset",
      activate: "activate/institution",
      phoneRegister: "phone/start",
      phoneRecover: "phone/start",
      phoneConfirm: "phone/confirm",
      staffRecover: "recovery/institution",
      privilegedRecover: "recovery/privileged",
    };
    const bodies = {
      login: { email, password },
      institution: {
        institutionCode: String(data.get("institutionCode") ?? ""),
        kind: String(data.get("kind") ?? ""),
        identifier: String(data.get("identifier") ?? ""),
        password,
      },
      parent: { phone, password },
      privileged: { email, password },
      register: { email, password, displayName },
      verify: { token, password },
      recover: { email },
      reset: { token, password },
      activate: { token, password },
      phoneRegister: { phone, password, displayName, kind: "REGISTER" },
      phoneRecover: { phone, password, kind: "RECOVER" },
      phoneConfirm: {
        challengeId: String(data.get("challengeId") ?? ""),
        code: String(data.get("code") ?? ""),
        password,
      },
      staffRecover: {
        institutionCode: String(data.get("institutionCode") ?? ""),
        identifier: String(data.get("identifier") ?? ""),
      },
      privilegedRecover: { email },
    };
    setBusy(true);
    setNotice("");
    setError("");
    try {
      const result = await api<{ message: string; challengeId?: string }>(
        mode === "parent" ? "login/mobile" : routes[mode],
        bodies[mode],
      );
      form.reset();
      setNotice(result.message);
      if (["login", "institution", "parent", "privileged"].includes(mode))
        setIdentity(await api<IdentitySnapshot>("me"));
      if (result.challengeId) {
        setChallenge(result.challengeId);
        setMode("phoneConfirm");
      }
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to connect. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function logout(everywhere: boolean) {
    if (!identity || busy) return;
    setBusy(true);
    setError("");
    try {
      const result = await api(
        everywhere ? "logout-all" : "logout",
        {},
        identity.csrf,
      );
      setIdentity(null);
      setNotice(result.message);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to sign out");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main
      id="main-content"
      className={`identity-layout ${identity ? "identity-account-layout" : ""}`}
    >
      <section className="identity-story" aria-label="Welcome to iSchoolie">
        <span className="identity-eyebrow">
          <ShieldCheck size={18} aria-hidden /> ONE IDENTITY. NEW POSSIBILITIES.
        </span>
        <h1>
          A place for your
          <br />
          <em>next chapter.</em>
        </h1>
        <p>
          A place to learn, connect, and find what comes next. Start with your
          own secure iSchoolie account.
        </p>
        <div className="identity-story-note">
          <KeyRound size={24} aria-hidden />
          <span>
            Your account belongs to you.
            <br />
            Institution access is verified separately.
          </span>
        </div>
        <Link href="/app" className="identity-preview">
          Explore the fictional design preview{" "}
          <ArrowRight size={16} aria-hidden />
        </Link>
      </section>
      <section
        className="identity-card"
        aria-labelledby="identity-title"
        aria-busy={busy || restoring}
      >
        <span className="identity-eyebrow">ISCHOOLIE ACCOUNT</span>
        <h2 id="identity-title">
          {identity
            ? `Hello, ${identity.user.displayName ?? "there"}.`
            : mode === "institution"
              ? credentialKind === "STAFF"
                ? "Welcome to your staff workspace."
                : "Your learning starts here."
              : titles[mode]}
        </h2>
        {restoring ? (
          <p role="status">Checking your session…</p>
        ) : identity ? (
          <>
            <p className="identity-success">
              {identity.mfa === "pending"
                ? "Complete your second factor"
                : "Account session active"}
            </p>
            <p>{identity.user.email ?? identity.user.accountKind}</p>
            <p>
              {identity.restricted
                ? "Restricted student account. Academic access awaits an approved policy."
                : `${identity.permissions.length} institution permissions. Workspace features remain previews.`}
            </p>
            <IdentitySecurity
              key={identity.user.id}
              identity={identity}
              refresh={async () =>
                setIdentity(await api<IdentitySnapshot>("me"))
              }
              signedOut={() => setIdentity(null)}
            />
            <Button disabled={busy} onClick={() => void logout(false)}>
              Sign out on this device
            </Button>
            <button
              className="identity-text-button"
              disabled={busy}
              onClick={() => void logout(true)}
            >
              Sign out everywhere
            </button>
          </>
        ) : (
          <>
            <p>
              {mode === "login"
                ? "Sign in with your verified email and password."
                : "Use the login method issued or verified for your account."}
            </p>
            <nav
              className="identity-category-nav"
              aria-label="Sign-in category"
            >
              {[
                { id: "personal", mode: "login", label: "Personal" },
                {
                  id: "student",
                  mode: "institution",
                  label: "Student",
                  kind: "STUDENT",
                },
                {
                  id: "staff",
                  mode: "institution",
                  label: "Staff",
                  kind: "STAFF",
                },
                { id: "parent", mode: "parent", label: "Parent" },
              ].map((item) => (
                <button
                  key={item.id}
                  disabled={busy}
                  aria-pressed={
                    mode === item.mode &&
                    (!item.kind || credentialKind === item.kind)
                  }
                  onClick={() => {
                    setMode(item.mode as IdentityMode);
                    if (item.kind) setCredentialKind(item.kind);
                    setShowPassword(false);
                    setError("");
                    setNotice("");
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            {mode === "login" && (
              <div
                className="identity-provider-list"
                aria-label="External sign-in availability"
              >
                {["google", "github", "apple"].map((provider) => (
                  <button
                    key={provider}
                    disabled={
                      busy || providers[provider] !== "CONFIGURED_UNVERIFIED"
                    }
                    onClick={() => {
                      setBusy(true);
                      void api<{ url: string }>(`oidc/${provider}/start`, {})
                        .then((value) => window.location.assign(value.url))
                        .catch((cause) => {
                          setError(cause.message);
                          setBusy(false);
                        });
                    }}
                  >
                    {provider}
                    <small>
                      {providers[provider] === "CONFIGURED_UNVERIFIED"
                        ? "Configured · verification pending"
                        : "Not configured"}
                    </small>
                  </button>
                ))}
              </div>
            )}
            {delivery === "LOCAL_CAPTURE_ONLY" && (
              <p className="identity-local-note">
                Development mode: verification messages are captured locally. No
                email is sent.
              </p>
            )}
            {delivery === "UNCONFIGURED" &&
              ["register", "recover"].includes(mode) && (
                <p className="identity-local-note">
                  Email delivery is not configured. Registration and recovery
                  requests are unavailable.
                </p>
              )}
            {["phoneRegister", "phoneRecover", "phoneConfirm"].includes(
              mode,
            ) && (
              <p className="identity-local-note">
                {sms === "UNCONFIGURED"
                  ? "SMS delivery is not configured."
                  : sms === "LOCAL_CAPTURE_ONLY"
                    ? "Development SMS capture only. No SMS is sent."
                    : "SMS provider configured; delivery verification is pending."}
              </p>
            )}
            <form
              key={`${mode}:${credentialKind}`}
              onSubmit={submit}
              className="identity-form"
            >
              {["register", "phoneRegister"].includes(mode) && (
                <label>
                  Display name
                  <input
                    name="displayName"
                    autoComplete="name"
                    maxLength={100}
                    required
                    disabled={busy}
                  />
                </label>
              )}
              {[
                "login",
                "privileged",
                "register",
                "recover",
                "privilegedRecover",
              ].includes(mode) && (
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    disabled={busy}
                  />
                </label>
              )}
              {["parent", "phoneRegister", "phoneRecover"].includes(mode) && (
                <label>
                  International mobile number
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+ country code and mobile number"
                    maxLength={30}
                    required
                    disabled={busy}
                  />
                </label>
              )}
              {mode === "institution" && (
                <>
                  <label>
                    Institution code
                    <input
                      name="institutionCode"
                      autoComplete="organization"
                      maxLength={64}
                      required
                      disabled={busy}
                    />
                  </label>
                  <input type="hidden" name="kind" value={credentialKind} />
                  <label>
                    {credentialKind === "STAFF" ? "Staff ID" : "Student ID"}
                    <input
                      name="identifier"
                      placeholder={
                        credentialKind === "STAFF"
                          ? "2026-TCH-0001"
                          : "26LKGA102"
                      }
                      autoCapitalize="none"
                      spellCheck={false}
                      maxLength={64}
                      required
                      disabled={busy}
                    />
                  </label>
                </>
              )}
              {mode === "staffRecover" && (
                <>
                  <label>
                    Institution code
                    <input
                      name="institutionCode"
                      required
                      maxLength={64}
                      disabled={busy}
                    />
                  </label>
                  <label>
                    Staff ID
                    <input
                      name="identifier"
                      required
                      maxLength={64}
                      disabled={busy}
                    />
                  </label>
                  <small>
                    Recovery uses the institution-managed contact channel.
                    Students should contact their institution.
                  </small>
                </>
              )}
              {["verify", "reset", "activate"].includes(mode) && (
                <label>
                  One-time token
                  <input
                    name="token"
                    autoComplete="off"
                    maxLength={128}
                    required
                    disabled={busy}
                    spellCheck={false}
                  />
                  <small>
                    Paste the token from your verification, recovery or
                    activation message.
                  </small>
                </label>
              )}
              {mode === "phoneConfirm" && (
                <>
                  <input
                    type="hidden"
                    name="challengeId"
                    value={challenge}
                    readOnly
                  />
                  <label>
                    Mobile verification code
                    <input
                      name="code"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      required
                      disabled={busy}
                    />
                  </label>
                </>
              )}
              {!["recover", "staffRecover", "privilegedRecover"].includes(
                mode,
              ) && (
                <div className="identity-password-field">
                  <label htmlFor="identity-password">
                    {["verify", "activate", "phoneConfirm"].includes(mode)
                      ? "Choose your account password"
                      : "Password"}
                  </label>
                  <div className="identity-password-control">
                    <input
                      id="identity-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete={
                        [
                          "login",
                          "institution",
                          "parent",
                          "privileged",
                        ].includes(mode)
                          ? "current-password"
                          : "new-password"
                      }
                      minLength={
                        [
                          "login",
                          "institution",
                          "parent",
                          "privileged",
                        ].includes(mode)
                          ? undefined
                          : 12
                      }
                      maxLength={128}
                      required
                      disabled={busy}
                    />
                    <button
                      type="button"
                      disabled={busy}
                      aria-pressed={showPassword}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <small>
                    New passwords require 12–128 characters. Spaces are
                    preserved.
                  </small>
                </div>
              )}
              <Button
                type="submit"
                disabled={
                  busy ||
                  (delivery === "UNCONFIGURED" &&
                    [
                      "register",
                      "recover",
                      "staffRecover",
                      "privilegedRecover",
                    ].includes(mode)) ||
                  (sms === "UNCONFIGURED" &&
                    ["phoneRegister", "phoneRecover"].includes(mode))
                }
              >
                {busy ? "Please wait…" : actions[mode]}{" "}
                <ArrowRight size={16} aria-hidden />
              </Button>
            </form>
            <nav className="identity-mode-nav" aria-label="Account actions">
              {(
                [
                  "register",
                  "verify",
                  "recover",
                  "staffRecover",
                  "privilegedRecover",
                  "reset",
                  "activate",
                  "phoneRegister",
                  "phoneRecover",
                ] as IdentityMode[]
              )
                .filter((value) => value !== mode)
                .map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      setMode(value);
                      setNotice("");
                      setError("");
                    }}
                    disabled={busy}
                  >
                    {actions[value]}
                  </button>
                ))}
            </nav>
            <p className="identity-restricted-entry">
              <Link href="/auth/privileged">
                Restricted administration sign-in
              </Link>
            </p>
            <div className="identity-institution-note">
              <strong>Joining through an institution?</strong>
              <p>
                Activate your issued invitation before using Student ID or TCH /
                ADM / SUP Staff ID sign-in. Student access remains restricted.
                Parent verification creates no child relationship.
              </p>
            </div>
          </>
        )}
        {notice && (
          <p role="status" className="identity-success">
            {notice}
          </p>
        )}
        {error && (
          <p role="alert" className="identity-error">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}
