// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/lib/context/AuthContext";

// export default function ProfilePage() {
//   const { user, logout } = useAuth();
//   const router = useRouter();

//   // 🔐 Redirect if not logged in
//   useEffect(() => {
//     if (!user) {
//       router.push("/login");
//     }
//   }, [user]);

//   if (!user) return null;

//   // 👤 Avatar initials
//   const getInitials = () => {
//     const name = user.name || user.email;
//     return name
//       .split(" ")
//       .map((n: string) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//         {/* HEADER */}
//         <div className="flex flex-col items-center mb-6">
//           <div className="w-20 h-20 rounded-full bg-[#266985] text-white flex items-center justify-center text-2xl font-bold mb-3">
//             {getInitials()}
//           </div>

//           <h2 className="text-xl font-semibold">{user.name || "User"}</h2>

//           <p className="text-gray-500 text-sm">{user.email}</p>
//         </div>

//         {/* DETAILS */}
//         <div className="space-y-4 mb-6">
//           <div>
//             <p className="text-sm text-gray-500">Name</p>
//             <p className="font-medium">{user.name || "N/A"}</p>
//           </div>

//           <div>
//             <p className="text-sm text-gray-500">Email</p>
//             <p className="font-medium">{user.email}</p>
//           </div>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex flex-col gap-3">
//           {/* <button className="w-full bg-[#266985] text-white py-2 rounded-lg hover:opacity-90 transition">
//             Edit Profile (Coming Soon)
//           </button> */}

//           <button
//             onClick={() => {
//               logout();
//               router.push("/");
//             }}
//             className="w-full border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  if (!user) return null;

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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Manage your account details
          </p>

          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        {/* CARD */}
        <div className="relative bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 sm:p-8">
          {/* subtle glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-white/40 to-transparent pointer-events-none" />

          {/* PROFILE HEADER */}
          <div className="relative flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#266985] to-[#1e4f63] text-white flex items-center justify-center text-2xl font-bold shadow-md">
              {getInitials()}
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mt-4">
              {user.name || "User"}
            </h2>

            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          {/* DETAILS */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {user.name || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {user.email}
              </p>
            </div>
          </div>

          {/* ACTION */}
          <div className="relative">
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="w-full py-2.5 rounded-xl text-sm font-medium 
              border border-red-200 text-red-600 
              hover:bg-red-50 hover:border-red-300 
              transition active:scale-[0.98]"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
