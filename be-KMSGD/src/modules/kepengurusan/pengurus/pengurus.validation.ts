import { z } from "zod";

export const createPengurusIntiSchema = z.object({
  periodeId: z.coerce.number({
    error: (issue) => (issue.input === undefined ? "Periode wajib diisi" : "Periode harus berupa angka"),
  }),
  nama: z
    .string({
      error: "Nama wajib diisi",
    })
    .min(1, "Nama tidak boleh kosong"),
  jabatan: z
    .string({
      error: "Jabatan wajib diisi",
    })
    .min(1, "Jabatan tidak boleh kosong"),
  slogan: z.string().optional().nullable(),
});

export const updatePengurusIntiSchema = createPengurusIntiSchema.partial();

export type CreatePengurusIntiDto = z.infer<typeof createPengurusIntiSchema>;
export type UpdatePengurusIntiDto = z.infer<typeof updatePengurusIntiSchema>;

// Anggota Departemen
export const createAnggotaSchema = z.object({
  departemenId: z.coerce.number({ error: "Departemen wajib diisi" }),
  nama: z.string({ error: "Nama wajib diisi" }),
  jabatan: z.string({ error: "Jabatan wajib diisi" }),
});
export const updateAnggotaSchema = createAnggotaSchema.partial();
export type CreateAnggotaDto = z.infer<typeof createAnggotaSchema>;
export type UpdateAnggotaDto = z.infer<typeof updateAnggotaSchema>;
