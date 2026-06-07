import { z } from "zod";

export const createGaleriSchema = z.object({
  judul: z.string().optional(),
  tipe: z.enum(["FOTO", "VIDEO"], { error: "Tipe harus FOTO atau VIDEO" }),
  url: z.string({ error: "URL wajib diisi" }),
  thumbnail: z.string().optional(),
  kegiatanId: z.number().optional(),
  isPublished: z.boolean().default(true),
});

export const updateGaleriSchema = createGaleriSchema.partial();

export type CreateGaleriDto = z.infer<typeof createGaleriSchema>;
export type UpdateGaleriDto = z.infer<typeof updateGaleriSchema>;
