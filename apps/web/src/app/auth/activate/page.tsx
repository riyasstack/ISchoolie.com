import { PublicNav, PublicFooter } from "@/components/public-home";
import { IdentityAccess } from "@/components/identity-access";
import "../../identity.css";
export const metadata = { title: "Activate account — iSchoolie" };
export default function Page() {
  return (
    <>
      <PublicNav />
      <IdentityAccess initialMode="activate" />
      <PublicFooter />
    </>
  );
}
