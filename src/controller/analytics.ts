import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { ApiResponse } from "../interface/auth";
import { analyticService } from "../service/analytics";
import { GetAnayticsByTopicReqs } from "../interface/analytics";

export async function GetAnyticsofAlias(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const param: string = req.params.shortId;
  if (!param) {
    return res.status(400).json({ message: "ShortID is required" });
  }
  const data = await analyticService.GetAnyticsofAlias(param);

  const response: ApiResponse<{}> = {
    message: "Success",
    data: data,
  };

  return res.status(201).json(response);
}

export async function GetAnayticsByTopic(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const topic = req.params.topic;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(403).json({ message: "Unauthorized: User not found" });
  }

  if (!topic || typeof topic !== "string") {
    return res.status(400).json({ message: "Invalid or missing topic" });
  }

  const useParam: GetAnayticsByTopicReqs = {
    topic,
    userID: userId,
  };
  const data = await analyticService.GetAnayticsByTopic(useParam);

  const response: ApiResponse<{}> = {
    message: "Success",
    data: data,
  };

  return res.status(201).json(response);
}

export async function GetOverAllAnalytics(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(403).json({ message: "Unauthorized: User not found" });
  }
  const data = await analyticService.GetOverAllAnalytics(userId);

  const response: ApiResponse<{}> = {
    message: "Success",
    data: data,
  };

  return res.status(201).json(response);
}
