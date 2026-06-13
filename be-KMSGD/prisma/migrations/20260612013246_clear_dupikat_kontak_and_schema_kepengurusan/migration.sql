/*
  Warnings:

  - You are about to drop the column `urutan` on the `anggota_departemen` table. All the data in the column will be lost.
  - You are about to drop the column `urutan` on the `departemen` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `kegiatan` table. All the data in the column will be lost.
  - You are about to drop the column `organizer` on the `kegiatan` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `kegiatan` table. All the data in the column will be lost.
  - The `endTime` column on the `kegiatan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `price` column on the `kegiatan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `nama` on the `kegiatan_speaker` table. All the data in the column will be lost.
  - You are about to drop the column `urutan` on the `pengurus_inti` table. All the data in the column will be lost.
  - You are about to drop the `dewan_pendiri` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instrumen_organisasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tentang_kami` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `kategoriId` to the `kegiatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodeId` to the `kegiatan` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `startTime` on the `kegiatan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `speakerId` to the `kegiatan_speaker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "anggota_departemen" DROP COLUMN "urutan";

-- AlterTable
ALTER TABLE "departemen" DROP COLUMN "urutan";

-- AlterTable
ALTER TABLE "kegiatan" DROP COLUMN "category",
DROP COLUMN "organizer",
DROP COLUMN "type",
ADD COLUMN     "categoryEnd" TIMESTAMP(3),
ADD COLUMN     "categoryStart" TIMESTAMP(3),
ADD COLUMN     "departemenId" INTEGER,
ADD COLUMN     "kategoriId" INTEGER NOT NULL,
ADD COLUMN     "organizerCustom" TEXT,
ADD COLUMN     "periodeId" INTEGER NOT NULL,
DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIMESTAMP(3),
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "kegiatan_speaker" DROP COLUMN "nama",
ADD COLUMN     "speakerId" INTEGER NOT NULL,
ALTER COLUMN "urutan" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "pengurus_inti" DROP COLUMN "urutan";

-- DropTable
DROP TABLE "dewan_pendiri";

-- DropTable
DROP TABLE "instrumen_organisasi";

-- DropTable
DROP TABLE "tentang_kami";

-- DropEnum
DROP TYPE "InstrumenJenis";

-- CreateTable
CREATE TABLE "kategori_kegiatan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kategori_kegiatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speaker_master" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "speaker_master_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "kategori_kegiatan_nama_key" ON "kategori_kegiatan"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "speaker_master_nama_key" ON "speaker_master"("nama");

-- AddForeignKey
ALTER TABLE "kegiatan" ADD CONSTRAINT "kegiatan_periodeId_fkey" FOREIGN KEY ("periodeId") REFERENCES "periode_organisasi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan" ADD CONSTRAINT "kegiatan_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "kategori_kegiatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan" ADD CONSTRAINT "kegiatan_departemenId_fkey" FOREIGN KEY ("departemenId") REFERENCES "departemen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_speaker" ADD CONSTRAINT "kegiatan_speaker_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "speaker_master"("id") ON DELETE CASCADE ON UPDATE CASCADE;
