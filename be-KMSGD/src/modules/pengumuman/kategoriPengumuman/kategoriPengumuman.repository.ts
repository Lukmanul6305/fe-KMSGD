import { prisma } from "../../../config/prisma";
import { Prisma } from "@prisma/client";

export const kategoriPengumumanRepository = {
  async findAll() {
    return prisma.kategoriPengumuman.findMany({
      orderBy: { nama: "asc" },
    });
  },

  async findById(id: number) {
    return prisma.kategoriPengumuman.findUnique({
      where: { id },
    });
  },

  async create(data: Prisma.KategoriPengumumanCreateInput) {
    return prisma.kategoriPengumuman.create({ data });
  },

  async update(id: number, data: Prisma.KategoriPengumumanUpdateInput) {
    return prisma.kategoriPengumuman.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.kategoriPengumuman.delete({ where: { id } });
  },
};
