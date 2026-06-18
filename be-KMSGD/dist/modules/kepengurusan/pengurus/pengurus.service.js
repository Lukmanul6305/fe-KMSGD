"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kepengurusanService = void 0;
const prisma_1 = require("../../../config/prisma");
const uploadImage_1 = require("../../../utils/uploadImage");
const pengurus_repository_1 = require("./pengurus.repository");
exports.kepengurusanService = {
    // Pengurus Inti
    async getPengurusIntiByPeriode(periodeId) {
        return pengurus_repository_1.kepengurusanRepository.findPengurusIntiByPeriode(periodeId);
    },
    async createPengurusInti(dto, imageBuffer) {
        let image;
        if (imageBuffer)
            image = await (0, uploadImage_1.uploadImage)(imageBuffer, "kepengurusan/inti");
        return pengurus_repository_1.kepengurusanRepository.createPengurusInti({
            ...dto,
            ...(image && { image }),
        });
    },
    async updatePengurusInti(id, dto, imageBuffer) {
        const existing = await pengurus_repository_1.kepengurusanRepository.findPengurusIntiById(id);
        if (!existing)
            throw new Error("Pengurus inti tidak ditemukan");
        let image = existing.image;
        if (imageBuffer) {
            if (existing.image)
                await (0, uploadImage_1.deleteImage)(existing.image);
            image = await (0, uploadImage_1.uploadImage)(imageBuffer, "kepengurusan/inti");
        }
        return pengurus_repository_1.kepengurusanRepository.updatePengurusInti(id, {
            ...dto,
            ...(image && { image }),
        });
    },
    async deletePengurusInti(id) {
        const existing = await pengurus_repository_1.kepengurusanRepository.findPengurusIntiById(id);
        if (!existing)
            throw new Error("Pengurus inti tidak ditemukan");
        if (existing.image)
            await (0, uploadImage_1.deleteImage)(existing.image);
        return pengurus_repository_1.kepengurusanRepository.deletePengurusInti(id);
    },
    // Anggota
    async createAnggota(dto, imageBuffer) {
        let image;
        if (imageBuffer)
            image = await (0, uploadImage_1.uploadImage)(imageBuffer, "kepengurusan/anggota");
        return pengurus_repository_1.kepengurusanRepository.createAnggota({
            ...dto,
            ...(image && { image }),
        });
    },
    async updateAnggota(id, dto, imageBuffer) {
        const existing = await pengurus_repository_1.kepengurusanRepository.findAnggotaById(id);
        if (!existing)
            throw new Error("Anggota tidak ditemukan");
        let image = existing.image;
        if (imageBuffer) {
            if (existing.image)
                await (0, uploadImage_1.deleteImage)(existing.image);
            image = await (0, uploadImage_1.uploadImage)(imageBuffer, "kepengurusan/anggota");
        }
        return pengurus_repository_1.kepengurusanRepository.updateAnggota(id, {
            ...dto,
            ...(image && { image }),
        });
    },
    async deleteAnggota(id) {
        const existing = await pengurus_repository_1.kepengurusanRepository.findAnggotaById(id);
        if (!existing)
            throw new Error("Anggota tidak ditemukan");
        if (existing.image)
            await (0, uploadImage_1.deleteImage)(existing.image);
        return pengurus_repository_1.kepengurusanRepository.deleteAnggota(id);
    },
    async getAnggotaByDepartemen(departemenId) {
        return prisma_1.prisma.anggotaDepartemen.findMany({
            where: departemenId ? { departemenId } : undefined,
            include: { departemen: { select: { namaDepartemen: true } } },
            orderBy: { createdAt: "asc" },
        });
    },
};
