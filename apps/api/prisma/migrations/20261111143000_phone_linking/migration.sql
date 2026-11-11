ALTER TABLE "IdentityPhoneChallenge" DROP CONSTRAINT "IdentityPhoneChallenge_checks";
ALTER TABLE "IdentityPhoneChallenge" ADD CONSTRAINT "IdentityPhoneChallenge_checks" CHECK (kind IN ('REGISTER','RECOVER','CHANGE','LINK') AND attempts BETWEEN 0 AND 5 AND "codeHash" ~ '^[a-f0-9]{64}$' AND phone ~ '^\+[1-9][0-9]{6,14}$');
