import { Request, Response } from "express";
import { logger } from "../utils/pino";
import { IAppIdVersionId, IPermissionReqBody } from "../types/permission";
import Permission, { IPermissionAttributes } from "../models/permissionModel";
import db from "../models";
import Application from "../models/applicationModel";
import Version from "../models/versionModel";
import { Op } from "sequelize";
const getAllPermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const allPermissions: Permission[] = await db.Permission.findAll({
      attributes: ["name", "versionId", "description"],
    });

    res.json({ success: 1, result: allPermissions });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const createPermission = async (req: Request, res: Response): Promise<void> => {
  try {
    let { name, versionId, description }: IPermissionReqBody = req.body;
    name = name.trim();
    description = description.trim();

    const newPermission: IPermissionAttributes = {
      name: name,
      versionId: versionId,
      description: description,
    };

    await db.Permission.create(newPermission);

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const editPermission = async (req: Request, res: Response): Promise<void> => {
  try {
    let { id, name, versionId, description }: IPermissionReqBody = req.body;
    name = name.trim();
    description = description.trim();

    const findRes: Permission | null = await db.Permission.findOne({
      where: {
        id: id,
      },
      attributes: ["id"],
    });

    if (!findRes) {
      res.json({ success: 0, error: "No permission to edit" });
      return;
    }

    const newPermission: Partial<IPermissionAttributes> = {
      versionId: versionId,
    };

    name && (newPermission.name = name);
    description && (newPermission.description = description);

    await db.Permission.update(newPermission, {
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
const deletePermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.body.id;

    const findRes: Permission | null = await db.Permission.findOne({
      where: {
        id: id,
      },
      attributes: ["id"],
    });

    if (!findRes) {
      res.json({ success: 0, error: "No permission to delete" });
      return;
    }

    await db.Permission.destroy({
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
    const permission: Permission | null = await db.Permission.findOne({
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

const getPermissionsByVersion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const versionId: string = req.params.versionId;
    const permisions: Permission[] = await db.Permission.findAll({
      raw: true,
      attributes: [
        "name",
        "description",
        [db.sequelize.col("version.version"), "versionName"],
        [db.sequelize.col("version.description"), "versionDescription"],
      ],
      where: {
        versionId: versionId,
      },
      include: {
        model: db.Version,
        attributes: [],
      },
    });

    res.json({ success: 1, result: permisions });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getApplicationPermissions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appId: string = req.params.appId;
    const permisions: Permission[] = await db.Permission.findAll({
      raw: true,
      attributes: [
        "name",
        "description",
        [db.sequelize.col("version.id"), "versionId"],
        [db.sequelize.col("version.application.id"), "appId"],
      ],
      include: [
        {
          model: db.Version,
          attributes: [],
          include: [
            {
              model: db.Application,
              attributes: [],
            },
          ],
          where: {
            applicationId: appId,
          },
        },
      ],
    });

    res.json({ success: 1, result: permisions });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getPermissionsTillVersion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { appId, versionId }: IAppIdVersionId = req.body;
    const permisions: Permission[] = await db.Permission.findAll({
      raw: true,
      attributes: [
        "name",
        "description",
        [db.sequelize.col("version.id"), "versionId"],
        [db.sequelize.col("version.application.id"), "appId"],
      ],
      include: [
        {
          model: db.Version,
          attributes: [],
          include: [
            {
              model: db.Application,
              attributes: [],
            },
          ],
          where: {
            applicationId: appId,
          },
        },
      ],
      where: {
        versionId: {
          [Op.lte]: versionId,
        },
      },
    });

    res.json({ success: 1, result: permisions });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
export {
  createPermission,
  getAllPermission,
  editPermission,
  deletePermission,
  getPermissionByIdConroller,
  getPermissionsByVersion,
  getApplicationPermissions,
  getPermissionsTillVersion,
};
