import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    description: {
      type: String,
      required: true,
      maxLength: 100,
    },
    gallery: {
      type: Array,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Blog", blogSchema);
