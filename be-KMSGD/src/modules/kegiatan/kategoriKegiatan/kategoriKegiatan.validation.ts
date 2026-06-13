import { z } from "zod";

export const createKategoriSchema = z.object({
  nama: z
    .string({ error: "Nama kategori wajib diisi" })
    .min(1, "Nama kategori tidak boleh kosong")
    .max(100, "Nama kategori maksimal 100 karakter")
    .trim(),
});

export const updateKategoriSchema = createKategoriSchema.partial();

export type CreateKategoriDto = z.infer<typeof createKategoriSchema>;
export type UpdateKategoriDto = z.infer<typeof updateKategoriSchema>;
