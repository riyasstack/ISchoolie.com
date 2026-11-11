-- AlterTable
-- Additive security state; original identities and volumes are preserved.
ALTER TABLE "IdentityChallenge" ADD COLUMN     "identityId" UUID;

-- AlterTable
ALTER TABLE "InstitutionalLogin" ADD COLUMN     "contactEmail" TEXT;

-- CreateTable
CREATE TABLE "InstitutionGrant" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "institutionId" UUID NOT NULL,
    "permission" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "InstitutionGrant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformOperator" (
    "userId" UUID NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PlatformOperator_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "IdentityTotp" (
    "userId" UUID NOT NULL,
    "secret" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL,
    "pendingSecret" TEXT,
    "lastUsedStep" INTEGER NOT NULL DEFAULT -1,

    CONSTRAINT "IdentityTotp_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "IdentityRecoveryCode" (
    "userId" UUID NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "IdentityRecoveryCode_pkey" PRIMARY KEY ("userId","hash")
);

-- CreateTable
CREATE TABLE "IdentityMfaFailure" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "at" BIGINT NOT NULL,

    CONSTRAINT "IdentityMfaFailure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdentityImport" (
    "id" UUID NOT NULL,
    "institutionId" UUID NOT NULL,
    "actorId" UUID NOT NULL,
    "rows" JSONB NOT NULL,
    "result" JSONB,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "committedAt" TIMESTAMP(3),

    CONSTRAINT "IdentityImport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdentityOidcState" (
    "state" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IdentityOidcState_pkey" PRIMARY KEY ("state")
);

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionGrant_userId_institutionId_permission_key" ON "InstitutionGrant"("userId", "institutionId", "permission");

-- CreateIndex
CREATE INDEX "IdentityMfaFailure_userId_at_idx" ON "IdentityMfaFailure"("userId", "at");

-- AddForeignKey
ALTER TABLE "InstitutionGrant" ADD CONSTRAINT "InstitutionGrant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionGrant" ADD CONSTRAINT "InstitutionGrant_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "InstitutionIdentity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformOperator" ADD CONSTRAINT "PlatformOperator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityTotp" ADD CONSTRAINT "IdentityTotp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityRecoveryCode" ADD CONSTRAINT "IdentityRecoveryCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityMfaFailure" ADD CONSTRAINT "IdentityMfaFailure_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityImport" ADD CONSTRAINT "IdentityImport_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "InstitutionIdentity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "IdentityChallenge" DROP CONSTRAINT "IdentityChallenge_kind_check";
ALTER TABLE "IdentityChallenge" ADD CONSTRAINT "IdentityChallenge_kind_check" CHECK ("kind" IN ('EMAIL_VERIFY','PASSWORD_RESET','INSTITUTION_ACTIVATE','PRIVILEGED_ACTIVATE'));
ALTER TABLE "IdentityChallenge" ADD CONSTRAINT "IdentityChallenge_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "InstitutionalLogin"(id) ON DELETE CASCADE;
ALTER TABLE "InstitutionGrant" ADD CONSTRAINT "InstitutionGrant_permission_check" CHECK (permission IN ('PROVISION_STUDENT','PROVISION_STAFF','MANAGE_IDENTITIES'));
