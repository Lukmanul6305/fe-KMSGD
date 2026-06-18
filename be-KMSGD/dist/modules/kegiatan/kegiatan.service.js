"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kegiatanService = void 0;
const uploadImage_1 = require("../../utils/uploadImage");
const kegiatan_repository_1 = require("./kegiatan.repository");
exports.kegiatanService = {
    async getAll() {
        return kegiatan_repository_1.kegiatanRepository.findAll();
    },
    async getAllAdmin() {
        return kegiatan_repository_1.kegiatanRepository.findAllAdmin();
    },
    async getAllCategories() {
        return kegiatan_repository_1.kegiatanRepository.findAllCategories();
    },
    async getByCategory(kategoriId) {
        return kegiatan_repository_1.kegiatanRepository.findByCategory(kategoriId);
    },
    async getByDepartemen(departemenId) {
        return kegiatan_repository_1.kegiatanRepository.findByDepartemen(departemenId);
    },
    async getById(id) {
        const data = await kegiatan_repository_1.kegiatanRepository.findById(id);
        if (!data)
            throw new Error("Kegiatan tidak ditemukan");
        return data;
    },
    async create(dto, imageBuffer) {
        const { startTime, endTime, ...rest } = dto;
        let image;
        if (imageBuffer)
            image = await (0, uploadImage_1.uploadImage)(imageBuffer, "kegiatan");
        return kegiatan_repository_1.kegiatanRepository.create({
            ...rest,
            startTime: new Date(startTime),
            ...(endTime && { endTime: new Date(endTime) }),
            ...(image && { image }),
        });
    },
    async update(id, dto, imageBuffer) {
        const existing = await exports.kegiatanService.getById(id);
        const { startTime, endTime, ...rest } = dto;
        let image = existing.image;
        if (imageBuffer) {
            if (existing.image)
                await (0, uploadImage_1.deleteImage)(existing.image);
            image = await (0, uploadImage_1.uploadImage)(imageBuffer, "kegiatan");
        }
        return kegiatan_repository_1.kegiatanRepository.update(id, {
            ...rest,
            ...(startTime && { startTime: new Date(startTime) }),
            ...(endTime && { endTime: new Date(endTime) }),
            ...(image && { image }),
        });
    },
    async delete(id) {
        const existing = await exports.kegiatanService.getById(id);
        if (existing.image)
            await (0, uploadImage_1.deleteImage)(existing.image);
        return kegiatan_repository_1.kegiatanRepository.delete(id);
    },
};
