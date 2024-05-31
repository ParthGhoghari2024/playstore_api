import { Request, Response } from "express";
// import { User, UserAttributes } from "../models/User";

import User, { IUserAttributes } from "../models/userModel";
import db from "../models";
import { logger } from "../utils/pino";

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

    await db.User.create(newUser);

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
  }
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId: number = req.body.id;
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
export { getAllUserController, createUserController, deleteUserController };
