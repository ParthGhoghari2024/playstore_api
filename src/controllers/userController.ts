import { Request, Response } from "express";
// import { User, UserAttributes } from "../models/User";

import { logger } from "../utils/pino";
import { IUser } from "../types/user";
import User, { IUserAttributes } from "../models/userModel";
import { InferAttributes } from "sequelize";
import db from "../models";

interface IError extends Error {
  parent: {
    sqlMessage: string;
  };
}

const getAllUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users: User[] = await User.findAll({
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
      raw: true,
    });

    res.json({ success: 1, result: users });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const IErrorInstance = error as IError;
      if (error.name === "SequelizeDatabaseError") {
        console.log(IErrorInstance.parent.sqlMessage);
      }
    }
  }
};

const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const roleId: number = 1;
    const newUser: IUserAttributes = {
      name: req.body.name,
      email: req.body.email,
      roleId: roleId,
    };

    await User.create(newUser);

    res.json({ success: 1 });
  } catch (error) {
    console.log(error);
  }
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId: number = req.body.userId;
    await User.destroy({
      where: {
        id: userId,
      },
    });

    res.json({ success: 1 });
  } catch (error) {
    console.log(error);
  }
};
export { getAllUserController, createUserController, deleteUserController };
