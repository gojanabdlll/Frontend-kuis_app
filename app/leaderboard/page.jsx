"use client";

import Link from "next/link";

const RankingPage = () => {
  const rankingData = [
    { rank: 1, name: "Rexxy", score: 1500, isFirst: true },
    { rank: 2, name: "arifubila", score: 1400, isFirst: false },
    { rank: 3, name: "gojan", score: 1100, isFirst: false },
    { rank: 4, name: "wijaya", score: 500, isFirst: false },
    { rank: 5, name: "Ferry", score: 250, isFirst: false },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: "url('/img-001.png')",
        backgroundColor: "#8B5CF6", // fallback warna ungu
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "multiply", // blend gambar + warna dasar
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <nav className="mx-auto mt-4 max-w-7xl w-295 bg-black rounded-xl px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="text-2xl font-black text-white">GoBiQuest</div>
          <div className="hidden md:flex gap-8 text-white font-medium text-sm">
            <a href="#" className="hover:underline">
              Kategori Pelajaran
            </a>
            <a href="leaderboard" className="hover:underline">
              Tampilan Skor
            </a>
          </div>
          <div className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
            <span>250 Point</span>
            <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-6 py-8">
        <h1 className="text-white text-5xl font-bold mb-12">Ranking</h1>

        <div className="w-295 max-w-7xl space-y-4">
          {rankingData.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center rounded-2xl p-6 ${
                player.isFirst
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black"
                  : "bg-black text-white"
              }`}
            >
              {/* Rank Number */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl font-bold">
                {player.rank}
              </div>

              {/* Player Name */}
              <div className="flex-grow ml-4 text-2xl font-bold">
                {player.name}
              </div>

              {/* Score */}
              <div className="flex-shrink-0 text-2xl font-bold">
                {player.score}
              </div>
            </div>
          ))}
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
