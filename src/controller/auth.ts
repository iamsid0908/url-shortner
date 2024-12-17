import { NextFunction, Request, Response } from "express";
import {
  ApiResponse,
  UserLoginReqs,
  UserRegisterReqs,
} from "../interface/auth";
import { authService } from "../service/auth";
import { ObjectId } from "mongoose";

export async function userRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const param: UserRegisterReqs = req.body;
  if (!param.name || !param.email || !param.password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const savedUser = await authService.userRegisterservice(param);
  const response: ApiResponse<{ name: string; email: string }> = {
    message: "User created successfully",
    data: {
      name: savedUser.name,
      email: savedUser.email,
    },
  };

  return res.status(201).json(response);
}

export async function userLoginHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const param: UserLoginReqs = req.body;
  if (!param.email || !param.password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const data = await authService.userLogin(param);
  const response: ApiResponse<{
    id: ObjectId;
    name: string;
    email: string;
    accessToken: string;
  }> = {
    message: "User created successfully",
    data: {
      id: data.id,
      name: data.name,
      email: data.email,
      accessToken: data.accessToken,
    },
  };

  return res.status(201).json(response);
}
