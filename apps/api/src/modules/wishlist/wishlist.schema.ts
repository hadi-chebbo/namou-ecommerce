import { z } from "zod";

export const wishlistParams = z.object({
  slug: z.string().min(1, "Product slug is required"),
});