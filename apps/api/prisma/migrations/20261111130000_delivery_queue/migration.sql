-- CreateTable
CREATE TABLE "IdentityDeliveryMessage" (
    "id" UUID NOT NULL,
    "channel" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "payload" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "nextAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leaseUntil" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "providerReceipt" TEXT,
    "errorCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdentityDeliveryMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IdentityDeliveryMessage_status_nextAttemptAt_idx" ON "IdentityDeliveryMessage"("status", "nextAttemptAt");

ALTER TABLE "IdentityDeliveryMessage" ADD CONSTRAINT "IdentityDeliveryMessage_checks" CHECK (channel IN ('EMAIL','SMS') AND status IN ('PENDING','CAPTURED','PROVIDER_ACCEPTED','DEAD','EXPIRED') AND attempts BETWEEN 0 AND 4);
