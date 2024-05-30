import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";
import { logger } from "../utils/pino";
const userSignupSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().required().max(255),
  email: Joi.string().email().required().max(255),
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
export { createUserMiddleware, deleteUserMiddleware };
