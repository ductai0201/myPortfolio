import express from "express";
import { createBlog, getAllBlog, getBlogById, removeBlog, updateBlog } from "../controllers/blog.js";

const router = express.Router();

router.post("/blogs", createBlog);
router.get("/blogs", getAllBlog);
router.get("/blogs/:id",getBlogById)
router.patch("/blogs/:id",updateBlog)
router.delete("/blogs/:id",removeBlog)
export default router;
