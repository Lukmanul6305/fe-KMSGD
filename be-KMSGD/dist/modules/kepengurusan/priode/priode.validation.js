"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePeriodeSchema = exports.createPeriodeSchema = void 0;
const zod_1 = require("zod");
exports.createPeriodeSchema = zod_1.z.object({
    periode: zod_1.z.string({ error: "Periode wajib diisi" }), // "2025/2026"
    status: zod_1.z.enum(["AKTIF", "DEMISIONER"]).default("AKTIF"),
});
exports.updatePeriodeSchema = exports.createPeriodeSchema.partial();
