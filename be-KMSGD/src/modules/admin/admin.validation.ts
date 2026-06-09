import { z } from "zod";

export const createAdminSchema = z.object({
  username: z
    .string({ error: "Username wajib diisi" })
    .min(3, "Username minimal 3 karakter")
    .max(50, "Username maksimal 50 karakter")
    .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh huruf, angka, dan underscore"),
  password: z.string({ error: "Password wajib diisi" }).min(6, "Password minimal 6 karakter").max(100, "Password maksimal 100 karakter"),
});

export const updateAdminSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username minimal 3 karakter")
      .max(50, "Username maksimal 50 karakter")
      .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh huruf, angka, dan underscore")
      .optional(),
    password: z.string().min(5, "Password minimal 5 karakter").max(100, "Password maksimal 100 karakter").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diisi",
  });

export const loginAdminSchema = z.object({
  username: z.string({ error: "Username wajib diisi" }),
  password: z.string({ error: "Password wajib diisi" }),
});

export type CreateAdminDto = z.infer<typeof createAdminSchema>;
export type UpdateAdminDto = z.infer<typeof updateAdminSchema>;
export type LoginAdminDto = z.infer<typeof loginAdminSchema>;
