import { PublicNav, PublicFooter } from "@/components/public-home";
import { IdentityAccess } from "@/components/identity-access";
import "../../identity.css";
export const metadata = { title: "Verify email — iSchoolie" };
export default function Page() {
  return (
    <>
      <PublicNav />
      <IdentityAccess initialMode="verify" />
      <PublicFooter />
    </>
  );
}
