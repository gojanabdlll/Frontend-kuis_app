"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";

export default function QuizPage() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = {
    number: 1,
    text: "Apa hasil dari 15 x 6?",
    options: [
      { id: "a", text: "90" },
      { id: "b", text: "80" },
      { id: "c", text: "70" },
      { id: "d", text: "100" },
    ],
  };

  const handleAnswerSelect = (optionId) => {
    setSelectedAnswer(optionId);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      console.log("Jawaban dipilih:", selectedAnswer);
    }
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/img-001-black.png')",
        backgroundColor: "#A259FF",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Kartu Soal */}
      <div className="bg-[#FFD400] rounded-[16px] shadow-xl px-6 py-6 w-[90%] max-w-xl relative z-10">
        {/* Tombol Back */}
        <button className="absolute top-4 left-4 w-8 h-8 bg-black rounded-md flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>

        {/* Pertanyaan */}
        <div className="pt-10 pb-6">
          <h2 className="text-lg font-bold text-black mb-4">
            {question.number}. {question.text}
          </h2>

          {/* Pilihan Jawaban */}
          <ul className="space-y-2 pl-2">
            {question.options.map((option) => (
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

        {/* Tombol Lanjut */}
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
            Lanjut
          </button>
        </div>
      </div>
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
    </div>
  );
}
