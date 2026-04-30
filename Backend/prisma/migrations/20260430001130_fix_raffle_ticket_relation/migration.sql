/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `ticketPrice` on the `Raffle` table. All the data in the column will be lost.
  - You are about to drop the column `totalTickets` on the `Raffle` table. All the data in the column will be lost.
  - Added the required column `ticket_price` to the `Raffle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_numbers` to the `Raffle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Raffle" DROP COLUMN "createdAt",
DROP COLUMN "image",
DROP COLUMN "isActive",
DROP COLUMN "ticketPrice",
DROP COLUMN "totalTickets",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "ticket_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_numbers" INTEGER NOT NULL;
