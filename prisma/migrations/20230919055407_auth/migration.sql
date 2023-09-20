-- AlterTable
ALTER TABLE "verificationtokens" ADD COLUMN     "email" TEXT;

-- AddForeignKey
ALTER TABLE "verificationtokens" ADD CONSTRAINT "verificationtokens_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
