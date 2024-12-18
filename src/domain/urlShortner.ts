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

export const shortUrlDomain = {
  handleCreateShortUrl,
  handleRedirectShortUrl,
};
