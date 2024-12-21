import { Types } from "mongoose";

export interface AnalyticInterfaceResp {
  _id?: Types.ObjectId;
  totalClicks: number;
  uniqueClicks: number;
  urlShortnerID: Types.ObjectId;
  clicksByDate?: {
    date?: string;
    clickCount?: number;
  }[];
  osType: {
    osName: string;
    uniqueClicks: number;
    uniqueUsers: number;
  }[];
  deviceType: {
    deviceName: string;
    uniqueClicks: number;
    uniqueUsers: number;
  }[];
}

export interface GetAnayticsByTopicReqs {
  topic: string;
  userID?: Types.ObjectId;
}

export interface GetAnayticsByTopicResp {
  totalClicks: number;
  uniqueClicks: number;
  clicksByDate: {
    date: string;
    totalClicks: number;
  }[];
  urls: {
    shortUrl: string;
    totalClicks: number;
    uniqueClicks: number;
  }[];
}

export interface IdList {
  _id: Types.ObjectId;
  shortId?: string;
}

export interface OverAllAnalyticsResp {
  totalUrls: number;
  totalClicks: number;
  uniqueClicks: number;
  clicksByDate: {
    date: string;
    totalClicks: number;
  }[];
  osType: {
    osName: string;
    uniqueClicks: number;
    uniqueUsers: number;
  }[];
  deviceType: {
    deviceName: string;
    uniqueClicks: number;
    uniqueUsers: number;
  }[];
}

export interface ClicksByDate {
  date: string;
  totalClicks: number;
}

export interface OsType {
  osName: string;
  uniqueClicks: number;
  uniqueUsers: number;
}

export interface DeviceType {
  deviceName: string;
  uniqueClicks: number;
  uniqueUsers: number;
}
