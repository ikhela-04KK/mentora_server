/*
  Warnings:

  - You are about to drop the column `file` on the `User` table. All the data in the column will be lost.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "file",
ADD COLUMN     "avatar" TEXT NOT NULL;
