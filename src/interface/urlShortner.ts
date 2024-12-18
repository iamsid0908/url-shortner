import { Types } from "mongoose";

export interface CreateShortUrlReqs {
  longurl: string;
  customAlias?: string;
  topic?: string;
  userID?: Types.ObjectId;
}

export interface CreateShortUrlResp {
  shortUrl: string;
  createdAt: Date;
}

export interface OsDetails {
  os: String;
  osarch: string;
  devicetype: string;
  ip: string;
  city: string;
  country: string;
  latitude: string;
  logitude: string;
  timezone: string;
}

export interface RedirectShortUrl {
  shortId: String;
  userID?: Types.ObjectId;
}
