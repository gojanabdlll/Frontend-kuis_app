"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  TiSocialFacebookCircular,
  TiSocialLinkedinCircular,
} from "react-icons/ti";
import { FaGooglePlusG } from "react-icons/fa";

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login gagal");

      // ✅ Simpan token dan role ke localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
      }

      setMessage("✅ Login berhasil!");
      setForm({ email: "", password: "" });

      // ✅ Redirect berdasarkan role
      setTimeout(() => {
        if (data.role === "admin") {
          router.push("/adminpanel"); // ganti ke halaman admin kamu
        } else {
          router.push("/dashboardutama"); // halaman user biasa
        }
      }, 1000);
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/img-001-black.png')",
        backgroundColor: "#9B5DE5",
      }}
    >
      <div className="flex items-center justify-center md:w-1/2 w-full px-4 py-10 md:py-0">
        <div className="bg-black rounded-2xl p-8 w-full max-w-sm shadow-xl">
          <h2 className="text-white text-2xl font-bold text-center mb-4">
            Masuk
          </h2>

          <div className="flex justify-center items-center text-white text-xl gap-4 mb-2">
            <TiSocialFacebookCircular />
            <FaGooglePlusG />
            <TiSocialLinkedinCircular />
          </div>

          <p className="text-white text-center text-sm mb-4">
            atau gunakan email anda untuk registrasi
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-full bg-white text-black placeholder-gray-700 focus:outline-none"
              required
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-full bg-white text-black placeholder-gray-700 focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
            >
              {loading ? "Loading..." : "Masuk"}
            </button>
          </form>

          {message && (
            <p className="text-white text-sm mt-2 text-center">{message}</p>
          )}

          <div className="text-center mt-4">
            <a href="#" className="text-white text-sm block opacity-80 mb-1">
              Lupa password?
            </a>
            <Link
              href="/register"
              className="text-white text-sm block opacity-80"
            >
              Belum punya akun?
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center md:w-1/2 relative px-6">
        <img
          src="/Group 85.png"
          alt="Go Bi Quest"
          className="w-full max-w-[600px] object-contain"
        />
      </div>
    </div>
  );
};

export default LoginPage;
