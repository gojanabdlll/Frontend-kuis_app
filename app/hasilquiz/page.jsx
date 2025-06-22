"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function QuizResultPage() {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const submitQuiz = async () => {
      try {
        const token = localStorage.getItem("token");
        const quizId = localStorage.getItem("quizId");
        const answers = JSON.parse(localStorage.getItem("answers")); // contoh: ["A", "C", "B", "D"]

        if (!quizId || !answers) {
          throw new Error(
            "Data quizId atau answers tidak ditemukan di localStorage."
          );
        }

        const res = await fetch("http://localhost:5000/api/score/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // ✅ template literal diperbaiki
          },
          body: JSON.stringify({
            quizId,
            answers,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Gagal submit kuis");
        }

        setScore(data.score || 0);
      } catch (error) {
        console.error("Gagal mengambil skor:", error.message);
        setScore(0);
      } finally {
        setLoading(false);
      }
    };

    submitQuiz();
  }, []);

  const handleFinish = () => {
    router.push("/leaderboard");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/img-001-black.png')",
        backgroundColor: "#9B5DE5",
      }}
    >
      {/* Kartu Skor */}
      <div className="bg-yellow-400 rounded-[32px] p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 z-10 shadow-2xl max-w-[500px] w-full">
        <div className="rounded-full w-40 h-40 flex items-center justify-center border-[6px] border-yellow-400 bg-white overflow-hidden shrink-0">
          <Image
            src="/Group 22.png"
            alt="Karakter Quiz"
            width={150}
            height={150}
            objectFit="contain"
          />
        </div>

        <div className="text-center md:text-left flex-1">
          {loading ? (
            <p className="text-black text-lg">Memuat skor...</p>
          ) : (
            <>
              <p className="text-black font-medium text-lg mb-1">
                Skor kamu adalah
              </p>
              <h1 className="text-5xl font-extrabold text-black mb-4">
                {score}
              </h1>
              <button
                onClick={handleFinish}
                className="bg-[#CDB4FF] hover:bg-[#b89fff] text-white font-bold py-2 px-8 rounded-full transition duration-200"
              >
                Selesai
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
