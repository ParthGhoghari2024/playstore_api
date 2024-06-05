import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";
import { logger } from "../utils/pino";
const userSignupSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().trim().required().max(255),
  email: Joi.string().trim().email().required().max(255),
  country: Joi.string().trim().max(255).optional(),
  password: Joi.string().trim().required(),
});

const createUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult = userSignupSchema.validate(
      req.body,
      {
        abortEarly: false,
      }
    );
    if (error) {
      res.json({ success: 0, error: error?.details });
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};

const updateUserSchema: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().trim().optional().max(255),
  country: Joi.string().trim().max(255).optional(),
});

const updateUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult = updateUserSchema.validate(
      req.body,
      {
        abortEarly: false,
      }
    );
    if (error) {
      res.json({ success: 0, error: error?.details });
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};
const userDeleteSchema: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
});

const deleteUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult = userDeleteSchema.validate(
      req.body,
      {
        abortEarly: false,
      }
    );
    if (error) {
      res.json({ success: 0, error: error?.details });
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};
export { createUserMiddleware, deleteUserMiddleware, updateUserMiddleware };
