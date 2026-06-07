import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";

export const galeriRepository = {
  async findAll(page = 1, limit = 12) {
    const [data, total] = await prisma.$transaction([
      prisma.galeri.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        include: { kegiatan: { select: { id: true, title: true } } },
      }),
      prisma.galeri.count({ where: { isPublished: true } }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async findByTipe(tipe: "FOTO" | "VIDEO", page = 1, limit = 12) {
    const [data, total] = await prisma.$transaction([
      prisma.galeri.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { isPublished: true, tipe },
        orderBy: { createdAt: "desc" },
        include: { kegiatan: { select: { id: true, title: true } } },
      }),
      prisma.galeri.count({ where: { isPublished: true, tipe } }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async findByKegiatan(kegiatanId: number) {
    return prisma.galeri.findMany({
      where: { kegiatanId, isPublished: true },
      orderBy: { createdAt: "desc" },
    });
  },

  async findById(id: number) {
    return prisma.galeri.findUnique({
      where: { id },
      include: { kegiatan: { select: { id: true, title: true } } },
    });
  },

  async create(data: Prisma.GaleriCreateInput) {
    return prisma.galeri.create({ data });
  },

  async update(id: number, data: Prisma.GaleriUpdateInput) {
    return prisma.galeri.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.galeri.delete({ where: { id } });
  },
};
