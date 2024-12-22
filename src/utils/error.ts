import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth";

export const handleError =
  (
    func: (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req as AuthRequest, res, next)).catch((err) =>
      next(err)
    );
  };
