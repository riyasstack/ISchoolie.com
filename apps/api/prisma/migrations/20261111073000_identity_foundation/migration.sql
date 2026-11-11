-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountKind" TEXT NOT NULL DEFAULT 'PUBLIC',
ADD COLUMN     "authVersion" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "emailCanonical" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "passwordHash" DROP NOT NULL;

-- Preserve existing identities. Case-colliding legacy emails abort the unique
-- index below; resolve ownership explicitly instead of merging accounts.
UPDATE "User" SET "emailCanonical" = lower(btrim("email")),
  "status" = CASE WHEN "emailVerifiedAt" IS NOT NULL THEN 'ACTIVE' ELSE 'PENDING' END
WHERE "email" IS NOT NULL;

-- CreateTable
CREATE TABLE "IdentitySession" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "authVersion" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "lastActiveAt" TIMESTAMP(3) NOT NULL,
    "mfa" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "IdentitySession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstitutionIdentity" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identifierCase" TEXT NOT NULL DEFAULT 'UPPER',
    "sequencePadding" INTEGER NOT NULL DEFAULT 4,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InstitutionIdentity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstitutionalLogin" (
    "id" UUID NOT NULL,
    "institutionId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "kind" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "normalized" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ISSUED',
    "staffType" TEXT,
    "hiringYear" INTEGER,
    "sequence" BIGINT,
    "activatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InstitutionalLogin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffIdentitySequence" (
    "institutionId" UUID NOT NULL,
    "year" INTEGER NOT NULL,
    "staffType" TEXT NOT NULL,
    "value" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "StaffIdentitySequence_pkey" PRIMARY KEY ("institutionId","year","staffType")
);

-- CreateTable
CREATE TABLE "PhoneIdentity" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "phone" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhoneIdentity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderIdentity" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "provider" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "linkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProviderIdentity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdentityChallenge" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "kind" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdentityChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdentityRateLimit" (
    "key" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IdentityRateLimit_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "IdentityAudit" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdentityAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IdentitySession_userId_idx" ON "IdentitySession"("userId");

-- CreateIndex
CREATE INDEX "IdentitySession_expiresAt_idx" ON "IdentitySession"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionIdentity_code_key" ON "InstitutionIdentity"("code");

-- CreateIndex
CREATE INDEX "InstitutionalLogin_userId_idx" ON "InstitutionalLogin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionalLogin_institutionId_kind_normalized_key" ON "InstitutionalLogin"("institutionId", "kind", "normalized");

-- CreateIndex
CREATE UNIQUE INDEX "PhoneIdentity_userId_key" ON "PhoneIdentity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PhoneIdentity_phone_key" ON "PhoneIdentity"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "ProviderIdentity_provider_subject_key" ON "ProviderIdentity"("provider", "subject");

-- CreateIndex
CREATE UNIQUE INDEX "ProviderIdentity_userId_provider_key" ON "ProviderIdentity"("userId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "IdentityChallenge_tokenHash_key" ON "IdentityChallenge"("tokenHash");

-- CreateIndex
CREATE INDEX "IdentityChallenge_expiresAt_idx" ON "IdentityChallenge"("expiresAt");

-- CreateIndex
CREATE INDEX "IdentityAudit_userId_createdAt_idx" ON "IdentityAudit"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailCanonical_key" ON "User"("emailCanonical");

-- AddForeignKey
ALTER TABLE "IdentitySession" ADD CONSTRAINT "IdentitySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionalLogin" ADD CONSTRAINT "InstitutionalLogin_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "InstitutionIdentity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionalLogin" ADD CONSTRAINT "InstitutionalLogin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffIdentitySequence" ADD CONSTRAINT "StaffIdentitySequence_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "InstitutionIdentity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhoneIdentity" ADD CONSTRAINT "PhoneIdentity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderIdentity" ADD CONSTRAINT "ProviderIdentity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityChallenge" ADD CONSTRAINT "IdentityChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "User" ADD CONSTRAINT "User_status_check" CHECK ("status" IN ('PENDING','ACTIVE','RESTRICTED','SUSPENDED','CLOSED'));
ALTER TABLE "User" ADD CONSTRAINT "User_kind_check" CHECK ("accountKind" IN ('PUBLIC','STUDENT','STAFF','PARENT','INSTITUTION_ADMIN','PLATFORM_OPERATOR'));
ALTER TABLE "User" ADD CONSTRAINT "User_authVersion_check" CHECK ("authVersion" >= 0);
ALTER TABLE "InstitutionIdentity" ADD CONSTRAINT "InstitutionIdentity_policy_check" CHECK ("identifierCase" IN ('UPPER','PRESERVE') AND "sequencePadding" BETWEEN 1 AND 12);
ALTER TABLE "InstitutionalLogin" ADD CONSTRAINT "InstitutionalLogin_kind_check" CHECK ("kind" IN ('STUDENT','STAFF'));
ALTER TABLE "InstitutionalLogin" ADD CONSTRAINT "InstitutionalLogin_status_check" CHECK ("status" IN ('ISSUED','ACTIVE','REVOKED'));
ALTER TABLE "InstitutionalLogin" ADD CONSTRAINT "InstitutionalLogin_staff_check" CHECK (("kind" = 'STUDENT' AND "staffType" IS NULL AND "hiringYear" IS NULL AND "sequence" IS NULL) OR ("kind" = 'STAFF' AND "staffType" IN ('TCH','ADM','SUP') AND "hiringYear" IS NOT NULL AND "sequence" > 0));
ALTER TABLE "StaffIdentitySequence" ADD CONSTRAINT "StaffIdentitySequence_check" CHECK ("staffType" IN ('TCH','ADM','SUP') AND "year" >= 1900 AND "value" >= 0);
ALTER TABLE "ProviderIdentity" ADD CONSTRAINT "ProviderIdentity_provider_check" CHECK ("provider" IN ('google','github','apple'));
ALTER TABLE "IdentitySession" ADD CONSTRAINT "IdentitySession_mfa_check" CHECK ("mfa" IS NULL OR "mfa" IN ('pending','verified'));
ALTER TABLE "IdentityChallenge" ADD CONSTRAINT "IdentityChallenge_kind_check" CHECK ("kind" IN ('EMAIL_VERIFY','PASSWORD_RESET'));
