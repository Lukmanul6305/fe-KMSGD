import { z } from "zod";

export const createPeriodeSchema = z.object({
  periode: z.string({ error: "Periode wajib diisi" }), // "2025/2026"
  status: z.enum(["AKTIF", "DEMISIONER"]).default("AKTIF"),
});
export const updatePeriodeSchema = createPeriodeSchema.partial();
export type CreatePeriodeDto = z.infer<typeof createPeriodeSchema>;
export type UpdatePeriodeDto = z.infer<typeof updatePeriodeSchema>;
