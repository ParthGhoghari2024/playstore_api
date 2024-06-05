import { Request, Response } from "express";
import { IEmailPassword, IJwtPayload, ILoginRes } from "../types/interface";
import { getUserDataWithPasswordByEmail } from "../services/userService";
import jwt from "jsonwebtoken";
import { logger } from "../utils/pino";
import bcrypt from "bcrypt";
import User from "../models/userModel";

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
    logger.fatal(error);
    res.json({ success: 0 });
  }
};

export { loginController };
