import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as Crypto from "expo-crypto";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import {
  NativeIdentityClient,
  IdentityHttpError,
  nativeCallback,
} from "../../../../packages/contracts/native-auth-client";

export type AccountSnapshot = {
  user: {
    id: string;
    displayName: string | null;
    email: string | null;
    status: string;
    accountKind: string;
  };
  mfa: "none" | "pending" | "verified";
  restricted: boolean;
  permissions: {
    institutionId: string;
    permission: string;
    institution?: { code: string; name: string };
  }[];
};
type Capabilities = {
  providers: Record<string, string>;
  emailDelivery: string;
  smsDelivery: string;
};
const IdentityContext = createContext<{
  account: AccountSnapshot | null;
  loading: boolean;
  error: string;
  request: <T = Record<string, unknown>>(
    path: string,
    body?: object,
  ) => Promise<T>;
  refresh: () => Promise<void>;
  providerSignIn: (provider: string, link?: boolean) => Promise<void>;
  capabilities: Capabilities;
} | null>(null);
export function IdentityProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<AccountSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [capabilities, setCapabilities] = useState<Capabilities>({
    providers: {},
    emailDelivery: "UNCONFIGURED",
    smsDelivery: "UNCONFIGURED",
  });
  const client = useMemo(() => {
    const base =
      process.env.EXPO_PUBLIC_AUTH_API_URL ?? "http://127.0.0.1:4000";
    if (!__DEV__ && !base.startsWith("https://")) return null;
    if (Platform.OS === "web") return null;
    const options = {
      keychainService: "ischoolie.identity",
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    };
    return new NativeIdentityClient(base, {
      get: () => SecureStore.getItemAsync("session", options),
      set: (token) => SecureStore.setItemAsync("session", token, options),
      clear: () => SecureStore.deleteItemAsync("session", options),
    });
  }, []);
  useEffect(() => {
    let live = true;
    if (!client) return;
    void client
      .request<Capabilities>("capabilities")
      .then((value) => {
        if (live) setCapabilities(value);
      })
      .catch(() => {});
    void client
      .restore()
      .then(() => client.request<AccountSnapshot>("me"))
      .then((value) => {
        if (live) setAccount(value);
      })
      .catch((cause) => {
        if (
          live &&
          !(cause instanceof IdentityHttpError && cause.status === 401)
        )
          setError(
            "Unable to restore your session. Check your connection and retry.",
          );
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, [client]);
  const refresh = useCallback(
    async function refresh() {
      if (!client)
        throw new Error("Configure the native API before signing in");
      try {
        const value = await client.request<AccountSnapshot>("me");
        setAccount(value);
        setError("");
      } catch (cause) {
        if (cause instanceof IdentityHttpError && cause.status === 401)
          setAccount(null);
        throw cause;
      }
    },
    [client],
  );
  const request = useCallback(
    async function request<T = Record<string, unknown>>(
      path: string,
      body?: object,
    ): Promise<T> {
      if (!client)
        throw new Error(
          "Native authentication is unavailable in this environment",
        );
      const result = await client.request<T>(path, body);
      if (
        [
          "logout",
          "logout-all",
          "password/change",
          "providers/unlink",
          "identities/claim",
          "phone/change/confirm",
          "phone/link/confirm",
          "login-methods/phone/unlink",
        ].includes(path)
      ) {
        if (
          [
            "providers/unlink",
            "identities/claim",
            "phone/change/confirm",
            "phone/link/confirm",
            "login-methods/phone/unlink",
          ].includes(path)
        )
          await client.clear();
        setAccount(null);
      }
      return result;
    },
    [client],
  );
  async function providerSignIn(provider: string, link = false) {
    const hex = (bytes: Uint8Array) =>
      Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join(
        "",
      );
    const verifier = hex(await Crypto.getRandomBytesAsync(32));
    const state = hex(await Crypto.getRandomBytesAsync(32));
    const challenge = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      verifier,
    );
    const start = await request<{
      id: string;
      url: string;
      redirectUri: string;
    }>("native/oidc/start", { provider, challenge, state, link });
    const redirect = makeRedirectUri({
      scheme: "ischoolie",
      path: "auth-return",
      native: "ischoolie://auth-return",
    });
    if (redirect !== start.redirectUri)
      throw new Error(
        "Provider sign-in requires a development or release build with the registered callback scheme",
      );
    const result = await WebBrowser.openAuthSessionAsync(start.url, redirect, {
      preferEphemeralSession: true,
    });
    if (result.type !== "success")
      throw new Error("Provider sign-in was cancelled");
    const code = nativeCallback(result.url, redirect, state, start.id);
    await request("native/oidc/exchange", { id: start.id, code, verifier });
    await refresh();
  }
  return (
    <IdentityContext.Provider
      value={{
        account,
        loading: !!client && loading,
        error: client
          ? error
          : "Native authentication requires a configured HTTPS API in release builds. Use the web sign-in for browsers.",
        request,
        refresh,
        providerSignIn,
        capabilities,
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
}
export function useIdentity() {
  const context = useContext(IdentityContext);
  if (!context) throw new Error("IdentityProvider required");
  return context;
}
