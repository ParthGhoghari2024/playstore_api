import { Request, Response } from "express";
// import { User, UserAttributes } from "../models/User";

import User, { IUserAttributes } from "../models/userModel";
import db from "../models";
import { logger } from "../utils/pino";
import { INameEmail } from "../types/interface";
import {
  deleteUser,
  getAllUser,
  getUserIdIfExists,
  insertUser,
} from "../services/userService";

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
    const users: User[] | undefined = await getAllUser();

    if (users) res.json({ success: 1, result: users });
    else res.json({ success: 0 });
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
    let { name, email }: INameEmail = req.body;
    name = name.trim();
    email = email.trim();
    const roleId: number = 1; //TODO:
    const newUser: IUserAttributes = {
      name: name,
      email: email,
      roleId: roleId,
    };

    const insertResult: User | undefined = await insertUser(newUser);

    if (insertResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
  }
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId: number = Number(req.body.id);
    if (!userId || isNaN(userId)) {
      res.json({ success: 0, error: "Invalid user id" });
      return;
    }
    const findRes: User | null = await getUserIdIfExists(userId);

    if (!findRes) {
      res.json({ success: 0, error: "No user to delete" });
      return;
    }
    const deleteResult = await deleteUser(userId);

    if (deleteResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
  }
};
export { getAllUserController, createUserController, deleteUserController };
