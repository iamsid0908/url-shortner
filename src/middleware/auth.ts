import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import { NextFunction, Request, Response } from "express";

export interface AuthRequest extends Request {
  user?: IUser;
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const payload: any = jwt.verify(token, `${process.env.SECRET_KEY}`);

      const user = await User.findById(payload.id);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (err) {
      return res
        .status(403)
        .send({ message: "Access denied, User not authenticated" });
    }
  } else {
    return res.status(404).send({ message: "JWT not passed" });
  }
};

export default verifyToken;
