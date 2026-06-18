"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.galeriRepository = void 0;
const prisma_1 = require("../../config/prisma");
exports.galeriRepository = {
    async findAll(page = 1, limit = 12) {
        const [data, total] = await prisma_1.prisma.$transaction([
            prisma_1.prisma.galeri.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: { isPublished: true },
                orderBy: { createdAt: "desc" },
                include: { kegiatan: { select: { id: true, title: true } } },
            }),
            prisma_1.prisma.galeri.count({ where: { isPublished: true } }),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    },
    async findByTipe(tipe, page = 1, limit = 12) {
        const [data, total] = await prisma_1.prisma.$transaction([
            prisma_1.prisma.galeri.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: { isPublished: true, tipe },
                orderBy: { createdAt: "desc" },
                include: { kegiatan: { select: { id: true, title: true } } },
            }),
            prisma_1.prisma.galeri.count({ where: { isPublished: true, tipe } }),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    },
    async findByKegiatan(kegiatanId) {
        return prisma_1.prisma.galeri.findMany({
            where: { kegiatanId, isPublished: true },
            orderBy: { createdAt: "desc" },
        });
    },
    async findById(id) {
        return prisma_1.prisma.galeri.findUnique({
            where: { id },
            include: { kegiatan: { select: { id: true, title: true } } },
        });
    },
    async create(data) {
        return prisma_1.prisma.galeri.create({ data });
    },
    async update(id, data) {
        return prisma_1.prisma.galeri.update({ where: { id }, data });
    },
    async delete(id) {
        return prisma_1.prisma.galeri.delete({ where: { id } });
    },
};
