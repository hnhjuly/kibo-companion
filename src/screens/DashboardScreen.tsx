import { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { KIBO, CURRICULUM } from "@/data/curriculum";
import { getXPForLevel } from "@/lib/progress";
import PreloadedImg from "@/components/PreloadedImg";
import NotoEmoji from "@/components/NotoEmoji";
import { motion } from "framer-motion";
import {
  BookOpen, BarChart3, ChevronRight
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, Filler, Tooltip, Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, Filler, Tooltip, Legend
);

// ─── Types ───────────────────────────────────────────────
type Period = "7d" | "30d" | "all";
type GameMode = "all" | "speed" | "flash" | "daily" | "pairs";

// ─── Helpers ─────────────────────────────────────────────

function getLast(n: number): string[] {
  const dates: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

function dayLabel(dateStr: string): string {
  return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(dateStr).getDay()];
}

function shortLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth()+1}/${d.getDate()}`;
}

const MODULES: { e: string; n: string; id: string; color: string; levelIdx: number }[] = [
  { e: "🤖", n: "AI Basics",     id: "m1", color: "#86efac", levelIdx: 0 },
  { e: "💬", n: "Talking to AI", id: "m2", color: "#6ee7b7", levelIdx: 1 },
  { e: "🛠️", n: "AI Tools",     id: "m3", color: "#93c5fd", levelIdx: 2 },
  { e: "🌍", n: "AI Daily Life", id: "m4", color: "#fde68a", levelIdx: 3 },
];

// ─── Helper components ───────────────────────────────────

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="flex-1 h-[7px] rounded-full bg-[#f6f7fa] overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

function MetricCard({ iconBg, iconColor, icon: Icon, badge, badgeBg, badgeColor, val, label, delta }: {
  iconBg: string; iconColor: string; icon: React.ElementType;
  badge: string; badgeBg: string; badgeColor: string;
  val: string; label: string; delta: string;
}) {
  return (
    <div className="bg-white border border-[#f0f2f5] rounded-[14px] p-[17px] hover:-translate-y-[2px] hover:shadow-lg transition-all duration-150">
      <div className="flex items-center justify-between mb-[10px]">
        <div className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center" style={{ background: iconBg }}>
          <Icon size={16} color={iconColor} strokeWidth={2.2} />
        </div>
        <span className="text-[10px] font-extrabold px-2 py-[2px] rounded-full" style={{ background: badgeBg, color: badgeColor }}>
          {badge}
        </span>
      </div>
      <div className="text-[28px] font-black text-[#111827] leading-none mb-[3px]">{val}</div>
      <div className="text-[11.5px] font-semibold text-[#6b7280] mb-[6px]">{label}</div>
      <div className="flex items-center gap-[3px] text-[11px] font-bold text-[#16a34a]">
        <ChevronRight size={10} className="-rotate-90 shrink-0" strokeWidth={2.5} />
        {delta}
      </div>
    </div>
  );
}

// ─── Main Dashboard Screen ────────────────────────────────
const DashboardScreen = () => {
  const { progress } = useApp();
  const [period, setPeriod] = useState<Period>("7d");
  const [gameMode, setGameMode] = useState<GameMode>("all");

  // ─── Computed data from real progress ───────────────────
  const completedSet = new Set(progress.completedLessons);
  const allLevels = CURRICULUM.levels;
  const totalLessons = allLevels.flatMap(l => l.lessons).length;

  // Module progress
  const moduleProgress = allLevels.map(lv => {
    const total = lv.lessons.length;
    const done = lv.lessons.filter(l => completedSet.has(l.id)).length;
    return { pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  });

  // Overall accuracy
  const accuracy = progress.totalAnswered > 0
    ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
    : 0;

  // Per-module accuracy (from lessonAccuracy)
  const topicAccuracy = useMemo(() => {
    return allLevels.slice(0, 6).map(lv => {
      let correct = 0, total = 0;
      lv.lessons.forEach(l => {
        const acc = progress.lessonAccuracy?.[l.id];
        if (acc) { correct += acc.correct; total += acc.total; }
      });
      return {
        n: lv.title || lv.lessons[0]?.title || "Topic",
        p: total > 0 ? Math.round((correct / total) * 100) : 0,
      };
    });
  }, [progress.lessonAccuracy]);

  // XP chart data based on period
  const periodDays = period === "7d" ? 7 : period === "30d" ? 30 : Math.max(7, (progress.activeDates?.length || 0) + 3);
  const periodDates = getLast(periodDays);
  const xpPerDay = periodDates.map(d => progress.dailyXP?.[d] || 0);
  const periodXPTotal = xpPerDay.reduce((a, b) => a + b, 0);
  const xpLabels = periodDays <= 7
    ? periodDates.map(dayLabel)
    : periodDates.map(shortLabel);

  // Streak
  const streak = progress.streak;
  const bestStreak = progress.bestStreak || streak;

  // Kibo mood
  const kiboMood = streak >= 7 ? KIBO.streak7 : streak >= 3 ? KIBO.streak3 : streak >= 1 ? KIBO.happy : KIBO.sad;
  const kiboMsg = streak >= 7
    ? `${streak} days in a row! You're unstoppable.`
    : streak >= 3
    ? `${streak} day streak! Building great habits.`
    : streak >= 1
    ? "Good start! Keep showing up every day."
    : "Missed a day. Let's get back on track!";

  // Streak calendar (last 21 days)
  const calDates = getLast(21);
  const activeSet = new Set(progress.activeDates || []);
  const today = new Date().toISOString().slice(0, 10);
  const calPattern = calDates.map(d => d === today ? 2 : activeSet.has(d) ? 1 : 0);

  // XP level
  const xpForLevel = getXPForLevel(progress.level);
  const xpPct = Math.min(100, Math.round((progress.xp / xpForLevel) * 100));

  // Badges (computed from real data)
  const badges = useMemo(() => [
    { e: "🔥", n: "7-day streak",  on: bestStreak >= 7 },
    { e: "⭐", n: "First lesson",  on: progress.completedLessons.length >= 1 },
    { e: "⚡", n: "Speed demon",   on: (progress.gameScores?.speed?.length || 0) >= 3 },
    { e: "🎯", n: "Daily warrior", on: (progress.gameScores?.daily?.length || 0) >= 5 },
    { e: "🏆", n: "AI Master",     on: progress.completedLessons.length >= totalLessons },
    { e: "💯", n: "Perfectionist", on: accuracy === 100 && progress.totalAnswered >= 10 },
  ], [bestStreak, progress.completedLessons, progress.gameScores, accuracy, progress.totalAnswered, totalLessons]);

  const badgesEarned = badges.filter(b => b.on).length;

  // Game mode data (from real scores)
  const gs = progress.gameScores || { speed: [], flash: [], daily: [], pairs: [] };
  const gameData = useMemo(() => {
    const last7 = getLast(7);
    const scoresByDay = (arr: { date: string; score: number }[]) =>
      last7.map(d => arr.filter(s => s.date === d).reduce((sum, s) => sum + s.score, 0));

    const allModeData = {
      labels: ["Speed Round", "Flashcards", "Daily Challenge", "Match Pairs"],
      data: [
        gs.speed.reduce((s, e) => s + e.score, 0),
        gs.flash.reduce((s, e) => s + e.score, 0),
        gs.daily.reduce((s, e) => s + e.score, 0),
        gs.pairs.reduce((s, e) => s + e.score, 0),
      ],
      colors: ["#bbf7d0", "#93c5fd", "#fde68a", "#c4b5fd"],
      type: "bar" as const,
    };

    const modeMap: Record<GameMode, typeof allModeData> = {
      all: allModeData,
      speed: { labels: last7.map(dayLabel), data: scoresByDay(gs.speed), colors: ["#bbf7d0"], type: "line" as const },
      flash: { labels: last7.map(dayLabel), data: scoresByDay(gs.flash), colors: ["#93c5fd"], type: "line" as const },
      daily: { labels: last7.map(dayLabel), data: scoresByDay(gs.daily), colors: ["#fde68a"], type: "bar" as const },
      pairs: { labels: last7.map(dayLabel), data: scoresByDay(gs.pairs), colors: ["#c4b5fd"], type: "line" as const },
    };
    return modeMap;
  }, [gs]);

  const gd = gameData[gameMode];

  // Activity log
  const recentActivity = (progress.activityLog || []).slice(0, 5);

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 400, easing: "easeOutQuart" as const },
    plugins: { legend: { display: false }, tooltip: { bodyFont: { family: "Nunito" }, titleFont: { family: "Nunito" } } },
    scales: {
      x: { ticks: { color: "rgba(0,0,0,.3)", font: { size: 11, family: "Nunito", weight: "bold" as const } }, grid: { display: false } },
      y: { ticks: { color: "rgba(0,0,0,.3)", font: { size: 10, family: "Nunito" } }, grid: { color: "rgba(0,0,0,.04)" }, beginAtZero: true },
    },
  };

  // XP chart
  const xpChartData = {
    labels: xpLabels,
    datasets: [
      { label: "XP", data: xpPerDay, backgroundColor: "#bbf7d0", borderRadius: 5, borderSkipped: false as const },
      { label: "Goal", data: xpPerDay.map(() => 50), type: "line" as const, borderColor: "#d1d5db", borderWidth: 1.5, borderDash: [4, 4], pointRadius: 0, fill: false, tension: 0 },
    ],
  };

  // Game chart
  const isAllMode = gameMode === "all";
  const gameChartData = {
    labels: gd.labels,
    datasets: [{
      label: "Score",
      data: gd.data,
      backgroundColor: isAllMode ? gd.colors : `${gd.colors[0]}55`,
      borderColor: isAllMode ? gd.colors : gd.colors[0],
      borderWidth: isAllMode ? 0 : 2,
      borderRadius: isAllMode ? 5 : 0,
      fill: !isAllMode,
      tension: 0.35,
      pointRadius: !isAllMode ? 4 : 0,
      pointBackgroundColor: !isAllMode ? gd.colors[0] : undefined,
      pointBorderColor: "transparent",
    }],
  };

  // Time ago helper
  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  const actColor = (type: string) =>
    type === "lesson" ? "#86efac" : type === "game" ? "#93c5fd" : type === "badge" ? "#fde68a" : "#c4b5fd";

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f6f7fa]" style={{ fontFamily: "'Nunito', sans-serif" }}>

      {/* Topbar */}
      <header className="bg-white border-b-[1.5px] border-[#f0f2f5] px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div>
          <div className="text-[15px] font-black text-[#111827]">Dashboard</div>
          <div className="text-[11px] font-semibold text-[#9ca3af]">
            {new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
        <div className="flex bg-[#f6f7fa] border-[1.5px] border-[#e5e7eb] rounded-[9px] p-[3px] gap-[2px]">
          {(["7d","30d","all"] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`text-[11.5px] font-bold px-[13px] py-[4px] rounded-[7px] transition-all duration-100 ${
                period === p ? "bg-white text-[#111827] shadow-sm" : "text-[#6b7280]"
              }`}
            >
              {p === "7d" ? "7 days" : p === "30d" ? "30 days" : "All time"}
            </button>
          ))}
        </div>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 pb-12" style={{ scrollbarWidth: "none" }}>

        {/* Kibo mood banner (mobile) */}
        <div className="md:hidden flex items-center gap-3 bg-[#f0fff4] rounded-[12px] p-3 mb-4 border border-[#bbf7d0]/40">
          <PreloadedImg src={kiboMood} alt="Kibo" className="w-10 h-10 object-contain shrink-0" />
          <div>
            <div className="text-[12px] font-bold text-[#166534] leading-[1.45]">{kiboMsg}</div>
            <div className="text-[10px] font-semibold text-[#4ade80] mt-[2px]">
              {streak > 0 ? `🔥 ${streak} day streak` : "Start a streak today!"}
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <MetricCard
            iconBg="#f0fdf4" iconColor="#16a34a" icon={NotoEmoji as any}
            badge="XP" badgeBg="#f0fdf4" badgeColor="#166534"
            val={progress.xp.toLocaleString()} label="Total XP earned"
            delta={periodXPTotal > 0 ? `+${periodXPTotal} this period` : "Complete lessons to earn XP"}
          />
          <MetricCard
            iconBg="#fff7ed" iconColor="#ea580c" icon={NotoEmoji as any}
            badge={bestStreak > 0 ? `🔥 Best: ${bestStreak}` : "🔥"} badgeBg="#fff7ed" badgeColor="#9a3412"
            val={String(streak)} label="Day streak"
            delta={streak > 0 ? "Keep it going!" : "Start your streak today"}
          />
          <MetricCard
            iconBg="#eff6ff" iconColor="#2563eb" icon={BookOpen}
            badge={`${Math.round((progress.completedLessons.length / Math.max(1, totalLessons)) * 100)}%`}
            badgeBg="#eff6ff" badgeColor="#1d4ed8"
            val={String(progress.completedLessons.length)} label="Lessons done"
            delta={`${progress.completedLessons.length} of ${totalLessons} total`}
          />
          <MetricCard
            iconBg="#f5f3ff" iconColor="#7c3aed" icon={BarChart3}
            badge="Accuracy" badgeBg="#f5f3ff" badgeColor="#6d28d9"
            val={progress.totalAnswered > 0 ? `${accuracy}%` : "N/A"} label="Answer accuracy"
            delta={progress.totalAnswered > 0 ? `${progress.totalCorrect} of ${progress.totalAnswered} correct` : "Answer questions to track"}
          />
        </div>

        {/* Row 1: XP chart + calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-3">
          <div className="lg:col-span-3 bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-black text-[#111827]">XP over time</span>
            </div>
            <div className="flex gap-3 mb-[10px]">
              <span className="flex items-center gap-[4px] text-[11px] font-bold text-[#6b7280]">
                <span className="w-[9px] h-[9px] rounded-[2px] bg-[#bbf7d0] inline-block"/>XP earned
              </span>
              <span className="flex items-center gap-[4px] text-[11px] font-bold text-[#6b7280]">
                <span className="w-[9px] h-[9px] rounded-[2px] bg-[#e5e7eb] border border-dashed border-[#d1d5db] inline-block"/>Daily goal
              </span>
            </div>
            <div style={{ position: "relative", width: "100%", height: 170 }}>
              <Bar data={xpChartData as any} options={chartOptions as any} />
            </div>
            {periodXPTotal === 0 && (
              <div className="text-center text-[11px] font-semibold text-[#9ca3af] mt-2">
                Complete lessons and games to see your XP chart fill up!
              </div>
            )}
          </div>

          {/* Streak calendar */}
          <div className="lg:col-span-2 bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-4">
            <div className="text-[13px] font-black text-[#111827] mb-3">Streak calendar</div>
            <div className="grid grid-cols-7 gap-1 mb-[5px] text-center">
              {["M","T","W","T","F","S","S"].map((d,i) => (
                <span key={i} className="text-[10px] font-bold text-[#9ca3af]">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 mb-[11px]">
              {calPattern.map((v,i) => (
                <div
                  key={i}
                  className={`h-[28px] rounded-[6px] transition-transform hover:scale-110 ${
                    v === 2
                      ? "bg-[#3db74a] outline outline-2 outline-[#86efac] outline-offset-1"
                      : v === 1 ? "bg-[#bbf7d0]"
                      : "bg-[#fee2e2]"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-[14px] text-[11px] font-bold text-[#6b7280]">
              <span>Current <strong className="text-[#111827]">{streak} days</strong></span>
              <span>Best <strong className="text-[#111827]">{bestStreak} days</strong></span>
            </div>
          </div>
        </div>

        {/* Row 2: Module progress + accuracy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className="bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-black text-[#111827]">Module progress</span>
              <span className="text-[11px] font-bold text-[#9ca3af]">{MODULES.length} modules</span>
            </div>
            {MODULES.map((m, i) => {
              const pct = moduleProgress[m.levelIdx]?.pct ?? 0;
              const pc = pct === 100 ? "#16a34a" : pct > 60 ? "#d97706" : pct > 0 ? "#6b7280" : "#9ca3af";
              return (
                <div key={m.id} className="flex items-center gap-[10px] mb-[9px] last:mb-0">
                  <div className="flex items-center gap-[7px] w-[124px] shrink-0">
                    <span className="text-[14px] w-[18px] text-center shrink-0">{m.e}</span>
                    <span className="text-[12px] font-bold truncate text-[#111827]">{m.n}</span>
                  </div>
                  <ProgressBar pct={pct} color={m.color} />
                  <span className="text-[11px] font-extrabold w-[30px] text-right shrink-0" style={{ color: pc }}>{pct}%</span>
                </div>
              );
            })}
          </div>

          <div className="bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-4">
            <div className="text-[13px] font-black text-[#111827] mb-3">Accuracy by topic</div>
            {topicAccuracy.length > 0 ? topicAccuracy.map(t => {
              const c  = t.p >= 80 ? "#86efac" : t.p >= 65 ? "#fde68a" : t.p > 0 ? "#fca5a5" : "#e5e7eb";
              const tc = t.p >= 80 ? "#166534" : t.p >= 65 ? "#92400e" : t.p > 0 ? "#991b1b" : "#9ca3af";
              return (
                <div key={t.n} className="flex items-center gap-[10px] mb-[9px] last:mb-0">
                  <div className="w-[108px] shrink-0">
                    <span className="text-[12px] font-bold text-[#111827]">{t.n}</span>
                  </div>
                  <ProgressBar pct={t.p} color={c} />
                  <span className="text-[11px] font-extrabold w-[30px] text-right shrink-0" style={{ color: tc }}>
                    {t.p > 0 ? `${t.p}%` : "--"}
                  </span>
                </div>
              );
            }) : (
              <div className="text-[11px] font-semibold text-[#9ca3af] text-center py-4">
                Complete quizzes to see topic accuracy
              </div>
            )}
          </div>
        </div>

        {/* Row 3: Game chart */}
        <div className="bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-4 mb-3">
          <div className="text-[13px] font-black text-[#111827] mb-3">Game mode performance</div>
          <div className="flex gap-[5px] mb-3 flex-wrap">
            {(["all","speed","flash","daily","pairs"] as GameMode[]).map(m => (
              <button
                key={m}
                onClick={() => setGameMode(m)}
                className={`text-[12px] font-bold px-[13px] py-[5px] rounded-[8px] border-[1.5px] transition-all duration-100 ${
                  gameMode === m
                    ? "bg-[#e8fbe9] border-[rgba(61,183,74,.4)] text-[#166534] font-extrabold"
                    : "border-[#e5e7eb] text-[#6b7280] hover:border-[#86efac] hover:text-[#166534]"
                }`}
              >
                {{ all: "All modes", speed: "Speed round", flash: "Flashcards", daily: "Daily challenge", pairs: "Match pairs" }[m]}
              </button>
            ))}
          </div>
          <div style={{ position: "relative", width: "100%", height: 190 }}>
            {gd.type === "bar"
              ? <Bar data={gameChartData as any} options={chartOptions as any} />
              : <Line data={gameChartData as any} options={chartOptions as any} />
            }
          </div>
          {gd.data.every(v => v === 0) && (
            <div className="text-center text-[11px] font-semibold text-[#9ca3af] mt-2">
              Play game modes to track your performance here!
            </div>
          )}
        </div>

        {/* Row 4: Activity + badges + stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

          {/* Activity */}
          <div className="bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-black text-[#111827]">Recent activity</span>
            </div>
            {recentActivity.length > 0 ? recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-[10px] py-[9px] border-b-[1.5px] border-[#f0f2f5] last:border-none">
                <div className="w-[7px] h-[7px] rounded-full shrink-0 mt-[5px]" style={{ background: actColor(a.type) }} />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold text-[#111827] leading-[1.4]">{a.text}</div>
                  <div className="text-[10.5px] font-semibold text-[#9ca3af] mt-[1px]">{timeAgo(a.time)}</div>
                </div>
                <span className="text-[11px] font-extrabold text-[#166534] bg-[#f0fff4] border border-[rgba(61,183,74,.2)] px-[8px] py-[2px] rounded-[6px] whitespace-nowrap shrink-0">
                  +{a.xp} XP
                </span>
              </div>
            )) : (
              <div className="text-[11px] font-semibold text-[#9ca3af] text-center py-6">
                Your activity will show up here as you learn!
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-black text-[#111827]">Badges</span>
              <span className="text-[11px] font-bold text-[#9ca3af]">{badgesEarned} / {badges.length}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className={`border-[1.5px] border-[#f0f2f5] rounded-[11px] p-3 text-center transition-all duration-100 hover:border-[#86efac] hover:-translate-y-[1px] ${!b.on ? "opacity-40" : ""}`}
                >
                  <span className="text-[22px] block mb-1">{b.e}</span>
                  <span className="text-[10px] font-extrabold text-[#111827] block leading-[1.3]">{b.n}</span>
                  <span className={`text-[10px] font-bold block mt-[2px] ${b.on ? "text-[#166534]" : "text-[#9ca3af]"}`}>
                    {b.on ? "Earned" : "Locked"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats summary */}
          <div className="bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-black text-[#111827]">Summary</span>
              <span className="text-[11px] font-bold text-[#9ca3af]">All time</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: String(progress.totalAnswered), l: "Questions answered" },
                { v: String(progress.completedLessons.length), l: "Lessons completed" },
                { v: String(progress.dailyTasksDone), l: "Daily tasks done" },
                { v: String(progress.freezesAvailable), l: "Freezes left" },
                { v: `Lv ${progress.level}`, l: "Current level" },
                { v: `${xpPct}%`, l: "Next level progress" },
              ].map((s, i) => (
                <div key={i} className="bg-[#f6f7fa] rounded-[9px] p-[10px] text-center">
                  <span className="text-[18px] font-black text-[#111827] block">{s.v}</span>
                  <span className="text-[10px] font-bold text-[#9ca3af] mt-[1px] block">{s.l}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
