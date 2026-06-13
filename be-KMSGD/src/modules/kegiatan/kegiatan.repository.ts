import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";

export const kegiatanRepository = {
  async findAll() {
    return prisma.kegiatan.findMany({
      where: { isPublished: true },
      orderBy: { startTime: "desc" },
      include: { galeri: true, kategori: true, departemen: true },
    });
  },

  async findAllAdmin() {
    return prisma.kegiatan.findMany({
      orderBy: { startTime: "desc" },
      include: { galeri: true, kategori: true, departemen: true },
    });
  },

  async findAllCategories() {
    return prisma.kategoriKegiatan.findMany({ orderBy: { nama: "asc" } });
  },

  async findByCategory(kategoriId: number) {
    return prisma.kegiatan.findMany({
      where: { kategoriId, isPublished: true },
      orderBy: { startTime: "desc" },
      include: { galeri: true, kategori: true, departemen: true },
    });
  },

  async findByDepartemen(departemenId: number) {
    return prisma.kegiatan.findMany({
      where: { departemenId, isPublished: true },
      orderBy: { startTime: "desc" },
      include: { galeri: true, kategori: true, departemen: true },
    });
  },

  async findById(id: number) {
    return prisma.kegiatan.findUnique({
      where: { id },
      include: { galeri: true, kategori: true, departemen: true },
    });
  },

  async create(data: Prisma.KegiatanUncheckedCreateInput) {
    return prisma.kegiatan.create({ data });
  },

  async update(id: number, data: Prisma.KegiatanUncheckedUpdateInput) {
    return prisma.kegiatan.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.kegiatan.delete({ where: { id } });
  },
};
