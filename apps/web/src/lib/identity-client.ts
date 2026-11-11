export type IdentitySnapshot = {
  user: {
    id: string;
    displayName: string | null;
    email: string | null;
    status: string;
    accountKind: string;
  };
  csrf: string;
  mfa: "none" | "pending" | "verified";
  restricted: boolean;
  permissions: {
    institutionId: string;
    permission: string;
    institution?: { code: string; name: string };
  }[];
};
export async function identityApi<T = { message: string }>(
  path: string,
  body?: object,
  csrf?: string,
): Promise<T> {
  const response = await fetch(`/api/auth/${path}`, {
    method: body ? "POST" : "GET",
    credentials: "same-origin",
    cache: "no-store",
    headers: body
      ? {
          "Content-Type": "application/json",
          ...(csrf ? { "X-CSRF-Token": csrf } : {}),
        }
      : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const result = await response.json();
  if (!response.ok) {
    if (Array.isArray(result.errors))
      throw new Error(
        result.errors
          .map(
            (entry: { row: number; message: string }) =>
              `Row ${entry.row}: ${entry.message}`,
          )
          .join(". "),
      );
    throw new Error(
      Array.isArray(result.message)
        ? result.message.join(". ")
        : (result.message ?? "Unable to complete this action"),
    );
  }
  return result as T;
}
