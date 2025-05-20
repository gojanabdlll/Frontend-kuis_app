"use client";
import Link from "next/link";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { FaGooglePlusG } from "react-icons/fa";
import { TiSocialLinkedinCircular } from "react-icons/ti";
const RegisterPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative overflow-hidden"
      style={{ backgroundImage: "url('/bg-gobi quest.png')" }}
    >
      {/* Tombol Back */}
      <div
        className="absolute top-5 left-5 w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer z-10"
        onClick={() => history.back()}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
        </svg>
      </div>

      {/* Box Register */}
      <div className="bg-black rounded-xl p-8 w-[350px] max-w-[90%] z-10 mr-160">
        <h2 className="text-white text-center text-2xl font-bold mb-4">
          Daftar
        </h2>

        <div className="text-white text-2xl flex items-center justify-center gap-2 mb-2">
          <Link href="#">
            <TiSocialFacebookCircular />
          </Link>
          <Link href="#">
            <FaGooglePlusG />
          </Link>
          <Link href="#">
            <TiSocialLinkedinCircular />
          </Link>
        </div>

        <p className="text-white text-center text-sm opacity-80 mb-4">
          atau daftar dengan email anda
        </p>

        <form className="space-y-5">
          {/* Nama */}
          <div className="flex flex-col gap-1">
            <label className="text-white text-sm font-medium">Nama</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-white text-white placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-white text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-white text-white placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Masukkan email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-white text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-white text-white placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Masukkan password"
              required
            />
          </div>

          {/* Tombol Daftar */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors duration-200"
          >
            Daftar
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="/login" className="text-white text-sm opacity-80">
            Sudah punya akun?
          </a>
        </div>
      </div>

      {/* Dekorasi */}
      <div className="absolute top-[15%] right-[15%] text-lime-400 text-4xl decoration z-[-1]">
        ★
      </div>
      <div className="absolute bottom-[20%] left-[25%] w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[40px] border-b-lime-400 rotate-[-20deg] z-[-1]" />
      <div className="absolute bottom-[15%] right-[20%] w-10 h-10 border-8 border-orange-400 rounded-full z-[-1]" />
    </div>
  );
};

export default RegisterPage;
