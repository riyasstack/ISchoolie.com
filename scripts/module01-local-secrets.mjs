import { randomBytes } from "node:crypto";
import { readFile, appendFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const file = fileURLToPath(new URL("../apps/api/.env", import.meta.url));
const existing = await readFile(file, "utf8");
for (const key of ["AUTH_MFA_KEY", "AUTH_PROOF_KEY", "AUTH_DELIVERY_KEYS"]) {
  if (!new RegExp(`^${key}=`, "m").test(existing))
    await appendFile(
      file,
      `\n${key}=${randomBytes(48).toString("base64url")}\n`,
    );
}
console.log(
  "Local auth encryption and proof keys configured; values were not printed.",
);
