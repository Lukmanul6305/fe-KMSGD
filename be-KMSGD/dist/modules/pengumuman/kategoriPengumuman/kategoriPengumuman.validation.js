"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateKategoriSchema = exports.createKategoriSchema = void 0;
const zod_1 = require("zod");
exports.createKategoriSchema = zod_1.z.object({
    nama: zod_1.z
        .string({ error: "Nama kategori wajib diisi" })
        .min(1, "Nama kategori tidak boleh kosong")
        .max(100, "Nama kategori maksimal 100 karakter")
        .trim(),
});
exports.updateKategoriSchema = exports.createKategoriSchema.partial();
