import type { Request, Response, NextFunction } from "express";
import apiError from "../utils/apiError.ts";
import asyncHandler from "../utils/asyncHandler.ts";
import { prisma } from "../lib/prisma.ts";
import jwt from "jsonwebtoken";
const userAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      throw new apiError(401, "Token not found");
    }
    // Log the decoded token for debugging
    const decoded = jwt.verify(token, process.env.JWT_SECRETE as string) as {
      id: string;
    };


    if (!decoded || !decoded.id) {
      throw new apiError(401, "Invalid token");
    } 

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      throw new apiError(401, "access denied, user not found");
    }
    req.user = decoded;
    next();
  },
);

export default userAuth;
