import { useState } from "react";
import { KIBO } from "@/data/curriculum";

const RankScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Weekly", "Friends", "Global"];

  const leaderboard = [
    { rank: "🥇", name: "Alex K.", level: "Level 4", xp: 840, avatar: "🦊" },
    { rank: "🥈", name: "Sara M.", level: "Level 3", xp: 720, avatar: "🐼" },
    { rank: "🥉", name: "James L.", level: "Level 3", xp: 650, avatar: "🐯" },
    { rank: "4", name: "You", level: "Level 1", xp: 260, avatar: null, isMe: true },
    { rank: "5", name: "Mia R.", level: "Level 1", xp: 180, avatar: "🐸" },
  ];

  return (
    <>
      <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center justify-center gap-3.5">
        <span className="text-lg font-black text-foreground">🏆 Leaderboard</span>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="p-[18px] pb-[100px]">
          {/* Hero */}
          <div className="rounded-[18px] p-[22px] text-center mb-4"
            style={{ background: "linear-gradient(135deg, #7c3aed, #c084fc)" }}>
            <div className="text-5xl font-black text-primary-foreground">#4</div>
            <div className="text-sm text-primary-foreground/85 font-bold">Your global rank this week</div>
          </div>

          {/* Tabs */}
          <div className="flex bg-card rounded-xl p-1 mb-4 border-[1.5px] border-border">
            {tabs.map((t, i) => (
              <button key={t} onClick={() => setActiveTab(i)}
                className={`flex-1 py-2 rounded-[10px] text-[13px] font-extrabold transition-all
                  ${i === activeTab ? "bg-kibo-green text-primary-foreground" : "text-muted-foreground"}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Leaderboard */}
          <div className="bg-card rounded-[18px] border-[1.5px] border-border overflow-hidden">
            {leaderboard.map((r, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3.5 border-b border-border last:border-0
                ${r.isMe ? "bg-kibo-green/8" : ""}`}>
                <span className="w-[26px] text-[15px] font-black text-muted-foreground/50 text-center shrink-0">{r.rank}</span>
                {r.isMe ? (
                  <img src={KIBO.wave} alt="You" className="w-9 h-9 object-contain" />
                ) : (
                  <span className="text-[28px]">{r.avatar}</span>
                )}
                <div className="flex-1">
                  <div className="text-sm font-extrabold text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground font-bold">{r.level}</div>
                </div>
                <span className="text-[15px] font-black text-kibo-green">{r.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RankScreen;
