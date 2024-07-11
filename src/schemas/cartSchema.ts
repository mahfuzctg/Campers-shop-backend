import { z } from "zod";

export const addToCartSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1),
});

export const updateCartSchema = addToCartSchema.extend({
  productId: z.string().uuid(),
});
