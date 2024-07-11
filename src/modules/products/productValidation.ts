// // src/modules/products/productValidation.ts
// import { z } from "zod";

// export const createProductSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   price: z.number().positive("Price must be a positive number"),
//   stockQuantity: z.number().int().min(0, "Stock quantity cannot be negative"),
//   description: z.string().min(1, "Description is required"),
//   category: z.string().min(1, "Category is required"),
//   ratings: z
//     .number()
//     .min(0, "Ratings cannot be less than 0")
//     .max(5, "Ratings cannot be more than 5"),
//   images: z.array(z.string()).nonempty("At least one image URL is required"),
// });
