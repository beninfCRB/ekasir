/*
  Warnings:

  - You are about to drop the column `amount` on the `selling` table. All the data in the column will be lost.
  - You are about to drop the column `cashBack` on the `selling` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `selling` table. All the data in the column will be lost.
  - You are about to drop the column `stockId` on the `selling` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `selling` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `stock` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `selling` DROP FOREIGN KEY `selling_stockId_fkey`;

-- DropIndex
DROP INDEX `selling_stockId_fkey` ON `selling`;

-- AlterTable
ALTER TABLE `selling` DROP COLUMN `amount`,
    DROP COLUMN `cashBack`,
    DROP COLUMN `price`,
    DROP COLUMN `stockId`,
    DROP COLUMN `total`,
    MODIFY `taxPrice` DOUBLE NULL,
    MODIFY `grandtotal` DOUBLE NULL,
    MODIFY `cash` DOUBLE NULL,
    MODIFY `return` DOUBLE NULL;

-- CreateTable
CREATE TABLE `selling_item` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `sellingId` VARCHAR(191) NOT NULL,
    `stockId` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `selling_item_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `stock_code_key` ON `stock`(`code`);

-- AddForeignKey
ALTER TABLE `selling_item` ADD CONSTRAINT `selling_item_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `stock`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `selling_item` ADD CONSTRAINT `selling_item_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `selling_item` ADD CONSTRAINT `selling_item_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
