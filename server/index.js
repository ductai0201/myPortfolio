import express from "express";
import mongoose from "mongoose";
import blogRouter from "./src/router/Blog.js";
import projectRouter from "./src/router/Project.js";
import tagRouter from "./src/router/Tag.js";
import reviewRouter from "./src/router/Review.js";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", blogRouter);
app.use("/api", projectRouter);
app.use("/api", tagRouter);
app.use("/api", reviewRouter);
mongoose
  .connect(process.env.VITE_MONGOOSE)
  .then(console.log("connect success"));
export const viteNodeApp = app;
