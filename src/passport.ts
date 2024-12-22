// import User, { IUser } from "./models/user";

// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth2").Strategy;

// passport.serializeUser((user: any, done: any) => {
//   done(null, user);
// });
// passport.deserializeUser(function (user: any, done: any) {
//   done(null, user);
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID, // Your Credentials here.
//       clientSecret: process.env.CLIENT_SECRET, // Your Credentials here.
//       callbackURL: "http://localhost:3000/auth/google/callback",
//       passReqToCallback: true,
//     },
//     function (
//       request: any,
//       accessToken: any,
//       refreshToken: any,
//       profile: any,
//       done: any
//     ) {
//       return done(null, profile);
//     }
//   )
// );

// passport.serializeUser((user: IUser, done: (err: any, id?: string) => void) => {
//   done(null, user._id.toString());
// });

// passport.deserializeUser(
//   async (id: string, done: (err: any, user?: IUser | null) => void) => {
//     try {
//       const user = await User.findById(id);
//       done(null, user);
//     } catch (err) {
//       done(err, null);
//     }
//   }
// );
