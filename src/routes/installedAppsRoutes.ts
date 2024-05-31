import express, { Router } from "express";
import {
  getInstalledApps,
  insertInstalledApp,
} from "../controllers/installedAppController";

const router: Router = express.Router();

router.route("/").post(insertInstalledApp).get(getInstalledApps);

export default router;
