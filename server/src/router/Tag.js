import express from "express";
import { createTag, getAllTag, getTagById, removeTag, updateTag } from "../controllers/tag.js";

const router = express.Router();

router.post("/tags", createTag);
router.get("/tags", getAllTag);
router.get("/tags/:id", getTagById);
router.patch("/tags/:id", updateTag);
router.delete("/tags/:id", removeTag);
export default router;
