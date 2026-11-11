-- DropForeignKey
ALTER TABLE "IdentityChallenge" DROP CONSTRAINT "IdentityChallenge_identityId_fkey";

-- CreateTable
CREATE TABLE "IdentityPhoneChallenge" (
    "id" UUID NOT NULL,
    "phone" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "userId" UUID,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdentityPhoneChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IdentityPhoneChallenge_phone_expiresAt_idx" ON "IdentityPhoneChallenge"("phone", "expiresAt");

-- AddForeignKey
ALTER TABLE "IdentityChallenge" ADD CONSTRAINT "IdentityChallenge_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "InstitutionalLogin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "IdentityPhoneChallenge" ADD CONSTRAINT "IdentityPhoneChallenge_checks" CHECK (kind IN ('REGISTER','RECOVER') AND attempts BETWEEN 0 AND 5 AND "codeHash" ~ '^[a-f0-9]{64}$' AND phone ~ '^\+[1-9][0-9]{6,14}$');
