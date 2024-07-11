// import { Request, Response } from "express";

// import catchAsync from "../../utils/catchAsync";
// import * as productService from "../products/productService";

// export const getProducts = catchAsync(async (req: Request, res: Response) => {
//   const products = await productService.getProducts();
//   res.json(products);
// });

// export const getProductById = catchAsync(
//   async (req: Request, res: Response) => {
//     const product = await productService.getProductById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ msg: "Product not found" });
//     }
//     res.json(product);
//   }
// );

// export const createProduct = catchAsync(async (req: Request, res: Response) => {
//   const product = await productService.createProduct(req.body);
//   res.status(201).json(product);
// });

// export const updateProduct = catchAsync(async (req: Request, res: Response) => {
//   const product = await productService.updateProduct(req.params.id, req.body);
//   if (!product) {
//     return res.status(404).json({ msg: "Product not found" });
//   }
//   res.json(product);
// });

// export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
//   const product = await productService.deleteProduct(req.params.id);
//   if (!product) {
//     return res.status(404).json({ msg: "Product not found" });
//   }
//   res.json({ msg: "Product removed" });
// });
