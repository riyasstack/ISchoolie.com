-- CHECK expressions must reject SQL NULL, not merely evaluate to UNKNOWN.
ALTER TABLE "InstitutionalLogin" DROP CONSTRAINT "InstitutionalLogin_staff_check";
ALTER TABLE "InstitutionalLogin" ADD CONSTRAINT "InstitutionalLogin_staff_check" CHECK (
  ("kind" = 'STUDENT' AND "staffType" IS NULL AND "hiringYear" IS NULL AND "sequence" IS NULL)
  OR ("kind" = 'STAFF' AND "staffType" IS NOT NULL AND "staffType" IN ('TCH','ADM','SUP')
    AND "hiringYear" IS NOT NULL AND "hiringYear" >= 1900 AND "sequence" IS NOT NULL AND "sequence" > 0)
);
ALTER TABLE "PhoneIdentity" ADD CONSTRAINT "PhoneIdentity_e164_check" CHECK ("phone" ~ '^\+[1-9][0-9]{6,14}$');
ALTER TABLE "ProviderIdentity" ADD CONSTRAINT "ProviderIdentity_subject_check" CHECK (length("subject") BETWEEN 1 AND 255);
ALTER TABLE "IdentitySession" ADD CONSTRAINT "IdentitySession_token_hash_check" CHECK ("id" ~ '^[a-f0-9]{64}$');
ALTER TABLE "IdentityChallenge" ADD CONSTRAINT "IdentityChallenge_token_hash_check" CHECK ("tokenHash" ~ '^[a-f0-9]{64}$');
