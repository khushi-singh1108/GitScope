-- CreateTable
CREATE TABLE `KnowledgeChunk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chunkId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `embedding` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `KnowledgeChunk_chunkId_key`(`chunkId`),
    INDEX `KnowledgeChunk_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
