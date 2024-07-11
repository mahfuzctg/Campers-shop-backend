// src/routes/productRoutes.ts
import { Router } from "express";
import * as productController from "../controllers/productController";
import validate from "../middlewares/validate";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/productSchema";

const router = Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(validate(createProductSchema), productController.createProduct);

router
  .route("/:id")
  .put(validate(updateProductSchema), productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
