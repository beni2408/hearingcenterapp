import pagesModel from "../models/pagesModel.js";

export const newPage = async (req, res) => {
  try {
    const { page_title, page_url, page_content, page_status } = req.body;

    const page = await pagesModel.create({
      page_title,
      page_url,
      page_content,
      page_status,
    });

    res.status(201).json({
      status: "Success",
      message: "Page created successfully",
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

export const getAllPages = async (req, res) => {
  try {
    const pages = await pagesModel.find();

    res.status(200).json({
      status: "Success",
      data: { pages },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

export const deletePage = async (req, res) => {
  try {
    const { id } = req.params;

    const page = await pagesModel.findByIdAndDelete(id);

    if (!page) {
      return res.status(404).json({
        status: "Error",
        message: "Page not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Page deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

export const updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const { page_title, page_url, page_content, page_status } = req.body;

    const page = await pagesModel.findByIdAndUpdate(
      id,
      {
        page_title,
        page_url,
        page_content,
        page_status,
      },
      { new: true }
    );

    if (!page) {
      return res.status(404).json({
        status: "Error",
        message: "Page not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Page updated successfully",
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

export const getPageByUrl = async (req, res) => {
  try {
    let { url } = req.query;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    if (!url.startsWith("/")) {
      url = "/" + url;
    }

    if (url.length > 1 && url.endsWith("/")) {
      url = url.slice(0, -1);
    }

    const page = await pagesModel.findOne({
      page_url: url,
      page_status: true,
    });

    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    return res.json({
      status: "Success",
      data: page,
    });
  } catch (error) {
    console.error("getPageByUrl error:", error);
    return res.status(500).json({
      status: "Error",
      message: "Failed to fetch page",
    });
  }
};

export const getPageById = async (req, res) => {
  try {
    const page = await pagesModel.findById(req.params.id);

    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.json({ data: page });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
