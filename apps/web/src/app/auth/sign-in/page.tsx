import { PublicNav, PublicFooter } from "@/components/public-home";
import { IdentityAccess } from "@/components/identity-access";
import "../../identity.css";
export const metadata = { title: "Sign in — iSchoolie" };
export default function SignIn() {
  return (
    <>
      <PublicNav />
      <IdentityAccess />
      <PublicFooter />
    </>
  );
}
