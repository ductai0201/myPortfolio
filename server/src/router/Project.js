import express from "express";
import {
  createProject,
  getAllProject,
  getProjectById,
  removeProject,
  updateProject,
} from "../controllers/project.js";

const router = express.Router();

router.post("/projects", createProject);
router.get("/projects", getAllProject);
router.get("/projects/:id", getProjectById);
router.patch("/projects/:id", updateProject);
router.delete("/projects/:id", removeProject);
export default router;
