// src/controllers/cartController.ts
import { Request, Response } from "express";
import Cart from "../models/Cart";
import Product from "../models/Product";
import { addToCartSchema, updateCartSchema } from "../schemas/cartSchema";

export const getCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "items.productId"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const result = addToCartSchema.parse(req.body);
    const product = await Product.findById(result.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stockQuantity < result.quantity)
      return res.status(400).json({ message: "Insufficient stock" });

    let cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      cart = new Cart({
        userId: req.params.userId,
        items: [{ productId: result.productId, quantity: result.quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === result.productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += result.quantity;
      } else {
        cart.items.push({
          productId: result.productId,
          quantity: result.quantity,
        });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: "Validation Error", error });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const result = updateCartSchema.parse(req.body);
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === result.productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = result.quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(400).json({ message: "Validation Error", error });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.body.productId
    );
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
