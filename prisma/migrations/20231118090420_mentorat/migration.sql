-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'INVITE', 'TEACHER', 'STUDENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'INVITE';
