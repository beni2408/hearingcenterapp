import mongoose from "mongoose";

const slideImageSchema = new mongoose.Schema(
  {
    imageUrl: String,
  },
  { timestamps: true }
);

const slideimagesModel = mongoose.model("SlideImage", slideImageSchema);
export default slideimagesModel;
