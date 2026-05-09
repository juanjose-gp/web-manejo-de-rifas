/*
  Warnings:

  - A unique constraint covering the columns `[raffleId,code]` on the table `DiscountCode` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DiscountCode_code_key";

-- CreateIndex
CREATE UNIQUE INDEX "DiscountCode_raffleId_code_key" ON "DiscountCode"("raffleId", "code");
