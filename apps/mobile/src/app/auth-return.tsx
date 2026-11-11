// Cold callbacks cannot restore a verifier; only the initiating AuthSession
// instance can exchange a handoff. Never read a session token from deep links.
export { NativeIdentityRoute as default } from "@/components/identity-access";
