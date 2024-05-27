import express, { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
} from "../controllers/userController";

const router: Router = express.Router();

router.route("/").post(createUserController);
router.route("/delete").post(deleteUserController);

router.route("/all").get(getAllUserController);

export default router;
