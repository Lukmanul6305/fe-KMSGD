import { z } from "zod";

const persyaratanSchema = z.object({
  isi: z.string({ error: "Isi persyaratan wajib diisi" }),
  urutan: z.number().default(0),
});

const berkasSchema = z.object({
  nama: z.string({ error: "Nama berkas wajib diisi" }),
  urutan: z.number().default(0),
});

const timelineSchema = z.object({
  agenda: z.string({ error: "Agenda wajib diisi" }),
  tanggal: z.string({ error: "Tanggal wajib diisi" }),
  urutan: z.number().default(0),
});

export const createPengumumanSchema = z.object({
  tanggal: z.string({ error: "Tanggal wajib diisi" }),
  category: z.string().default("Pengumuman"),
  title: z.string({ error: "Judul wajib diisi" }),
  desc: z.string({ error: "Deskripsi wajib diisi" }),
  author: z.string({ error: "Author wajib diisi" }),
  isPenting: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  linkPendaftaran: z.string().url("Link tidak valid").optional(),
  contactPerson: z.string().optional(),
  persyaratan: z.array(persyaratanSchema).default([]),
  berkas: z.array(berkasSchema).default([]),
  timeline: z.array(timelineSchema).default([]),
});

export const updatePengumumanSchema = createPengumumanSchema.partial();

export type CreatePengumumanDto = z.infer<typeof createPengumumanSchema>;
export type UpdatePengumumanDto = z.infer<typeof updatePengumumanSchema>;
