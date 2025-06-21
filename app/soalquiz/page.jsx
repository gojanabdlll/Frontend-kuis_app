"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/quiz");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0 && data[0].questions) {
          const fetchedQuestions = data[0].questions.map((q, index) => ({
            number: index + 1,
            text: q.question,
            options: q.options.map((opt, i) => ({
              id: String.fromCharCode(97 + i), // a, b, c, d
              text: opt,
            })),
          }));
          setQuestions(fetchedQuestions);
        } else {
          console.warn("Format data tidak sesuai", data);
        }
      } catch (err) {
        console.error("Gagal mengambil data soal:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerSelect = (optionId) => {
    setSelectedAnswer(optionId);
  };

  const handleNext = async () => {
    if (selectedAnswer) {
      const newAnswers = {
        ...answers,
        [currentQuestionIndex]: selectedAnswer,
      };
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        console.log("Selesai. Jawaban:", newAnswers);

        // 🔐 Ambil token dari localStorage atau session
        const token = localStorage.getItem("token");

        try {
          const res = await fetch("http://localhost:5000/api/score/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              quizId: "6803751a225adeb7c18087fa", // <- Ganti dengan ID kuis yang aktif
              answers: Object.entries(newAnswers).map(([index, optionId]) => ({
                questionIndex: parseInt(index),
                selectedOption: optionId,
              })),
            }),
          });

          const data = await res.json();

          if (!res.ok) throw new Error(data.message || "Gagal submit jawaban");

          // Jika sukses baru redirect
          router.push("/hasilquiz");
        } catch (error) {
          console.error("Gagal kirim jawaban:", error.message);
          alert("Gagal submit jawaban. Coba lagi.");
        }
      }
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (loading) {
    return <div className="text-white p-8">Loading soal...</div>;
  }

  if (!currentQuestion) {
    return <div className="text-white p-8">Soal tidak ditemukan.</div>;
  }

  return (
    <div
      className="relative w-full min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/img-001-black.png')",
        backgroundColor: "#A259FF",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="bg-[#FFD400] rounded-[16px] shadow-xl px-6 py-6 w-[90%] max-w-xl relative z-10">
        {currentQuestionIndex > 0 && (
          <button
            onClick={() => {
              const prevIndex = currentQuestionIndex - 1;
              setCurrentQuestionIndex(prevIndex);
              setSelectedAnswer(answers[prevIndex] || null);
            }}
            className="absolute top-4 left-4 w-8 h-8 bg-black rounded-md flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
        )}

        <div className="pt-10 pb-6">
          <h2 className="text-lg font-bold text-black mb-4">
            {currentQuestion.number}. {currentQuestion.text}
          </h2>

          <ul className="space-y-2 pl-2">
            {currentQuestion.options.map((option) => (
              <li
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`cursor-pointer px-4 py-2 rounded-md font-semibold transition duration-200 ${
                  selectedAnswer === option.id
                    ? "bg-orange-500 text-white scale-[1.02]"
                    : "bg-transparent text-black hover:bg-yellow-200"
                }`}
              >
                {option.id}) {option.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`px-6 py-2 rounded-full font-bold transition ${
              selectedAnswer
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-black text-white cursor-not-allowed"
            }`}
          >
            {currentQuestionIndex < questions.length - 1 ? "Lanjut" : "Selesai"}
          </button>
        </div>
      </div>
    </div>
  );
}
