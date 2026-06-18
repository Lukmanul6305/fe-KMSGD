import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";

const include = {
  kategori: true,
  timeline: { orderBy: { id: "asc" as const } },
};

export const pengumumanRepository = {
  async findAll() {
    return prisma.pengumuman.findMany({
      where: { isPublished: true },
      orderBy: { tanggal: "desc" },
      include,
    });
  },

  async findPenting() {
    return prisma.pengumuman.findMany({
      where: { isPublished: true, isPenting: true },
      orderBy: { tanggal: "desc" },
      include,
    });
  },

  async findById(id: number) {
    return prisma.pengumuman.findUnique({ where: { id }, include });
  },

  async findPublishedById(id: number) {
    return prisma.pengumuman.findFirst({
      where: { id, isPublished: true },
      include,
    });
  },

  async create(data: Prisma.PengumumanUncheckedCreateInput) {
    return prisma.pengumuman.create({ data, include });
  },

  async update(id: number, data: Prisma.PengumumanUncheckedUpdateInput) {
    return prisma.pengumuman.update({ where: { id }, data, include });
  },

  async delete(id: number) {
    return prisma.pengumuman.delete({ where: { id } });
  },
};
