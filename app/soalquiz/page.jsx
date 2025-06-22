"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [quizId, setQuizId] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/quiz?category=${category}`
        );
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0 && data[0].questions) {
          // Simpan quizId ke state dan localStorage
          setQuizId(data[0]._id);
          localStorage.setItem("quizId", data[0]._id);

          const fetchedQuestions = data[0].questions.map((q, index) => ({
            number: index + 1,
            text: q.question,
            options: q.options.map((opt, i) => ({
              id: String.fromCharCode(65 + i), // A, B, C, D
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

    if (category) {
      fetchQuestions();
    }
  }, [category]);

  const handleAnswerSelect = (optionId) => {
    setSelectedAnswer(optionId);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
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
        // Simpan ke localStorage sebelum redirect ke hasil
        const answerArray = Object.values(newAnswers);
        localStorage.setItem("answers", JSON.stringify(answerArray));

        router.push("/hasilquiz"); // ⬅️ langsung ke hasil, submit dilakukan di halaman hasil
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
        {/* 🔙 Tombol Back di dalam box */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="p-2 bg-black text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="pb-6">
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
                    ? "bg-purple-700 text-white scale-[1.02]"
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
