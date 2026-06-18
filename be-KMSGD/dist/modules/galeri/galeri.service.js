"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.galeriService = void 0;
const galeri_repository_1 = require("./galeri.repository");
const uploadImage_1 = require("../../utils/uploadImage");
exports.galeriService = {
    async getAll(page, limit) {
        return galeri_repository_1.galeriRepository.findAll(page, limit);
    },
    async getByTipe(tipe, page = 1, limit = 12) {
        return galeri_repository_1.galeriRepository.findByTipe(tipe, page, limit);
    },
    async getByKegiatan(kegiatanId) {
        return galeri_repository_1.galeriRepository.findByKegiatan(kegiatanId);
    },
    async getById(id) {
        const data = await galeri_repository_1.galeriRepository.findById(id);
        if (!data)
            throw new Error("Galeri tidak ditemukan");
        return data;
    },
    // FOTO: upload file ke Cloudinary → url = cloudinary url
    // VIDEO: url = YouTube link, thumbnail opsional di-upload ke Cloudinary
    async create(dto, files) {
        let url = dto.url;
        let thumbnail = dto.thumbnail;
        if (dto.tipe === "FOTO" && files?.image) {
            url = await (0, uploadImage_1.uploadImage)(files.image, "galeri/foto");
        }
        if (files?.thumbnail) {
            thumbnail = await (0, uploadImage_1.uploadImage)(files.thumbnail, "galeri/thumbnail");
        }
        if (!url) {
            throw new Error(dto.tipe === "FOTO" ? "Gambar wajib diupload untuk tipe FOTO" : "Link video wajib diisi untuk tipe VIDEO");
        }
        return galeri_repository_1.galeriRepository.create({
            ...dto,
            url,
            ...(thumbnail && { thumbnail }),
            ...(dto.kegiatanId && { kegiatan: { connect: { id: dto.kegiatanId } } }),
        });
    },
    async update(id, dto, files) {
        const existing = await exports.galeriService.getById(id);
        let url = dto.url ?? existing.url;
        let thumbnail = dto.thumbnail ?? existing.thumbnail ?? undefined;
        if (dto.tipe === "FOTO" && files?.image) {
            if (existing.tipe === "FOTO")
                await (0, uploadImage_1.deleteImage)(existing.url);
            url = await (0, uploadImage_1.uploadImage)(files.image, "galeri/foto");
        }
        if (files?.thumbnail) {
            if (existing.thumbnail)
                await (0, uploadImage_1.deleteImage)(existing.thumbnail);
            thumbnail = await (0, uploadImage_1.uploadImage)(files.thumbnail, "galeri/thumbnail");
        }
        return galeri_repository_1.galeriRepository.update(id, {
            ...dto,
            url,
            ...(thumbnail && { thumbnail }),
            ...(dto.kegiatanId && { kegiatan: { connect: { id: dto.kegiatanId } } }),
        });
    },
    async delete(id) {
        const existing = await exports.galeriService.getById(id);
        if (existing.tipe === "FOTO")
            await (0, uploadImage_1.deleteImage)(existing.url);
        if (existing.thumbnail)
            await (0, uploadImage_1.deleteImage)(existing.thumbnail);
        return galeri_repository_1.galeriRepository.delete(id);
    },
};
