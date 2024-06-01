import { Request, Response } from "express";
// import { User, UserAttributes } from "../models/User";

import User, { IUserAttributes } from "../models/userModel";
import db from "../models";
import { logger } from "../utils/pino";
import { INameEmail } from "../types/interface";

interface IError extends Error {
  parent: {
    sqlMessage: string;
  };
}

const getAllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await db.User.findAll({
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
      raw: true,
    });

    res.json({ success: 1, result: users });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const IErrorInstance = error as IError;
      if (error.name === "SequelizeDatabaseError") {
        logger.error(IErrorInstance.parent.sqlMessage);
      }
    }
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    let { name, email }: INameEmail = req.body;
    name = name.trim();
    email = email.trim();
    const roleId: number = 1;
    const newUser: IUserAttributes = {
      name: name,
      email: email,
      roleId: roleId,
    };

    await db.User.create(newUser);

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: number = req.body.id;

    const findRes: User | null = await db.User.findOne({
      where: {
        id: userId,
      },
      attributes: ["id"],
    });

    if (!findRes) {
      res.json({ success: 0, error: "No user to delete" });
      return;
    }
    await db.User.destroy({
      where: {
        id: userId,
      },
    });

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
  }
};
export { getAllUser, createUser, deleteUser };
