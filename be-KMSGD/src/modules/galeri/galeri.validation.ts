import { z } from "zod";

export const createGaleriSchema = z.object({
  judul: z.string().optional(),

  tipe: z.enum(["FOTO", "VIDEO"]),

  url: z.string().optional(),

  thumbnail: z.string().optional(),

  kegiatanId: z.coerce.number().optional(),

  isPublished: z.coerce.boolean().default(true),
});

export const updateGaleriSchema = createGaleriSchema.partial();

export type CreateGaleriDto = z.infer<typeof createGaleriSchema>;
export type UpdateGaleriDto = z.infer<typeof updateGaleriSchema>;
