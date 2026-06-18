"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSambutanSchema = exports.createSambutanSchema = void 0;
const zod_1 = require("zod");
exports.createSambutanSchema = zod_1.z.object({
    nama: zod_1.z.string().min(1, "Nama wajib diisi"),
    jabatan: zod_1.z.string().min(1, "Jabatan wajib diisi"),
    isi: zod_1.z.string().min(1, "Isi sambutan wajib diisi"),
    image: zod_1.z.string().optional(),
});
exports.updateSambutanSchema = exports.createSambutanSchema.partial();
