/*
  Warnings:

  - You are about to drop the column `email` on the `verificationtokens` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "verificationtokens" DROP CONSTRAINT "verificationtokens_email_fkey";

-- AlterTable
ALTER TABLE "verificationtokens" DROP COLUMN "email";
