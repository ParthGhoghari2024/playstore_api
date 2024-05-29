import { Request, Response } from "express";
import { logger } from "../utils/pino";
import db from "../models";
import { IPermissionReqBody } from "../types/permission";
import { IPermissionAttributes } from "../models/permissionModel";

const getAllPermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allPermissions = await db.PermissionModel.findAll({
      attributes: ["name", "versionId", "description"],
    });

    res.json({ success: 1, result: allPermissions });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const createPermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, versionId, description }: IPermissionReqBody = req.body;

    const newPermission: IPermissionAttributes = {
      name: name,
      versionId: versionId,
      description: description,
    };

    await db.PermissionModel.create(newPermission);

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

export { createPermissionController, getAllPermissionController };
