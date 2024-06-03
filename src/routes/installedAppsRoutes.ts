import express, { Router } from "express";
import {
  getInstalledAppByCategoryController,
  getInstalledAppByGenreController,
  getInstalledAppsController,
  insertInstalledAppController,
  isAppInstalledController,
} from "../controllers/installedAppController";

const router: Router = express.Router();

router
  .route("/")
  .post(insertInstalledAppController)
  .get(getInstalledAppsController);
router.route("/category/:category").get(getInstalledAppByCategoryController);
router.route("/genre/:genre").get(getInstalledAppByGenreController);

router.route("/isInstalled/:appId").get(isAppInstalledController);

export default router;
