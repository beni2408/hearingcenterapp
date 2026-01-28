import { Router } from "express";
import {
  getAllPages,
  getPageByUrl,
  newPage,
  updatePage,
  getPageById,
  deletePage,
} from "../controllers/pageController.js";

const pageRouter = Router();

pageRouter.post("/newpage", newPage);

pageRouter.get("/page", getPageByUrl);

pageRouter.get("/", getAllPages);
pageRouter.get("/:id", getPageById);
pageRouter.put("/:id", updatePage);
pageRouter.delete("/:id", deletePage);

export default pageRouter;
