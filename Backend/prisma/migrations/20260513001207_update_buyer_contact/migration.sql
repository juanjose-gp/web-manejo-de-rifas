/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Ticket` table. All the data in the column will be lost.
  - Made the column `buyerEmail` on table `Purchase` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "buyerPhone" DROP NOT NULL,
ALTER COLUMN "buyerEmail" SET NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "paymentId";
