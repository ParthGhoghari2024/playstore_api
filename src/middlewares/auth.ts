import env from "dotenv";
env.config();
import { Request, Response, NextFunction, RequestHandler } from "express";
import { logger } from "../utils/pino";

import passportJwt, { WithSecretOrKey } from "passport-jwt";

// const JwtStrategy = require("passport-jwt").Strategy;
const JwtStrategy = passportJwt.Strategy;

// const ExtractJwt = require("passport-jwt").ExtractJwt;
const ExtractJwt = passportJwt.ExtractJwt;
import { PassportStatic } from "passport";
import { getUserbyId } from "../services/userService";
import User from "../models/userModel";
import { error } from "console";

const getToken = (req: Request): string | null => {
  const token: string | undefined =
    req.body.token ||
    req.cookies.token ||
    req.headers.authorization?.split(" ")[1];

  if (token) {
    return token;
  }
  return null;
};

const opts: Omit<WithSecretOrKey, "secretOrKeyProvider"> = {
  jwtFromRequest: getToken,
  secretOrKey: process.env.TOKEN_SECRET as string,
};

const passportAuth = (passport: PassportStatic): void => {
  passport.use(
    new JwtStrategy(
      opts,
      async (
        payload: { userId: number },
        next: passportJwt.VerifiedCallback
      ) => {
        const userId: number = payload.userId;

        const userData: User | null = await getUserbyId(userId);
        if (!userData || !userData.id) {
          return next(new Error("No User error"), false);
        }

        return next(null, userData);
      }
    )
  );
};

export { passportAuth };
