import { model } from "mongoose";
import ProductSchema from "../schemas/productSchema";

// Define Product Model
const Product = model("Product", ProductSchema);

export default Product;
