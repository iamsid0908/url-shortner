import {
  UserLoginReqs,
  UserRegisterReqs,
  UserResponseparam,
} from "../interface/auth";
import User from "../models/user";

async function userRegisterDomain(param: UserRegisterReqs) {
  const user = new User({
    name: param.name,
    email: param.email,
    password: param.password,
  });

  const savedUser = await user.save();
  return savedUser;
}

async function userLogin(param: UserLoginReqs) {
  const user = User.findOne({ email: param.email });
  return user;
}
export const authDomain = {
  userRegisterDomain,
  userLogin,
};
