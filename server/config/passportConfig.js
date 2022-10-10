import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import * as dotenv from "dotenv";
import { userModel } from "../models/usersModel.js";
import passport from "passport";
dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, done) {
  userModel.findOne({ id: jwt_payload.sub }, function (error, user) {
    if (user) {
      console.log("user in jwtStrategy :>> ", user);
      return done(null, user);
    } else {
      return done(error, false);
    }
  });
});

const passportConfig = () => {
  passport.use(jwtStrategy);
};

export default passportConfig;