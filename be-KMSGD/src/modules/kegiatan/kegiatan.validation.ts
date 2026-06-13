import { z } from "zod";

export const createKegiatanSchema = z.object({
  periodeId: z.coerce.number({ error: "periodeId wajib diisi" }),
  kategoriId: z.coerce.number({ error: "kategoriId wajib diisi" }),
  startTime: z.string({ error: "Waktu mulai wajib diisi" }),
  endTime: z.string().optional().nullable(),
  title: z.string({ error: "Judul wajib diisi" }).min(1),
  desc: z.string({ error: "Deskripsi wajib diisi" }).min(1),
  location: z.string({ error: "Lokasi wajib diisi" }).min(1),
  price: z.coerce.number().optional().default(0),
  registrationLink: z.string().url("Link registrasi harus berupa URL").optional().nullable(),
  departemenId: z.coerce.number().optional().nullable(),
  organizerCustom: z.string().optional().nullable(),
  contactPerson: z.string().optional().nullable(),
  isPenting: z
    .union([z.boolean(), z.string()])
    .transform((v) => (typeof v === "string" ? v === "true" : v))
    .optional(),
  isPublished: z
    .union([z.boolean(), z.string()])
    .transform((v) => (typeof v === "string" ? v === "true" : v))
    .optional(),
  speakers: z
    .union([z.array(z.string()), z.string()])
    .transform((v) => (typeof v === "string" ? JSON.parse(v) : v))
    .optional()
    .nullable(),
});

export const updateKegiatanSchema = createKegiatanSchema.partial();

export type CreateKegiatanDto = z.infer<typeof createKegiatanSchema>;
export type UpdateKegiatanDto = z.infer<typeof updateKegiatanSchema>;