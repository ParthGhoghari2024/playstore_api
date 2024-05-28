import express, { Router } from "express";
import { createCategoryController } from "../controllers/categoryController";

const router: Router = express.Router();

router.route("/").post(createCategoryController);

export default router;
