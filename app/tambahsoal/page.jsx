"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, CheckCircle, X } from "lucide-react";

export default function QuizFormPage() {
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleSubmit = () => {
    if (!selectedQuiz || !question || !answer || !correctAnswer) {
      showToastMessage("Mohon lengkapi semua field", "error");
      return;
    }

    console.log({
      selectedQuiz,
      question,
      answer,
      correctAnswer,
    });

    setSelectedQuiz("");
    setQuestion("");
    setAnswer("");
    setCorrectAnswer("");
    showToastMessage("Soal berhasil ditambahkan!");
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage: "url('/img-001-black.png')",
        backgroundColor: "#A259FF",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg border transform transition-all duration-300 ${
              toastType === "success"
                ? "bg-green-500 border-green-400 text-white"
                : "bg-red-500 border-red-400 text-white"
            }`}
            style={{
              animation: showToast ? "slideInFromTop 0.3s ease-out" : "none",
            }}
          >
            {toastType === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <X size={20} />
            )}
            <span className="font-medium">{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-2 hover:opacity-70 transition-opacity"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* FORM WRAPPER FULL WIDTH */}
      <div className="w-full px-4 md:px-8 lg:px-20">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="flex items-center mb-6">
            <button
              onClick={handleBack}
              className="p-2 bg-black text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="w-full bg-black rounded-2xl p-8 shadow-2xl">
          <h1 className="text-white text-2xl font-bold text-center mb-8">
            Tambah Soal
          </h1>

          <div className="space-y-6">
            {/* Quiz Selection */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                Pilih Pelajaran Kuis
              </label>
              <select
                value={selectedQuiz}
                onChange={(e) => setSelectedQuiz(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-lg border-0 focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900"
              >
                <option value="">Pilih Kuis</option>
                <option value="matematika">Matematika</option>
                <option value="sains">Sains</option>
                <option value="bahasa-inggris">B.Inggris</option>
                <option value="sejarah">Sejarah</option>
              </select>
            </div>

            {/* Question Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                Tambah Soal
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-lg border-0 focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 resize-none"
                rows="4"
                placeholder="Masukkan pertanyaan soal..."
              />
            </div>

            {/* Answer Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Tambah Jawaban
                </label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg border-0 focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 resize-none"
                  rows="4"
                  placeholder="Masukkan pilihan jawaban..."
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  Tambah Jawaban Benar
                </label>
                <textarea
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg border-0 focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 resize-none"
                  rows="4"
                  placeholder="Masukkan jawaban yang benar..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
