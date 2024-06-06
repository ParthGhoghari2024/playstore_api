import { Request, Response } from "express";
import {
  ICreateUserBody,
  IEmailPassword,
  IJwtPayload,
  ILoginRes,
} from "../types/interface";
import {
  getUserDataWithPasswordByEmail,
  insertUser,
} from "../services/userService";
import jwt from "jsonwebtoken";
import { logger } from "../utils/pino";
import bcrypt from "bcrypt";
import User, { IUserAttributes } from "../models/userModel";
import { getCounryIdIfExists } from "../services/countryServices";

const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: IEmailPassword = req.body;

    const userData: User | null = await getUserDataWithPasswordByEmail(email!);

    if (!userData || !userData.id) {
      res.json({
        success: 0,
        message: "email and password not match",
      });
      return;
    }
    const hashedpassword: string = userData.password;

    const match: boolean = await bcrypt.compare(password, hashedpassword);

    if (!match) {
      res.json({
        success: 0,
        message: "email and password not match",
      });
      return;
    }

    const TOKEN_SECRET: string = process.env.TOKEN_SECRET as string;

    const payload: IJwtPayload = {
      userId: userData.id,
      email: userData.email,
      name: userData.name,
      roleId: userData.roleId,
    };
    const token: string = jwt.sign(payload, TOKEN_SECRET);

    const location: string = "/home";
    const resObj: ILoginRes = {
      name: userData.name,
      email: userData.email,
      token: token,
      redirectLocation: location,
    };
    res
      .cookie("token", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({ success: 1, result: resObj });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, country }: ICreateUserBody = req.body;

    const emailExists = await getUserDataWithPasswordByEmail(email);

    if (emailExists && emailExists.id) {
      res.json({ success: 0, error: "Duplicate email", duplicateEmail: 1 });
      return;
    }

    const SALT: number = Number(process.env.SALT);
    const hashedpassword = bcrypt.hashSync(password, SALT);

    const roleId: number = 1;
    let countryId: number | undefined = 1;
    if (country) {
      countryId = await getCounryIdIfExists(country!);

      if (country && !countryId) {
        res.json({ success: 0, erorr: "No country found ", countryError: 1 });
        return;
      }
    }

    const newUser: IUserAttributes = {
      roleId,
      name,
      email,
      password: hashedpassword,
      countryId,
    };

    const insertResult: User | undefined = await insertUser(newUser);

    if (insertResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

export { loginController, registerController };
