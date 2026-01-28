import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const footerLogoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "footer-logo",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    public_id: (req, file) => "footer-logo",
  },
});

export const footerLogoUpload = multer({
  storage: footerLogoStorage,
});
