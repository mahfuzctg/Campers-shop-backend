// src/routes/index.ts
import { Router } from "express";
import cartRoutes from "../routes/cartRoutes";
import checkoutRoutes from "../routes/checkoutRoutes";
import productRoutes from "../routes/productRoutes";

const router = Router();

const moduleRoutes = [
  {
    path: "/products",
    route: productRoutes,
  },
  {
    path: "/cart",
    route: cartRoutes,
  },
  {
    path: "/checkout",
    route: checkoutRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
