"use client";
import React, { useRef, useEffect, useState } from "react";
import { BookOpen, Award, User, Menu, X } from "lucide-react";
import Link from "next/link";

const GoBiQuestUI = () => {
  const scrollRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    let scrollAmount = 0;

    const scrollInterval = setInterval(() => {
      if (container) {
        scrollAmount += 1;
        container.scrollLeft += 1;

        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
          scrollAmount = 0;
        }
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-purple-600 text-white font-sans">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4">
        <nav className="mx-auto mt-4 max-w-7xl w-full bg-black rounded-xl px-6 py-4 flex items-center justify-between shadow-lg relative">
          {/* Logo */}
          <Link href="/dashboardutama">
            <div className="text-2xl font-black text-white cursor-pointer">
              GoBiQuest
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-white font-medium text-sm">
            <a href="./halamanquiz" className="hover:underline">
              Kategori Pelajaran
            </a>
            <a href="../leaderboard" className="hover:underline">
              Tampilan Skor
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div className="absolute top-full right-4 mt-2 w-full left-0 bg-black text-white rounded-lg shadow-lg z-10 flex flex-col md:hidden">
              <a
                href="./halamanquiz"
                className="px-4 py-2 hover:bg-gray-100 border-b"
              >
                Kategori Pelajaran
              </a>
              <a href="../leaderboard" className="px-4 py-2 hover:bg-gray-100">
                Tampilan Skor
              </a>
            </div>
          )}

          {/* Poin Badge (Hanya Desktop) */}
          <div className="hidden md:flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold ml-4">
            <span>250 Point</span>
            <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="text-center">
        <div className="w-full">
          <div
            className="w-full min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat px-4 py-10"
            style={{
              backgroundImage: "url('/img-001.png')",
              backgroundAttachment: "scroll",
            }}
          >
            <img
              src="/img-002.png"
              alt="Go Bi Quest"
              className="w-[80%] max-w-md md:max-w-3xl h-auto mb-6"
            />
            <a
              href="/halamanquiz"
              className="inline-block bg-white text-black px-8 py-3 md:px-10 md:py-4 rounded-full font-bold text-base md:text-lg shadow-md hover:bg-gray-100 transition duration-200"
            >
              Mulai
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 px-6 bg-purple-600">
        <div className="max-w-7xl mx-auto bg-black text-white rounded-xl p-8 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <h2 className="text-2xl font-bold leading-snug">
              Kenapa harus <br /> Kuis Kami?
            </h2>
          </div>
          <div>
            <ul className="list-disc list-inside space-y-3 text-sm">
              <li>
                <span className="font-semibold">
                  Menyenangkan dan Interaktif:
                </span>{" "}
                Setiap kuis dirancang untuk memberikan pengalaman yang
                menyenangkan.
              </li>
              <li>
                <span className="font-semibold">Hasil yang Menarik:</span>{" "}
                Dapatkan hasil yang bisa kamu bagikan dengan teman-temanmu!
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-6 bg-[#A259FF] text-white bg-purple-600">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full max-w-sm mx-auto">
            <img
              src="/bg-emot-rmv.png"
              alt="Ilustrasi Kuis"
              className="w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Cara kerja kuis</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">1. Pilih Kuis</h3>
                <p className="opacity-90">
                  Telusuri berbagai kategori dan pilih kuis yang menarik
                  perhatianmu.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">2. Jawab pertanyaan</h3>
                <p className="opacity-90">
                  Ikuti instruksi dan jawab setiap pertanyaan dengan jujur.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">3. Dapatkan Hasil</h3>
                <p className="opacity-90">
                  Setelah selesai, lihat hasilmu dan temukan apa yang mereka
                  katakan tentang dirimu!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 px-6 bg-purple-600">
        <div className="max-w-7xl mx-auto bg-black text-white rounded-t-[60px] p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-8">Testimoni</h2>

          <div className="overflow-hidden relative">
            <div className="flex gap-8 animate-scroll-x whitespace-nowrap">
              {[...Array(2)].flatMap((_, round) =>
                [
                  {
                    name: "Arifubila",
                    comment: "Kuisnya kreatif, cocok untuk mengisi waktu!",
                    img: "/arif.png",
                  },
                  {
                    name: "Gojan Abdullah",
                    comment:
                      "Kuis ini jadi favorit saya! Selalu ingin coba lagi.",
                    img: "/gojan.png",
                  },
                  {
                    name: "Ferry",
                    comment: "Belajarnya jadi fun dan nggak membosankan!",
                    img: "/fery.png",
                  },
                ].map((user, i) => (
                  <div
                    key={`${user.name}-${round}-${i}`}
                    className="min-w-[280px] inline-flex items-center gap-4 bg-white text-black rounded-xl px-5 py-4 shadow-md"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-r from-purple-500 to-cyan-400">
                        <div className="w-full h-full rounded-full bg-white overflow-hidden">
                          <img
                            src={user.img}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-base">{user.name}</h3>
                      <p className="text-sm italic">"{user.comment}"</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-10 text-center">
            <a href="../halamanquiz">
              <button className="bg-purple-500 text-white px-6 py-2 rounded-full font-semibold text-sm uppercase hover:bg-purple-400 transition">
                Mainkan Kuis
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GoBiQuestUI;
