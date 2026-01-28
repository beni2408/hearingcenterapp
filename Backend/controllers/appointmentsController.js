import Appointment from "../models/appointmentsModel.js";

export const createAppointment = async (req, res) => {
  try {
    const {
      title,
      person_name,
      team_name,
      email,
      mobile_number,
      description,
      date,
      start_time,
      end_time,
    } = req.body;

    // 🔒 BASIC VALIDATION
    if (!title || !person_name || !date || !start_time || !end_time) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const conflict = await Appointment.findOne({
      team_name,
      date,
      start_time: { $lt: end_time },
      end_time: { $gt: start_time },
    });

    if (conflict) {
      return res.status(400).json({
        message:
          "This team already has an appointment during this time . Please choose a different time.",
      });
    }

    const appointment = await Appointment.create({
      title,
      person_name,
      team_name,
      email,
      mobile_number,
      description,
      date,
      start_time,
      end_time,
    });

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const { team_name, date, start_time, end_time } = req.body;

    // 🔒 VALIDATION
    if (!team_name || !date || !start_time || !end_time) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // ⛔ CONFLICT CHECK (EXCLUDE CURRENT APPOINTMENT)
    const conflict = await Appointment.findOne({
      _id: { $ne: id },
      team_name,
      date,
      start_time: { $lt: end_time },
      end_time: { $gt: start_time },
    });

    if (conflict) {
      return res.status(400).json({
        success: false,
        message: "This team already has an appointment during this time",
      });
    }

    // ✅ UPDATE
    const updated = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ success: true, message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
