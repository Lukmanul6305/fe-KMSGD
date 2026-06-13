/*
  Warnings:

  - You are about to drop the column `date` on the `kegiatan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "kegiatan" DROP COLUMN "date",
ADD COLUMN     "isPenting" BOOLEAN NOT NULL DEFAULT false;
