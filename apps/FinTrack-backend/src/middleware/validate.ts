import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";

const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.participents === "string") {
      req.body.participents = JSON.parse(req.body.participents);
    }
    if (typeof req.body.amount === "string") {
      req.body.amount = Number(req.body.amount);
    }
    const result = schema.safeParse(req.body);
    if (!result.success) {
      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        });
      }
    }
    next();
  };

export default validate;
