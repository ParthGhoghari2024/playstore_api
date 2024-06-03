import express, { Router } from "express";
import { getApplicationsByDeveloperController } from "../controllers/applicationController";
const router: Router = express.Router();

router.route("/apps").post(getApplicationsByDeveloperController);

export default router;
