-- CreateTable
CREATE TABLE "IdentityNativeBroker" (
    "id" UUID NOT NULL,
    "provider" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "clientState" TEXT NOT NULL,
    "oidcState" TEXT,
    "userId" UUID,
    "authVersion" INTEGER,
    "codeHash" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),

    CONSTRAINT "IdentityNativeBroker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IdentityNativeBroker_oidcState_key" ON "IdentityNativeBroker"("oidcState");

ALTER TABLE "IdentityNativeBroker" ADD CONSTRAINT "IdentityNativeBroker_checks" CHECK (provider IN ('google','github','apple') AND challenge ~ '^[a-f0-9]{64}$' AND "clientState" ~ '^[a-f0-9]{64}$' AND ("codeHash" IS NULL OR "codeHash" ~ '^[a-f0-9]{64}$'));
