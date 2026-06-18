"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priodeRepository = void 0;
const prisma_1 = require("../../../config/prisma");
const periodeInclude = {
    pengurusInti: { orderBy: { id: "asc" } },
    departemen: {
        orderBy: { id: "asc" },
        include: { anggota: { orderBy: { id: "asc" } } },
    },
};
exports.priodeRepository = {
    async findAllPeriode() {
        return prisma_1.prisma.periodeOrganisasi.findMany({
            orderBy: { createdAt: "desc" },
            include: periodeInclude,
        });
    },
    async findPeriodeAktif() {
        return prisma_1.prisma.periodeOrganisasi.findFirst({
            where: { status: "AKTIF" },
            include: periodeInclude,
        });
    },
    async findPeriodeById(id) {
        return prisma_1.prisma.periodeOrganisasi.findUnique({
            where: { id },
            include: periodeInclude,
        });
    },
    async createPeriode(data) {
        return prisma_1.prisma.periodeOrganisasi.create({ data });
    },
    async updatePeriode(id, data) {
        return prisma_1.prisma.periodeOrganisasi.update({ where: { id }, data });
    },
    async deletePeriode(id) {
        return prisma_1.prisma.periodeOrganisasi.delete({ where: { id } });
    },
};
