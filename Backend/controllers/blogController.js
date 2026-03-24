import blogModel from "../models/blogModel.js";

// 🔥 COMMON TRANSLATION FUNCTION (REUSABLE)
async function translateText(text, targetLang) {
  try {
    const response = await fetch(
      "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(text) +
        "&langpair=en|" +
        targetLang
    );

    const data = await response.json();
    return data.responseData.translatedText || text;
  } catch (err) {
    console.error("Translation error:", err);
    return text;
  }
}

// =========================
// ✅ CREATE BLOG
// =========================
export const newBlog = async (req, res) => {
  try {
    const {
      blog_title,
      blog_content,
      blog_date,
      publish_date,
      blog_author,
      is_active,
    } = req.body;

    const blog_image = req.file ? req.file.path : null;

    // 🔥 TRANSLATIONS
    const [title_ta, title_ar, title_ml] = await Promise.all([
      translateText(blog_title, "ta"),
      translateText(blog_title, "ar"),
      translateText(blog_title, "ml"),
    ]);

    const [content_ta, content_ar, content_ml] = await Promise.all([
      translateText(blog_content, "ta"),
      translateText(blog_content, "ar"),
      translateText(blog_content, "ml"),
    ]);

    // 💾 SAVE
    const newBlog = await blogModel.create({
      blog_title: {
        en: blog_title,
        ta: title_ta,
        ar: title_ar,
        ml: title_ml,
      },
      blog_content: {
        en: blog_content,
        ta: content_ta,
        ar: content_ar,
        ml: content_ml,
      },
      blog_image,
      blog_date,
      publish_date,
      blog_author,
      is_active,
    });

    res.status(201).json({
      status: "Success",
      message: "Blog created successfully",
      data: { blog: newBlog },
    });
  } catch (error) {
    console.error("Error creating blog:", error);

    res.status(500).json({
      status: "Error",
      message: "Failed to create blog",
      error: error.message,
    });
  }
};

// =========================
// ✅ GET ALL BLOGS
// =========================
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "Success",
      data: { blogs },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Failed to fetch blogs",
    });
  }
};

// =========================
// ✅ GET SINGLE BLOG
// =========================
export const getBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        status: "Error",
        message: "Blog not found",
      });
    }

    res.status(200).json({
      status: "Success",
      data: { blog },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Failed to fetch blog",
    });
  }
};

// =========================
// ✅ UPDATE BLOG (FIXED 🔥)
// =========================
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      blog_title,
      blog_content,
      blog_author,
      blog_date,
      publish_date,
      is_active,
    } = req.body;

    // 🔥 TRANSLATE AGAIN (IMPORTANT)
    const [title_ta, title_ar, title_ml] = await Promise.all([
      translateText(blog_title, "ta"),
      translateText(blog_title, "ar"),
      translateText(blog_title, "ml"),
    ]);

    const [content_ta, content_ar, content_ml] = await Promise.all([
      translateText(blog_content, "ta"),
      translateText(blog_content, "ar"),
      translateText(blog_content, "ml"),
    ]);

    // ✅ STRUCTURE
    const updateData = {
      blog_title: {
        en: blog_title,
        ta: title_ta,
        ar: title_ar,
        ml: title_ml,
      },
      blog_content: {
        en: blog_content,
        ta: content_ta,
        ar: content_ar,
        ml: content_ml,
      },
      blog_author,
      blog_date,
      publish_date,
      is_active,
    };

    // 🖼️ IMAGE UPDATE
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
  } catch (error) {
    console.error("Update Error:", error);

    res.status(500).json({
      status: "Error",
      message: "Failed to update blog",
      error: error.message,
    });
  }
};

// =========================
// ✅ DELETE BLOG
// =========================
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    await blogModel.findByIdAndDelete(id);

    res.status(200).json({
      status: "Success",
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Failed to delete blog",
    });
  }
};
