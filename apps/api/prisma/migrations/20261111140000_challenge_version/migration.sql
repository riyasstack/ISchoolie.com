-- Legacy outstanding proofs keep version 0: they cannot silently gain a newer
-- credential version. Affected users can request a new proof after deployment.
ALTER TABLE "IdentityChallenge" ADD COLUMN "authVersion" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "IdentityChallenge" ADD CONSTRAINT "IdentityChallenge_authVersion_check" CHECK ("authVersion" >= 0);
