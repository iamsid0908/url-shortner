import {
  CreateShortUrlReqs,
  CreateShortUrlResp,
  OsDetails,
} from "../interface/urlShortner";
const shortid = require("shortid");
import { IUrl } from "../models/urlShortner";
import { ObjectId, Types } from "mongoose";
import { shortUrlDomain } from "../domain/urlShortner";
import { getOsDetails } from "../utils/constant";
import { IAnalytic } from "../models/analytics";

async function handleCreateShortUrl(
  params: CreateShortUrlReqs
): Promise<CreateShortUrlResp> {
  const shortId = params.customAlias || shortid.generate();

  const useParam: IUrl = {
    shortId,
    topic: params.topic || "activation",
    redirectURL: params.longurl,
    userID: params.userID as Types.ObjectId,
    createdAt: new Date(),
  };
  const data = await shortUrlDomain.handleCreateShortUrl(useParam);
  const response: CreateShortUrlResp = {
    shortUrl: data.shortId,
    createdAt: data.createdAt as Date,
  };
  return response;
}

async function handleRedirectShortUrl(params: string) {
  const data = await shortUrlDomain.handleRedirectShortUrl(params);

  //Geting OS details
  const osDetails = await getOsDetails();

  const useParams: IAnalytic = {
    totalClicks: [Date.now()],
    urlShortnerID: data?.id,
    uniqueClicks: [osDetails?.ip],
    clicksByDate: [
      {
        date: new Date(),
        clickCount: 1,
      },
    ],
    osType: [
      {
        osName: `${osDetails.os}`,
        uniqueClicks: 1,
        uniqueUsers: 1,
      },
    ],
    deviceType: [],
  };

  console.log("Analytics Data:", useParams);

  return data;
}

export const shortUrlService = {
  handleCreateShortUrl,
  handleRedirectShortUrl,
};
