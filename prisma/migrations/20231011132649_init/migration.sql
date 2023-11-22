/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Made the column `transactionId` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Product_id_key` ON `product`;

-- AlterTable
ALTER TABLE `order` MODIFY `transactionId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateIndex
CREATE UNIQUE INDEX `Order_id_key` ON `Order`(`id`);
