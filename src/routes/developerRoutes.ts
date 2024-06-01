import express, { Router } from "express";
import { getApplicationsByDeveloper } from "../controllers/applicationController";
const router: Router = express.Router();

router.route("/apps").post(getApplicationsByDeveloper);

export default router;
