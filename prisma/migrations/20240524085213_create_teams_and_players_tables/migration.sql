-- CreateTable
CREATE TABLE `Teams` (
    `team_id` VARCHAR(191) NOT NULL,
    `team_name` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `player_id` INTEGER NOT NULL,

    UNIQUE INDEX `Teams_team_name_key`(`team_name`),
    UNIQUE INDEX `Teams_image_url_key`(`image_url`),
    PRIMARY KEY (`team_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Players` (
    `player_id` VARCHAR(191) NOT NULL,
    `player_name` VARCHAR(191) NOT NULL,
    `player_position` VARCHAR(191) NOT NULL,
    `player_age` INTEGER NOT NULL,
    `player_img` VARCHAR(191) NOT NULL,
    `team_id` VARCHAR(191) NULL,

    UNIQUE INDEX `Players_player_name_key`(`player_name`),
    UNIQUE INDEX `Players_player_position_key`(`player_position`),
    PRIMARY KEY (`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Players` ADD CONSTRAINT `Players_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `Teams`(`team_id`) ON DELETE SET NULL ON UPDATE CASCADE;
