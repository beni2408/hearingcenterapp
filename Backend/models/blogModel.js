import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  blog_title: {
    en: { type: String, required: true },
    ta: { type: String },
    ar: { type: String },
    ml: { type: String },
  },

  blog_content: {
    en: { type: String, required: true },
    ta: { type: String },
    ar: { type: String },
    ml: { type: String },
  },
  blog_image: {
    type: String,
  },
  blog_date: {
    type: Date, // created date (keep this if needed)
  },
  publish_date: {
    type: Date,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  blog_author: {
    type: String,
  },
});

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;
