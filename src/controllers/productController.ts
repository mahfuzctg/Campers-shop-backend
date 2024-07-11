// src/controllers/productController.ts
import { Request, Response } from "express";
import Product from "../models/Product";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/productSchema";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const result = createProductSchema.parse(req.body);
    const newProduct = new Product(result);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Validation Error", error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const result = updateProductSchema.parse(req.body);
    const product = await Product.findByIdAndUpdate(req.params.id, result, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Validation Error", error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
