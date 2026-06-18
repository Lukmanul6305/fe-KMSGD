"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kepengurusanService = void 0;
const departemen_repository_1 = require("./departemen.repository");
const prisma_1 = require("../../../config/prisma");
exports.kepengurusanService = {
    async getAllDepartemen() {
        return departemen_repository_1.kepengurusanRepository.findAllDepartemen();
    },
    async getDepartemenByPeriode(periodeId) {
        return departemen_repository_1.kepengurusanRepository.findDepartemenByPeriode(periodeId);
    },
    async getDepartemenAktif() {
        const periodeAktif = await prisma_1.prisma.periodeOrganisasi.findFirst({
            where: { status: "AKTIF" },
        });
        if (!periodeAktif)
            throw new Error("Tidak ada periode aktif");
        return departemen_repository_1.kepengurusanRepository.findDepartemenByPeriode(periodeAktif.id);
    },
    async createDepartemen(dto) {
        return departemen_repository_1.kepengurusanRepository.createDepartemen({
            ...dto,
        });
    },
    async updateDepartemen(id, dto) {
        const existing = await departemen_repository_1.kepengurusanRepository.findDepartemenById(id);
        if (!existing)
            throw new Error("Departemen tidak ditemukan");
        return departemen_repository_1.kepengurusanRepository.updateDepartemen(id, {
            ...dto,
        });
    },
    async deleteDepartemen(id) {
        const existing = await departemen_repository_1.kepengurusanRepository.findDepartemenById(id);
        if (!existing)
            throw new Error("Departemen tidak ditemukan");
        return departemen_repository_1.kepengurusanRepository.deleteDepartemen(id);
    },
};
