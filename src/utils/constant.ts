import { NextFunction, Request, response, Response } from "express";
import os from "os";
import { OsDetails } from "../interface/urlShortner";
import { UAParser } from "ua-parser-js";

export async function getOsDetails(): Promise<OsDetails> {
  const parser = new UAParser();
  const result = parser.getResult();
  const devicetype = result.device || "desktop";

  const response = await fetch("https://ipapi.co/json/");
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  const details: OsDetails = {
    os: os.type(),
    osarch: os.arch(),
    devicetype: "devicetype",
    ip: data.ip,
    city: data.city,
    country: data.country_name,
    latitude: data.latitude,
    logitude: data.longitude,
    timezone: data.timezone,
  };
  console.log(details);
  return details;
}
