"use client";
import React from "react";
import Image from "next/image";

export default function QuizResultPage() {
  const score = 80;

  const handleFinish = () => {
    console.log("Quiz selesai dengan skor:", score);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/img-001-black.png')",
        backgroundColor: "#9B5DE5",
      }}
    >
      {/* 🌟 Dekorasi Segitiga & Bulan */}
      <div className="absolute bottom-30 left-34">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#facc15"
          viewBox="0 0 24 24"
          className="w-10 h-10"
        >
          <path d="M12 .587l3.668 7.568L24 9.75l-6 5.85L19.335 24 12 20.202 4.665 24 6 15.6 0 9.75l8.332-1.595z" />
        </svg>
      </div>

      <div className="absolute bottom-120 left-40">
        <div className="w-0 h-0 border-l-[20px] border-white border-l-transparent border-r-[20px] border-r-transparent border-b-[38px] border-teal-300"></div>
      </div>
      <div className="absolute bottom-120 right-40">
        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[38px] border-teal-300"></div>
      </div>
      <div className="absolute bottom-32 right-24">
        <div className="w-26 h-26 border-16 border-white rounded-tr-full border-l-transparent border-b-transparent rotate-[35deg]"></div>
      </div>

      {/* 🟨 Kartu Skor */}
      <div className="bg-yellow-400 rounded-[32px] p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 z-10 shadow-2xl max-w-[500px] w-full">
        {/* 🐼 Karakter */}
        <div className="rounded-full w-40 h-40 flex items-center justify-center border-[6px] border-yellow-400 bg-white overflow-hidden shrink-0">
          <Image
            src="/Group 22.png"
            alt="Karakter Quiz"
            width={150}
            height={150}
            objectFit="contain"
          />
        </div>

        {/* 📊 Skor & Tombol */}
        <div className="text-center md:text-left flex-1">
          <p className="text-black font-medium text-lg mb-1">
            Skor kamu adalah
          </p>
          <h1 className="text-5xl font-extrabold text-black mb-4">{score}</h1>
          <button
            onClick={handleFinish}
            className="bg-[#CDB4FF] hover:bg-[#b89fff] text-white font-bold py-2 px-8 rounded-full transition duration-200"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
