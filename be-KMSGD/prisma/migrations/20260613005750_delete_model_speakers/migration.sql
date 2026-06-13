/*
  Warnings:

  - You are about to drop the column `categoryEnd` on the `kegiatan` table. All the data in the column will be lost.
  - You are about to drop the column `categoryStart` on the `kegiatan` table. All the data in the column will be lost.
  - You are about to drop the column `urutan` on the `pengumuman_berkas` table. All the data in the column will be lost.
  - You are about to drop the column `urutan` on the `pengumuman_persyaratan` table. All the data in the column will be lost.
  - You are about to drop the column `urutan` on the `pengumuman_timeline` table. All the data in the column will be lost.
  - You are about to drop the `kegiatan_speaker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `speaker_master` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "kegiatan_speaker" DROP CONSTRAINT "kegiatan_speaker_kegiatanId_fkey";

-- DropForeignKey
ALTER TABLE "kegiatan_speaker" DROP CONSTRAINT "kegiatan_speaker_speakerId_fkey";

-- AlterTable
ALTER TABLE "kegiatan" DROP COLUMN "categoryEnd",
DROP COLUMN "categoryStart",
ADD COLUMN     "speakers" TEXT[];

-- AlterTable
ALTER TABLE "pengumuman_berkas" DROP COLUMN "urutan";

-- AlterTable
ALTER TABLE "pengumuman_persyaratan" DROP COLUMN "urutan";

-- AlterTable
ALTER TABLE "pengumuman_timeline" DROP COLUMN "urutan";

-- DropTable
DROP TABLE "kegiatan_speaker";

-- DropTable
DROP TABLE "speaker_master";
