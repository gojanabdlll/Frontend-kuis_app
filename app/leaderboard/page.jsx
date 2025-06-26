"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const categories = ["matematika", "sains", "bahasa inggris", "sejarah"];

const RankingPage = () => {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topScore, setTopScore] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/score/leaderboard?category=${encodeURIComponent(
            selectedCategory
          )}`
        );
        const data = await res.json();

        if (Array.isArray(data.leaderboard)) {
          setRankingData(data.leaderboard);
          setTopScore(data.leaderboard[0] || null);
        } else {
          setRankingData([]);
        }
      } catch (err) {
        console.error("Gagal mengambil leaderboard:", err);
        setRankingData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [selectedCategory]);

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

          <div className="hidden md:flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold ml-4">
            <span>{topScore ? `${topScore.score} Point` : "0 Point"}</span>
            <div
              className="w-6 h-6 bg-gray-600 rounded-full"
              title={topScore?.name || "Top Player"}
            ></div>
          </div>
        </nav>
      </div>

      {/* Pilih Kategori */}
      <div className="flex justify-center mt-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white text-black font-bold"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-6 py-8">
        <h1 className="text-white text-5xl font-bold mb-4">
          Ranking: {selectedCategory}
        </h1>

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
    </div>
  );
};

export default RankingPage;
