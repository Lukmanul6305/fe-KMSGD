import { z } from "zod";

const speakerSchema = z.object({
  nama: z.string({ error: "Nama speaker wajib diisi" }),
  urutan: z.number().default(0),
});

export const createKegiatanSchema = z.object({
  date: z.string({ error: "Tanggal wajib diisi" }),
  startTime: z.string({ error: "Jam mulai wajib diisi" }),
  endTime: z.string().optional(),
  category: z.string({ error: "Kategori wajib diisi" }),
  title: z.string({ error: "Judul wajib diisi" }),
  desc: z.string({ error: "Deskripsi wajib diisi" }),
  location: z.string({ error: "Lokasi wajib diisi" }),
  image: z.string().url("URL gambar tidak valid").optional(),
  type: z.enum(["dark", "light"]).optional(),
  price: z.string().optional(),
  registrationLink: z.string().url("Link tidak valid").optional(),
  organizer: z.string().optional(),
  contactPerson: z.string().optional(),
  isPublished: z.boolean().default(true),
  speakers: z.array(speakerSchema).default([]),
});

export const updateKegiatanSchema = createKegiatanSchema.partial();

export type CreateKegiatanDto = z.infer<typeof createKegiatanSchema>;
export type UpdateKegiatanDto = z.infer<typeof updateKegiatanSchema>;
