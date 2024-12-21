import { Types } from "mongoose";
import { GetAnayticsByTopicReqs } from "../interface/analytics";
import { RedirectShortUrl } from "../interface/urlShortner";
import URLModel, { IUrl } from "../models/urlShortner";

async function handleCreateShortUrl(params: IUrl) {
  const data = await URLModel.create({
    shortId: params.shortId,
    topic: params.topic,
    redirectURL: params.redirectURL,
    userID: params.userID,
    createdAt: params.createdAt || new Date(),
  });
  return data;
}

async function handleRedirectShortUrl(params: string) {
  const data = await URLModel.findOne({ shortId: params });
  return data;
}

async function FindOneByShortID(params: string): Promise<IUrl> {
  const existingDoc = await URLModel.findOne({
    shortId: params,
  });

  if (!existingDoc) {
    throw new Error("short_id doc not found");
  }

  return existingDoc as IUrl;
}

async function GetAnayticsByTopic(params: GetAnayticsByTopicReqs) {
  if (typeof params.topic !== "string") {
    console.error("Topic is not a string:", params.topic);
    throw new Error(`Invalid topic: ${JSON.stringify(params.topic)}`);
  }

  const topic = params.topic;
  const userID = params.userID;

  const results = await URLModel.find({ topic, userID }).lean();
  return results;
}

async function GetUrlListByYUserId(userID: Types.ObjectId) {
  const results = await URLModel.find({ userID }).lean();
  return results;
}

export const shortUrlDomain = {
  handleCreateShortUrl,
  handleRedirectShortUrl,
  FindOneByShortID,
  GetAnayticsByTopic,
  GetUrlListByYUserId,
};
