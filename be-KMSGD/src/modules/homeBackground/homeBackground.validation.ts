import { z } from "zod";

const booleanFormSchema = z.preprocess((value) => {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value === "boolean") return value;

  if (typeof value === "string") {
    const normalized = value.toLowerCase();
    if (normalized === "true" || normalized === "1") return true;
    if (normalized === "false" || normalized === "0") return false;
  }

  return value;
}, z.boolean().optional());

export const homeBackgroundQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(12),
});

export const homeBackgroundIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createHomeBackgroundSchema = z.object({
  isActive: booleanFormSchema,
});

export const updateHomeBackgroundSchema = z.object({
  isActive: booleanFormSchema,
});
