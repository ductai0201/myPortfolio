import express, { response } from "express";
import mongoose from "mongoose";
import blogRouter from "./src/router/Blog.js";
import projectRouter from "./src/router/Project.js";
import tagRouter from "./src/router/Tag.js";
import reviewRouter from "./src/router/Review.js";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.VITE_PORT || 8800
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", blogRouter);
app.use("/api", projectRouter);
app.use("/api", tagRouter);
app.use("/api", reviewRouter);
try {
  await mongoose.connect(process.env.VITE_MONGOOSE);
  console.log("Connected to MongoDB successfully");
} catch (error) {
  console.error("Failed to connect to MongoDB:", error);
}
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
 
export const viteNodeApp = app;
