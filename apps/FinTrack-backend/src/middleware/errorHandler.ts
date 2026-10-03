import type { Request, Response, NextFunction } from "express";
import apiError from "../utils/apiError.ts";
import jwt from "jsonwebtoken";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof apiError) {
    return res.status(err?.statusCode).json({
      success: err?.statusCode >= 200 && err?.statusCode < 300,
      message: err?.message,
      error: err?.errors,
    });
  }
  //  this is the db error
  if (err?.name === "ValidationError") {
    const errors = Object.values(err?.errors || {}).map(
      (el: any) => el?.message,
    );
    return res.status(400).json({
      success: false,
      message: "validation error",
      error: errors,
    });
  }

  if (err instanceof jwt.TokenExpiredError) {
    return res.status(401).json({
      success: false,
      message: "Access token expired hai",
    });
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      message: "Invalid access token",
    });
  }

  //   this is the default error handler for any unhandled errors
  return res.status(500).json({
    success: false,
    message: "internal server error",
    error: [err?.message || "something went wrong"],
  });
};

export default errorHandler;
