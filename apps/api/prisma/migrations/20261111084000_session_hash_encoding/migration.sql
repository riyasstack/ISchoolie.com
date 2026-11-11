-- The first-party SessionService encodes SHA-256 in base64url (43 chars),
-- rather than the hex encoding used by our email challenges.
ALTER TABLE "IdentitySession" DROP CONSTRAINT "IdentitySession_token_hash_check";
ALTER TABLE "IdentitySession" ADD CONSTRAINT "IdentitySession_token_hash_check" CHECK ("id" ~ '^[A-Za-z0-9_-]{43}$');
