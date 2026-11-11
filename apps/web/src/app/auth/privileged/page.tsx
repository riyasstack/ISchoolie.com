import { PublicNav, PublicFooter } from "@/components/public-home";
import { IdentityAccess } from "@/components/identity-access";
import "../../identity.css";
export const metadata = {title: "Restricted administration"};
export default function PrivilegedSignIn(){return <><PublicNav/><IdentityAccess initialMode="privileged"/><PublicFooter/></>;}
