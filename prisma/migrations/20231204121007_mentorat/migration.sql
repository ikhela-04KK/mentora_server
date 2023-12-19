/*
  Warnings:

  - You are about to drop the `ChatUser` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `createdAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ChatUser" DROP CONSTRAINT "ChatUser_chatId_fkey";

-- DropForeignKey
ALTER TABLE "ChatUser" DROP CONSTRAINT "ChatUser_userId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "location" SET NOT NULL;

-- DropTable
DROP TABLE "ChatUser";

-- CreateTable
CREATE TABLE "_ChatsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChatsToUser_AB_unique" ON "_ChatsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatsToUser_B_index" ON "_ChatsToUser"("B");

-- AddForeignKey
ALTER TABLE "_ChatsToUser" ADD CONSTRAINT "_ChatsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatsToUser" ADD CONSTRAINT "_ChatsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
