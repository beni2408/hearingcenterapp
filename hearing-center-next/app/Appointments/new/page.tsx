// "use client";

// import { useState } from "react";
// import { API_BASE_URL } from "@/lib/config";

// export default function NewAppointmentPage() {
//   const [team_name, setTeamName] = useState("");
//   const [title, setTitle] = useState("");
//   const [person_name, setPersonName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile_number, setMobileNumber] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState("");
//   const [start_time, setStartTime] = useState("");
//   const [end_time, setEndTime] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // 🚀 Submit
//   const submitAppointment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch(`${API_BASE_URL}/appointments`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title,
//           person_name,
//           team_name,
//           email,
//           mobile_number,
//           description,
//           date,
//           start_time,
//           end_time,
//         }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.message || "Failed to create appointment");
//       }

//       alert("Appointment created successfully");
//       window.location.href = "/Appointments/calendar";
//     } catch (err: any) {
//       setError(err.message);
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6 mx-[80px] mt-10">
//         <h1 className="text-2xl font-bold mb-6">New Appointment</h1>

//         <div className="flex justify-end hover:cursor-pointer mb-6">
//           <div className="bg-black text-white text-xl w-[80px] h-[40px] rounded-4xl items-center flex justify-center">
//             <i className="fas fa-angle-left text-[15px]"></i>

//             <a href="/Appointments/calendar" className="text-[15px]">
//               Back
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* FORM */}
//       <form onSubmit={submitAppointment} className="space-y-4 mx-[80px] mb-10">
//         <input
//           className="w-full border p-2"
//           placeholder="Appointment Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         <input
//           className="w-full border p-2"
//           placeholder="Person Name"
//           value={person_name}
//           onChange={(e) => setPersonName(e.target.value)}
//           required
//         />

//         <select
//           className="w-full border p-2"
//           value={team_name}
//           onChange={(e) => setTeamName(e.target.value)}
//           required
//         >
//           <option value="">Select Team</option>
//           <option value="Team A">Team A</option>
//           <option value="Team B">Team B</option>
//           <option value="Team C">Team C</option>
//         </select>

//         <input
//           className="w-full border p-2"
//           placeholder="Email (optional)"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           type="email"
//         />

//         <input
//           className="w-full border p-2"
//           placeholder="Mobile Number"
//           value={mobile_number}
//           onChange={(e) => setMobileNumber(e.target.value)}
//         />

//         <textarea
//           className="w-full border p-2"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Date */}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Date</label>
//             <input
//               type="date"
//               className="border rounded p-2 w-full"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               required
//             />
//           </div>

//           {/* Start Time */}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Start Time</label>
//             <input
//               type="time"
//               className="border rounded p-2 w-full"
//               value={start_time}
//               onChange={(e) => setStartTime(e.target.value)}
//               required
//             />
//           </div>

//           {/* End Time */}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">End Time</label>
//             <input
//               type="time"
//               className="border rounded p-2 w-full"
//               value={end_time}
//               onChange={(e) => setEndTime(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         {error && <p className="text-red-600">{error}</p>}

//         <button
//           className="bg-black text-white px-6 py-2 rounded"
//           disabled={loading}
//         >
//           {loading ? "Saving..." : "Create Appointment"}
//         </button>
//       </form>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { API_BASE_URL } from "@/lib/config";

export default function NewAppointmentPage() {
  const [team_name, setTeamName] = useState("");
  const [title, setTitle] = useState("");
  const [person_name, setPersonName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          person_name,
          team_name,
          email,
          mobile_number,
          description,
          date,
          start_time,
          end_time,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create appointment");
      }

      alert("Appointment created successfully");
      window.location.href = "/Appointments/calendar";
    } catch (err: any) {
      setError(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">
              <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
                New Appointment
              </span>
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Schedule a new appointment
            </p>
            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          <a
            href="/Appointments/calendar"
            className="text-sm text-gray-600 hover:text-black"
          >
            ← Back
          </a>
        </div>

        {/* FORM */}
        <form
          onSubmit={submitAppointment}
          className="relative bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-sm p-6 space-y-5"
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-white/40 to-transparent pointer-events-none" />

          {/* TITLE */}
          <Field label="Appointment Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="input"
              required
            />
          </Field>

          {/* PERSON */}
          <Field label="Person Name">
            <input
              value={person_name}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="Enter name"
              className="input"
              required
            />
          </Field>

          {/* TEAM */}
          <Field label="Team">
            <select
              value={team_name}
              onChange={(e) => setTeamName(e.target.value)}
              className="input"
              required
            >
              <option value="">Select Team</option>
              <option value="Team A">Team A</option>
              <option value="Team B">Team B</option>
              <option value="Team C">Team C</option>
            </select>
          </Field>

          {/* EMAIL + MOBILE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Email">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Optional"
                className="input"
              />
            </Field>

            <Field label="Mobile Number">
              <input
                value={mobile_number}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter number"
                className="input"
              />
            </Field>
          </div>

          {/* DESCRIPTION */}
          <Field label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input"
              rows={4}
            />
          </Field>

          {/* DATE TIME */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Date">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input"
                required
              />
            </Field>

            <Field label="Start Time">
              <input
                type="time"
                value={start_time}
                onChange={(e) => setStartTime(e.target.value)}
                className="input"
                required
              />
            </Field>

            <Field label="End Time">
              <input
                type="time"
                value={end_time}
                onChange={(e) => setEndTime(e.target.value)}
                className="input"
                required
              />
            </Field>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button className="btn-primary w-full" disabled={loading}>
            {loading ? "Saving..." : "Create Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* Reusable Field */
function Field({ label, children }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      {children}
    </div>
  );
}
