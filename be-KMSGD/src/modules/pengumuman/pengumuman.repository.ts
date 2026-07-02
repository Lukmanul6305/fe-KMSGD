import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";

const include = {
  kategori: true,
  timeline: { orderBy: { id: "asc" as const } },
};

export const pengumumanRepository = {
  async findAll(page = 1, limit = 12) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.pengumuman.findMany({
        where: { isPublished: true },
        orderBy: { tanggal: "desc" },
        include,
        skip,
        take: limit,
      }),
      prisma.pengumuman.count({ where: { isPublished: true } }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  },

  async findPenting(page = 1, limit = 12) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.pengumuman.findMany({
        where: { isPublished: true, isPenting: true },
        orderBy: { tanggal: "desc" },
        include,
        skip,
        take: limit,
      }),
      prisma.pengumuman.count({ where: { isPublished: true, isPenting: true } }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
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
