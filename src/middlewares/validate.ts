// src/middlewares/validate.ts
import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validate =
  (schema: z.ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        return res
          .status(400)
          .json({ message: "Validation Error", errors: e.errors });
      }
      next(e);
    }
  };

export default validate;
