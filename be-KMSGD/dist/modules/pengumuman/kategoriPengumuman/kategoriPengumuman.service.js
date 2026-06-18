"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kategoriPengumumanService = void 0;
const kategoriPengumuman_repository_1 = require("./kategoriPengumuman.repository");
exports.kategoriPengumumanService = {
    async getAll() {
        return kategoriPengumuman_repository_1.kategoriPengumumanRepository.findAll();
    },
    async getById(id) {
        const data = await kategoriPengumuman_repository_1.kategoriPengumumanRepository.findById(id);
        if (!data)
            throw new Error("Kategori pengumuman tidak ditemukan");
        return data;
    },
    async create(dto) {
        return kategoriPengumuman_repository_1.kategoriPengumumanRepository.create(dto);
    },
    async update(id, dto) {
        await exports.kategoriPengumumanService.getById(id);
        return kategoriPengumuman_repository_1.kategoriPengumumanRepository.update(id, dto);
    },
    async delete(id) {
        await exports.kategoriPengumumanService.getById(id);
        return kategoriPengumuman_repository_1.kategoriPengumumanRepository.delete(id);
    },
};
