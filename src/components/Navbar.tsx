"use client";

import Image from "next/image";
import puzzleIcon from "../../public/PuzzleIcon.png";
import { useState, useTransition } from "react";
import { FaUserCircle } from "react-icons/fa";
import AuthModal from "./AuthModal";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      console.log(res);
      if (res.ok) {
        logout(); 
        setDropdownOpen(false);

        startTransition(() => {
          router.push("/");
        });
        toast.info("Logout successful");
      }
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout Fail");
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 border-b bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <Image src={puzzleIcon} alt="Logo" className="h-8 w-8 object-contain" />
        <span className="text-2xl font-bold text-blue-600">PuzzlePG</span>
      </div>

      {!user ? (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Login
          </button>
          <AuthModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </>
      ) : (
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            <FaUserCircle className="text-blue-600" size={28} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border shadow-md rounded-md z-10 p-4">
              <p className="font-bold text-sm text-gray-800">
                {user.name || "User"}
              </p>
              <p className="text-xs font-bold text-gray-500">{user.email}</p>
              <button
                onClick={handleLogout}
                disabled={isPending}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPending && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isPending ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
