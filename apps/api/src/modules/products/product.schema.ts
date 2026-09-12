import { z } from "zod";

export const productListingSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(50).default(12),
});

export const productDetailsSchema = z.object({
  slug: z.string().min(1),
});

export type ProductListingQuery = z.infer<typeof productListingSchema>;

export type ProductDetailsParams = z.infer<typeof productDetailsSchema>;