import { prisma } from "../../config/prisma";
import { uploadImage, deleteImage } from "../../utils/uploadImage";

export const homeBackgroundService = {
  async getAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.homeBackground.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.homeBackground.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  },

  async getActive() {
    const data = await prisma.homeBackground.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return data;
  },

  async getById(id: number) {
    const data = await prisma.homeBackground.findUnique({
      where: { id },
    });
    if (!data) throw new Error("Background tidak ditemukan");
    return data;
  },

  async create(dto: { isActive?: boolean }, fileBuffer?: Buffer) {
    if (!fileBuffer) {
      throw new Error("Image wajib diupload");
    }

    const imageUrl = await uploadImage(fileBuffer, "home_backgrounds");

    return prisma.homeBackground.create({
      data: {
        image: imageUrl,
        isActive: dto.isActive !== undefined ? dto.isActive : true,
      },
    });
  },

  async update(id: number, dto: { isActive?: boolean }, fileBuffer?: Buffer) {
    const existing = await this.getById(id);

    let imageUrl = existing.image;

    if (fileBuffer) {
      await deleteImage(existing.image);
      imageUrl = await uploadImage(fileBuffer, "home_backgrounds");
    }

    return prisma.homeBackground.update({
      where: { id },
      data: {
        image: imageUrl,
        isActive: dto.isActive !== undefined ? dto.isActive : existing.isActive,
      },
    });
  },

  async delete(id: number) {
    const existing = await this.getById(id);
    await deleteImage(existing.image);
    return prisma.homeBackground.delete({ where: { id } });
  },
};
