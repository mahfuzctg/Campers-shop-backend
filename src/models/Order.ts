// src/models/Order.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: string;
  paymentMethod: "cash" | "stripe";
  status: string;
}

const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  shippingAddress: { type: String, required: true },
  paymentMethod: { type: String, enum: ["cash", "stripe"], required: true },
  status: { type: String, default: "pending" },
});

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
