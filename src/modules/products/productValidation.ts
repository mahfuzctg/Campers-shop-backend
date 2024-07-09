import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  stockQuantity: z.number().int().min(0),
  description: z.string().min(1),
  category: z.string().min(1),
  ratings: z.number().min(0).max(5),
  images: z.array(z.string()),
});
