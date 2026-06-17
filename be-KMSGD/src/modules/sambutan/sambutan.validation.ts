import { z } from "zod";

export const createSambutanSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  jabatan: z.string().min(1, "Jabatan wajib diisi"),
  isi: z.string().min(1, "Isi sambutan wajib diisi"),
  image: z.string().optional(),
});

export const updateSambutanSchema = createSambutanSchema.partial();

export type CreateSambutanDto = z.infer<typeof createSambutanSchema>;
export type UpdateSambutanDto = z.infer<typeof updateSambutanSchema>;
