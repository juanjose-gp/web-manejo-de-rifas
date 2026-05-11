/*
  Warnings:

  - A unique constraint covering the columns `[validationCode]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "validationCode" TEXT,
ADD COLUMN     "validationCodeUsedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_validationCode_key" ON "Purchase"("validationCode");
