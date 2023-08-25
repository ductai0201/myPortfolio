import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    content: {
      type: String,
    },
    gallery: {
      type: Array,
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Review", reviewSchema);
