import express, { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
} from "../controllers/userController";
import {
  createUserMiddleware,
  deleteUserMiddleware,
} from "../middlewares/userMiddleware";

const router: Router = express.Router();

router
  .route("/")
  .post(createUserMiddleware, createUserController)
  .delete(deleteUserMiddleware, deleteUserController);

router.route("/all").get(getAllUserController);

export default router;
