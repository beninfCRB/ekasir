/*
  Warnings:

  - You are about to drop the column `cash` on the `selling` table. All the data in the column will be lost.
  - You are about to drop the column `return` on the `selling` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `selling` DROP COLUMN `cash`,
    DROP COLUMN `return`,
    ADD COLUMN `cashPrice` DOUBLE NULL,
    ADD COLUMN `returnPrice` DOUBLE NULL;
