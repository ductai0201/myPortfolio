import express from "express";
import {
  createReview,
  getAllReview,
  getReviewById,
  removeReview,
  updateReview,
} from "../controllers/review.js";

const router = express.Router();

router.post("/reviews", createReview);
router.get("/reviews", getAllReview);
router.get("/reviews/:id", getReviewById);
router.patch("/reviews/:id", updateReview);
router.delete("/reviews/:id", removeReview);
export default router;
