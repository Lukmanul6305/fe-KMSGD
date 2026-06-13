import { z } from "zod";

export const createDepartemenSchema = z.object({
  periodeId: z.number({ error: "Periode wajib diisi" }),
  namaDepartemen: z.string({ error: "Nama departemen wajib diisi" }),
  deskripsi: z.string().optional(),
});
export const updateDepartemenSchema = createDepartemenSchema.partial();
export type CreateDepartemenDto = z.infer<typeof createDepartemenSchema>;
export type UpdateDepartemenDto = z.infer<typeof updateDepartemenSchema>;
