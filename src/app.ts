import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";

import globalErrorHandler from "./middlewares/globalErrorhandler";
import notFound from "./middlewares/notFound";
import Order from "./models/OrderModel";
import Product from "./models/ProductModel";

// Initialize application
const app: Application = express();
dotenv.config();

// Parsers
app.use(express.json());

// CORS configuration
app.use(cors());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome back to the server!");
});

app.post("/products", async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await Product.create(product);
    res.json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the product.",
    });
  }
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await Product.find();
    res.json({
      success: true,
      message: "Products retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving products.",
    });
  }
});

app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const result = await Product.findById(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
    res.json({
      success: true,
      message: "Product retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the product.",
    });
  }
});

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const productData = req.body;
    const result = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
    res.json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the product.",
    });
  }
});

app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
    res.json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product.",
    });
  }
});

app.post("/orders", async (req: Request, res: Response) => {
  try {
    const paymentData = req.body;
    const result = await Order.create(paymentData);
    res.json({
      success: true,
      message: "Order successful!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the order.",
    });
  }
});

app.put("/products", async (req: Request, res: Response) => {
  try {
    const updatedProductData = req.body;

    const updatedResults = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updatedProductData.map(async (product: any) => {
        const existingProduct = await Product.findById(product._id);

        if (!existingProduct) {
          return null;
        }

        existingProduct.quantity -= product.quantity;

        if (existingProduct.quantity <= 0) {
          existingProduct.stock = false;
        }

        return await existingProduct.save();
      })
    );

    res.json({
      success: true,
      message: "Products quantity updated successfully!",
      data: updatedResults,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating product quantities.",
    });
  }
});

// Error handling middlewares
app.use(globalErrorHandler);
app.use(notFound);

export default app;
