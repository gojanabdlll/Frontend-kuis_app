"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const RankingPage = () => {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topScore, setTopScore] = useState(null); // ⬅️ Tambahan state untuk skor tertinggi

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/score/leaderboard");
        const data = await res.json();
        console.log("Respon leaderboard:", data);

        if (Array.isArray(data)) {
          setRankingData(data);
          if (data.length > 0) {
            setTopScore(data[0]); // Ambil skor tertinggi
          }
        } else {
          console.error("Data leaderboard tidak dalam format array.");
          setRankingData([]);
        }
      } catch (err) {
        console.error("Gagal mengambil leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: "url('/img-001.png')",
        backgroundColor: "#8B5CF6",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "multiply",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <nav className="mx-auto mt-4 max-w-7xl w-295 bg-black rounded-xl px-6 py-3 flex items-center justify-between shadow-lg">
          <Link href="/dashboardutama">
            <div className="text-2xl font-black text-white cursor-pointer">
              GoBiQuest
            </div>
          </Link>

          <div className="hidden md:flex gap-8 text-white font-medium text-sm">
            <a href="/halamanquiz" className="hover:underline">
              Kategori Pelajaran
            </a>
            <a href="/leaderboard" className="hover:underline">
              Tampilan Skor
            </a>
          </div>

          {/* Badge skor tertinggi */}
          <div className="hidden md:flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold ml-4">
            <span>{topScore ? `${topScore.score} Point` : "0 Point"}</span>
            <div
              className="w-6 h-6 bg-gray-600 rounded-full"
              title={topScore?.name || "Top Player"}
            ></div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-6 py-8">
        <h1 className="text-white text-5xl font-bold mb-12">Ranking</h1>

        <div className="w-295 max-w-7xl space-y-4">
          {loading ? (
            <p className="text-white">Memuat data leaderboard...</p>
          ) : rankingData.length === 0 ? (
            <p className="text-white">Belum ada data skor.</p>
          ) : (
            rankingData.map((player, index) => (
              <div
                key={index}
                className={`flex items-center rounded-2xl p-6 ${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black"
                    : "bg-black text-white"
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl font-bold">
                  {index + 1}
                </div>
                <div className="flex-grow ml-4 text-2xl font-bold">
                  {player.name}
                </div>
                <div className="flex-shrink-0 text-2xl font-bold">
                  {player.score}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-[20%] right-[10%] text-lime-400 text-4xl z-[-1]">
        ★
      </div>
      <div className="absolute bottom-[25%] left-[15%] w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[40px] border-b-lime-400 rotate-[-30deg] z-[-1]" />
      <div className="absolute top-[60%] right-[25%] w-8 h-8 border-6 border-orange-400 rounded-full z-[-1]" />
      <div className="absolute bottom-[10%] right-[5%] text-pink-400 text-3xl z-[-1]">
        ★
      </div>
    </div>
  );
};

export default RankingPage;
