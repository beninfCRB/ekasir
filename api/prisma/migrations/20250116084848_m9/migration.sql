/*
  Warnings:

  - You are about to drop the column `grandtotal` on the `selling` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `selling` DROP COLUMN `grandtotal`,
    ADD COLUMN `grandTotal` DECIMAL(16, 2) NULL DEFAULT 0;
