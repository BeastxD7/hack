import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
      interface Request {
        user: any
      }
    }
  }

const authMiddleware = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
       res.status(401).json({ message: "Unauthorized" });
       return
    }

    try {
      const decoded = jwt.verify(token, "your_secret_key") as { role: string; name: string };
      req.user = decoded;

      if (requiredRole && decoded.role !== requiredRole) {
         res.status(403).json({ message: "Forbidden: Access denied" });
         return
      }

      next(); // Ensure it proceeds to the next route
    } catch (error) {
       res.status(401).json({ message: "Invalid token" });
       return
    }
  };
};

export default authMiddleware;
