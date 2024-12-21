import { NextFunction, Request, response, Response } from "express";
import os from "os";
import { OsDetails } from "../interface/urlShortner";
import { UAParser } from "ua-parser-js";

export async function getOsDetails(): Promise<OsDetails> {
  const parser = new UAParser();
  const result = parser.getResult();
  const devicetype = result.device || "Laptop";

  const response = await fetch("https://ipapi.co/json/");
  // if (!response.ok) {
  //   throw new Error(`HTTP error! Status: ${response.status}`);
  // }
  const data = await response.json();
  const details: OsDetails = {
    os: os.type(),
    osarch: os.arch(),
    devicetype: "Laptop",
    ip: data.ip || " 2401:4900:3b37:bdc4:921:3ee9:cd36:19e6",
    city: data.city || "Bangalore",
    country: data.country_name || "India",
    latitude: data.latitude || "25.6005",
    logitude: data.longitude || "85.1147",
    timezone: data.timezone || "Asia/Mumbai",
  };
  return details;
}
