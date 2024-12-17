import { authDomain } from "../domain/auth";
import {
  UserLoginReqs,
  UserLoginResp,
  UserRegisterReqs,
  UserResponseparam,
} from "../interface/auth";
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";

async function userRegisterservice(
  param: UserRegisterReqs
): Promise<UserResponseparam> {
  param.password = bcrypt.hashSync(param.password, 10);
  const data = await authDomain.userRegisterDomain(param);
  return {
    name: data.name,
    email: data.email,
  };
}

async function userLogin(param: UserLoginReqs): Promise<UserLoginResp> {
  const user = await authDomain.userLogin(param);
  if (!user) {
    throw new Error("User not found");
  }
  var isPasswordValid = bcrypt.compareSync(param.password, user?.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const payload = {
    id: user?._id,
  };
  var accessToken = jwt.sign(
    payload,
    process.env.SECRET_KEY || "default_secret_key",
    {
      expiresIn: 86400,
    }
  );

  return {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    accessToken: accessToken,
  };
}

export const authService = {
  userRegisterservice,
  userLogin,
};
