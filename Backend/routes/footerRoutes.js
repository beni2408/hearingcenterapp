import { Router } from "express";
import {
  getFooter,
  updateFooter,
  uploadFooterLogo,
} from "../controllers/footerController.js";
import { footerLogoUpload } from "../middlewares/footerLogoUpload.js";

const footerRouter = Router();

footerRouter.get("/", getFooter);
footerRouter.put("/", updateFooter);
footerRouter.post(
  "/upload-logo",
  footerLogoUpload.single("logo"),
  uploadFooterLogo
);

export default footerRouter;
