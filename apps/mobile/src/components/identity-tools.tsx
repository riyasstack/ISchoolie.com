import { ProductText as Text, nativeFont } from "./native-ui";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useIdentity } from "./identity-context";
import { identityImportRows } from "../../../../packages/contracts/identity-import";
import type { LoginMethodSummary } from "../../../../packages/contracts/identity-methods";
type Credential = {
  id: string;
  identifier: string;
  kind: string;
  status: string;
};
export function NativeIdentityTools() {
  const { account, request, refresh, providerSignIn, capabilities } =
    useIdentity();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [sessions, setSessions] = useState<
    { id: string; current: boolean; lastActiveAt: string }[]
  >([]);
  const [password, setPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [institution, setInstitution] = useState(
    account?.permissions[0]?.institutionId ?? "",
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
  const [recovery, setRecovery] = useState<string[]>([]);
  const [providers, setProviders] = useState<
    { id: string; provider: string }[]
  >([]);
  const [invitation, setInvitation] = useState("");
  const [mobile, setMobile] = useState("");
  const [challenge, setChallenge] = useState("");
  const [code, setCode] = useState("");
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
  const button = (
    label: string,
    action: () => Promise<void>,
    disabled = false,
  ) => (
    <Pressable
      accessibilityRole="button"
      disabled={busy || disabled}
      accessibilityState={{ disabled: busy || disabled }}
      onPress={() => void run(action)}
      style={[styles.button, (busy || disabled) && styles.disabled]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
  const field = (
    label: string,
    value: string,
    change: (value: string) => void,
    secure = false,
    multiline = false,
  ) => (
    <View style={styles.field}>
      <Text>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        value={value}
        onChangeText={change}
        secureTextEntry={secure}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!busy}
        multiline={multiline}
        keyboardType={
          label.toLowerCase().includes("email")
            ? "email-address"
            : label.toLowerCase().includes("year")
              ? "number-pad"
              : label.toLowerCase().includes("mobile number")
                ? "phone-pad"
                : "default"
        }
        style={[styles.input, multiline && styles.multiline]}
      />
    </View>
  );
  async function load() {
    setCredentials(
      (
        await request<{ credentials: Credential[] }>(
          `institutions/${institution}/credentials`,
        )
      ).credentials,
    );
  }
  return (
    <View style={styles.tools}>
      <Text accessibilityRole="header" style={styles.heading}>
        Sessions & account protection
      </Text>
      {button("Renew this session", async () => {
        await request("refresh", {});
        await refresh();
        setNotice("Session renewed without extending its original expiry.");
      })}
      {button("Review sessions", async () =>
        setSessions(
          (await request<{ sessions: typeof sessions }>("sessions")).sessions,
        ),
      )}
      {sessions.map((session) => (
        <View key={session.id} style={styles.record}>
          <Text>
            {session.current ? "This device" : "Another session"} ·{" "}
            {new Date(session.lastActiveAt).toLocaleString()}
          </Text>
          {button("End this session", async () => {
            await request("sessions/revoke", { id: session.id });
            if (session.current) await refresh().catch(() => {});
            else
              setSessions((previous) =>
                previous.filter((value) => value.id !== session.id),
              );
          })}
        </View>
      ))}
      {field("Current password", password, setPassword, true)}
      {field("New password", nextPassword, setNextPassword, true)}
      {button("Change password & sign out everywhere", async () => {
        await request("password/change", {
          currentPassword: password,
          password: nextPassword,
        });
        setPassword("");
        setNextPassword("");
      })}
      {account?.mfa === "verified" && (
        <>
          {button("Replace recovery codes", async () =>
            setRecovery(
              (
                await request<{ recoveryCodes: string[] }>(
                  "mfa/recovery-codes",
                  {},
                )
              ).recoveryCodes,
            ),
          )}
          {!!recovery.length && (
            <>
              <Text selectable>{recovery.join("\n")}</Text>
              {button("I saved my recovery codes privately", async () =>
                setRecovery([]),
              )}
            </>
          )}
          {button(
            "Remove authenticator (non-privileged accounts only)",
            async () => {
              await request("mfa/disable", { password });
              setPassword("");
              await refresh();
            },
          )}
        </>
      )}
      <Text accessibilityRole="header" style={styles.heading}>
        Connected Login Methods
      </Text>
      {button("Review connected methods", async () => {
        const value = await request<LoginMethodSummary>("login-methods");
        setMethods(value);
        setProviders(value.providers);
      })}
      {methods && (
        <>
          <Text>
            Email:{" "}
            {methods.email
              ? `${methods.email.address} · ${methods.email.verified ? "verified" : "unverified"}`
              : "not configured"}
          </Text>
          <Text>
            Password:{" "}
            {methods.passwordConfigured ? "configured" : "not configured"}
          </Text>
          <Text>Mobile: {methods.phone?.number ?? "not configured"}</Text>
          {methods.institutions.map((value) => (
            <Text key={`${value.institution.code}:${value.identifier}`}>
              {value.institution.name} · {value.identifier} · {value.status}
            </Text>
          ))}
        </>
      )}
      {providers.map((provider) => (
        <View key={provider.id}>
          <Text>{provider.provider}</Text>
          {button("Unlink provider & sign out", async () => {
            await request("providers/unlink", { provider: provider.provider });
            await refresh().catch(() => {});
          })}
        </View>
      ))}
      <Text style={styles.note}>
        Linking requires a recent second factor and proof of the provider
        account. The account session rotates after linking.
      </Text>
      {["google", "github", "apple"].map((provider) => (
        <View key={provider}>
          {button(
            `Link ${provider}`,
            () => providerSignIn(provider, true),
            capabilities.providers[provider] !== "CONFIGURED_UNVERIFIED",
          )}
        </View>
      ))}
      {methods && !methods.phone && (
        <>
          <Text style={styles.note}>
            Add a mobile credential to this identity after recent MFA and
            independent mobile proof. No parent role is assigned.
          </Text>
          {field("International mobile number", mobile, setMobile)}
          {button(
            "Verify new mobile (current password above; provider-only users must sign in again first)",
            async () => {
              const result = await request<{ challengeId: string }>(
                "phone/link/start",
                { phone: mobile, password },
              );
              setChallenge(result.challengeId);
              setPassword("");
            },
          )}
          {field("Mobile verification code", code, setCode)}
          {!methods.passwordConfigured &&
            field(
              "New mobile/account password",
              nextPassword,
              setNextPassword,
              true,
            )}
          {button(
            "Link verified mobile & sign out",
            async () => {
              await request("phone/link/confirm", {
                challengeId: challenge,
                code,
                ...(!methods.passwordConfigured
                  ? { password: nextPassword }
                  : {}),
              });
            },
            !challenge,
          )}
        </>
      )}
      {methods?.phone &&
        button("Remove mobile credential & sign out", async () => {
          await request("login-methods/phone/unlink", {});
        })}
      {field("Staff invitation token", invitation, setInvitation)}
      {button("Associate staff identifier & sign out", async () => {
        await request("identities/claim", { token: invitation });
        setInvitation("");
      })}
      <Text style={styles.note}>
        Association requires recent MFA and control of both accounts. Student
        association requires an approved safeguarding policy.
      </Text>
      {(account?.user.accountKind === "PARENT" || methods?.phone) && (
        <>
          {field("New international mobile number", mobile, setMobile)}
          {button(
            "Verify new mobile using current password above",
            async () => {
              const result = await request<{ challengeId: string }>(
                "phone/change/start",
                { phone: mobile, password },
              );
              setChallenge(result.challengeId);
              setPassword("");
            },
          )}
          {field("New mobile verification code", code, setCode)}
          {button(
            "Confirm mobile change & sign out",
            async () => {
              await request("phone/change/confirm", {
                challengeId: challenge,
                code,
              });
            },
            !challenge,
          )}
        </>
      )}
      {!!account?.permissions.length && (
        <>
          <Text accessibilityRole="header" style={styles.heading}>
            Institution credentials
          </Text>
          {account.permissions
            .filter(
              (value, index, array) =>
                array.findIndex(
                  (other) => other.institutionId === value.institutionId,
                ) === index,
            )
            .map((value) => (
              <View key={value.institutionId}>
                {button(
                  `Use ${value.institution?.name ?? "authorized institution"}${value.institution?.code ? ` · ${value.institution.code}` : ""}`,
                  async () => {
                    setInstitution(value.institutionId);
                    setDraft(null);
                    setApproved(false);
                    setCredentials([]);
                  },
                )}
              </View>
            ))}
          <Text style={styles.note}>
            Selected institution:{" "}
            {account.permissions.find(
              (value) => value.institutionId === institution,
            )?.institution?.name ?? "Authorized institution"}
            . TCH/ADM/SUP grants no role by itself. Student accounts stay
            restricted.
          </Text>
          <View style={styles.field}>
            {["STUDENT", "STAFF"].map((kind) => (
              <Pressable
                key={kind}
                accessibilityRole="button"
                accessibilityState={{
                  selected: row.kind === kind,
                  disabled: busy,
                }}
                disabled={busy}
                style={styles.button}
                onPress={() =>
                  setRow((previous) => ({ ...previous, kind, identifier: "" }))
                }
              >
                <Text>
                  {row.kind === kind ? "✓ " : ""}
                  {kind === "STUDENT"
                    ? "Student credential"
                    : "Staff credential"}
                </Text>
              </Pressable>
            ))}
          </View>
          {field("Display name", row.displayName, (value) =>
            setRow((previous) => ({ ...previous, displayName: value })),
          )}
          {field(
            "Institution-managed contact email",
            row.contactEmail,
            (value) =>
              setRow((previous) => ({ ...previous, contactEmail: value })),
          )}
          {row.kind === "STUDENT" ? (
            field(
              "Student ID (leading zeros preserved)",
              row.identifier,
              (value) =>
                setRow((previous) => ({ ...previous, identifier: value })),
            )
          ) : (
            <>
              {field(
                "Existing Staff ID (optional; blank issues a new ID)",
                row.identifier,
                (value) =>
                  setRow((previous) => ({ ...previous, identifier: value })),
              )}
              <View style={styles.field}>
                {["TCH", "ADM", "SUP"].map((staffType) => (
                  <Pressable
                    key={staffType}
                    accessibilityRole="button"
                    accessibilityState={{
                      selected: row.staffType === staffType,
                      disabled: busy,
                    }}
                    disabled={busy}
                    style={styles.button}
                    onPress={() =>
                      setRow((previous) => ({ ...previous, staffType }))
                    }
                  >
                    <Text>
                      {row.staffType === staffType ? "✓ " : ""}
                      {staffType === "TCH"
                        ? "Teaching staff"
                        : staffType === "ADM"
                          ? "Administrative staff"
                          : "Support staff"}{" "}
                      · {staffType}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {field("Hiring year", row.hiringYear, (value) =>
                setRow((previous) => ({ ...previous, hiringYear: value })),
              )}
            </>
          )}
          {button("Issue credential", async () => {
            await request(
              `institutions/${institution}/credentials`,
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
                    staffType: row.staffType,
                    hiringYear: Number(row.hiringYear),
                  },
            );
            setRow((previous) => ({
              ...previous,
              displayName: "",
              contactEmail: "",
              identifier: "",
            }));
            await load();
            setNotice("Credential issued. Send activation separately.");
          })}
          {button("Review issued credentials", load)}
          {credentials.map((value) => (
            <View key={value.id} style={styles.record}>
              <Text>
                {value.identifier} · {value.kind} · {value.status}
              </Text>
              {button(
                "Send activation invitation",
                async () => {
                  await request(
                    `institutions/${institution}/credentials/${value.id}/invite`,
                    {},
                  );
                  setNotice(
                    "Invitation queued for the configured delivery channel.",
                  );
                },
                value.status !== "ISSUED",
              )}
              {button(
                "Request managed recovery",
                async () => {
                  await request(
                    `institutions/${institution}/credentials/${value.id}/recovery`,
                    {},
                  );
                  setNotice(
                    "Recovery queued; MFA and student restrictions remain.",
                  );
                },
                value.status !== "ACTIVE",
              )}
              {button(
                "Revoke credential & end sessions",
                async () => {
                  await request(
                    `institutions/${institution}/credentials/${value.id}/revoke`,
                    {},
                  );
                  await load();
                },
                value.status === "REVOKED",
              )}
            </View>
          ))}
          {field(
            "Import rows (CSV or JSON array, up to 200, no passwords)",
            importText,
            (value) => {
              setImportText(value);
              setDraft(null);
              setApproved(false);
            },
            false,
            true,
          )}
          {button("Validate import preview", async () => {
            const result = await request<{ id: string; rows: unknown[] }>(
              `institutions/${institution}/imports/preview`,
              { rows: identityImportRows(importText) },
            );
            setDraft(result);
            setApproved(false);
          })}
          {draft && (
            <>
              <Text>
                {draft.rows.length} validated rows. No accounts created yet.
              </Text>
              <Text selectable>{JSON.stringify(draft.rows, null, 2)}</Text>
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: approved, disabled: busy }}
                disabled={busy}
                onPress={() => setApproved((value) => !value)}
                style={styles.button}
              >
                <Text>
                  {approved ? "✓ " : ""}I reviewed these exact rows and
                  institution
                </Text>
              </Pressable>
              {button(
                "Commit reviewed import",
                async () => {
                  await request(
                    `institutions/${institution}/imports/${draft.id}/commit`,
                    {},
                  );
                  setDraft(null);
                  setApproved(false);
                  await load();
                  setNotice("Import committed; send invitations separately.");
                },
                !approved,
              )}
            </>
          )}
        </>
      )}
      {!!notice && (
        <Text accessibilityLiveRegion="polite" style={styles.note}>
          {notice}
        </Text>
      )}
      {!!error && (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  tools: { gap: 14, borderTopWidth: 1, borderColor: "#D2D2D7", paddingTop: 22 },
  heading: { fontSize: 20, fontWeight: "600", color: "#0071E3" },
  field: { gap: 8 },
  input: {
    fontFamily: nativeFont,
    borderWidth: 1,
    borderColor: "#C9CBD2",
    borderRadius: 10,
    padding: 12,
    minHeight: 48,
  },
  multiline: { minHeight: 130, textAlignVertical: "top" },
  button: {
    minHeight: 46,
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#E8F2FC",
    justifyContent: "center",
  },
  buttonText: { color: "#0071E3", fontWeight: "500" },
  disabled: { opacity: 0.5 },
  record: {
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#D2D2D7",
  },
  note: { fontSize: 12, lineHeight: 19, color: "#6E6E73" },
  error: { color: "#A83B3B" },
});
