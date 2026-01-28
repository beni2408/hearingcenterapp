import Footer from "../models/footerModel.js";

/**
 * GET FOOTER
 */
export const getFooter = async (req, res) => {
  try {
    let footer = await Footer.findOne();

    if (!footer) {
      footer = await Footer.create({});
    }

    res.status(200).json({
      success: true,
      data: footer,
    });
  } catch (error) {
    console.error("Get footer error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE FOOTER (TEXT DATA)
 */
export const updateFooter = async (req, res) => {
  try {
    const footer = await Footer.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });

    res.status(200).json({
      success: true,
      message: "Footer updated successfully",
      data: footer,
    });
  } catch (error) {
    console.error("Update footer error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPLOAD FOOTER LOGO
 */
export const uploadFooterLogo = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({
        success: false,
        message: "No logo uploaded",
      });
    }

    const footer = await Footer.findOneAndUpdate(
      {},
      { "company.logo": req.file.path },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Footer logo uploaded successfully",
      logo: req.file.path,
      data: footer,
    });
  } catch (error) {
    console.error("Footer logo upload error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
