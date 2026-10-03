import { JwtPayload } from "../types/JwtPayload"; // your type

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};