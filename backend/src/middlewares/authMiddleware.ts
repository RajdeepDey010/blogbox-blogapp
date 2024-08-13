import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/util";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    const token = auth.slice(7);

    try {
      const tokenData = verifyToken(token);
      req.body.tokenData = tokenData;
      next();
    } catch (error) {
      throw new Error("Invalid User");
    }
  } else {
    throw new Error("Invalid token");
  }
};