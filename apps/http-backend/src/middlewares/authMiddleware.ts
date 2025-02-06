import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
      interface Request {
        userId?: string;
      }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];

    if(!token) {
        res.json({
            message: "Token couldn`t be obtained"
        })
        return;
    }

    const decoded = jwt.verify(token, "jwtSecret") as JwtPayload; 

    if(!decoded) {
        res.json({
            message: "Unauthorized Ascess"
        })
    }

    req.userId = decoded.userId;
    next();
}