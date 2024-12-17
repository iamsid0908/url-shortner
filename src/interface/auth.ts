import { ObjectId } from "mongoose";

export interface UserRegisterReqs {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface UserResponseparam {
  name: string;
  email: string;
}

export interface UserLoginReqs {
  email: string;
  password: string;
}
export interface UserLoginResp {
  id: ObjectId;
  name: string;
  email: string;
  accessToken: string;
}
