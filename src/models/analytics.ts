import mongoose, { Schema, Document, Types } from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

export interface IAnalytic {
  _id?: Types.ObjectId;
  totalClicks: number;
  uniqueClicks: string[];
  urlShortnerID: Types.ObjectId;
  clicksByDate?: {
    date?: string;
    clickCount?: number;
  }[];
  osType: {
    osName: string;
    uniqueClicks: string[];
    uniqueUsers: string[];
  }[];
  deviceType: {
    deviceName: string;
    uniqueClicks: string[];
    uniqueUsers: string[];
  }[];
}

const AnalyticSchema: Schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  totalClicks: {
    type: Number,
    required: true,
  },
  uniqueClicks: {
    type: [String],
    required: true,
  },
  urlShortnerID: {
    type: Schema.Types.ObjectId,
    ref: "url",
    required: true,
  },
  clicksByDate: [
    {
      date: { type: String },
      clickCount: { type: Number },
    },
  ],
  osType: [
    {
      osName: { type: String, required: true },
      uniqueClicks: { type: [String], required: true },
      uniqueUsers: { type: [String], required: true },
    },
  ],
  deviceType: [
    {
      deviceName: { type: String },
      uniqueClicks: { type: [String] },
      uniqueUsers: { type: [String] },
    },
  ],
});

const AnalyticsModel = mongoose.model<IAnalytic>("Analytics", AnalyticSchema);
export default AnalyticsModel;
