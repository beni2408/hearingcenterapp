"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // ✅ modal state

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
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
              Welcome Back
            </span>
          </h1>

          <p className="text-sm text-gray-500 mt-2">Login to your account</p>
        </div>

        {/* CARD */}
        <div className="relative bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-white/40 to-transparent pointer-events-none" />

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
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* LINK */}
          <p className="text-sm text-center text-gray-500 mt-2">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-black underline">
              Sign up
            </Link>
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
              Login Successful!
            </h2>

            {/* TEXT */}
            <p className="text-sm text-gray-500 mb-6">
              Welcome back! Redirecting you...
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

/* Reusable Field */
function Field({ label, children }: any) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      {children}
    </div>
  );
}
