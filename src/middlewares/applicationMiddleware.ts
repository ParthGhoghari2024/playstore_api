import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";
import { logger } from "../utils/pino";

const createApplicationSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required().max(255),
  genre: Joi.string().required().max(255),
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
      res.json({ success: 0, error });
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};

const editApplicationSchema: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required().max(255),
  description: Joi.string().required(),
  category: Joi.string().required().max(255),
  genre: Joi.string().required().max(255),
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
      res.json({ success: 0, error });
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
      res.json({ success: 0, error });
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
