import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    person_name: {
      type: String,
      required: true,
    },

    team_name: {
      // ✅ NEW
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: "",
    },

    mobile_number: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    // Date & time (for calendar)
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    start_time: {
      type: String, // HH:mm
      required: true,
    },

    end_time: {
      type: String, // HH:mm
      required: true,
    },

    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
