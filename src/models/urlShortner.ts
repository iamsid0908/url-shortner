import mongoose, { Schema, Model, isValidObjectId } from "mongoose";
import { Types } from "mongoose";

export interface IUrl {
  _id?: Types.ObjectId;
  shortId: string;
  topic: string;
  redirectURL: string;
  userID: Types.ObjectId;
  createdAt?: Date;
}
const UrlSchema: Schema<IUrl> = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    topic: {
      type: String,
      required: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const URLModel: Model<IUrl> = mongoose.model<IUrl>("url", UrlSchema);
export default URLModel;
