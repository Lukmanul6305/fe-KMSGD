/*
  Warnings:

  - You are about to drop the column `category` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the `pengumuman_berkas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pengumuman_persyaratan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `kategoriId` to the `pengumuman` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pengumuman_berkas" DROP CONSTRAINT "pengumuman_berkas_pengumumanId_fkey";

-- DropForeignKey
ALTER TABLE "pengumuman_persyaratan" DROP CONSTRAINT "pengumuman_persyaratan_pengumumanId_fkey";

-- AlterTable
ALTER TABLE "pengumuman" DROP COLUMN "category",
ADD COLUMN     "berkas" TEXT[],
ADD COLUMN     "kategoriId" INTEGER NOT NULL,
ADD COLUMN     "persyaratan" TEXT[];

-- DropTable
DROP TABLE "pengumuman_berkas";

-- DropTable
DROP TABLE "pengumuman_persyaratan";

-- CreateTable
CREATE TABLE "kategori_pengumuman" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kategori_pengumuman_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "kategori_pengumuman_nama_key" ON "kategori_pengumuman"("nama");

-- AddForeignKey
ALTER TABLE "pengumuman" ADD CONSTRAINT "pengumuman_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "kategori_pengumuman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
