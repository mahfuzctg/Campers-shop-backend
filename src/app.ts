// src/app.ts
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorhandler";
import notFound from "./middlewares/notFound";
import router from "./route";

const app: Application = express();

// Parsers
app.use(express.json());
// app.use(cookieParser());

// CORS
app.use(cors({}));

// Application routes
app.use("/api", router);

//
const categories = [
  {
    id: "1",
    name: "Backpacks",
    imageUrl:
      "https://i.pinimg.com/736x/91/6b/65/916b65a26ae1dc6ac6b38f5ab466a494.jpg",
  },
  {
    id: "2",
    name: "Shoes",
    imageUrl:
      "https://i.pinimg.com/736x/91/6b/65/916b65a26ae1dc6ac6b38f5ab466a494.jpg",
  },
  {
    id: "1",
    name: "Backpacks",
    imageUrl:
      "https://i.pinimg.com/736x/91/6b/65/916b65a26ae1dc6ac6b38f5ab466a494.jpg",
  },
  {
    id: "2",
    name: "Shoes",
    imageUrl:
      "https://i.pinimg.com/736x/91/6b/65/916b65a26ae1dc6ac6b38f5ab466a494.jpg",
  },
  {
    id: "1",
    name: "Backpacks",
    imageUrl:
      "https://i.pinimg.com/736x/91/6b/65/916b65a26ae1dc6ac6b38f5ab466a494.jpg",
  },
  {
    id: "2",
    name: "Shoes",
    imageUrl:
      "https://i.pinimg.com/736x/91/6b/65/916b65a26ae1dc6ac6b38f5ab466a494.jpg",
  },
  // Add more categories as needed
];

// Define the route
app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome back to the server!");
});

// Error handling middlewares
app.use(globalErrorHandler);
app.use(notFound);

export default app;
