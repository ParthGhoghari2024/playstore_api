import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { logger } from "../utils/pino";
import { sendJoiErrorResonse } from "../utils/responseHandler";

const createApplicationSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  category: Joi.string().trim().required().max(255),
  genre: Joi.string().trim().required().max(255),
});

const createApplicationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult =
      createApplicationSchema.validate(req.body, {
        abortEarly: false,
      });
    if (error) {
      sendJoiErrorResonse(error, res);
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};

const editApplicationSchema: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().trim().optional().max(255),
  description: Joi.string().trim().optional(),
  category: Joi.string().trim().optional().max(255),
  genre: Joi.string().trim().optional().max(255),
});

const editApplicationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult =
      editApplicationSchema.validate(req.body, {
        abortEarly: false,
      });
    if (error) {
      sendJoiErrorResonse(error, res);
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};

const deleteApplicationSchema: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
});

const deleteApplicationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult =
      deleteApplicationSchema.validate(req.body, {
        abortEarly: false,
      });
    if (error) {
      sendJoiErrorResonse(error, res);
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};
export {
  createApplicationMiddleware,
  editApplicationMiddleware,
  deleteApplicationMiddleware,
};
