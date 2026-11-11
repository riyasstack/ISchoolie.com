ALTER TABLE "IdentityNativeBroker" ADD COLUMN "linkUserId" UUID, ADD COLUMN "linkSessionId" TEXT;
ALTER TABLE "IdentityNativeBroker" ADD CONSTRAINT "IdentityNativeBroker_link_check" CHECK (("linkUserId" IS NULL AND "linkSessionId" IS NULL) OR ("linkUserId" IS NOT NULL AND "linkSessionId" ~ '^[A-Za-z0-9_-]{43}$'));
