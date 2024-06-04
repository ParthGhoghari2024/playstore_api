import express, { Router } from "express";
import { uploadApkMiddleware } from "../middlewares/uploadapkFileMiddleware";
import { uploadApkFileController } from "../controllers/apkFileController";

const router: Router = express.Router();

router.route("/").post(uploadApkMiddleware, uploadApkFileController);

export default router;
