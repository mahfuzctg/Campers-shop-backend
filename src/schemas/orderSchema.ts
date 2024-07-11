// src/schemas/orderSchema.ts
import { z } from "zod";

export const placeOrderSchema = z.object({
  shippingAddress: z.string().min(1),
  paymentMethod: z.enum(["cash", "stripe"]),
});
