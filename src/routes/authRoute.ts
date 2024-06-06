import express, { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController";
import {
  loginUserValidateMiddleware,
  registerUserValidateMiddleware,
} from "../middlewares/authValidateMiddleware";

const router: Router = express.Router();

router.route("/login").post(loginUserValidateMiddleware, loginController);
router
  .route("/register")
  .post(registerUserValidateMiddleware, registerController);

export default router;
