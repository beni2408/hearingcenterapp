import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import contactUsRouter from "./routes/contactusRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";
import scrollimageRouter from "./routes/slideimagesRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import { upload } from "./middlewares/uploads.js";
import pageRouter from "./routes/pageRoutes.js";
import menuRouter from "./routes/menuRoutes.js";
import footerRouter from "./routes/footerRoutes.js";
import appointmentRoutes from "./routes/appointmentsRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

app.use("/api/contactus", contactUsRouter);
app.use("/api/scrollimages", scrollimageRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/pages", pageRouter);
app.use("/api/menu", menuRouter);
app.use("/api/footer", footerRouter);
app.get("/api/footer-test", (req, res) => {
  res.json({ ok: true });
});
app.use("/api/appointments", appointmentRoutes);
