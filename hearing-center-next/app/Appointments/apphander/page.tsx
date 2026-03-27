// "use client";

// import { useEffect, useState } from "react";
// import { APPOINTMENT_API_URL } from "@/lib/config";

// type Appointment = {
//   _id: string;
//   title: string;
//   team_name: string;
//   date: string;
//   start_time: string;
//   end_time: string;
//   person_name: string;
// };

// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(true);

//   // 📥 Load appointments
//   useEffect(() => {
//     const loadAppointments = async () => {
//       const res = await fetch(APPOINTMENT_API_URL);
//       const json = await res.json();
//       setAppointments(json.data);
//       setLoading(false);
//     };

//     loadAppointments();
//   }, []);

//   // ❌ Delete
//   const deleteAppointment = async (id: string) => {
//     if (!confirm("Delete this appointment?")) return;

//     await fetch(`${APPOINTMENT_API_URL}/${id}`, {
//       method: "DELETE",
//     });

//     setAppointments((prev) => prev.filter((a) => a._id !== id));
//   };

//   // ➕ Navigate
//   const goToNewAppointment = () => {
//     window.location.href = "/Appointments/new";
//   };

//   return (
//     <>
//       {/* HEADER */}
//       <div className="flex justify-between items-center mx-[80px] mb-6 mt-10">
//         <h1 className="text-2xl font-bold mb-10">Appointments management</h1>

//         <button
//           onClick={goToNewAppointment}
//           className="bg-blue-900 text-white px-4 py-2 rounded"
//         >
//           + Add New Appointment
//         </button>
//       </div>

//       {/* CONTENT */}
//       {loading ? (
//         <p className="mx-[80px] mt-6">Loading...</p>
//       ) : (
//         <table className="w-[1300px] border mt-6 mx-[80px] mb-10">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">Title</th>
//               <th className="border p-2">Team</th>
//               <th className="border p-2">Date</th>
//               <th className="border p-2">Time</th>
//               <th className="border p-2">Person</th>
//               <th className="border p-2">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {appointments.map((appt) => (
//               <tr key={appt._id}>
//                 <td className="border p-2">{appt.title}</td>

//                 <td className="border p-2 font-medium text-blue-600">
//                   {appt.team_name}
//                 </td>

//                 <td className="border p-2">{appt.date}</td>

//                 <td className="border p-2">
//                   {appt.start_time} – {appt.end_time}
//                 </td>

//                 <td className="border p-2">{appt.person_name}</td>

//                 <td className="border p-2 space-x-3">
//                   <a
//                     href={`/Appointments/edit/${appt._id}`}
//                     className="text-blue-600 underline"
//                   >
//                     Edit
//                   </a>

//                   <button
//                     className="text-red-600 underline"
//                     onClick={() => deleteAppointment(appt._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </>
//   );
// }
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

  useEffect(() => {
    const loadAppointments = async () => {
      const res = await fetch(APPOINTMENT_API_URL);
      const json = await res.json();
      setAppointments(json.data);
      setLoading(false);
    };

    loadAppointments();
  }, []);

  const deleteAppointment = async (id: string) => {
    if (!confirm("Delete this appointment?")) return;

    await fetch(`${APPOINTMENT_API_URL}/${id}`, {
      method: "DELETE",
    });

    setAppointments((prev) => prev.filter((a) => a._id !== id));
  };

  const goToNewAppointment = () => {
    window.location.href = "/Appointments/new";
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
                Appointments Management
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-500 mt-2">
              View and manage all scheduled appointments
            </p>

            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          <button
            onClick={goToNewAppointment}
            className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition hover:scale-[1.02]"
          >
            + Add Appointment
          </button>
        </div>

        {/* TABLE CARD */}
        <div className="relative bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 sm:p-6 overflow-x-auto">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-white/40 to-transparent pointer-events-none" />

          {loading ? (
            <div className="text-center py-10 text-gray-500 animate-pulse">
              Loading appointments...
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3 px-3 font-medium">Title</th>
                  <th className="py-3 px-3 font-medium">Team</th>
                  <th className="py-3 px-3 font-medium">Date</th>
                  <th className="py-3 px-3 font-medium">Time</th>
                  <th className="py-3 px-3 font-medium">Person</th>
                  <th className="py-3 px-3 font-medium text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appt) => (
                  <tr
                    key={appt._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-3 font-medium text-gray-900">
                      {appt.title}
                    </td>

                    <td className="py-3 px-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
                        {appt.team_name}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-gray-600">{appt.date}</td>

                    <td className="py-3 px-3 text-gray-600">
                      {appt.start_time} – {appt.end_time}
                    </td>

                    <td className="py-3 px-3 text-gray-600">
                      {appt.person_name}
                    </td>

                    <td className="py-3 px-3 text-right space-x-3">
                      <a
                        href={`/Appointments/edit/${appt._id}`}
                        className="text-gray-700 hover:text-black text-sm"
                      >
                        Edit
                      </a>

                      <button
                        onClick={() => deleteAppointment(appt._id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
