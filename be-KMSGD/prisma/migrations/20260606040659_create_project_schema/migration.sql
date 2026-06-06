-- CreateEnum
CREATE TYPE "InstrumenJenis" AS ENUM ('HYMNE', 'MARS');

-- CreateEnum
CREATE TYPE "StatusPeriode" AS ENUM ('AKTIF', 'DEMISIONER');

-- CreateEnum
CREATE TYPE "GaleriTipe" AS ENUM ('FOTO', 'VIDEO');

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sambutan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sambutan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dewan_pendiri" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT,
    "angkatan" TEXT,
    "image" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dewan_pendiri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tentang_kami" (
    "id" SERIAL NOT NULL,
    "sejarah" TEXT NOT NULL,
    "visi" TEXT NOT NULL,
    "misi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tentang_kami_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instrumen_organisasi" (
    "id" SERIAL NOT NULL,
    "jenis" "InstrumenJenis" NOT NULL,
    "judul" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "mimeType" TEXT,
    "ukuranByte" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instrumen_organisasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periode_organisasi" (
    "id" SERIAL NOT NULL,
    "periode" TEXT NOT NULL,
    "status" "StatusPeriode" NOT NULL DEFAULT 'AKTIF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "periode_organisasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengurus_inti" (
    "id" SERIAL NOT NULL,
    "periodeId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "slogan" TEXT,
    "image" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pengurus_inti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departemen" (
    "id" SERIAL NOT NULL,
    "periodeId" INTEGER NOT NULL,
    "namaDepartemen" TEXT NOT NULL,
    "deskripsi" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departemen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anggota_departemen" (
    "id" SERIAL NOT NULL,
    "departemenId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "image" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "anggota_departemen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kegiatan" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "image" TEXT,
    "type" TEXT,
    "price" TEXT,
    "registrationLink" TEXT,
    "organizer" TEXT,
    "contactPerson" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kegiatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kegiatan_speaker" (
    "id" SERIAL NOT NULL,
    "kegiatanId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "kegiatan_speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengumuman" (
    "id" SERIAL NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Pengumuman',
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image" TEXT,
    "isPenting" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "linkPendaftaran" TEXT,
    "contactPerson" TEXT,

    CONSTRAINT "pengumuman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengumuman_persyaratan" (
    "id" SERIAL NOT NULL,
    "pengumumanId" INTEGER NOT NULL,
    "isi" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "pengumuman_persyaratan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengumuman_berkas" (
    "id" SERIAL NOT NULL,
    "pengumumanId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "pengumuman_berkas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengumuman_timeline" (
    "id" SERIAL NOT NULL,
    "pengumumanId" INTEGER NOT NULL,
    "agenda" TEXT NOT NULL,
    "tanggal" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "pengumuman_timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galeri" (
    "id" SERIAL NOT NULL,
    "judul" TEXT,
    "tipe" "GaleriTipe" NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail" TEXT,
    "kegiatanId" INTEGER,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "galeri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kontak" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "whatsapp" TEXT,
    "instagram" TEXT,
    "alamat" TEXT,
    "googleMaps" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kontak_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");

-- AddForeignKey
ALTER TABLE "pengurus_inti" ADD CONSTRAINT "pengurus_inti_periodeId_fkey" FOREIGN KEY ("periodeId") REFERENCES "periode_organisasi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departemen" ADD CONSTRAINT "departemen_periodeId_fkey" FOREIGN KEY ("periodeId") REFERENCES "periode_organisasi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anggota_departemen" ADD CONSTRAINT "anggota_departemen_departemenId_fkey" FOREIGN KEY ("departemenId") REFERENCES "departemen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan_speaker" ADD CONSTRAINT "kegiatan_speaker_kegiatanId_fkey" FOREIGN KEY ("kegiatanId") REFERENCES "kegiatan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumuman_persyaratan" ADD CONSTRAINT "pengumuman_persyaratan_pengumumanId_fkey" FOREIGN KEY ("pengumumanId") REFERENCES "pengumuman"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumuman_berkas" ADD CONSTRAINT "pengumuman_berkas_pengumumanId_fkey" FOREIGN KEY ("pengumumanId") REFERENCES "pengumuman"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumuman_timeline" ADD CONSTRAINT "pengumuman_timeline_pengumumanId_fkey" FOREIGN KEY ("pengumumanId") REFERENCES "pengumuman"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galeri" ADD CONSTRAINT "galeri_kegiatanId_fkey" FOREIGN KEY ("kegiatanId") REFERENCES "kegiatan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
