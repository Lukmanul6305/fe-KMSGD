import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";

const include = {
  persyaratan: { orderBy: { id: "asc" as const } },
  berkas: { orderBy: { id: "asc" as const } },
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

  async create(data: Prisma.PengumumanCreateInput) {
    return prisma.pengumuman.create({ data, include });
  },

  async update(id: number, data: Prisma.PengumumanUpdateInput) {
    return prisma.pengumuman.update({ where: { id }, data, include });
  },

  async delete(id: number) {
    return prisma.pengumuman.delete({ where: { id } });
  },
};