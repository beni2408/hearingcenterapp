import { Router } from "express";
import { uploadImage, getImages } from "../controllers/slideimagesController.js";

const slideiamgeRouter = Router();

slideiamgeRouter.post("/upload", uploadImage);
slideiamgeRouter.get("/", getImages);

export default slideiamgeRouter;
