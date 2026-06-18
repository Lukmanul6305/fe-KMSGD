"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priodeService = void 0;
const priode_repository_1 = require("./priode.repository");
const prisma_1 = require("../../../config/prisma");
exports.priodeService = {
    async getAllPeriode() {
        return priode_repository_1.priodeRepository.findAllPeriode();
    },
    async getPeriodeAktif() {
        const data = await priode_repository_1.priodeRepository.findPeriodeAktif();
        if (!data)
            throw new Error("Tidak ada periode aktif");
        return data;
    },
    async getPeriodeById(id) {
        const data = await priode_repository_1.priodeRepository.findPeriodeById(id);
        if (!data)
            throw new Error("Periode tidak ditemukan");
        return data;
    },
    async createPeriode(dto) {
        if (dto.status === "AKTIF") {
            await prisma_1.prisma.periodeOrganisasi.updateMany({
                where: { status: "AKTIF" },
                data: { status: "DEMISIONER" }
            });
        }
        return priode_repository_1.priodeRepository.createPeriode(dto);
    },
    async updatePeriode(id, dto) {
        await exports.priodeService.getPeriodeById(id);
        if (dto.status === "AKTIF") {
            await prisma_1.prisma.periodeOrganisasi.updateMany({
                where: { status: "AKTIF", NOT: { id } },
                data: { status: "DEMISIONER" }
            });
        }
        return priode_repository_1.priodeRepository.updatePeriode(id, dto);
    },
    async deletePeriode(id) {
        await exports.priodeService.getPeriodeById(id);
        return priode_repository_1.priodeRepository.deletePeriode(id);
    },
};
