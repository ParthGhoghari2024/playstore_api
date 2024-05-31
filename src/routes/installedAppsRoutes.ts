import express, { Router } from "express";
import {
  getInstalledAppByCategory,
  getInstalledAppByGenre,
  getInstalledApps,
  insertInstalledApp,
  isAppInstalled,
} from "../controllers/installedAppController";

const router: Router = express.Router();

router.route("/").post(insertInstalledApp).get(getInstalledApps);
router.route("/category/:category").get(getInstalledAppByCategory);
router.route("/genre/:genre").get(getInstalledAppByGenre);

router.route("/isInstalled/:appId").get(isAppInstalled);

export default router;
