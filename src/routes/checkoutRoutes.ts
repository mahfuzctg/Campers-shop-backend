// src/routes/checkoutRoutes.ts
import { Router } from "express";
import * as checkoutController from "../controllers/checkoutController";
import validate from "../middlewares/validate";
import { placeOrderSchema } from "../schemas/orderSchema";

const router = Router();

router
  .route("/:userId/place-order")
  .post(validate(placeOrderSchema), checkoutController.placeOrder);

export default router;
