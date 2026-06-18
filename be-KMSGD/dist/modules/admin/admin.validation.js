"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminSchema = exports.updateAdminSchema = exports.createAdminSchema = void 0;
const zod_1 = require("zod");
exports.createAdminSchema = zod_1.z.object({
    username: zod_1.z
        .string({ error: "Username wajib diisi" })
        .min(3, "Username minimal 3 karakter")
        .max(50, "Username maksimal 50 karakter")
        .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh huruf, angka, dan underscore"),
    password: zod_1.z.string({ error: "Password wajib diisi" }).min(6, "Password minimal 6 karakter").max(100, "Password maksimal 100 karakter"),
});
exports.updateAdminSchema = zod_1.z
    .object({
    username: zod_1.z
        .string()
        .min(3, "Username minimal 3 karakter")
        .max(50, "Username maksimal 50 karakter")
        .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh huruf, angka, dan underscore")
        .optional(),
    password: zod_1.z.string().min(5, "Password minimal 5 karakter").max(100, "Password maksimal 100 karakter").optional(),
})
    .refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diisi",
});
exports.loginAdminSchema = zod_1.z.object({
    username: zod_1.z.string({ error: "Username wajib diisi" }),
    password: zod_1.z.string({ error: "Password wajib diisi" }),
});
