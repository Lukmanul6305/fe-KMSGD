"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kategoriPengumumanRepository = void 0;
const prisma_1 = require("../../../config/prisma");
exports.kategoriPengumumanRepository = {
    async findAll() {
        return prisma_1.prisma.kategoriPengumuman.findMany({
            orderBy: { nama: "asc" },
        });
    },
    async findById(id) {
        return prisma_1.prisma.kategoriPengumuman.findUnique({
            where: { id },
        });
    },
    async create(data) {
        return prisma_1.prisma.kategoriPengumuman.create({ data });
    },
    async update(id, data) {
        return prisma_1.prisma.kategoriPengumuman.update({ where: { id }, data });
    },
    async delete(id) {
        return prisma_1.prisma.kategoriPengumuman.delete({ where: { id } });
    },
};
