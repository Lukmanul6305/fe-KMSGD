import { prisma } from "../../../config/prisma";
import { Prisma } from "@prisma/client";

export const kategoriKegiatanRepository = {
  async findAll() {
    return prisma.kategoriKegiatan.findMany({
      orderBy: { nama: "asc" },
    });
  },

  async findById(id: number) {
    return prisma.kategoriKegiatan.findUnique({
      where: { id },
    });
  },

  async create(data: Prisma.KategoriKegiatanCreateInput) {
    return prisma.kategoriKegiatan.create({ data });
  },

  async update(id: number, data: Prisma.KategoriKegiatanUpdateInput) {
    return prisma.kategoriKegiatan.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.kategoriKegiatan.delete({ where: { id } });
  },
};
