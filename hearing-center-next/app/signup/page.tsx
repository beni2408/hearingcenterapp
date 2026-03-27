// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/lib/context/AuthContext";

// export default function SignupPage() {
//   const router = useRouter();
//   const { login } = useAuth();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch("http://localhost:4000/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Signup failed");
//         return;
//       }

//       login(data); // ✅ store user + token
//       router.push("/Dynamic_Blog"); // redirect
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="w-[400px] p-6 border rounded-lg shadow">
//         <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

//         <input
//           type="text"
//           placeholder="Name"
//           className="w-full border p-2 mb-3 rounded"
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-2 mb-3 rounded"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 mb-4 rounded"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Creating..." : "Sign Up"}
//         </button>

//         <p className="text-sm mt-4 text-center">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-900 underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      login(data);
      setShowSuccess(true); // ✅ show modal instead of redirect
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold">
            <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
              Create Account
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-2">Sign up to get started</p>
        </div>

        {/* CARD */}
        <div className="relative bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
          {/* subtle glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-white/40 to-transparent pointer-events-none" />

          {/* NAME */}
          <Field label="Name">
            <input
              type="text"
              placeholder="Enter your name"
              className="input"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>

          {/* EMAIL */}
          <Field label="Email">
            <input
              type="email"
              placeholder="Enter your email"
              className="input"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Field>

          {/* PASSWORD */}
          <Field label="Password">
            <input
              type="password"
              placeholder="Enter password"
              className="input"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </Field>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {loading ? "Creating..." : "Sign Up"}
          </button>

          {/* LINK */}
          <p className="text-sm text-center text-gray-500 mt-2">
            Already have an account?{" "}
            <a href="/login" className="text-black underline">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* ✅ SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-sm text-center animate-scaleIn">
            {/* ICON */}
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* TITLE */}
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Account Created!
            </h2>

            {/* TEXT */}
            <p className="text-sm text-gray-500 mb-6">
              Your account has been successfully created.
            </p>

            {/* BUTTON */}
            <button
              onClick={() => router.push("/Dynamic_Blog")}
              className="btn-primary w-full"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* 🔁 Reusable Field Component */
function Field({ label, children }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      {children}
    </div>
  );
}
