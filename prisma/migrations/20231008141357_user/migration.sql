-- AlterTable
ALTER TABLE "users" ADD COLUMN     "artistName" TEXT,
ADD COLUMN     "isArtist" BOOLEAN NOT NULL DEFAULT false;
