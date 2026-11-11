import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PublicNav, PublicFooter } from "@/components/public-home";
import { IdentityAccess } from "@/components/identity-access";
import "../identity.css";
export const metadata = { title: "Your account — iSchoolie" };
export default async function AccountPage() {
  const cookie = (await cookies()).toString();
  if (!cookie) redirect("/auth/sign-in");
  const response = await fetch(
    `${process.env.AUTH_API_URL ?? "http://127.0.0.1:4000"}/auth/me`,
    {
      headers: { Cookie: cookie },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    },
  ).catch(() => null);
  if (response?.status === 401) redirect("/auth/sign-in");
  if (!response?.ok)
    return (
      <main id="main-content" className="auth-boundary">
        <h1>Account service unavailable</h1>
        <p>Please try again shortly.</p>
      </main>
    );
  return (
    <>
      <PublicNav />
      <IdentityAccess />
      <PublicFooter />
    </>
  );
}
