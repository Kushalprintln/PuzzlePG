"use client";
import Image from "next/image";
import puzzleIcon from "../../public/PuzzleIcon.png";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";

export default function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();
  const { login } = useAuth();

  const submitForm = async () => {
    setLoading(true);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      if (isLogin) {
        toast.success("Login successful");
        if (data.user) login(data.user);
        router.push("/dashboard");
        onClose();
      } else {
        toast.success("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  function clearForm() {
    setForm({ name: "", email: "", password: "" });
  }

  useEffect(() => {
    clearForm();
  }, [isLogin]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="relative bg-white p-6 rounded-lg w-full max-w-md shadow-lg space-y-6">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          <IoClose />
        </button>

        <div className="flex items-center justify-center gap-2">
          <Image src={puzzleIcon} alt="Logo" width={30} height={30} />
          <h2 className="text-2xl font-bold text-blue-600">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          {!isLogin && (
            <input
              placeholder="Name"
              className="w-full border p-2 rounded-md"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}
          <input
            placeholder="Email"
            type="email"
            className="w-full border p-2 rounded-md"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            className="w-full border p-2 rounded-md"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <button
            className="text-blue-600 underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Create Account" : "Login Instead"}
          </button>
        </p>
      </div>
    </div>
  );
}
