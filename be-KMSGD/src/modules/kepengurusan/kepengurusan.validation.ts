import { z } from "zod";

// Periode
export const createPeriodeSchema = z.object({
  periode: z.string({ error: "Periode wajib diisi" }), // "2025/2026"
  status: z.enum(["AKTIF", "DEMISIONER"]).default("AKTIF"),
});
export const updatePeriodeSchema = createPeriodeSchema.partial();
export type CreatePeriodeDto = z.infer<typeof createPeriodeSchema>;
export type UpdatePeriodeDto = z.infer<typeof updatePeriodeSchema>;

// Pengurus Inti
export const createPengurusIntiSchema = z.object({
  periodeId: z.number({ error: "Periode wajib diisi" }),
  nama: z.string({ error: "Nama wajib diisi" }),
  jabatan: z.string({ error: "Jabatan wajib diisi" }),
  slogan: z.string().optional(),
  urutan: z.number().default(0),
});
export const updatePengurusIntiSchema = createPengurusIntiSchema.partial();
export type CreatePengurusIntiDto = z.infer<typeof createPengurusIntiSchema>;
export type UpdatePengurusIntiDto = z.infer<typeof updatePengurusIntiSchema>;

// Departemen
export const createDepartemenSchema = z.object({
  periodeId: z.number({ error: "Periode wajib diisi" }),
  namaDepartemen: z.string({ error: "Nama departemen wajib diisi" }),
  deskripsi: z.string().optional(),
  urutan: z.number().default(0),
});
export const updateDepartemenSchema = createDepartemenSchema.partial();
export type CreateDepartemenDto = z.infer<typeof createDepartemenSchema>;
export type UpdateDepartemenDto = z.infer<typeof updateDepartemenSchema>;

// Anggota Departemen
export const createAnggotaSchema = z.object({
  departemenId: z.number({ error: "Departemen wajib diisi" }),
  nama: z.string({ error: "Nama wajib diisi" }),
  jabatan: z.string({ error: "Jabatan wajib diisi" }),
  urutan: z.number().default(0),
});
export const updateAnggotaSchema = createAnggotaSchema.partial();
export type CreateAnggotaDto = z.infer<typeof createAnggotaSchema>;
export type UpdateAnggotaDto = z.infer<typeof updateAnggotaSchema>;
