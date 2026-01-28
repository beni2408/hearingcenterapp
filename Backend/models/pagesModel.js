import mongoose from "mongoose";

const pagesSchema = new mongoose.Schema({
  page_title: {
    type: String,
    required: true,
    // unique: true,
    // enum: [
    //   "Home",
    //   "About",
    //   "Hearing Services",
    //   "Hearing Aids",
    //   "Review Us",
    //   "Shop",
    // ],
  },
  page_content: {
    type: String,
    required: true,
  },
  page_url: {
    type: String,
    required: true,
    unique: true,
    // enum: [
    //   "/",
    //   "/about",
    //   "/hearing-services",
    //   "/hearing-aids",
    //   "/review-us",
    //   "/shop",
    // ],
  },
  page_status: {
    type: Boolean,
    default: true,
  },
});

const pagesModel = mongoose.model("Pages", pagesSchema);

export default pagesModel;
