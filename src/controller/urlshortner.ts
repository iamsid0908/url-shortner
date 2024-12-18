import { Request, Response, NextFunction } from "express";
import { CreateShortUrlReqs } from "../interface/urlShortner";
import { ApiResponse } from "../interface/auth";
import { shortUrlService } from "../service/urlShortner";
import { AuthRequest } from "../middleware/auth";
import { stringify } from "querystring";

export async function handleCreateShortUrl(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const param: CreateShortUrlReqs = req.body;
  if (!param.longurl) {
    return res.status(400).json({ message: "Long Url is required" });
  }
  const userId = req.user?._id;

  if (!userId) {
    return res.status(403).json({ message: "Unauthorized: User not found" });
  }
  const data = await shortUrlService.handleCreateShortUrl({
    ...param,
    userID: userId,
  });

  const response: ApiResponse<{}> = {
    message: "Success",
    data: data,
  };

  return res.status(201).json(response);
}

export async function handleRedirectShortUrl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const param: string = req.params.shortId;

  const data = await shortUrlService.handleRedirectShortUrl(param);
  if (typeof data?.redirectURL === "string") {
    return res.redirect(data.redirectURL);
  }
}
