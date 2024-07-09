import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  stockQuantity: number;
  description: string;
  category: string;
  ratings: number;
  images: string[];
}
