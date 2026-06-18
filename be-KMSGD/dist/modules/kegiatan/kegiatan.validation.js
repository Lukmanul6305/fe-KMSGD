"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateKegiatanSchema = exports.createKegiatanSchema = void 0;
const zod_1 = require("zod");
exports.createKegiatanSchema = zod_1.z.object({
    periodeId: zod_1.z.coerce.number({ error: "periodeId wajib diisi" }),
    kategoriId: zod_1.z.coerce.number({ error: "kategoriId wajib diisi" }),
    startTime: zod_1.z.string({ error: "Waktu mulai wajib diisi" }),
    endTime: zod_1.z.string().optional().nullable(),
    title: zod_1.z.string({ error: "Judul wajib diisi" }).min(1),
    desc: zod_1.z.string({ error: "Deskripsi wajib diisi" }).min(1),
    location: zod_1.z.string({ error: "Lokasi wajib diisi" }).min(1),
    price: zod_1.z.coerce.number().optional().default(0),
    registrationLink: zod_1.z.string().url("Link registrasi harus berupa URL").optional().nullable(),
    departemenId: zod_1.z.coerce.number().optional().nullable(),
    organizerCustom: zod_1.z.string().optional().nullable(),
    contactPerson: zod_1.z.string().optional().nullable(),
    isPenting: zod_1.z
        .union([zod_1.z.boolean(), zod_1.z.string()])
        .transform((v) => (typeof v === "string" ? v === "true" : v))
        .optional(),
    isPublished: zod_1.z
        .union([zod_1.z.boolean(), zod_1.z.string()])
        .transform((v) => (typeof v === "string" ? v === "true" : v))
        .optional(),
    speakers: zod_1.z
        .union([zod_1.z.array(zod_1.z.string()), zod_1.z.string()])
        .transform((v) => (typeof v === "string" ? JSON.parse(v) : v))
        .optional()
        .nullable(),
});
exports.updateKegiatanSchema = exports.createKegiatanSchema.partial();
