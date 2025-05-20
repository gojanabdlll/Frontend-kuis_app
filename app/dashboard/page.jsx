"use client";
import React, { useRef, useEffect } from "react";
import { BookOpen, Award, User, Menu } from "lucide-react";

const GoBiQuestUI = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    let scrollAmount = 0;

    const scrollInterval = setInterval(() => {
      if (container) {
        scrollAmount += 1;
        container.scrollLeft += 1;

        // Reset scroll jika mencapai ujung
        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
          scrollAmount = 0;
        }
      }
    }, 20); // atur kecepatan scroll

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-purple-600 text-white font-sans">
      {/* Navbar */}
      <nav className="mx-auto mt-4 max-w-7xl w-full bg-black rounded-full px-6 py-2 flex items-center justify-between shadow-lg">
        <div className="text-2xl font-black text-white">GoBiQuest</div>
        <div className="hidden md:flex gap-8 text-white font-medium text-sm">
          <a href="#" className="hover:underline">
            Kategori Pelajaran
          </a>
          <a href="#" className="hover:underline">
            Tampilan Skor
          </a>
        </div>
        <a
          href="./login"
          className="bg-purple-500 hover:bg-purple-400 text-white px-4 py-1.5 text-sm rounded-full font-semibold flex items-center gap-1"
        >
          Login <span className="text-xs">{`>`}</span>
        </a>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 flex flex-wrap justify-center items-center gap-3 text-5xl font-extrabold leading-tight">
            <span className="bg-yellow-300 px-2 py-1 rounded rotate-[-3deg] text-black text-sm md:text-lg">
              Sains
            </span>
            <span className="text-white">Go</span>
            <span className="text-white">Bi</span>
            <span className="bg-pink-300 px-2 py-1 rounded rotate-2 text-black text-sm md:text-lg">
              B. Inggris
            </span>
            <div className="w-full text-[60px] text-black -mt-2">Quest</div>
            <span className="bg-blue-200 px-2 py-1 rounded text-black text-sm md:text-lg">
              Matematika
            </span>
            <span className="bg-red-200 px-2 py-1 rounded text-black text-sm md:text-lg">
              Sejarah
            </span>
          </div>
          <a
            href="./login"
            className="inline-block bg-white text-black px-10 py-3 rounded-full font-bold text-lg shadow-md hover:bg-gray-100"
          >
            Mulai
          </a>
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
          {/* Gambar Ilustrasi */}
          <div className="relative w-full max-w-sm mx-auto">
            <img
              src="/bg-emot-rmv.png"
              alt="Ilustrasi Kuis"
              className="w-full h-auto"
            />
          </div>

          {/* Teks Penjelasan */}
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

          {/* Marquee */}
          <div className="overflow-hidden relative">
            <div className="flex gap-8 animate-scroll-x whitespace-nowrap">
              {[...Array(2)].flatMap((_, round) =>
                [
                  {
                    name: "Arifubila",
                    comment: "Sangat menyenangkan dan bikin penasaran!",
                    img: "/.png",
                  },
                  {
                    name: "Gojan Abdullah",
                    comment: "Kuisnya kreatif, cocok untuk mengisi waktu!",
                    img: "/.png",
                  },
                  {
                    name: "Ferry",
                    comment:
                      "Kuis ini jadi favorit saya! Selalu ingin coba lagi.",
                    img: "/.png",
                  },
                  {
                    name: "Siti",
                    comment: "Belajarnya jadi fun dan nggak membosankan!",
                    img: "/.png",
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

          {/* Tombol Mainkan Kuis */}
          <div className="mt-10 text-center">
            <a href="./login">
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
