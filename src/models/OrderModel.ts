import { model } from "mongoose";
import OrderSchema from "../schemas/orderSchema";

// Define Order Model
const Order = model("Order", OrderSchema);

export default Order;
