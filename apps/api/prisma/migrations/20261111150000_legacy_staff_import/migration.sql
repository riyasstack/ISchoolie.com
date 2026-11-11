ALTER TABLE "InstitutionalLogin" ADD COLUMN "legacy" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "InstitutionalLogin" DROP CONSTRAINT "InstitutionalLogin_staff_check";
ALTER TABLE "InstitutionalLogin" ADD CONSTRAINT "InstitutionalLogin_staff_check" CHECK (
 ("kind" = 'STUDENT' AND NOT legacy AND "staffType" IS NULL AND "hiringYear" IS NULL AND sequence IS NULL)
 OR ("kind" = 'STAFF' AND "staffType" IS NOT NULL AND "staffType" IN ('TCH','ADM','SUP') AND "hiringYear" IS NOT NULL AND "hiringYear" >= 1900 AND ((legacy AND sequence IS NULL) OR (NOT legacy AND sequence IS NOT NULL AND sequence > 0)))
);
CREATE UNIQUE INDEX "InstitutionalLogin_institutionId_hiringYear_staffType_sequence_key" ON "InstitutionalLogin"("institutionId", "hiringYear", "staffType", "sequence");
