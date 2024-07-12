// src/schemas/orderSchema.ts
import { Schema } from "mongoose";

// Define Order Schema
const OrderSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
});

export default OrderSchema;
