import mongoose from "mongoose";
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    gallery: {
      type: Array,
    },
    tagId:[{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Tag'
    }]
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Project", projectSchema);
