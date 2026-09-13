import { z } from "zod";

export const addCartItem = z.object({
  productSlug: z.string().min(1),
  variantId: z.string().uuid().optional(),
  quantity: z.number().int().positive(),
});

export const updateCartItem = z
  .object({
    quantity: z.number().int().positive().optional(),
    variantId: z.string().uuid().optional(),
  })
  .refine(
    (data) => data.quantity !== undefined || data.variantId !== undefined,
    {
      message: "At least one field is required",
    }
  );

export const cartItemParams = z.object({
  itemId: z.string().uuid(),
});