"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAnggotaSchema = exports.createAnggotaSchema = exports.updatePengurusIntiSchema = exports.createPengurusIntiSchema = void 0;
const zod_1 = require("zod");
exports.createPengurusIntiSchema = zod_1.z.object({
    periodeId: zod_1.z.coerce.number({
        error: (issue) => (issue.input === undefined ? "Periode wajib diisi" : "Periode harus berupa angka"),
    }),
    nama: zod_1.z
        .string({
        error: "Nama wajib diisi",
    })
        .min(1, "Nama tidak boleh kosong"),
    jabatan: zod_1.z
        .string({
        error: "Jabatan wajib diisi",
    })
        .min(1, "Jabatan tidak boleh kosong"),
    slogan: zod_1.z.string().optional().nullable(),
});
exports.updatePengurusIntiSchema = exports.createPengurusIntiSchema.partial();
// Anggota Departemen
exports.createAnggotaSchema = zod_1.z.object({
    departemenId: zod_1.z.coerce.number({ error: "Departemen wajib diisi" }),
    nama: zod_1.z.string({ error: "Nama wajib diisi" }),
    jabatan: zod_1.z.string({ error: "Jabatan wajib diisi" }),
});
exports.updateAnggotaSchema = exports.createAnggotaSchema.partial();
