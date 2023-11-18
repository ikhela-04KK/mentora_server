/*
  Warnings:

  - Added the required column `file` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "file" TEXT NOT NULL;
