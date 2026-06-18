"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kegiatanRepository = void 0;
const prisma_1 = require("../../config/prisma");
exports.kegiatanRepository = {
    async findAll() {
        return prisma_1.prisma.kegiatan.findMany({
            where: { isPublished: true },
            orderBy: { startTime: "desc" },
            include: { galeri: true, kategori: true, departemen: true },
        });
    },
    async findAllAdmin() {
        return prisma_1.prisma.kegiatan.findMany({
            orderBy: { startTime: "desc" },
            include: { galeri: true, kategori: true, departemen: true },
        });
    },
    async findAllCategories() {
        return prisma_1.prisma.kategoriKegiatan.findMany({ orderBy: { nama: "asc" } });
    },
    async findByCategory(kategoriId) {
        return prisma_1.prisma.kegiatan.findMany({
            where: { kategoriId, isPublished: true },
            orderBy: { startTime: "desc" },
            include: { galeri: true, kategori: true, departemen: true },
        });
    },
    async findByDepartemen(departemenId) {
        return prisma_1.prisma.kegiatan.findMany({
            where: { departemenId, isPublished: true },
            orderBy: { startTime: "desc" },
            include: { galeri: true, kategori: true, departemen: true },
        });
    },
    async findById(id) {
        return prisma_1.prisma.kegiatan.findUnique({
            where: { id },
            include: { galeri: true, kategori: true, departemen: true },
        });
    },
    async create(data) {
        return prisma_1.prisma.kegiatan.create({ data });
    },
    async update(id, data) {
        return prisma_1.prisma.kegiatan.update({ where: { id }, data });
    },
    async delete(id) {
        return prisma_1.prisma.kegiatan.delete({ where: { id } });
    },
};
