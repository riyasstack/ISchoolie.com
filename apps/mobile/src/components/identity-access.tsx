import { ProductText as Text, nativeFont } from "./native-ui";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIdentity } from "./identity-context";
import { NativeIdentityTools } from "./identity-tools";
type Mode =
  | "email"
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
const titles: Record<Mode, string> = {
  email: "Sign in",
  institution: "Institution sign-in",
  parent: "Verified mobile sign-in",
  privileged: "Administrator / operator",
  register: "Create public account",
  verify: "Verify email",
  recover: "Recover account",
  reset: "Reset password",
  activate: "Activate issued account",
  phoneRegister: "Create parent account",
  phoneRecover: "Recover mobile sign-in",
  phoneConfirm: "Verify mobile code",
  staffRecover: "Recover staff access",
  privilegedRecover: "Recover privileged access",
};
export function NativeIdentityAccess() {
  const {
    account,
    loading,
    error: restorationError,
    request,
    refresh,
    providerSignIn,
    capabilities,
  } = useIdentity();
  const [mode, setMode] = useState<Mode>("email");
  const [values, setValues] = useState<Record<string, string>>({
    kind: "STUDENT",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [secret, setSecret] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [enrolled, setEnrolled] = useState<boolean | null>(null);
  const accountId = account?.user.id;
  useEffect(() => {
    if (!accountId) return;
    let live = true;
    void request<{ enrolled: boolean }>("mfa/status")
      .then((value) => {
        if (live) setEnrolled(value.enrolled);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [accountId, request]);
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
  function field(name: string, label: string, password = false) {
    return (
      <View key={name} style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          accessibilityLabel={label}
          value={values[name] ?? ""}
          onChangeText={(value) =>
            setValues((previous) => ({ ...previous, [name]: value }))
          }
          editable={!busy}
          secureTextEntry={password && !showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={
            password
              ? "password"
              : name.toLowerCase().includes("email")
                ? "email"
                : "off"
          }
          keyboardType={
            name.toLowerCase().includes("email") ? "email-address" : "default"
          }
          style={styles.input}
        />
        {password && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              showPassword ? "Hide password" : "Show password"
            }
            accessibilityState={{ selected: showPassword, disabled: busy }}
            disabled={busy}
            onPress={() => setShowPassword(!showPassword)}
            style={styles.choice}
          >
            <Text>{showPassword ? "Hide password" : "Show password"}</Text>
          </Pressable>
        )}
      </View>
    );
  }
  function button(
    label: string,
    action: () => Promise<void>,
    secondary = false,
    disabled = false,
  ) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: busy || loading || disabled }}
        disabled={busy || loading || disabled}
        onPress={() => void run(action)}
        style={[
          styles.button,
          secondary && styles.secondary,
          (busy || loading || disabled) && styles.disabled,
        ]}
      >
        <Text style={[styles.buttonText, secondary && styles.secondaryText]}>
          {label}
        </Text>
      </Pressable>
    );
  }
  async function submit() {
    const routes = {
      email: "login/email",
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
      email: { email: values.email, password: values.password },
      parent: { phone: values.phone, password: values.password },
      privileged: { email: values.email, password: values.password },
      institution: {
        institutionCode: values.institutionCode,
        kind: values.kind,
        identifier: values.identifier,
        password: values.password,
      },
      register: {
        email: values.email,
        password: values.password,
        displayName: values.displayName,
      },
      verify: { token: values.token, password: values.password },
      recover: { email: values.email },
      reset: { token: values.token, password: values.password },
      activate: { token: values.token, password: values.password },
      phoneRegister: {
        phone: values.phone,
        kind: "REGISTER",
        password: values.password,
        displayName: values.displayName,
      },
      phoneRecover: {
        phone: values.phone,
        kind: "RECOVER",
        password: values.password,
      },
      phoneConfirm: {
        challengeId: values.challengeId,
        code: values.code,
        password: values.password,
      },
      staffRecover: {
        institutionCode: values.institutionCode,
        identifier: values.identifier,
      },
      privilegedRecover: { email: values.email },
    };
    const result = await request<{ message: string; challengeId?: string }>(
      mode === "parent" ? "login/mobile" : routes[mode],
      bodies[mode],
    );
    setNotice(result.message);
    setValues({
      kind: "STUDENT",
      ...(result.challengeId ? { challengeId: result.challengeId } : {}),
    });
    if (result.challengeId) setMode("phoneConfirm");
    if (["email", "institution", "parent", "privileged"].includes(mode)) {
      await refresh();
      const status = await request<{ enrolled: boolean }>("mfa/status");
      setEnrolled(status.enrolled);
    }
  }
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.safe}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
        >
          <Text style={styles.eyebrow}>ISCHOOLIE · YOUR ACCOUNT</Text>
          <Text accessibilityRole="header" style={styles.title}>
            Your learning world,{`\n`}thoughtfully connected.
          </Text>
          <View style={styles.card}>
            <Text accessibilityRole="header" style={styles.heading}>
              {account
                ? account.mfa === "pending"
                  ? "Complete your secure sign-in"
                  : `Hello, ${account.user.displayName ?? "there"}.`
                : titles[mode]}
            </Text>
            {loading ? (
              <Text accessibilityLiveRegion="polite">
                Restoring your secure session…
              </Text>
            ) : account ? (
              <>
                <Text>{account.user.email ?? account.user.accountKind}</Text>
                {account.restricted && (
                  <Text style={styles.note}>
                    Restricted student account. Academic access awaits an
                    approved institution policy.
                  </Text>
                )}
                <Text style={styles.note}>
                  {account.mfa === "verified"
                    ? "Second factor verified"
                    : account.mfa === "pending"
                      ? "A second factor is required before privileged access."
                      : "Account session active. No institution access is inferred from your login type."}
                </Text>
                {button(
                  "Check authenticator status",
                  async () => {
                    const value = await request<{ enrolled: boolean }>(
                      "mfa/status",
                    );
                    setEnrolled(value.enrolled);
                    setNotice(
                      value.enrolled
                        ? "Authenticator enrolled"
                        : "Authenticator not enrolled",
                    );
                  },
                  true,
                )}
                {enrolled === false && (
                  <>
                    {field("password", "Current password", true)}
                    {button("Set up authenticator", async () => {
                      const value = await request<{ secret: string }>(
                        "mfa/enroll",
                        { password: values.password },
                      );
                      setSecret(value.secret);
                      setValues({});
                    })}
                  </>
                )}
                {secret && (
                  <>
                    <Text selectable style={styles.note}>
                      Add this key to your authenticator privately:{`\n`}
                      {secret}
                    </Text>
                    {field("code", "Authenticator code")}
                    {button("Confirm authenticator", async () => {
                      const result = await request<{ recoveryCodes: string[] }>(
                        "mfa/confirm",
                        { code: values.code },
                      );
                      setSecret("");
                      setValues({});
                      setEnrolled(true);
                      setRecoveryCodes(result.recoveryCodes);
                      await refresh();
                    })}
                  </>
                )}
                {enrolled !== false && !secret && (
                  <>
                    {field("code", "Authenticator or recovery code")}
                    {button("Verify authenticator code", async () => {
                      await request("mfa/verify", { code: values.code });
                      setValues({});
                      await refresh();
                    })}
                    {button(
                      "Use recovery code",
                      async () => {
                        await request("mfa/verify", {
                          code: values.code,
                          recovery: true,
                        });
                        setValues({});
                        await refresh();
                      },
                      true,
                    )}
                  </>
                )}
                {recoveryCodes.length > 0 && (
                  <View>
                    <Text style={styles.note}>
                      Save these codes privately. Each works once.
                    </Text>
                    <Text selectable>{recoveryCodes.join("\n")}</Text>
                    {button(
                      "I saved my recovery codes",
                      async () => {
                        setRecoveryCodes([]);
                      },
                      true,
                    )}
                  </View>
                )}
                {account.mfa !== "pending" && <NativeIdentityTools />}
                {button("Sign out", async () => {
                  await request("logout", {});
                  setValues({});
                  setSecret("");
                  setRecoveryCodes([]);
                })}
                {button(
                  "Sign out everywhere",
                  async () => {
                    await request("logout-all", {});
                    setValues({});
                    setSecret("");
                    setRecoveryCodes([]);
                  },
                  true,
                )}
              </>
            ) : (
              <>
                <View style={styles.modes}>
                  {[
                    { id: "personal", mode: "email", label: "Personal" },
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
                    <Pressable
                      key={item.id}
                      accessibilityRole="button"
                      accessibilityState={{
                        selected:
                          mode === item.mode &&
                          (!item.kind || values.kind === item.kind),
                        disabled: busy,
                      }}
                      disabled={busy}
                      onPress={() => {
                        setMode(item.mode as Mode);
                        setValues({ kind: item.kind ?? "STUDENT" });
                        setShowPassword(false);
                        setError("");
                        setNotice("");
                      }}
                      style={[
                        styles.choice,
                        mode === item.mode &&
                          (!item.kind || values.kind === item.kind) &&
                          styles.selected,
                      ]}
                    >
                      <Text>{item.label}</Text>
                    </Pressable>
                  ))}
                </View>
                <Text style={styles.heading}>
                  {mode === "institution"
                    ? values.kind === "STAFF"
                      ? "Staff sign-in"
                      : "Student sign-in"
                    : titles[mode]}
                </Text>
                {["register", "phoneRegister"].includes(mode) &&
                  field("displayName", "Display name")}
                {[
                  "email",
                  "privileged",
                  "register",
                  "recover",
                  "privilegedRecover",
                ].includes(mode) && field("email", "Email address")}
                {mode === "institution" && (
                  <>
                    {field("institutionCode", "Institution code")}
                    <View style={styles.modes}>
                      {["STUDENT", "STAFF"].map((kind) => (
                        <Pressable
                          accessibilityRole="button"
                          accessibilityState={{
                            selected: values.kind === kind,
                          }}
                          key={kind}
                          onPress={() =>
                            setValues((previous) => ({ ...previous, kind }))
                          }
                          style={[
                            styles.choice,
                            values.kind === kind && styles.selected,
                          ]}
                        >
                          <Text>
                            {kind === "STUDENT"
                              ? "Student ID"
                              : "TCH / ADM / SUP Staff ID"}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                    {field("identifier", "Institution-issued identifier")}
                  </>
                )}
                {["parent", "phoneRegister", "phoneRecover"].includes(mode) &&
                  field(
                    "phone",
                    "International mobile number (+ country code)",
                  )}
                {mode === "staffRecover" && (
                  <>
                    {field("institutionCode", "Institution code")}
                    {field("identifier", "Staff ID")}
                    <Text style={styles.note}>
                      Students must request institution-managed recovery. MFA is
                      retained during password recovery.
                    </Text>
                  </>
                )}
                {mode === "phoneConfirm" &&
                  field("code", "Mobile verification code")}
                {["verify", "reset", "activate"].includes(mode) &&
                  field("token", "One-time activation or recovery token")}
                {!["recover", "staffRecover", "privilegedRecover"].includes(
                  mode,
                ) &&
                  field(
                    "password",
                    mode === "verify" ||
                      mode === "activate" ||
                      mode === "phoneConfirm"
                      ? "Choose your account password"
                      : "Password",
                    true,
                  )}
                <Text style={styles.note}>
                  New passwords require 12–128 characters. Provider and SMS
                  actions remain unavailable until configured and verified.
                </Text>
                {button(
                  busy ? "Please wait…" : titles[mode],
                  submit,
                  false,
                  ([
                    "register",
                    "recover",
                    "staffRecover",
                    "privilegedRecover",
                  ].includes(mode) &&
                    capabilities.emailDelivery === "UNCONFIGURED") ||
                    (["phoneRegister", "phoneRecover"].includes(mode) &&
                      capabilities.smsDelivery === "UNCONFIGURED"),
                )}
                <View style={styles.modes}>
                  {(
                    [
                      "register",
                      "recover",
                      "activate",
                      "phoneRegister",
                      "phoneRecover",
                      "staffRecover",
                      "privilegedRecover",
                      "verify",
                      "reset",
                    ] as Mode[]
                  ).map((value) => (
                    <Pressable
                      key={value}
                      accessibilityRole="button"
                      disabled={busy}
                      onPress={() => {
                        setMode(value);
                        setValues({ kind: "STUDENT" });
                        setShowPassword(false);
                        setNotice("");
                        setError("");
                      }}
                      style={styles.choice}
                    >
                      <Text>{titles[value]}</Text>
                    </Pressable>
                  ))}
                </View>
                <Pressable
                  accessibilityRole="button"
                  disabled={busy}
                  onPress={() => {
                    setMode("privileged");
                    setValues({ kind: "STUDENT" });
                    setError("");
                  }}
                  style={styles.choice}
                >
                  <Text>Restricted administration sign-in</Text>
                </Pressable>
                <Text style={styles.note}>
                  Google · GitHub · Apple require configured credentials and a
                  registered development or release build. Real-provider
                  verification is still pending.
                </Text>
                {["google", "github", "apple"].map((provider) => (
                  <View key={provider}>
                    {button(
                      `Continue with ${provider}${capabilities.providers[provider] === "CONFIGURED_UNVERIFIED" ? " · verification pending" : " · not configured"}`,
                      () => providerSignIn(provider),
                      true,
                      capabilities.providers[provider] !==
                        "CONFIGURED_UNVERIFIED",
                    )}
                  </View>
                ))}
              </>
            )}
            {(error || restorationError) && (
              <Text accessibilityRole="alert" style={styles.error}>
                {error || restorationError}
              </Text>
            )}
            {!!notice && (
              <Text accessibilityLiveRegion="polite" style={styles.note}>
                {notice}
              </Text>
            )}
            {button("Retry session restoration", refresh, true)}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  content: {
    padding: 24,
    paddingBottom: 60,
    gap: 22,
    maxWidth: 640,
    width: "100%",
    alignSelf: "center",
  },
  eyebrow: {
    color: "#0071E3",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0,
  },
  title: { fontSize: 30, lineHeight: 36, fontWeight: "600", color: "#1D1D1F" },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    gap: 18,
    borderWidth: 1,
    borderColor: "#D2D2D7",
  },
  heading: { fontSize: 24, fontWeight: "600", color: "#1D1D1F" },
  field: { gap: 7 },
  label: { color: "#1D1D1F", fontWeight: "500" },
  input: {
    fontFamily: nativeFont,
    borderWidth: 1,
    borderColor: "#C9CBD2",
    padding: 14,
    borderRadius: 10,
    minHeight: 50,
    color: "#1D1D1F",
  },
  button: {
    backgroundColor: "#0071E3",
    padding: 15,
    borderRadius: 11,
    minHeight: 50,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "600" },
  secondary: { backgroundColor: "#E8F2FC" },
  secondaryText: { color: "#0071E3" },
  disabled: { opacity: 0.5 },
  modes: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  choice: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#D2D2D7",
    borderRadius: 10,
    minHeight: 44,
  },
  selected: { backgroundColor: "#E8F2FC", borderColor: "#2C6652" },
  note: { color: "#6E6E73", fontSize: 13, lineHeight: 21 },
  error: {
    color: "#A83B3B",
    padding: 12,
    backgroundColor: "#FFF0ED",
    borderRadius: 8,
  },
});
export function NativeIdentityRoute() {
  const { account } = useIdentity();
  return <NativeIdentityAccess key={account?.user.id ?? "anonymous"} />;
}
