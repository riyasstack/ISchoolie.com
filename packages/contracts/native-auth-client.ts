export interface SecureTokenStore {
  get(): Promise<string | null>;
  set(token: string): Promise<void>;
  clear(): Promise<void>;
}
export function nativeCallback(
  url: string,
  expectedUri: string,
  state: string,
  broker: string,
) {
  const actual = new URL(url);
  const expected = new URL(expectedUri);
  if (
    actual.protocol !== expected.protocol ||
    actual.hostname !== expected.hostname ||
    actual.port !== expected.port ||
    actual.pathname !== expected.pathname ||
    actual.hash ||
    actual.username ||
    actual.password ||
    actual.searchParams.get("state") !== state ||
    actual.searchParams.get("broker") !== broker ||
    [...actual.searchParams.keys()].length !== 3 ||
    [...actual.searchParams.keys()].some(
      (key) => !["code", "state", "broker"].includes(key),
    )
  )
    throw new Error("Native callback did not match this sign-in");
  const code = actual.searchParams.get("code");
  if (!code || !/^[A-Za-z0-9_-]{43}$/.test(code))
    throw new Error("Invalid native handoff code");
  return code;
}
export class IdentityHttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
/** Platform-independent transport; the native adapter MUST use SecureStore. */
export class NativeIdentityClient {
  private base: string;
  private store: SecureTokenStore;
  private fetcher: typeof fetch;
  private token: string | null = null;
  private revision = 0;
  private writes: Promise<void> = Promise.resolve();
  constructor(
    base: string,
    store: SecureTokenStore,
    fetcher: typeof fetch = fetch,
  ) {
    this.base = base.replace(/\/$/, "");
    this.store = store;
    this.fetcher = fetcher;
  }
  async restore() {
    const revision = this.revision;
    const token = await this.store.get();
    if (revision !== this.revision) return;
    this.token = token && /^[A-Za-z0-9_-]{43}$/.test(token) ? token : null;
    if (token && !this.token) await this.store.clear();
  }
  private write(action: () => Promise<void>) {
    const next = this.writes.catch(() => {}).then(action);
    this.writes = next;
    return next;
  }
  async clear() {
    this.revision++;
    this.token = null;
    await this.write(() => this.store.clear());
  }
  async request<T = Record<string, unknown>>(
    path: string,
    body?: object,
  ): Promise<T> {
    if (!/^[a-z0-9/-]+$/.test(path)) throw new Error("Invalid identity action");
    const revision = this.revision;
    const headers: Record<string, string> = {
      "X-iSchoolie-Client": "native",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
    };
    const response = await this.fetcher(`${this.base}/auth/${path}`, {
      method: body ? "POST" : "GET",
      headers,
      credentials: "omit",
      cache: "no-store",
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(15000),
    });
    const result = (await response.json()) as Record<string, unknown>;
    if (!response.ok) {
      if (
        response.status === 401 &&
        path === "me" &&
        revision === this.revision
      )
        await this.clear();
      if (Array.isArray(result.errors))
        throw new IdentityHttpError(
          result.errors
            .map(
              (entry: { row: number; message: string }) =>
                `Row ${entry.row}: ${entry.message}`,
            )
            .join(". "),
          response.status,
        );
      throw new IdentityHttpError(
        typeof result.message === "string"
          ? result.message
          : "Unable to complete this action",
        response.status,
      );
    }
    if (revision !== this.revision && path !== "capabilities") {
      if (
        typeof result.token === "string" &&
        /^[A-Za-z0-9_-]{43}$/.test(result.token)
      )
        await this.revokeUnstored(result.token);
      throw new Error("Session changed. Please try again.");
    }
    if (typeof result.token === "string") {
      const next = result.token;
      if (!/^[A-Za-z0-9_-]{43}$/.test(next))
        throw new Error("Invalid session response");
      try {
        await this.write(async () => {
          if (revision !== this.revision) throw new Error("Session changed");
          await this.store.set(next);
        });
      } catch {
        // A token that cannot be stored must not leave the app signed in.
        await this.revokeUnstored(next);
        if (revision === this.revision) await this.clear();
        throw new Error(
          "Secure session storage is unavailable or the session changed",
        );
      }
      if (revision !== this.revision) {
        await this.revokeUnstored(next);
        throw new Error("Session changed. Please sign in again.");
      }
      this.token = next;
      this.revision++;
      delete result.token;
    }
    if (["logout", "logout-all", "password/change"].includes(path))
      await this.clear();
    return result as T;
  }
  private async revokeUnstored(token: string) {
    await this.fetcher(`${this.base}/auth/logout`, {
      method: "POST",
      credentials: "omit",
      headers: {
        "X-iSchoolie-Client": "native",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: "{}",
      signal: AbortSignal.timeout(5000),
    }).catch(() => {});
  }
}
