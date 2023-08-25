import mongoose from "mongoose";
const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    project: [{ type: mongoose.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Tag", tagSchema);
