// src/routes/cartRoutes.ts
import { Router } from "express";
import * as cartController from "../controllers/cartController";
import validate from "../middlewares/validate";
import { addToCartSchema, updateCartSchema } from "../schemas/cartSchema";

const router = Router();

router.route("/:userId").get(cartController.getCart);

router
  .route("/:userId/add")
  .post(validate(addToCartSchema), cartController.addToCart);

router
  .route("/:userId/update")
  .put(validate(updateCartSchema), cartController.updateCart);

router.route("/:userId/remove").delete(cartController.removeFromCart);

export default router;
