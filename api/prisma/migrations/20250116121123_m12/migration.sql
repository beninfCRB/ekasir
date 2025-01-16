/*
  Warnings:

  - You are about to alter the column `amount` on the `selling_item` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `amount` on the `stock` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `selling_item` MODIFY `amount` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `stock` MODIFY `amount` DOUBLE NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `selling_item` ADD CONSTRAINT `selling_item_sellingId_fkey` FOREIGN KEY (`sellingId`) REFERENCES `selling`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
