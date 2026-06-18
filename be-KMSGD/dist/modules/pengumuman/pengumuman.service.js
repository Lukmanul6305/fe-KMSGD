"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pengumumanService = void 0;
const pengumuman_repository_1 = require("./pengumuman.repository");
const uploadImage_1 = require("../../utils/uploadImage");
exports.pengumumanService = {
    async getAll() {
        return pengumuman_repository_1.pengumumanRepository.findAll();
    },
    async getPenting() {
        return pengumuman_repository_1.pengumumanRepository.findPenting();
    },
    async getById(id) {
        const data = await pengumuman_repository_1.pengumumanRepository.findById(id);
        if (!data)
            throw new Error("Pengumuman tidak ditemukan");
        return data;
    },
    async create(dto, imageBuffer) {
        let image;
        if (imageBuffer)
            image = await (0, uploadImage_1.uploadImage)(imageBuffer, "pengumuman");
        const { timeline, ...rest } = dto;
        return pengumuman_repository_1.pengumumanRepository.create({
            ...rest,
            tanggal: new Date(dto.tanggal),
            ...(image && { image }),
            timeline: { create: timeline },
        });
    },
    async update(id, dto, imageBuffer) {
        const existing = await exports.pengumumanService.getById(id);
        let image = existing.image;
        if (imageBuffer) {
            if (existing.image)
                await (0, uploadImage_1.deleteImage)(existing.image);
            image = await (0, uploadImage_1.uploadImage)(imageBuffer, "pengumuman");
        }
        const { timeline, ...rest } = dto;
        return pengumuman_repository_1.pengumumanRepository.update(id, {
            ...rest,
            ...(dto.tanggal && { tanggal: new Date(dto.tanggal) }),
            ...(image && { image }),
            ...(timeline && {
                timeline: { deleteMany: {}, create: timeline },
            }),
        });
    },
    async delete(id) {
        const existing = await exports.pengumumanService.getById(id);
        if (existing.image)
            await (0, uploadImage_1.deleteImage)(existing.image);
        return pengumuman_repository_1.pengumumanRepository.delete(id);
    },
};
