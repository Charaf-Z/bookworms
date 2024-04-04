import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import { UserModel } from "../models";
import dotenv from "dotenv";
import { Request } from "express";

dotenv.config();

// passport.use(
//   "local",
//   new LocalStrategy(
//     { usernameField: "email" },
//     async (email, password, done) => {
//       try {
//         const user = await UserModel.findOne({ email });
//         if (!user) return done(null, false);
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) return done(null, false);
//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     },
//   ),
// );

const cookieExtractor = (req: Request) => {
  if (req && req.cookies) return req.cookies["api-auth"];
  return null;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.SECRETKEY as string,
      passReqToCallback: true,
    },
    async (req, jwtPayload, done) => {
      try {
        const user = await UserModel.findById(jwtPayload.id);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);
