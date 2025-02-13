import { Request, Response } from "express";
import { logger } from "../utils/pino";
import { IAppIdVersionId, IPermissionReqBody } from "../types/permission";
import Permission, { IPermissionAttributes } from "../models/permissionModel";
import {
  deletePermission,
  getAllPermissionGroupVersion,
  getApplicationPermissions,
  getPermissionById,
  getPermissionIdIfExists,
  getPermissionsByVersion,
  getPermissionsTillVersion,
  insertPermission,
  updatePermission,
} from "../services/permissionService";
import Version from "../models/versionModel";
const getAllPermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allPermissions: Version[] | undefined =
      await getAllPermissionGroupVersion();

    if (allPermissions) res.json({ success: 1, result: allPermissions });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const createPermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let { name, versionId, description }: IPermissionReqBody = req.body;
    name = name.trim();
    description = description.trim();

    const newPermission: IPermissionAttributes = {
      name: name,
      versionId: versionId,
      description: description,
    };

    const createResult: Permission | undefined = await insertPermission(
      newPermission
    );

    if (createResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const editPermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let { id, name, versionId, description }: IPermissionReqBody = req.body;
    if (!id) {
      res.json({ success: 0, error: "No id to edit" });
      return;
    }
    name && (name = name.trim());
    description && (description = description.trim());

    const findRes: Permission | null = await getPermissionIdIfExists(id);

    if (!findRes) {
      res.json({ success: 0, error: "No permission to edit" });
      return;
    }

    const newPermission: Partial<IPermissionAttributes> = {
      versionId: versionId,
    };

    name && (newPermission.name = name);
    description && (newPermission.description = description);

    const updateResult: number[] | undefined = await updatePermission(
      newPermission,
      id!
    );

    if (updateResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};
const deletePermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: number = Number(req.body.id);
    if (!id || isNaN(id)) {
      res.json({ success: 0, error: "No proper id" });
      return;
    }

    const findRes: Permission | null = await getPermissionIdIfExists(id);

    if (!findRes) {
      res.json({ success: 0, error: "No permission to delete" });
      return;
    }

    const deleteResult: number | undefined = await deletePermission(id);

    if (deleteResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};
const getPermissionByIdConroller = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: number = Number(req.params.id);
    if (!id || isNaN(id)) {
      res.json({ success: 0, error: "No proper id" });
      return;
    }
    const permission: Permission | null = await getPermissionById(id);

    if (permission) res.json({ success: 1, result: permission });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const getPermissionsByVersionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const versionId: number = Number(req.params.versionId);
    if (!versionId || isNaN(versionId)) {
      res.json({ success: 0, error: "Invalid version id" });
      return;
    }
    const permisions: Permission[] | undefined = await getPermissionsByVersion(
      versionId
    );

    if (permisions) res.json({ success: 1, result: permisions });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const getApplicationPermissionsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appId: number = Number(req.params.appId);
    if (!appId || isNaN(appId)) {
      res.json({ success: 0, error: "Invalid app id" });
      return;
    }

    const permisions: Permission[] | undefined =
      await getApplicationPermissions(appId);

    if (permisions) res.json({ success: 1, result: permisions });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const getPermissionsTillVersionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { appId, versionId }: IAppIdVersionId = req.body;
    if (!appId || !versionId) {
      res.json({ success: 0, error: "App id and version id is required" });
      return;
    }
    const permisions: Permission[] | undefined =
      await getPermissionsTillVersion(appId, versionId);

    if (permisions) res.json({ success: 1, result: permisions });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};
export {
  createPermissionController,
  getAllPermissionController,
  editPermissionController,
  deletePermissionController,
  getPermissionByIdConroller,
  getPermissionsByVersionController,
  getApplicationPermissionsController,
  getPermissionsTillVersionController,
};
