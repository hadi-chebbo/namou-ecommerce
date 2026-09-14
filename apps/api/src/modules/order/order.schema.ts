import { z } from "zod";

export const createOrderSchema = z.object({
  address: z
    .string()
    .trim()
    .min(10, "Address must be at least 10 characters")
    .max(255, "Address must not exceed 255 characters"),
});