"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kategoriKegiatanService = void 0;
const kategoriKegiatan_repository_1 = require("./kategoriKegiatan.repository");
exports.kategoriKegiatanService = {
    async getAll() {
        return kategoriKegiatan_repository_1.kategoriKegiatanRepository.findAll();
    },
    async getById(id) {
        const data = await kategoriKegiatan_repository_1.kategoriKegiatanRepository.findById(id);
        if (!data)
            throw new Error("Kategori Kegiatan tidak ditemukan");
        return data;
    },
    async create(dto) {
        return kategoriKegiatan_repository_1.kategoriKegiatanRepository.create(dto);
    },
    async update(id, dto) {
        await exports.kategoriKegiatanService.getById(id);
        return kategoriKegiatan_repository_1.kategoriKegiatanRepository.update(id, dto);
    },
    async delete(id) {
        await exports.kategoriKegiatanService.getById(id);
        return kategoriKegiatan_repository_1.kategoriKegiatanRepository.delete(id);
    },
};
