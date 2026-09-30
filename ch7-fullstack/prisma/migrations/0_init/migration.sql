-- CreateTable
CREATE TABLE `menu` (
    `menu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `is_bast_seller` ENUM('yes', 'no', '') NOT NULL,
    `type_id` INTEGER NOT NULL,

    INDEX `type1`(`type_id`),
    PRIMARY KEY (`menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type` (
    `type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `type1` FOREIGN KEY (`type_id`) REFERENCES `type`(`type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

