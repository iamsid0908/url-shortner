import mongoose, { Schema, Document, Types } from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

export interface IAnalytic {
  _id?: Types.ObjectId;
  totalClicks: number[];
  uniqueClicks: string[];
  urlShortnerID: Types.ObjectId;
  clicksByDate: {
    date: Date;
    clickCount: number;
  }[];
  osType: {
    osName: string;
    uniqueClicks: number;
    uniqueUsers: number;
  }[];
  deviceType?: {
    deviceName?: string;
    uniqueClicks?: number;
    uniqueUsers?: number;
  }[];
}

const AnalyticSchema: Schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  totalClicks: {
    type: [Number],
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
      date: { type: Date, required: true },
      clickCount: { type: Number, required: true },
    },
  ],
  osType: [
    {
      osName: { type: String, required: true },
      uniqueClicks: { type: Number, required: true },
      uniqueUsers: { type: Number, required: true },
    },
  ],
  deviceType: [
    {
      deviceName: { type: String },
      uniqueClicks: { type: Number },
      uniqueUsers: { type: Number },
    },
  ],
});

const AnalyticsModel = mongoose.model<IAnalytic>("Analytics", AnalyticSchema);
export default AnalyticsModel;
