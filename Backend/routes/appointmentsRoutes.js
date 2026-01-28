import { Router } from "express";
import {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getAppointmentById,
} from "../controllers/appointmentsController.js";

const router = Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.get("/:id", getAppointmentById); // 👈 ADD
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
export default router;
