// "use client";

// import { useEffect, useState } from "react";
// import { APPOINTMENT_API_URL } from "@/lib/config";
// import { useParams } from "next/navigation";

// export default function EditAppointmentPage() {
//   const params = useParams();
//   const id = params?.id as string;

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [start_time, setStartTime] = useState("");
//   const [end_time, setEndTime] = useState("");
//   const [person_name, setPersonName] = useState("");
//   const [team_name, setTeamName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile_number, setMobileNumber] = useState("");
//   const [description, setDescription] = useState("");

//   // 📥 Load appointment
//   useEffect(() => {
//     const loadAppointment = async () => {
//       try {
//         const res = await fetch(`${APPOINTMENT_API_URL}/${id}`);

//         if (!res.ok) throw new Error("Failed to load appointment");

//         const json = await res.json();
//         const appt = json.data;

//         setTitle(appt.title || "");
//         setDate(appt.date || "");
//         setStartTime(appt.start_time || "");
//         setEndTime(appt.end_time || "");
//         setPersonName(appt.person_name || "");
//         setTeamName(appt.team_name || "");
//         setEmail(appt.email || "");
//         setMobileNumber(appt.mobile_number || "");
//         setDescription(appt.description || "");

//         setLoading(false);
//       } catch (err: any) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     if (id) loadAppointment();
//   }, [id]);

//   // 🚀 Update
//   const updateAppointment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     setError("");

//     try {
//       const payload = {
//         title,
//         team_name,
//         date,
//         start_time,
//         end_time,
//         person_name,
//         email,
//         mobile_number,
//         description,
//       };

//       const res = await fetch(`${APPOINTMENT_API_URL}/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.message || "Failed to update appointment");
//       }

//       alert("Appointment updated successfully");
//       window.location.href = "/Appointments/apphander";
//     } catch (err: any) {
//       setError(err.message);
//       alert(err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <>
//       <h1 className="text-2xl font-bold mx-[80px] mt-10 mb-6">
//         Edit Appointment
//       </h1>

//       <div className="flex justify-end mx-[80px] mb-6">
//         <a
//           href="/Appointments/apphander"
//           className="bg-black text-white px-4 py-2 rounded"
//         >
//           Back
//         </a>
//       </div>

//       {loading ? (
//         <p className="mx-[80px]">Loading appointment...</p>
//       ) : (
//         <form
//           onSubmit={updateAppointment}
//           className="space-y-5 mx-[80px] mb-10"
//         >
//           <input
//             className="w-full border p-2"
//             placeholder="Appointment Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />

//           <input
//             className="w-full border p-2"
//             placeholder="Person Name"
//             value={person_name}
//             onChange={(e) => setPersonName(e.target.value)}
//             required
//           />

//           <select
//             className="w-full border p-2"
//             value={team_name}
//             onChange={(e) => setTeamName(e.target.value)}
//             required
//           >
//             <option value="">Select Team</option>
//             <option value="Team A">Team A</option>
//             <option value="Team B">Team B</option>
//             <option value="Team C">Team C</option>
//           </select>

//           <input
//             className="w-full border p-2"
//             placeholder="Email (optional)"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             className="w-full border p-2"
//             placeholder="Mobile Number"
//             value={mobile_number}
//             onChange={(e) => setMobileNumber(e.target.value)}
//           />

//           <textarea
//             className="w-full border p-2"
//             rows={4}
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* Date */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium mb-1">Date</label>
//               <input
//                 type="date"
//                 className="border rounded p-2 w-full"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Start Time */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium mb-1">Start Time</label>
//               <input
//                 type="time"
//                 className="border rounded p-2 w-full"
//                 value={start_time}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 required
//               />
//             </div>

//             {/* End Time */}
//             <div className="flex flex-col">
//               <label className="text-sm font-medium mb-1">End Time</label>
//               <input
//                 type="time"
//                 className="border rounded p-2 w-full"
//                 value={end_time}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           {error && <p className="text-red-600">{error}</p>}

//           <button
//             className="bg-blue-900 text-white px-6 py-2 rounded"
//             disabled={saving}
//           >
//             {saving ? "Updating..." : "Update Appointment"}
//           </button>
//         </form>
//       )}
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { APPOINTMENT_API_URL } from "@/lib/config";
import { useParams } from "next/navigation";

export default function EditAppointmentPage() {
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [person_name, setPersonName] = useState("");
  const [team_name, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const loadAppointment = async () => {
      const res = await fetch(`${APPOINTMENT_API_URL}/${id}`);
      const json = await res.json();
      const appt = json.data;

      setTitle(appt.title || "");
      setDate(appt.date || "");
      setStartTime(appt.start_time || "");
      setEndTime(appt.end_time || "");
      setPersonName(appt.person_name || "");
      setTeamName(appt.team_name || "");
      setEmail(appt.email || "");
      setMobileNumber(appt.mobile_number || "");
      setDescription(appt.description || "");

      setLoading(false);
    };

    if (id) loadAppointment();
  }, [id]);

  const updateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      team_name,
      date,
      start_time,
      end_time,
      person_name,
      email,
      mobile_number,
      description,
    };

    await fetch(`${APPOINTMENT_API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Appointment updated successfully");
    window.location.href = "/Appointments/apphander";
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">
              <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
                Edit Appointment
              </span>
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Update appointment details
            </p>
            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          <a
            href="/Appointments/apphander"
            className="text-sm text-gray-600 hover:text-black"
          >
            ← Back
          </a>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <form
            className="relative bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-sm p-6 space-y-5"
            onSubmit={updateAppointment}
          >
            <Field label="Appointment Title">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Person Name">
              <input
                value={person_name}
                onChange={(e) => setPersonName(e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Team">
              <select
                value={team_name}
                onChange={(e) => setTeamName(e.target.value)}
                className="input"
              >
                <option value="">Select Team</option>
                <option value="Team A">Team A</option>
                <option value="Team B">Team B</option>
                <option value="Team C">Team C</option>
              </select>
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Email">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </Field>

              <Field label="Mobile Number">
                <input
                  value={mobile_number}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="input"
                />
              </Field>
            </div>

            <Field label="Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Date">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input"
                />
              </Field>

              <Field label="Start Time">
                <input
                  type="time"
                  value={start_time}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="input"
                />
              </Field>

              <Field label="End Time">
                <input
                  type="time"
                  value={end_time}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="input"
                />
              </Field>
            </div>

            <button className="btn-primary w-full">
              {saving ? "Updating..." : "Update Appointment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      {children}
    </div>
  );
}
