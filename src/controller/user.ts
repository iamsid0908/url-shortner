import User from "../models/user";
import express, { NextFunction, Request, Response } from "express";

export async function getAllUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const users = await User.find({});
  return res.status(200).json({ users });
}
