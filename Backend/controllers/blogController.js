import blogModel from "../models/blogModel.js";

export const newBlog = async (req, res) => {
  const {
    blog_title,
    blog_content,
    blog_date,
    publish_date,
    blog_author,
    is_active,
  } = req.body;

  const blog_image = req.file ? req.file.path : null;

  const newBlog = await blogModel.create({
    blog_title,
    blog_content,
    blog_image,
    blog_date,
    publish_date,
    blog_author,
    is_active,
  });

  res.status(201).json({
    status: "Success",
    message: "Blog created successfully",
    data: { new_blog: newBlog },
  });
};

export const getAllBlogs = async (req, res) => {
  const blogs = await blogModel.find();
  res.status(200).json({
    status: "Success",
    data: { blogs },
  });
};

export const getBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await blogModel.findById(id);
  res.status(200).json({
    status: "Success",
    data: { blog },
  });
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  await blogModel.findByIdAndDelete(id);
  res.status(200).json({
    status: "Success",
    message: "Blog deleted successfully",
  });
};
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const {
    blog_title,
    blog_content,
    blog_author,
    blog_date,
    publish_date,
    is_active,
  } = req.body;

  const updateData = {
    blog_title,
    blog_content,
    blog_author,
    blog_date,
    publish_date,
    is_active,
  };

  if (req.file) {
    updateData.blog_image = req.file.path;
  }

  const updatedBlog = await blogModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  res.status(200).json({
    status: "Success",
    message: "Blog updated successfully",
    data: updatedBlog,
  });
};
