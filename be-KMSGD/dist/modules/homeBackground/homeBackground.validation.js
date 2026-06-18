"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHomeBackgroundSchema = exports.createHomeBackgroundSchema = exports.homeBackgroundIdSchema = exports.homeBackgroundQuerySchema = void 0;
const zod_1 = require("zod");
const booleanFormSchema = zod_1.z.preprocess((value) => {
    if (value === undefined || value === null || value === "")
        return undefined;
    if (typeof value === "boolean")
        return value;
    if (typeof value === "string") {
        const normalized = value.toLowerCase();
        if (normalized === "true" || normalized === "1")
            return true;
        if (normalized === "false" || normalized === "0")
            return false;
    }
    return value;
}, zod_1.z.boolean().optional());
exports.homeBackgroundQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(50).default(12),
});
exports.homeBackgroundIdSchema = zod_1.z.object({
    id: zod_1.z.coerce.number().int().positive(),
});
exports.createHomeBackgroundSchema = zod_1.z.object({
    isActive: booleanFormSchema,
});
exports.updateHomeBackgroundSchema = zod_1.z.object({
    isActive: booleanFormSchema,
});
