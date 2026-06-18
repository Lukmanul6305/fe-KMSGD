"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kepengurusanRepository = void 0;
const prisma_1 = require("../../../config/prisma");
exports.kepengurusanRepository = {
    async findAllDepartemen() {
        return prisma_1.prisma.departemen.findMany({
            include: { anggota: { orderBy: { id: "asc" } } },
            orderBy: { id: "asc" },
        });
    },
    async findDepartemenById(id) {
        return prisma_1.prisma.departemen.findUnique({
            where: { id },
            include: { anggota: { orderBy: { id: "asc" } } },
        });
    },
    async findDepartemenByPeriode(periodeId) {
        return prisma_1.prisma.departemen.findMany({
            where: { periodeId },
            include: { anggota: { orderBy: { id: "asc" } } },
            orderBy: { id: "asc" },
        });
    },
    async createDepartemen(data) {
        return prisma_1.prisma.departemen.create({ data });
    },
    async updateDepartemen(id, data) {
        return prisma_1.prisma.departemen.update({ where: { id }, data });
    },
    async deleteDepartemen(id) {
        return prisma_1.prisma.departemen.delete({ where: { id } });
    },
};
