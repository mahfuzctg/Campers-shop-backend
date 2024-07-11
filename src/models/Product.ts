// src/models/Product.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  stockQuantity: number;
  description: string;
  category: string;
  ratings: number;
  images: string[];
  tags?: string[];
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  ratings: { type: Number, required: true, min: 0, max: 5 },
  images: { type: [String], required: true },
  tags: { type: [String] },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
