import express, { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
} from "../controllers/userController";
import {
  createUserMiddleware,
  deleteUserMiddleware,
} from "../middlewares/userMiddleware";

const router: Router = express.Router();

router
  .route("/")
  .post(createUserMiddleware, createUser)
  .delete(deleteUserMiddleware, deleteUser);

router.route("/all").get(getAllUser);

export default router;
