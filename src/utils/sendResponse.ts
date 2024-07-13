import { Response } from "express";

const sendResponse = (res: Response, statusCode: number, data: unknown) => {
  res.status(statusCode).json({
    status: "success",
    data,
  });
};

export default sendResponse;
