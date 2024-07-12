// src/controllers/checkoutController.ts
import { Request, Response } from "express";
import Cart from "../models/Cart";
import Order from "../models/OrderModel";
import Product from "../models/ProductModel";
import { placeOrderSchema } from "../schemas/orderSchema";

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const result = placeOrderSchema.parse(req.body);
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "items.productId"
    );

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const orderItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (product) {
          return {
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
          };
        }
        return null;
      })
    );

    const newOrder = new Order({
      userId: req.params.userId,
      items: orderItems.filter((item) => item !== null),
      shippingAddress: result.shippingAddress,
      paymentMethod: result.paymentMethod,
      status: "pending",
    });

    await newOrder.save();
    await Cart.findOneAndDelete({ userId: req.params.userId }); // Clear cart after order

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: "Validation Error", error });
  }
};
