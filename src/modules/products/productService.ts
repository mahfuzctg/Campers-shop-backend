import { IProduct } from "./productInterface";
import Product from "./productModel";

export const getProducts = async (): Promise<IProduct[]> => {
  return await Product.find();
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id);
};

export const createProduct = async (
  productData: IProduct
): Promise<IProduct> => {
  const product = new Product(productData);
  return await product.save();
};

export const updateProduct = async (
  id: string,
  updateData: Partial<IProduct>
): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findByIdAndRemove(id);
};
