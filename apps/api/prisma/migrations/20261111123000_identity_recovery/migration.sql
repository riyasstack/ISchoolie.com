ALTER TABLE "IdentityChallenge" DROP CONSTRAINT "IdentityChallenge_kind_check";
ALTER TABLE "IdentityChallenge" ADD CONSTRAINT "IdentityChallenge_kind_check" CHECK (kind IN ('EMAIL_VERIFY','PASSWORD_RESET','INSTITUTION_ACTIVATE','PRIVILEGED_ACTIVATE','INSTITUTION_RESET','PRIVILEGED_RESET'));
ALTER TABLE "IdentityPhoneChallenge" DROP CONSTRAINT "IdentityPhoneChallenge_checks";
ALTER TABLE "IdentityPhoneChallenge" ADD CONSTRAINT "IdentityPhoneChallenge_checks" CHECK (kind IN ('REGISTER','RECOVER','CHANGE') AND attempts BETWEEN 0 AND 5 AND "codeHash" ~ '^[a-f0-9]{64}$' AND phone ~ '^\+[1-9][0-9]{6,14}$');
