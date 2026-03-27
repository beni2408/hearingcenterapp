"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  if (!user) return null;

  // 👤 Avatar initials
  const getInitials = () => {
    const name = user.name || user.email;
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* HEADER */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#266985] text-white flex items-center justify-center text-2xl font-bold mb-3">
            {getInitials()}
          </div>

          <h2 className="text-xl font-semibold">{user.name || "User"}</h2>

          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        {/* DETAILS */}
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{user.name || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-3">
          {/* <button className="w-full bg-[#266985] text-white py-2 rounded-lg hover:opacity-90 transition">
            Edit Profile (Coming Soon)
          </button> */}

          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="w-full border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
