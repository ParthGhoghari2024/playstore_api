import { Request, Response } from "express";
import { logger } from "../utils/pino";
import { IPermissionReqBody } from "../types/permission";
import PermissionModel, {
  IPermissionAttributes,
} from "../models/permissionModel";

const getAllPermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allPermissions: PermissionModel[] = await PermissionModel.findAll({
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

    await PermissionModel.create(newPermission);

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const editPermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, name, versionId, description }: IPermissionReqBody = req.body;

    const newPermission: IPermissionAttributes = {
      name: name,
      versionId: versionId,
      description: description,
    };

    await PermissionModel.update(newPermission, {
      where: {
        id: id,
      },
    });

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
const deletePermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.body.id;

    await PermissionModel.destroy({
      where: {
        id: id,
      },
    });

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
const getPermissionByIdConroller = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const permission: PermissionModel | null = await PermissionModel.findOne({
      attributes: ["name", "versionId", "description"],
      where: {
        id: id,
      },
    });

    res.json({ success: 1, result: permission });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
export {
  createPermissionController,
  getAllPermissionController,
  editPermissionController,
  deletePermissionController,
  getPermissionByIdConroller,
};
