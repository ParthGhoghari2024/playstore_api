import express, { Router } from "express";
import { uploadApkMiddleware } from "../middlewares/uploadapkFileMiddleware";
import { uploadApkFileController } from "../controllers/apkFileController";
import passport from "passport";

const router: Router = express.Router();
router.use(
  passport.authenticate("jwt", {
    session: false,
    // failureRedirect: "/login",
  })
);
router.route("/").post(uploadApkMiddleware, uploadApkFileController);

export default router;
