/*
  Warnings:

  - You are about to drop the column `accessToken` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `accessToken` on the `sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[access_token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `access_token` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sessions_accessToken_key";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "accessToken",
ADD COLUMN     "access_token" TEXT;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "accessToken",
ADD COLUMN     "access_token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_access_token_key" ON "sessions"("access_token");
