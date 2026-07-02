import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";

export const kegiatanRepository = {
  async findAll(page = 1, limit = 12) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.kegiatan.findMany({
        where: { isPublished: true },
        orderBy: { startTime: "desc" },
        include: { galeri: true, kategori: true, departemen: true },
        skip,
        take: limit,
      }),
      prisma.kegiatan.count({ where: { isPublished: true } }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  },

  async findAllAdmin(page = 1, limit = 12) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.kegiatan.findMany({
        orderBy: { startTime: "desc" },
        include: { galeri: true, kategori: true, departemen: true },
        skip,
        take: limit,
      }),
      prisma.kegiatan.count(),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  },

  async findAllCategories() {
    return prisma.kategoriKegiatan.findMany({ orderBy: { nama: "asc" } });
  },

  async findByCategory(kategoriId: number, page = 1, limit = 12) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.kegiatan.findMany({
        where: { kategoriId, isPublished: true },
        orderBy: { startTime: "desc" },
        include: { galeri: true, kategori: true, departemen: true },
        skip,
        take: limit,
      }),
      prisma.kegiatan.count({ where: { kategoriId, isPublished: true } }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  },

  async findByDepartemen(departemenId: number, page = 1, limit = 12) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.kegiatan.findMany({
        where: { departemenId, isPublished: true },
        orderBy: { startTime: "desc" },
        include: { galeri: true, kategori: true, departemen: true },
        skip,
        take: limit,
      }),
      prisma.kegiatan.count({ where: { departemenId, isPublished: true } }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  },

  async findById(id: number) {
    return prisma.kegiatan.findUnique({
      where: { id },
      include: { galeri: true, kategori: true, departemen: true },
    });
  },

  async findPublishedById(id: number) {
    return prisma.kegiatan.findFirst({
      where: { id, isPublished: true },
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
