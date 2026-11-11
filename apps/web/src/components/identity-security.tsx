"use client";
import { useState } from "react";
import { Button } from "./ui";
import {
  identityApi as api,
  type IdentitySnapshot,
} from "@/lib/identity-client";
import { identityImportRows } from "../../../../packages/contracts/identity-import";
import type { LoginMethodSummary } from "../../../../packages/contracts/identity-methods";
type Props = {
  identity: IdentitySnapshot;
  refresh: () => Promise<void>;
  signedOut: () => void;
};
type Credential = {
  id: string;
  identifier: string;
  kind: string;
  status: string;
  contactEmail: string | null;
  user?: { displayName: string | null };
};
export function IdentitySecurity({ identity, refresh, signedOut }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [enrolled, setEnrolled] = useState<boolean | null>(null);
  const [secret, setSecret] = useState("");
  const [recovery, setRecovery] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [sessions, setSessions] = useState<
    { id: string; current: boolean; createdAt: string; lastActiveAt: string }[]
  >([]);
  const [providers, setProviders] = useState<
    { id: string; provider: string }[]
  >([]);
  const [institution, setInstitution] = useState(
    identity.permissions[0]?.institutionId ?? "",
  );
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [row, setRow] = useState({
    kind: "STUDENT",
    displayName: "",
    contactEmail: "",
    identifier: "",
    staffType: "TCH",
    hiringYear: String(new Date().getFullYear()),
  });
  const [importText, setImportText] = useState("");
  const [draft, setDraft] = useState<{ id: string; rows: unknown[] } | null>(
    null,
  );
  const [approved, setApproved] = useState(false);
  const [invitation, setInvitation] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileChallenge, setMobileChallenge] = useState("");
  const [mobileCode, setMobileCode] = useState("");
  const [methods, setMethods] = useState<LoginMethodSummary | null>(null);
  async function run(action: () => Promise<void>) {
    if (busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await action();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to complete this action",
      );
    } finally {
      setBusy(false);
    }
  }
  const action = <T,>(path: string, body?: object) =>
    api<T>(path, body, identity.csrf);
  const field = (
    label: string,
    value: string,
    change: (value: string) => void,
    type = "text",
  ) => (
    <label>
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => change(event.target.value)}
        autoComplete={
          type === "password"
            ? label.startsWith("New")
              ? "new-password"
              : "current-password"
            : "off"
        }
        disabled={busy}
      />
    </label>
  );
  async function loadCredentials() {
    const result = await action<{ credentials: Credential[] }>(
      `institutions/${institution}/credentials`,
    );
    setCredentials(result.credentials);
  }
  return (
    <div className="identity-tools" aria-busy={busy}>
      <details open={identity.mfa === "pending"}>
        <summary>Authenticator & recovery</summary>
        <div className="identity-form">
          <p>
            {identity.mfa === "pending"
              ? "Complete the second factor before continuing."
              : "Protect your account with an authenticator."}
          </p>
          <Button
            disabled={busy}
            onClick={() =>
              void run(async () => {
                const result = await action<{ enrolled: boolean }>(
                  "mfa/status",
                );
                setEnrolled(result.enrolled);
              })
            }
          >
            Check setup status
          </Button>
          {enrolled === false && (
            <>
              {field("Current password", password, setPassword, "password")}
              <Button
                disabled={busy}
                onClick={() =>
                  void run(async () => {
                    const result = await action<{ secret: string }>(
                      "mfa/enroll",
                      { password },
                    );
                    setSecret(result.secret);
                    setPassword("");
                  })
                }
              >
                Set up authenticator
              </Button>
            </>
          )}
          {secret && (
            <p className="identity-local-note">
              Add this key to your authenticator privately:{" "}
              <code>{secret}</code>
            </p>
          )}
          {field("Authenticator or recovery code", code, setCode)}
          <Button
            disabled={busy}
            onClick={() =>
              void run(async () => {
                if (secret) {
                  const result = await action<{ recoveryCodes: string[] }>(
                    "mfa/confirm",
                    { code },
                  );
                  setRecovery(result.recoveryCodes);
                  setSecret("");
                  setEnrolled(true);
                } else await action("mfa/verify", { code });
                setCode("");
                await refresh();
              })
            }
          >
            {secret ? "Confirm authenticator" : "Verify authenticator code"}
          </Button>
          {!secret && (
            <Button
              disabled={busy}
              onClick={() =>
                void run(async () => {
                  await action("mfa/verify", { code, recovery: true });
                  setCode("");
                  await refresh();
                })
              }
            >
              Use a recovery code
            </Button>
          )}
          {identity.mfa === "verified" && (
            <Button
              disabled={busy}
              onClick={() =>
                void run(async () => {
                  const result = await action<{ recoveryCodes: string[] }>(
                    "mfa/recovery-codes",
                    {},
                  );
                  setRecovery(result.recoveryCodes);
                })
              }
            >
              Replace recovery codes
            </Button>
          )}
          {!!recovery.length && (
            <div className="identity-local-note">
              <p>
                Save privately. These codes are shown once; each works once.
              </p>
              <pre>{recovery.join("\n")}</pre>
              <button
                className="identity-text-button"
                onClick={() => setRecovery([])}
              >
                I saved these codes
              </button>
            </div>
          )}
        </div>
      </details>
      {identity.mfa !== "pending" && (
        <>
          <details>
            <summary>Sessions & password</summary>
            <div className="identity-form">
              <Button
                disabled={busy}
                onClick={() =>
                  void run(async () => {
                    await action("refresh", {});
                    await refresh();
                    setNotice(
                      "Session renewed without extending its original expiry.",
                    );
                  })
                }
              >
                Renew this session
              </Button>
              <Button
                disabled={busy}
                onClick={() =>
                  void run(async () => {
                    setSessions(
                      (await action<{ sessions: typeof sessions }>("sessions"))
                        .sessions,
                    );
                  })
                }
              >
                Review signed-in devices
              </Button>
              {sessions.map((session) => (
                <div key={session.id} className="identity-record">
                  <p>
                    {session.current ? "This device" : "Another session"} · last
                    active {new Date(session.lastActiveAt).toLocaleString()}
                  </p>
                  <button
                    disabled={busy}
                    className="identity-text-button"
                    onClick={() =>
                      void run(async () => {
                        await action("sessions/revoke", { id: session.id });
                        if (session.current) signedOut();
                        else
                          setSessions((previous) =>
                            previous.filter((value) => value.id !== session.id),
                          );
                      })
                    }
                  >
                    End session
                  </button>
                </div>
              ))}
              {field("Current password", password, setPassword, "password")}
              {field("New password", newPassword, setNewPassword, "password")}
              <Button
                disabled={busy}
                onClick={() =>
                  void run(async () => {
                    await action("password/change", {
                      currentPassword: password,
                      password: newPassword,
                    });
                    setPassword("");
                    setNewPassword("");
                    signedOut();
                  })
                }
              >
                Change password & end all sessions
              </Button>
              <button
                disabled={busy}
                className="identity-text-button"
                onClick={() =>
                  void run(async () => {
                    await action("mfa/disable", { password });
                    setPassword("");
                    setEnrolled(false);
                    await refresh();
                    setNotice(
                      "Authenticator removed; previous sessions ended.",
                    );
                  })
                }
              >
                Remove authenticator (privileged accounts cannot)
              </button>
            </div>
          </details>
          <details>
            <summary>Connected Login Methods</summary>
            <div className="identity-form">
              <p>
                Linking requires a recent second factor and control of both
                accounts. Matching emails never merge identities.
              </p>
              <Button
                disabled={busy}
                onClick={() =>
                  void run(async () => {
                    const value =
                      await action<LoginMethodSummary>("login-methods");
                    setMethods(value);
                    setProviders(value.providers);
                  })
                }
              >
                Review connected methods
              </Button>
              {methods && (
                <>
                  <p>
                    Email:{" "}
                    {methods.email
                      ? `${methods.email.address} · ${methods.email.verified ? "verified" : "unverified"}`
                      : "not configured"}
                  </p>
                  <p>
                    Password:{" "}
                    {methods.passwordConfigured
                      ? "configured"
                      : "not configured"}
                  </p>
                  <p>Mobile: {methods.phone?.number ?? "not configured"}</p>
                  {methods.institutions.map((value) => (
                    <p key={`${value.institution.code}:${value.identifier}`}>
                      {value.institution.name} · {value.kind} ·{" "}
                      {value.identifier} · {value.status}
                    </p>
                  ))}
                </>
              )}
              {["google", "github", "apple"].map((provider) => (
                <button
                  key={provider}
                  className="identity-text-button"
                  disabled={busy}
                  onClick={() =>
                    void run(async () => {
                      const result = await action<{ url: string }>(
                        `oidc/${provider}/start`,
                        { link: true },
                      );
                      window.location.assign(result.url);
                    })
                  }
                >
                  Link {provider}
                </button>
              ))}
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  disabled={busy}
                  className="identity-text-button"
                  onClick={() =>
                    void run(async () => {
                      await action("providers/unlink", {
                        provider: provider.provider,
                      });
                      signedOut();
                    })
                  }
                >
                  Unlink {provider.provider} & sign out
                </button>
              ))}
              {methods && !methods.phone && (
                <>
                  <p>
                    Add a mobile login to this identity. Recent MFA and
                    independent mobile proof are required; this does not assign
                    a parent role.
                  </p>
                  {field(
                    "International mobile number",
                    mobile,
                    setMobile,
                    "tel",
                  )}
                  {methods.passwordConfigured ? (
                    field("Current password", password, setPassword, "password")
                  ) : (
                    <p>
                      Sign in again with your provider before starting. Choose a
                      password when confirming the mobile code.
                    </p>
                  )}
                  <Button
                    disabled={busy}
                    onClick={() =>
                      void run(async () => {
                        const value = await action<{ challengeId: string }>(
                          "phone/link/start",
                          { phone: mobile, password },
                        );
                        setMobileChallenge(value.challengeId);
                        setPassword("");
                      })
                    }
                  >
                    Verify mobile credential
                  </Button>
                  {!!mobileChallenge && (
                    <>
                      {field(
                        "Mobile verification code",
                        mobileCode,
                        setMobileCode,
                      )}
                      {!methods.passwordConfigured &&
                        field(
                          "New account password",
                          newPassword,
                          setNewPassword,
                          "password",
                        )}
                      <Button
                        disabled={busy}
                        onClick={() =>
                          void run(async () => {
                            await action("phone/link/confirm", {
                              challengeId: mobileChallenge,
                              code: mobileCode,
                              ...(!methods.passwordConfigured
                                ? { password: newPassword }
                                : {}),
                            });
                            signedOut();
                          })
                        }
                      >
                        Link verified mobile & sign out
                      </Button>
                    </>
                  )}
                </>
              )}
              {methods?.phone && (
                <button
                  disabled={busy}
                  className="identity-text-button"
                  onClick={() =>
                    void run(async () => {
                      await action("login-methods/phone/unlink", {});
                      signedOut();
                    })
                  }
                >
                  Remove mobile credential & sign out
                </button>
              )}
            </div>
          </details>
          <details>
            <summary>Associate an issued staff identifier</summary>
            <div className="identity-form">
              <p>
                Requires your signed-in account, recent MFA and the
                institution’s one-time staff invitation. Student association
                awaits an approved policy.
              </p>
              {field("Staff invitation token", invitation, setInvitation)}
              <Button
                disabled={busy}
                onClick={() =>
                  void run(async () => {
                    await action("identities/claim", { token: invitation });
                    setInvitation("");
                    signedOut();
                  })
                }
              >
                Associate staff identifier & sign out
              </Button>
            </div>
          </details>
          {(identity.user.accountKind === "PARENT" || methods?.phone) && (
            <details>
              <summary>Change verified mobile number</summary>
              <div className="identity-form">
                {field(
                  "New international mobile number",
                  mobile,
                  setMobile,
                  "tel",
                )}
                {field("Current password", password, setPassword, "password")}
                <Button
                  disabled={busy}
                  onClick={() =>
                    void run(async () => {
                      const value = await action<{ challengeId: string }>(
                        "phone/change/start",
                        { phone: mobile, password },
                      );
                      setMobileChallenge(value.challengeId);
                      setPassword("");
                      setNotice(
                        "If eligible, the new number receives a verification code.",
                      );
                    })
                  }
                >
                  Verify new mobile
                </Button>
                {field("Mobile verification code", mobileCode, setMobileCode)}
                <Button
                  disabled={busy || !mobileChallenge}
                  onClick={() =>
                    void run(async () => {
                      await action("phone/change/confirm", {
                        challengeId: mobileChallenge,
                        code: mobileCode,
                      });
                      signedOut();
                    })
                  }
                >
                  Confirm new number & sign out everywhere
                </Button>
              </div>
            </details>
          )}
          {!!identity.permissions.length && (
            <details>
              <summary>Institution credential provisioning</summary>
              <div className="identity-form">
                <p>
                  Identifiers grant no role by themselves. Student accounts
                  remain restricted. Invitations contain no reusable password.
                </p>
                <label>
                  Institution
                  <select
                    value={institution}
                    disabled={busy}
                    onChange={(event) => {
                      setInstitution(event.target.value);
                      setCredentials([]);
                      setDraft(null);
                      setApproved(false);
                    }}
                  >
                    {[
                      ...new Set(
                        identity.permissions.map(
                          (value) => value.institutionId,
                        ),
                      ),
                    ].map((id) => (
                      <option key={id} value={id}>
                        {identity.permissions.find(
                          (value) => value.institutionId === id,
                        )?.institution?.name ?? "Authorized institution"}{" "}
                        ·{" "}
                        {identity.permissions.find(
                          (value) => value.institutionId === id,
                        )?.institution?.code ?? id}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Credential type
                  <select
                    value={row.kind}
                    disabled={busy}
                    onChange={(event) =>
                      setRow((previous) => ({
                        ...previous,
                        kind: event.target.value,
                        identifier: "",
                      }))
                    }
                  >
                    <option value="STUDENT">Student ID</option>
                    <option value="STAFF">Staff ID</option>
                  </select>
                </label>
                {field("Display name", row.displayName, (value) =>
                  setRow((previous) => ({ ...previous, displayName: value })),
                )}
                {field(
                  "Institution-managed contact email",
                  row.contactEmail,
                  (value) =>
                    setRow((previous) => ({
                      ...previous,
                      contactEmail: value,
                    })),
                  "email",
                )}
                {row.kind === "STUDENT" ? (
                  field(
                    "Student ID (leading zeros preserved)",
                    row.identifier,
                    (value) =>
                      setRow((previous) => ({
                        ...previous,
                        identifier: value,
                      })),
                  )
                ) : (
                  <>
                    {field(
                      "Existing Staff ID (optional; blank issues a new ID)",
                      row.identifier,
                      (value) =>
                        setRow((previous) => ({
                          ...previous,
                          identifier: value,
                        })),
                    )}
                    <label>
                      Staff type
                      <select
                        value={row.staffType}
                        onChange={(event) =>
                          setRow((previous) => ({
                            ...previous,
                            staffType: event.target.value,
                          }))
                        }
                      >
                        <option>TCH</option>
                        <option>ADM</option>
                        <option>SUP</option>
                      </select>
                    </label>
                    {field(
                      "Hiring year",
                      row.hiringYear,
                      (value) =>
                        setRow((previous) => ({
                          ...previous,
                          hiringYear: value,
                        })),
                      "number",
                    )}
                  </>
                )}
                <Button
                  disabled={busy}
                  onClick={() =>
                    void run(async () => {
                      const body =
                        row.kind === "STUDENT"
                          ? {
                              kind: row.kind,
                              displayName: row.displayName,
                              contactEmail: row.contactEmail,
                              identifier: row.identifier,
                            }
                          : {
                              kind: row.kind,
                              displayName: row.displayName,
                              contactEmail: row.contactEmail,
                              ...(row.identifier
                                ? { identifier: row.identifier }
                                : {}),
                              staffType: row.staffType,
                              hiringYear: Number(row.hiringYear),
                            };
                      await action(
                        `institutions/${institution}/credentials`,
                        body,
                      );
                      await loadCredentials();
                      setNotice(
                        "Credential issued. Send its activation invitation separately.",
                      );
                    })
                  }
                >
                  Issue credential
                </Button>
                <Button
                  disabled={busy}
                  onClick={() => void run(loadCredentials)}
                >
                  Review issued credentials
                </Button>
                {credentials.map((credential) => (
                  <div key={credential.id} className="identity-record">
                    <strong>{credential.identifier}</strong>
                    <p>
                      {credential.kind} · {credential.status} ·{" "}
                      {credential.user?.displayName}
                    </p>
                    <button
                      disabled={busy || credential.status !== "ISSUED"}
                      className="identity-text-button"
                      onClick={() =>
                        void run(async () => {
                          await action(
                            `institutions/${institution}/credentials/${credential.id}/invite`,
                            {},
                          );
                          setNotice(
                            "Activation instructions queued for the configured delivery channel.",
                          );
                        })
                      }
                    >
                      Send activation invitation
                    </button>
                    <button
                      disabled={busy || credential.status !== "ACTIVE"}
                      className="identity-text-button"
                      onClick={() =>
                        void run(async () => {
                          await action(
                            `institutions/${institution}/credentials/${credential.id}/recovery`,
                            {},
                          );
                          setNotice(
                            "Recovery queued. Existing MFA and student restrictions remain.",
                          );
                        })
                      }
                    >
                      Request managed recovery
                    </button>
                    <button
                      disabled={busy || credential.status === "REVOKED"}
                      className="identity-text-button"
                      onClick={() =>
                        void run(async () => {
                          await action(
                            `institutions/${institution}/credentials/${credential.id}/revoke`,
                            {},
                          );
                          await loadCredentials();
                        })
                      }
                    >
                      Revoke & end sessions
                    </button>
                  </div>
                ))}
                <label>
                  Import rows (CSV or JSON; 1–200, no passwords)
                  <textarea
                    rows={7}
                    value={importText}
                    disabled={busy}
                    onChange={(event) => {
                      setImportText(event.target.value);
                      setDraft(null);
                      setApproved(false);
                    }}
                    placeholder={
                      "kind,displayName,contactEmail,identifier,staffType,hiringYear\nSTUDENT,Learner,contact@example.com,0001,,"
                    }
                  />
                </label>
                <Button
                  disabled={busy}
                  onClick={() =>
                    void run(async () => {
                      const result = await action<{
                        id: string;
                        rows: unknown[];
                      }>(`institutions/${institution}/imports/preview`, {
                        rows: identityImportRows(importText),
                      });
                      setDraft(result);
                      setApproved(false);
                    })
                  }
                >
                  Validate import preview
                </Button>
                {draft && (
                  <>
                    <p>
                      {draft.rows.length} validated rows. No accounts created
                      yet.
                    </p>
                    <pre className="identity-import-preview">
                      {JSON.stringify(draft.rows, null, 2)}
                    </pre>
                    <label className="identity-check">
                      <input
                        type="checkbox"
                        checked={approved}
                        onChange={(event) => setApproved(event.target.checked)}
                      />
                      I reviewed these exact rows and institution.
                    </label>
                    <Button
                      disabled={busy || !approved}
                      onClick={() =>
                        void run(async () => {
                          await action(
                            `institutions/${institution}/imports/${draft.id}/commit`,
                            {},
                          );
                          setDraft(null);
                          setApproved(false);
                          setNotice(
                            "Import committed. Invitations must be delivered separately.",
                          );
                          await loadCredentials();
                        })
                      }
                    >
                      Commit reviewed import
                    </Button>
                  </>
                )}
              </div>
            </details>
          )}
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
    </div>
  );
}
