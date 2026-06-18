"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGaleriSchema = exports.createGaleriSchema = void 0;
const zod_1 = require("zod");
exports.createGaleriSchema = zod_1.z.object({
    judul: zod_1.z.string().optional(),
    tipe: zod_1.z.enum(["FOTO", "VIDEO"]),
    url: zod_1.z.string().optional(),
    thumbnail: zod_1.z.string().optional(),
    kegiatanId: zod_1.z.coerce.number().optional(),
    isPublished: zod_1.z.coerce.boolean().default(true),
});
exports.updateGaleriSchema = exports.createGaleriSchema.partial();
