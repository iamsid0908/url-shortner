import {
  ClicksByDate,
  DeviceType,
  IdList,
  OsType,
} from "../interface/analytics";
import { CreateShortUrlReqs, RedirectShortUrl } from "../interface/urlShortner";
import AnalyticsModel, { IAnalytic } from "../models/analytics";
import { IUrl } from "../models/urlShortner";

async function FindOne(params: IAnalytic) {
  const existingDoc = await AnalyticsModel.findOne({
    urlShortnerID: params.urlShortnerID,
  });
  return existingDoc;
}

async function Insert(params: IAnalytic) {
  const newDoc = new AnalyticsModel(params);
  return await newDoc.save();
}

//updating os type
async function UpdateOS(params: IAnalytic, existingDoc: any) {
  const updatedOsTypes = params.osType.map((incomingOs) => {
    const existingOs = existingDoc.osType.find(
      (os: OsType) => os.osName === incomingOs.osName
    );
    if (existingOs) {
      if (!existingOs.uniqueClicks.includes(incomingOs.uniqueClicks[0])) {
        existingOs.uniqueClicks.push(incomingOs.uniqueClicks[0]);
      }
      if (!existingOs.uniqueUsers.includes(incomingOs.uniqueUsers[0])) {
        existingOs.uniqueUsers.push(incomingOs.uniqueUsers[0]);
      }
    } else {
      existingDoc.osType.push(incomingOs);
    }
    return existingOs || incomingOs;
  });

  //Updating device type
  const updatedDeviceTypes = params.deviceType.map((incomingOs) => {
    const existingOs = existingDoc.deviceType.find(
      (device: DeviceType) => device.deviceName === incomingOs.deviceName
    );
    if (existingOs) {
      if (!existingOs.uniqueClicks.includes(incomingOs.uniqueClicks[0])) {
        existingOs.uniqueClicks.push(incomingOs.uniqueClicks[0]);
      }
      if (!existingOs.uniqueUsers.includes(incomingOs.uniqueUsers[0])) {
        existingOs.uniqueUsers.push(incomingOs.uniqueUsers[0]);
      }
    } else {
      existingDoc.deviceType.push(incomingOs);
    }
    return existingOs || incomingOs;
  });

  //Updating by date
  const updateClickByDate = params.clicksByDate?.map((incomingDate) => {
    const existingDate = existingDoc.clicksByDate.find(
      (clickDate: ClicksByDate) => clickDate.date === incomingDate.date
    );
    if (existingDate) {
      if (incomingDate.clickCount !== undefined) {
        existingDate.clickCount += incomingDate.clickCount;
      }
    } else {
      existingDoc.data.push(incomingDate);
    }
    return existingDate || incomingDate;
  });

  existingDoc.totalClicks += params.totalClicks;
  params.uniqueClicks.forEach((click) => {
    if (!existingDoc.uniqueClicks.includes(click)) {
      existingDoc.uniqueClicks.push(click);
    }
  });
  existingDoc.clicksByDate = params.clicksByDate;
  await existingDoc.save();
}

async function GetById(params: IUrl): Promise<IAnalytic> {
  const data = await AnalyticsModel.findOne({ urlShortnerID: params._id });
  if (!data) {
    throw new Error("URL not found");
  }

  return data as IAnalytic;
}

async function FindListByIDs(ids: IdList[]): Promise<IAnalytic[]> {
  const idValues = ids.map((id) => id._id);
  const results = await AnalyticsModel.find({
    urlShortnerID: { $in: idValues },
  });
  return results as IAnalytic[];
}
export const analyticsDomain = {
  FindOne,
  UpdateOS,
  Insert,
  GetById,
  FindListByIDs,
};
