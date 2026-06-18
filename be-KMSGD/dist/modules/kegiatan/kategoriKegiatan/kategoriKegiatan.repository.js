"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kategoriKegiatanRepository = void 0;
const prisma_1 = require("../../../config/prisma");
exports.kategoriKegiatanRepository = {
    async findAll() {
        return prisma_1.prisma.kategoriKegiatan.findMany({
            orderBy: { nama: "asc" },
        });
    },
    async findById(id) {
        return prisma_1.prisma.kategoriKegiatan.findUnique({
            where: { id },
        });
    },
    async create(data) {
        return prisma_1.prisma.kategoriKegiatan.create({ data });
    },
    async update(id, data) {
        return prisma_1.prisma.kategoriKegiatan.update({ where: { id }, data });
    },
    async delete(id) {
        return prisma_1.prisma.kategoriKegiatan.delete({ where: { id } });
    },
};
