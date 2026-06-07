import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";

export const kegiatanRepository = {
  async findAll() {
    return prisma.kegiatan.findMany({
      where: { isPublished: true },
      orderBy: { date: "desc" },
      include: { speakers: { orderBy: { urutan: "asc" as const } }, galeri: true },
    });
  },

  async findAllCategories() {
    return prisma.kegiatan.findMany({
      where: { isPublished: true },
      select: { category: true },
      distinct: ["category"],
    });
  },

  async findByCategory(category: string) {
    return prisma.kegiatan.findMany({
      where: { category, isPublished: true },
      orderBy: { date: "desc" },
      include: { speakers: true, galeri: true },
    });
  },

  async findById(id: number) {
    return prisma.kegiatan.findUnique({
      where: { id },
      include: { speakers: true, galeri: true },
    });
  },

  async create(data: Prisma.KegiatanCreateInput) {
    return prisma.kegiatan.create({ data });
  },

  async update(id: number, data: Prisma.KegiatanUpdateInput) {
    return prisma.kegiatan.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.kegiatan.delete({ where: { id } });
  }
};
