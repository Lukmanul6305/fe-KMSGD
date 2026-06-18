"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePengumumanSchema = exports.createPengumumanSchema = void 0;
const zod_1 = require("zod");
const timelineSchema = zod_1.z.object({
    agenda: zod_1.z.string({ error: "Agenda wajib diisi" }).min(1),
    tanggal: zod_1.z.string({ error: "Tanggal wajib diisi" }).min(1),
});
const boolField = zod_1.z.union([zod_1.z.boolean(), zod_1.z.string()]).transform((v) => (typeof v === "string" ? v === "true" : v));
const jsonArray = (schema) => zod_1.z.union([zod_1.z.array(schema), zod_1.z.string()]).transform((v) => (typeof v === "string" ? JSON.parse(v) : v));
exports.createPengumumanSchema = zod_1.z.object({
    tanggal: zod_1.z.string({ error: "Tanggal wajib diisi" }).min(1),
    kategoriId: zod_1.z.coerce.number({ error: "kategoriId wajib diisi" }),
    title: zod_1.z.string({ error: "Judul wajib diisi" }).min(1),
    desc: zod_1.z.string({ error: "Deskripsi wajib diisi" }).min(1),
    author: zod_1.z.string({ error: "Author wajib diisi" }).min(1),
    isPenting: boolField.optional().default(false),
    isPublished: boolField.optional().default(true),
    linkPendaftaran: zod_1.z.string().url("Link tidak valid").optional().nullable(),
    contactPerson: zod_1.z.string().optional().nullable(),
    persyaratan: jsonArray(zod_1.z.string()).optional().default([]),
    berkas: jsonArray(zod_1.z.string()).optional().default([]),
    timeline: jsonArray(timelineSchema).optional().default([]),
});
exports.updatePengumumanSchema = exports.createPengumumanSchema.partial();
