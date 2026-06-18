"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDepartemenSchema = exports.createDepartemenSchema = void 0;
const zod_1 = require("zod");
exports.createDepartemenSchema = zod_1.z.object({
    periodeId: zod_1.z.number({ error: "Periode wajib diisi" }),
    namaDepartemen: zod_1.z.string({ error: "Nama departemen wajib diisi" }),
    deskripsi: zod_1.z.string().optional(),
});
exports.updateDepartemenSchema = exports.createDepartemenSchema.partial();
