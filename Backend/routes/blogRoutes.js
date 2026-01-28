import { Router } from "express";
import {
  newBlog,
  getAllBlogs,
  getBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { upload } from "../middlewares/uploads.js";

const blogRouter = Router();

blogRouter.post("/newblog", upload.single("blog_image"), newBlog);
blogRouter.get("/allblogs", getAllBlogs);
blogRouter.get("/:id", getBlog);
blogRouter.delete("/deleteblog/:id", deleteBlog);
blogRouter.put("/updateblog/:id", upload.single("blog_image"), updateBlog);

export default blogRouter;
