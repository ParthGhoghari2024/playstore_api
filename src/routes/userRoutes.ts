import express, { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
  updateUserController,
} from "../controllers/userController";
import {
  createUserMiddleware,
  deleteUserMiddleware,
  updateUserMiddleware,
} from "../middlewares/userMiddleware";

const router: Router = express.Router();

router
  .route("/")
  .post(createUserMiddleware, createUserController)
  .delete(deleteUserMiddleware, deleteUserController)
  .put(updateUserMiddleware, updateUserController);

router.route("/all").get(getAllUserController);

export default router;
