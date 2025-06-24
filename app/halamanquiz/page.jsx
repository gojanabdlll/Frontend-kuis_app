"use client";
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("user"); // default role
  const router = useRouter();

  useEffect(() => {
    // Ambil data role dari localStorage
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }

    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/quiz");
        const data = await res.json();
        setQuestions(data);
        console.log(data);
      } catch (error) {
        console.error("Gagal mengambil data soal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const quizCategories = [
    {
      id: 1,
      title: "matematika",
      display: "MATEMATIKA",
      description: "Uji kemampuan matematika dan lihat seberapa jago kamu!",
      color: "bg-yellow-400",
      textColor: "text-black",
    },
    {
      id: 2,
      title: "sains",
      display: "SAINS",
      description:
        "Jelajahi dunia sains dan uji pengetahuanmu tentang alam semesta.",
      color: "bg-teal-300",
      textColor: "text-black",
    },
    {
      id: 3,
      title: "bahasa inggris",
      display: "B. INGGRIS",
      description:
        "Tingkatkan kemampuan bahasa Inggrismu dan ketahui seberapa fasih kamu!",
      color: "bg-purple-500",
      textColor: "text-white",
    },
    {
      id: 4,
      title: "sejarah",
      display: "SEJARAH",
      description:
        "Tes pengetahuanmu tentang peristiwa dan tokoh sejarah dunia.",
      color: "bg-white",
      textColor: "text-black",
    },
  ];

  const handleStartQuiz = (categoryName) => {
    router.push(`/soalquiz?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div>
      <div
        className="relative w-full min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/img-001-black.png')",
          backgroundColor: "#A259FF",
          backgroundAttachment: "scroll",
        }}
      >
        {/* Custom Back Button */}
        <div
          className="absolute top-5 left-5 w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer z-10"
          onClick={() => history.back()}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
          </svg>
        </div>

        {/* Main Card */}
        <div className="relative z-10 max-w-6xl mx-auto mt-12 bg-black rounded-3xl p-10 text-white">
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <h1 className="text-3xl font-extrabold leading-snug">
              Temukan Dirimu Melalui Kuis <br />
              Menarik Ini!
            </h1>
            <div className="flex items-center space-x-4">
              {role === "admin" && (
                <button
                  onClick={() => router.push("/tambahsoal")}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition"
                >
                  Tambah Soal
                </button>
              )}
              <Star size={28} fill="white" className="text-purple-400" />
            </div>
          </div>

          {/* Quiz Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {quizCategories.map((cat) => (
              <div
                key={cat.id}
                className={`${cat.color} ${cat.textColor} rounded-2xl p-5 flex flex-col justify-between min-h-[240px] shadow-lg`}
              >
                <div>
                  <h2 className="text-xl font-extrabold mb-2">{cat.display}</h2>
                  <p className="text-sm">{cat.description}</p>
                </div>
                <button
                  onClick={() => handleStartQuiz(cat.title)} // <-- pakai title (kategori DB)
                  className="mt-5 bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition"
                >
                  Mulai
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Decorations */}
        <div className="absolute bottom-24 left-4">
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-teal-300"></div>
        </div>
        <div className="absolute bottom-12 right-4">
          <div className="w-8 h-8 border-4 border-yellow-300 rounded-tr-full border-l-transparent border-b-transparent rotate-[135deg]"></div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
