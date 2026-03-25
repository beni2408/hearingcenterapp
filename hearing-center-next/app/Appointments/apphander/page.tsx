"use client";

import { useEffect, useState } from "react";
import { APPOINTMENT_API_URL } from "@/lib/config";

type Appointment = {
  _id: string;
  title: string;
  team_name: string;
  date: string;
  start_time: string;
  end_time: string;
  person_name: string;
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // 📥 Load appointments
  useEffect(() => {
    const loadAppointments = async () => {
      const res = await fetch(APPOINTMENT_API_URL);
      const json = await res.json();
      setAppointments(json.data);
      setLoading(false);
    };

    loadAppointments();
  }, []);

  // ❌ Delete
  const deleteAppointment = async (id: string) => {
    if (!confirm("Delete this appointment?")) return;

    await fetch(`${APPOINTMENT_API_URL}/${id}`, {
      method: "DELETE",
    });

    setAppointments((prev) => prev.filter((a) => a._id !== id));
  };

  // ➕ Navigate
  const goToNewAppointment = () => {
    window.location.href = "/Appointments/new";
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mx-[80px] mb-6 mt-10">
        <h1 className="text-2xl font-bold mb-10">Appointments management</h1>

        <button
          onClick={goToNewAppointment}
          className="bg-blue-900 text-white px-4 py-2 rounded"
        >
          + Add New Appointment
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="mx-[80px] mt-6">Loading...</p>
      ) : (
        <table className="w-[1300px] border mt-6 mx-[80px] mb-10">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Team</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Person</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td className="border p-2">{appt.title}</td>

                <td className="border p-2 font-medium text-blue-600">
                  {appt.team_name}
                </td>

                <td className="border p-2">{appt.date}</td>

                <td className="border p-2">
                  {appt.start_time} – {appt.end_time}
                </td>

                <td className="border p-2">{appt.person_name}</td>

                <td className="border p-2 space-x-3">
                  <a
                    href={`/Appointments/edit/${appt._id}`}
                    className="text-blue-600 underline"
                  >
                    Edit
                  </a>

                  <button
                    className="text-red-600 underline"
                    onClick={() => deleteAppointment(appt._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
