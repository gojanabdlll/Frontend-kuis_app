"use client";

import Link from "next/link";
import {
  TiSocialFacebookCircular,
  TiSocialLinkedinCircular,
} from "react-icons/ti";
import { FaGooglePlusG } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          role: "user",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registrasi gagal");

      setMessage("✅ Registrasi berhasil!");
      setForm({ username: "", email: "", password: "" });

      setTimeout(() => router.push("/login"), 1000);
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col md:flex-row items-center justify-center relative"
      style={{
        backgroundImage: "url('/img-001-black.png')",
        backgroundColor: "#9B5DE5",
      }}
    >
      {/* Form Register */}
      <div className="flex items-center justify-center md:w-1/2 w-full px-4 py-10 md:py-0">
        <div className="bg-black rounded-2xl p-8 w-full max-w-sm shadow-xl">
          <h2 className="text-white text-2xl font-bold text-center mb-4">
            Daftar
          </h2>

          {/* Ikon Sosial */}
          <div className="flex justify-center items-center text-white text-xl gap-4 mb-2">
            <TiSocialFacebookCircular />
            <FaGooglePlusG />
            <TiSocialLinkedinCircular />
          </div>

          <p className="text-white text-center text-sm mb-4">
            atau daftar dengan email anda
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Nama Lengkap"
              className="w-full px-4 py-2 rounded-full bg-white text-black placeholder-gray-700 focus:outline-none"
              required
            />
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
              className="w-full py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              {loading ? "Mendaftarkan..." : "Daftar"}
            </button>
          </form>

          {message && (
            <p className="text-white text-sm mt-2 text-center">{message}</p>
          )}

          <div className="text-center mt-4">
            <Link href="/login" className="text-white text-sm opacity-80">
              Sudah punya akun?
            </Link>
          </div>
        </div>
      </div>

      {/* Gambar Kanan */}
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

export default RegisterPage;
