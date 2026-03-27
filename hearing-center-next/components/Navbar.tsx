// "use client";

// import { useEffect, useState, useRef } from "react";
// import Link from "next/link";
// import { MENU_API_URL } from "@/lib/config";
// import { useAuth } from "@/lib/context/AuthContext";

// type Menu = { menu_url: string; menu_title: string };

// export default function Navbar() {
//   const [menus, setMenus] = useState<Menu[]>([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const { user, logout } = useAuth();
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Fetch menus
//   useEffect(() => {
//     fetch(`${MENU_API_URL}/active`)
//       .then((r) => r.json())
//       .then((json) => setMenus(json.data || []))
//       .catch(console.error);
//   }, []);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Avatar initials
//   const getInitials = () => {
//     if (!user) return "";
//     const name = user.name || user.email;
//     return name
//       .split(" ")
//       .map((n: string) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   return (
//     <div className="w-full bg-[#266985] shadow-md">
//       <div className="flex justify-between items-center px-10 py-5">
//         {/* LEFT MENU */}
//         <div className="flex gap-8">
//           {menus.map((menu) => (
//             <Link
//               key={menu.menu_url}
//               href={menu.menu_url}
//               className="text-white text-lg hover:opacity-80 transition"
//             >
//               {menu.menu_title}
//             </Link>
//           ))}
//         </div>

//         {/* RIGHT ACCOUNT */}
//         <div ref={dropdownRef} className="relative">
//           {!user ? (
//             <div className="flex gap-4">
//               <Link
//                 href="/login"
//                 className="text-white border border-white px-4 py-1.5 rounded-full hover:bg-white hover:text-[#266985] transition"
//               >
//                 Login
//               </Link>

//               <Link
//                 href="/signup"
//                 className="bg-white text-[#266985] px-4 py-1.5 rounded-full font-semibold hover:scale-105 transition"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           ) : (
//             <>
//               {/* USER BUTTON */}
//               <div
//                 onClick={() => setShowDropdown((prev) => !prev)}
//                 className="flex items-center gap-3 cursor-pointer"
//               >
//                 {/* Avatar */}
//                 <div className="w-9 h-9 rounded-full bg-white text-[#266985] flex items-center justify-center font-bold">
//                   {getInitials()}
//                 </div>

//                 <span className="text-white font-medium hidden sm:block">
//                   {user.name || user.email}
//                 </span>
//               </div>

//               {/* DROPDOWN */}
//               <div
//                 className={`absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg p-2 transition-all duration-200 ${
//                   showDropdown
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-2 pointer-events-none"
//                 }`}
//               >
//                 <Link
//                   href="/profile"
//                   className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
//                 >
//                   Profile
//                 </Link>

//                 <button
//                   onClick={() => {
//                     logout();
//                     setShowDropdown(false);
//                   }}
//                   className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 text-sm"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { MENU_API_URL } from "@/lib/config";
import { useAuth } from "@/lib/context/AuthContext";

type Menu = { menu_url: string; menu_title: string };

export default function Navbar() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${MENU_API_URL}/active`)
      .then((r) => r.json())
      .then((json) => setMenus(json.data || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = () => {
    if (!user) return "";
    const name = user.name || user.email;
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full sticky top-0 z-50 backdrop-blur bg-[#266985]/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
        {/* LEFT MENU */}
        <div className="flex items-center gap-6 lg:gap-8">
          {menus.map((menu) => (
            <Link
              key={menu.menu_url}
              href={menu.menu_url}
              className="text-white text-sm sm:text-base font-medium hover:opacity-80 transition"
            >
              {menu.menu_title}
            </Link>
          ))}
        </div>

        {/* RIGHT ACCOUNT */}
        <div ref={dropdownRef} className="relative">
          {!user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-white text-sm px-4 py-1.5 rounded-full border border-white/70 hover:bg-white hover:text-[#266985] transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="bg-white text-[#266985] text-sm px-4 py-1.5 rounded-full font-medium hover:scale-105 transition"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <>
              {/* USER */}
              <div
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center gap-2 sm:gap-3 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-white text-[#266985] flex items-center justify-center text-sm font-semibold">
                  {getInitials()}
                </div>

                <span className="text-white text-sm font-medium hidden sm:block">
                  {user.name || user.email}
                </span>
              </div>

              {/* DROPDOWN */}
              <div
                className={`absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg p-2 transition-all duration-200 ${
                  showDropdown
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 text-sm"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
