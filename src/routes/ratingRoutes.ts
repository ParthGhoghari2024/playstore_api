import express, { Router } from "express";
import {
  createRatingController,
  deleteRatingController,
  editRatingController,
  getRatingsByAppIdController,
} from "../controllers/ratingController";
import {
  createRatingMiddleware,
  updateRatingMiddleware,
} from "../middlewares/ratingMiddleware";

const router: Router = express.Router();

router
  .route("/")
  .post(createRatingMiddleware, createRatingController)
  .put(updateRatingMiddleware, editRatingController)
  .delete(deleteRatingController);

router.route("/app/:appId").get(getRatingsByAppIdController);

export default router;
