import express from "express";
import {
  createMenu,
  getAllMenus,
  getActiveMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} from "../controllers/menuController.js";

const menuRouter = express.Router();

menuRouter.post("/", createMenu);
menuRouter.get("/", getAllMenus);
menuRouter.get("/active", getActiveMenus);
menuRouter.get("/:id", getMenuById);
menuRouter.put("/:id", updateMenu);
menuRouter.delete("/:id", deleteMenu);

export default menuRouter;
