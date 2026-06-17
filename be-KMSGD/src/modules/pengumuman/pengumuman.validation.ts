import { z } from "zod";

const timelineSchema = z.object({
  agenda: z.string({ error: "Agenda wajib diisi" }).min(1),
  tanggal: z.string({ error: "Tanggal wajib diisi" }).min(1),
});

const boolField = z.union([z.boolean(), z.string()]).transform((v) => (typeof v === "string" ? v === "true" : v));

const jsonArray = <T extends z.ZodTypeAny>(schema: T) => z.union([z.array(schema), z.string()]).transform((v) => (typeof v === "string" ? JSON.parse(v) : v));

export const createPengumumanSchema = z.object({
  tanggal: z.string({ error: "Tanggal wajib diisi" }).min(1),
  kategoriId: z.coerce.number({ error: "kategoriId wajib diisi" }),
  title: z.string({ error: "Judul wajib diisi" }).min(1),
  desc: z.string({ error: "Deskripsi wajib diisi" }).min(1),
  author: z.string({ error: "Author wajib diisi" }).min(1),
  isPenting: boolField.optional().default(false),
  isPublished: boolField.optional().default(true),
  linkPendaftaran: z.string().url("Link tidak valid").optional().nullable(),
  contactPerson: z.string().optional().nullable(),
  persyaratan: jsonArray(z.string()).optional().default([]),
  berkas: jsonArray(z.string()).optional().default([]),
  timeline: jsonArray(timelineSchema).optional().default([]),
});

export const updatePengumumanSchema = createPengumumanSchema.partial();

export type CreatePengumumanDto = z.infer<typeof createPengumumanSchema>;
export type UpdatePengumumanDto = z.infer<typeof updatePengumumanSchema>;
