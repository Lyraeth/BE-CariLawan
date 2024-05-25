/*
  Warnings:

  - Added the required column `location` to the `Teams` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Players_player_name_key` ON `players`;

-- DropIndex
DROP INDEX `Players_player_position_key` ON `players`;

-- AlterTable
ALTER TABLE `teams` ADD COLUMN `location` VARCHAR(191) NOT NULL;
