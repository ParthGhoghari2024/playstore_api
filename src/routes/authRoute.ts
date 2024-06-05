import express, { Router } from "express";
import { loginController } from "../controllers/authController";

const router: Router = express.Router();

router.route("/login").post(loginController);

export default router;
