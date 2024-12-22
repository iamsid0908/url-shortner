import mongoose, { Schema, Model, Types } from "mongoose";
const bcrypt = require("bcrypt");

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  googleId?: string;
}

const UserSchema: Schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    require: [true, "Please enter your name"],
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  creatdAt: {
    type: Date,
    default: Date.now,
  },
});
UserSchema.statics.findOrCreate = async function (condition: Partial<IUser>) {
  let user = await this.findOne(condition);
  if (!user) {
    user = await this.create(condition);
  }
  return user;
};

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
