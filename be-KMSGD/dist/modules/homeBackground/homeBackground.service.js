"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeBackgroundService = void 0;
const prisma_1 = require("../../config/prisma");
const uploadImage_1 = require("../../utils/uploadImage");
exports.homeBackgroundService = {
    async getAll(page, limit) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            prisma_1.prisma.homeBackground.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            prisma_1.prisma.homeBackground.count(),
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
        const data = await prisma_1.prisma.homeBackground.findMany({
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
        });
        return data;
    },
    async getById(id) {
        const data = await prisma_1.prisma.homeBackground.findUnique({
            where: { id },
        });
        if (!data)
            throw new Error("Background tidak ditemukan");
        return data;
    },
    async create(dto, fileBuffer) {
        if (!fileBuffer) {
            throw new Error("Image wajib diupload");
        }
        const imageUrl = await (0, uploadImage_1.uploadImage)(fileBuffer, "home_backgrounds");
        return prisma_1.prisma.homeBackground.create({
            data: {
                image: imageUrl,
                isActive: dto.isActive !== undefined ? dto.isActive : true,
            },
        });
    },
    async update(id, dto, fileBuffer) {
        const existing = await this.getById(id);
        let imageUrl = existing.image;
        if (fileBuffer) {
            await (0, uploadImage_1.deleteImage)(existing.image);
            imageUrl = await (0, uploadImage_1.uploadImage)(fileBuffer, "home_backgrounds");
        }
        return prisma_1.prisma.homeBackground.update({
            where: { id },
            data: {
                image: imageUrl,
                isActive: dto.isActive !== undefined ? dto.isActive : existing.isActive,
            },
        });
    },
    async delete(id) {
        const existing = await this.getById(id);
        await (0, uploadImage_1.deleteImage)(existing.image);
        return prisma_1.prisma.homeBackground.delete({ where: { id } });
    },
};
