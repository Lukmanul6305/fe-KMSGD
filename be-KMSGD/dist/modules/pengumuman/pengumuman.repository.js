"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pengumumanRepository = void 0;
const prisma_1 = require("../../config/prisma");
const include = {
    kategori: true,
    timeline: { orderBy: { id: "asc" } },
};
exports.pengumumanRepository = {
    async findAll() {
        return prisma_1.prisma.pengumuman.findMany({
            where: { isPublished: true },
            orderBy: { tanggal: "desc" },
            include,
        });
    },
    async findPenting() {
        return prisma_1.prisma.pengumuman.findMany({
            where: { isPublished: true, isPenting: true },
            orderBy: { tanggal: "desc" },
            include,
        });
    },
    async findById(id) {
        return prisma_1.prisma.pengumuman.findUnique({ where: { id }, include });
    },
    async create(data) {
        return prisma_1.prisma.pengumuman.create({ data, include });
    },
    async update(id, data) {
        return prisma_1.prisma.pengumuman.update({ where: { id }, data, include });
    },
    async delete(id) {
        return prisma_1.prisma.pengumuman.delete({ where: { id } });
    },
};
