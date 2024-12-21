import { Types } from "mongoose";
import { analyticsDomain } from "../domain/analytics";
import { shortUrlDomain } from "../domain/urlShortner";
import {
  AnalyticInterfaceResp,
  ClicksByDate,
  GetAnayticsByTopicReqs,
  GetAnayticsByTopicResp,
  IdList,
  OsType,
  OverAllAnalyticsResp,
  DeviceType,
} from "../interface/analytics";
import URLModel from "../models/urlShortner";
import AnalyticsModel from "../models/analytics";

async function GetAnyticsofAlias(
  params: string
): Promise<AnalyticInterfaceResp> {
  const urlData = await shortUrlDomain.FindOneByShortID(params);
  if (!urlData) {
    throw new Error("short_id data is not found");
  }

  const data = await analyticsDomain.GetById(urlData);
  if (!data) {
    throw new Error("analytics data is not found");
  }
  const response: AnalyticInterfaceResp = {
    totalClicks: data.totalClicks,
    uniqueClicks: data.uniqueClicks.length,
    urlShortnerID: data.urlShortnerID,
    clicksByDate: data.clicksByDate?.map((item) => ({
      date: item.date,
      clickCount: item.clickCount,
    })),
    osType: data.osType.map((os) => ({
      osName: os.osName,
      uniqueClicks: os.uniqueClicks.length,
      uniqueUsers: os.uniqueUsers.length,
    })),
    deviceType: data.deviceType.map((device) => ({
      deviceName: device.deviceName,
      uniqueClicks: device.uniqueClicks.length,
      uniqueUsers: device.uniqueUsers.length,
    })),
  };

  return response as AnalyticInterfaceResp;
}

async function GetAnayticsByTopic(
  params: GetAnayticsByTopicReqs
): Promise<GetAnayticsByTopicResp> {
  const data = await shortUrlDomain.GetAnayticsByTopic(params);
  const ids: IdList[] = data.map(
    (item: { _id: Types.ObjectId; shortId: string }) => ({
      _id: item._id,
      shortId: item.shortId,
    })
  );

  const results = await analyticsDomain.FindListByIDs(ids);

  let totalclicks = 0;
  let uniqueclicks = 0;
  results.map((item) => {
    totalclicks += item.totalClicks;
    uniqueclicks += item.uniqueClicks.length;
  });

  let response: GetAnayticsByTopicResp = {
    totalClicks: totalclicks,
    uniqueClicks: uniqueclicks,
    clicksByDate: [],
    urls: [],
  };

  const idToShortUrlMap = new Map(
    ids.map((id) => [id._id.toString(), id.shortId])
  );

  results.forEach((item) => {
    const clicksByDate = item.clicksByDate?.map(
      (dateItem: { date?: string; clickCount?: number }) => ({
        date: dateItem.date ? String(dateItem.date) : "Unknown Date",
        totalClicks: dateItem.clickCount ?? 0,
      })
    );
    if (clicksByDate) {
      response.clicksByDate.push(...clicksByDate);
    }
    const shortUrl =
      idToShortUrlMap.get(item.urlShortnerID.toString()) || "Unknown";

    response.urls.push({
      shortUrl,
      totalClicks: item.totalClicks,
      uniqueClicks: item.uniqueClicks.length,
    });
  });

  return response;
}

async function GetOverAllAnalytics(
  userID: Types.ObjectId
): Promise<OverAllAnalyticsResp> {
  const data = await shortUrlDomain.GetUrlListByYUserId(userID);
  const ids: IdList[] = data.map((item: { _id: Types.ObjectId }) => ({
    _id: item._id,
  }));
  const results = await analyticsDomain.FindListByIDs(ids);
  let totalclicks = 0;
  let uniqueclicks = 0;
  results.map((item) => {
    totalclicks += item.totalClicks;
    uniqueclicks += item.uniqueClicks.length;
  });

  // Creating reponse
  const response: OverAllAnalyticsResp = {
    totalUrls: ids.length,
    totalClicks: totalclicks,
    uniqueClicks: uniqueclicks,
    clicksByDate: [] as ClicksByDate[],
    osType: [] as OsType[],
    deviceType: [] as DeviceType[],
  };

  results.forEach((item) => {
    const clicksByDate = item.clicksByDate?.map(
      (dateItem: { date?: string; clickCount?: number }) => ({
        date: dateItem.date ? String(dateItem.date) : "Unknown Date",
        totalClicks: dateItem.clickCount ?? 0,
      })
    );
    if (clicksByDate) {
      response.clicksByDate.push(...clicksByDate);
    }

    const osTypes = item.osType?.map((osItem: any) => ({
      osName: osItem.osName,
      uniqueClicks: osItem.uniqueClicks.length,
      uniqueUsers: osItem.uniqueUsers.length,
    }));
    if (osTypes) {
      response.osType.push(...osTypes);
    }

    const deviceTypes = item.deviceType?.map((deviceItem: any) => ({
      deviceName: deviceItem.deviceName,
      uniqueClicks: deviceItem.uniqueClicks.length,
      uniqueUsers: deviceItem.uniqueUsers.length,
    }));
    if (deviceTypes) {
      response.deviceType.push(...deviceTypes);
    }
  });

  // Adding same date,Os and Ostype
  response.clicksByDate = response.clicksByDate.reduce(
    (acc: ClicksByDate[], item) => {
      const existing = acc.find((entry) => entry.date === item.date);
      if (existing) {
        existing.totalClicks += item.totalClicks;
      } else {
        acc.push(item);
      }
      return acc;
    },
    []
  );

  response.osType = response.osType.reduce((acc: OsType[], item) => {
    const existing = acc.find((entry) => entry.osName === item.osName);
    if (existing) {
      existing.uniqueClicks += item.uniqueClicks;
      existing.uniqueUsers += item.uniqueUsers;
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  response.deviceType = response.deviceType.reduce(
    (acc: DeviceType[], item) => {
      const existing = acc.find(
        (entry) => entry.deviceName === item.deviceName
      );
      if (existing) {
        existing.uniqueClicks += item.uniqueClicks;
        existing.uniqueUsers += item.uniqueUsers;
      } else {
        acc.push(item);
      }
      return acc;
    },
    []
  );

  return response;
}

export const analyticService = {
  GetAnyticsofAlias,
  GetAnayticsByTopic,
  GetOverAllAnalytics,
};
