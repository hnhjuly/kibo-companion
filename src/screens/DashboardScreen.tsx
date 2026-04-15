import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { KIBO, CURRICULUM } from "@/data/curriculum";
import { getXPForLevel } from "@/lib/progress";
import PreloadedImg from "@/components/PreloadedImg";
import NotoEmoji from "@/components/NotoEmoji";
import { motion } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Zap, BookMarked, Search,
  Trophy, BarChart3, UserCircle, Settings, ChevronRight
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

// ─── Constants ───────────────────────────────────────────
const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard",   screen: "dashboard" as const },
  { icon: BookOpen,        label: "Learn",        screen: "home"      as const },
  { icon: Zap,             label: "Train",        screen: "train"     as const },
  { icon: BookMarked,      label: "Lessons",      screen: "lessons"   as const },
  { icon: Search,          label: "Glossary",     screen: "glossary"  as const },
  { icon: Trophy,          label: "Achievements", screen: "achievements" as const },
  { icon: BarChart3,       label: "Leaderboard",  screen: "home"      as const },
] as const;

const MODULES = [
  { e: "🤖", n: "AI Basics",     id: "m1", color: "#86efac" },
  { e: "💬", n: "Talking to AI", id: "m2", color: "#6ee7b7" },
  { e: "🛠️", n: "AI Tools",     id: "m3", color: "#93c5fd" },
  { e: "🌍", n: "AI Daily Life", id: "m4", color: "#fde68a" },
  { e: "💼", n: "AI for Work",   id: "m5", color: "#e5e7eb", locked: true },
  { e: "🎨", n: "Creativity",    id: "m6", color: "#e5e7eb", locked: true },
  { e: "🛡️", n: "AI Safety",    id: "m7", color: "#e5e7eb", locked: true },
] as const;

const TOPICS = [
  { n: "AI Basics",       p: 92 },
  { n: "Prompting",       p: 87 },
  { n: "AI Tools",        p: 78 },
  { n: "Daily Life",      p: 71 },
  { n: "Hallucinations",  p: 65 },
  { n: "AI Safety",       p: 50 },
];

const ACTIVITY = [
  { color: "#86efac", text: "Completed Talking to AI — Lesson 4", time: "2 hours ago",  xp: "+25 XP" },
  { color: "#fde68a", text: "Badge unlocked: 7-day streak",        time: "1 day ago",    xp: "+50 XP" },
  { color: "#93c5fd", text: "Speed Round — 320 pts (personal best)",time: "1 day ago",   xp: "+32 XP" },
  { color: "#86efac", text: "Completed AI Tools — Lesson 2",       time: "2 days ago",   xp: "+25 XP" },
  { color: "#fde68a", text: "Daily Challenge correct — 2x bonus",  time: "3 days ago",   xp: "+40 XP" },
];

const BADGES = [
  { e: "🔥", n: "7-day streak",  s: "Earned", on: true  },
  { e: "⭐", n: "First lesson",  s: "Earned", on: true  },
  { e: "⚡", n: "Speed demon",   s: "Earned", on: true  },
  { e: "🎯", n: "Daily warrior", s: "Earned", on: true  },
  { e: "🏆", n: "AI Master",     s: "Locked", on: false },
  { e: "💯", n: "Perfectionist", s: "Locked", on: false },
];

const LEADERBOARD = [
  { r: "1", n: "Ahmed K.",  xp: "2,100", you: false, bg: "#fef9c3", tc: "#a16207" },
  { r: "2", n: "Sara M.",   xp: "1,890", you: false, bg: "#f1f5f9", tc: "#475569" },
  { r: "3", n: "James T.",  xp: "1,540", you: false, bg: "#fff7ed", tc: "#9a3412" },
  { r: "5", n: "Hanah N.",  xp: "1,240", you: true,  bg: "#f0fdf4", tc: "#166534" },
  { r: "6", n: "Mia R.",    xp: "1,180", you: false, bg: "#f7f8fa", tc: "#6b7280" },
];

const PERIOD_DATA: Record<Period, {
  xp: string; dxp: string; str: string; dstr: string;
  les: string; dles: string; acc: string; dacc: string;
  chartData: number[]; chartLabels: string[];
}> = {
  "7d": {
    xp: "1,240", dxp: "+180 this week",    str: "12", dstr: "Keep it going!",
    les: "14",   dles: "14 of 21 total",   acc: "84%", dacc: "+3% vs last week",
    chartData: [30,45,60,20,80,55,90],
    chartLabels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
  },
  "30d": {
    xp: "4,820", dxp: "+4,820 this month", str: "12", dstr: "Current streak",
    les: "14",   dles: "14 of 21 total",   acc: "81%", dacc: "+5% vs last month",
    chartData: [20,30,25,40,35,55,45,60,50,70,65,80,75,85,80,90,70,60,85,95,80,75,90,85,100,95,80,75,90,85],
    chartLabels: Array.from({ length: 30 }, (_, i) => `D${i+1}`),
  },
  all: {
    xp: "6,100", dxp: "All time total",    str: "12", dstr: "Best ever",
    les: "14",   dles: "14 of 21 total",   acc: "80%", dacc: "Overall accuracy",
    chartData: [20,30,25,40,35,55,45,60,50,70,65,80,75,85,80,90,70,60,85,95],
    chartLabels: Array.from({ length: 20 }, (_, i) => `W${i+1}`),
  },
};

const GAME_DATA: Record<GameMode, { labels: string[]; data: number[]; colors: string[]; type: "bar" | "line" }> = {
  all:   { labels: ["Speed Round","Flashcards","Daily Challenge","Match Pairs"], data: [320,45,8,22], colors: ["#bbf7d0","#93c5fd","#fde68a","#c4b5fd"], type: "bar" },
  speed: { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], data: [210,250,180,280,300,290,320], colors: ["#bbf7d0"], type: "line" },
  flash: { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], data: [30,35,28,40,38,42,45], colors: ["#93c5fd"], type: "line" },
  daily: { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], data: [1,1,0,1,1,1,1], colors: ["#fde68a"], type: "bar" },
  pairs: { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], data: [65,58,72,50,48,42,38], colors: ["#c4b5fd"], type: "line" },
};

const CAL_PATTERN = [1,1,1,1,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,2];

// ─── Helper components ───────────────────────────────────

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="flex-1 h-[7px] rounded-full bg-[#f6f7fa] overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.7, ease: "easeOut" }}
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
  const { setScreen, progress } = useApp();
  const [period, setPeriod] = useState<Period>("7d");
  const [gameMode, setGameMode] = useState<GameMode>("all");

  const pd = PERIOD_DATA[period];
  const gd = GAME_DATA[gameMode];

  // XP progress to next level
  const xpForLevel = getXPForLevel(progress.level);
  const xpPct = Math.min(100, Math.round((progress.xp / xpForLevel) * 100));

  // Kibo mood based on actual streak
  const streak = progress.streak;
  const kiboMood = streak >= 7 ? KIBO.streak7 : streak >= 3 ? KIBO.streak3 : streak >= 1 ? KIBO.happy : KIBO.sad;
  const kiboMsg = streak >= 7
    ? `${streak} days in a row! You're unstoppable.`
    : streak >= 3
    ? `${streak} day streak! Building great habits.`
    : streak >= 1
    ? "Good start! Keep showing up every day."
    : "Missed a day. Let's get back on track!";

  // Module progress from real data
  const completedSet = new Set(progress.completedLessons);
  const allLessons = CURRICULUM.levels.flatMap(l => l.lessons);
  const moduleProgress = CURRICULUM.levels.map(lv => {
    const total = lv.lessons.length;
    const done = lv.lessons.filter(l => completedSet.has(l.id)).length;
    return { pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  });

  // Chart options (shared)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { bodyFont: { family: "Nunito" }, titleFont: { family: "Nunito" } } },
    scales: {
      x: { ticks: { color: "rgba(0,0,0,.3)", font: { size: 11, family: "Nunito", weight: "700" as const } }, grid: { display: false } },
      y: { ticks: { color: "rgba(0,0,0,.3)", font: { size: 10, family: "Nunito" } }, grid: { color: "rgba(0,0,0,.04)" }, beginAtZero: true },
    },
  };

  // XP chart data
  const xpChartData = {
    labels: pd.chartLabels,
    datasets: [
      {
        label: "XP",
        data: pd.chartData,
        backgroundColor: "#bbf7d0",
        borderRadius: 5,
        borderSkipped: false as const,
      },
      {
        label: "Goal",
        data: pd.chartData.map(() => 50),
        type: "line" as const,
        borderColor: "#d1d5db",
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
        tension: 0,
      },
    ],
  };

  // Game chart data
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

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f7fa]" style={{ fontFamily: "'Nunito', sans-serif" }}>

      {/* ── SIDEBAR ── */}
      <aside className="w-[228px] bg-white border-r-[1.5px] border-[#f0f2f5] flex flex-col shrink-0 overflow-y-auto">

        {/* Logo */}
        <div className="px-[18px] py-5 flex items-center gap-[9px] border-b-[1.5px] border-[#f0f2f5]">
          <PreloadedImg src={KIBO.happy} alt="Kibo" className="w-[30px] h-[30px] object-contain" />
          <span className="text-[19px] font-black text-[#3db74a] tracking-tight">Kibo</span>
          <span className="ml-auto text-[9px] font-black tracking-[.07em] uppercase bg-[#fffbeb] text-[#92400e] border border-[#fde68a] px-[7px] py-[2px] rounded-[5px]">
            Pro
          </span>
        </div>

        {/* Kibo mood panel */}
        <div className="px-4 py-[14px] flex items-center gap-[11px] border-b-[1.5px] border-[#f0f2f5] bg-[#f0fff4]">
          <PreloadedImg src={kiboMood} alt="Kibo" className="w-12 h-12 object-contain shrink-0" />
          <div>
            <div className="text-[12px] font-bold text-[#166534] leading-[1.45]">{kiboMsg}</div>
            <div className="text-[10px] font-semibold text-[#4ade80] mt-[2px]">
              {streak > 0 ? `🔥 ${streak} day streak` : "Start a streak today!"}
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="px-[10px] pt-3 pb-1">
          <div className="text-[9.5px] font-black tracking-[.08em] uppercase text-[#9ca3af] px-[10px] pb-[5px]">Navigation</div>
          {NAV_ITEMS.map(({ icon: Icon, label, screen }) => (
            <button
              key={label}
              onClick={() => setScreen(screen as any)}
              className={`w-full flex items-center gap-[9px] px-[10px] py-[8px] rounded-[10px] text-[13px] font-bold transition-all duration-100 mb-[1px] ${
                label === "Dashboard"
                  ? "bg-[#e8fbe9] text-[#166534]"
                  : "text-[#6b7280] hover:bg-[#f6f7fa] hover:text-[#111827]"
              }`}
            >
              <Icon size={15} strokeWidth={2} className="shrink-0 opacity-60" />
              {label}
            </button>
          ))}
        </div>

        {/* Streak pill */}
        <div className="mx-[10px] mt-3 rounded-[12px] p-[13px] flex items-center gap-[10px]" style={{ background: "linear-gradient(135deg,#1a1a2e,#2d2d5e)" }}>
          <span className="text-[22px] shrink-0">🔥</span>
          <div className="flex-1">
            <div className="text-[20px] font-black text-[#ffb800] leading-none">{streak}</div>
            <div className="text-[10px] font-bold text-white/40 mt-[1px]">Day streak</div>
          </div>
          {streak >= 7 && (
            <span className="text-[10px] font-extrabold text-[#3db74a] bg-[rgba(61,183,74,.15)] px-[7px] py-[2px] rounded-[5px]">
              Best!
            </span>
          )}
        </div>

        {/* XP level bar */}
        <div className="mx-[10px] mt-[10px] bg-[#f6f7fa] rounded-[10px] p-3">
          <div className="flex justify-between text-[11px] font-bold text-[#6b7280] mb-[6px]">
            <span>Level {progress.level}</span>
            <span>{progress.xp} / {xpForLevel} XP</span>
          </div>
          <div className="h-[6px] bg-white rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#3db74a]"
              initial={{ width: 0 }}
              animate={{ width: `${xpPct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Unlock card */}
        <div className="mx-[10px] mt-[10px]">
          <div className="bg-[#3db74a] rounded-[10px] p-[12px] flex items-center gap-[9px]">
            <p className="flex-1 text-[11px] font-bold text-white/85 leading-[1.4]">
              3 modules locked. Finish your AI path.
            </p>
            <button className="bg-white/22 border border-white/30 text-white text-[11px] font-extrabold px-[10px] py-[5px] rounded-[7px] whitespace-nowrap hover:bg-white/32 transition-colors">
              $9.99
            </button>
          </div>
        </div>

        {/* Account section */}
        <div className="px-[10px] mt-3 pb-4">
          <div className="text-[9.5px] font-black tracking-[.08em] uppercase text-[#9ca3af] px-[10px] pb-[5px]">Account</div>
          {[{ icon: UserCircle, label: "Profile" }, { icon: Settings, label: "Settings" }].map(({ icon: Icon, label }) => (
            <button key={label} className="w-full flex items-center gap-[9px] px-[10px] py-[8px] rounded-[10px] text-[13px] font-bold text-[#6b7280] hover:bg-[#f6f7fa] hover:text-[#111827] transition-all duration-100 mb-[1px]">
              <Icon size={15} strokeWidth={2} className="shrink-0 opacity-60" />
              {label}
            </button>
          ))}
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b-[1.5px] border-[#f0f2f5] h-[58px] px-[26px] flex items-center justify-between shrink-0">
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
        <div className="flex-1 overflow-y-auto px-[26px] py-[22px] pb-12" style={{ scrollbarWidth: "none" }}>

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-[12px] mb-[18px]">
            <MetricCard
              iconBg="#f0fdf4" iconColor="#16a34a" icon={NotoEmoji as any}
              badge="XP" badgeBg="#f0fdf4" badgeColor="#166534"
              val={pd.xp} label="Total XP earned" delta={pd.dxp}
            />
            <MetricCard
              iconBg="#fff7ed" iconColor="#ea580c" icon={NotoEmoji as any}
              badge="🔥 Personal best" badgeBg="#fff7ed" badgeColor="#9a3412"
              val={pd.str} label="Day streak" delta={pd.dstr}
            />
            <MetricCard
              iconBg="#eff6ff" iconColor="#2563eb" icon={BookOpen}
              badge={`${Math.round((parseInt(pd.les)/21)*100)}%`} badgeBg="#eff6ff" badgeColor="#1d4ed8"
              val={pd.les} label="Lessons done" delta={pd.dles}
            />
            <MetricCard
              iconBg="#f5f3ff" iconColor="#7c3aed" icon={BarChart3}
              badge="Accuracy" badgeBg="#f5f3ff" badgeColor="#6d28d9"
              val={pd.acc} label="Answer accuracy" delta={pd.dacc}
            />
          </div>

          {/* Row 1: XP chart + calendar */}
          <div className="grid gap-[14px] mb-[14px]" style={{ gridTemplateColumns: "3fr 2fr" }}>

            {/* XP chart */}
            <div className="bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-[18px]">
              <div className="flex items-center justify-between mb-[14px]">
                <span className="text-[13px] font-black text-[#111827]">XP over time</span>
                <button className="text-[11px] font-extrabold text-[#3db74a]">Export</button>
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
                <Bar data={xpChartData} options={chartOptions} />
              </div>
            </div>

            {/* Streak calendar */}
            <div className="bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-[18px]">
              <div className="text-[13px] font-black text-[#111827] mb-[14px]">Streak calendar</div>
              <div className="grid grid-cols-7 gap-1 mb-[5px] text-center">
                {["M","T","W","T","F","S","S"].map((d,i) => (
                  <span key={i} className="text-[10px] font-bold text-[#9ca3af]">{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 mb-[11px]">
                {CAL_PATTERN.map((v,i) => (
                  <div
                    key={i}
                    className={`h-[28px] rounded-[6px] transition-transform hover:scale-110 ${
                      i === CAL_PATTERN.length - 1
                        ? "bg-[#3db74a] outline outline-2 outline-[#86efac] outline-offset-1"
                        : v === 1 ? "bg-[#bbf7d0]"
                        : v === 0 ? "bg-[#fee2e2]"
                        : "bg-[#f6f7fa]"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-[14px] text-[11px] font-bold text-[#6b7280]">
                <span>Current <strong className="text-[#111827]">{streak} days</strong></span>
                <span>Best <strong className="text-[#111827]">{streak} days</strong></span>
              </div>
            </div>
          </div>

          {/* Upsell banner */}
          <div className="rounded-[14px] p-[18px] flex items-center gap-[15px] mb-[14px] relative overflow-hidden" style={{ background: "#0c111d" }}>
            <div className="absolute top-[-40px] right-[-40px] w-[160px] h-[160px] pointer-events-none" style={{ background: "radial-gradient(circle,rgba(61,183,74,.18) 0%,transparent 70%)" }} />
            <PreloadedImg src={KIBO.thinking} alt="Kibo" className="w-[54px] h-[54px] object-contain shrink-0 relative z-10" />
            <div className="flex-1 relative z-10">
              <h3 className="text-[14px] font-black text-white mb-[3px]">3 modules still locked</h3>
              <p className="text-[11.5px] font-semibold leading-relaxed" style={{ color: "rgba(255,255,255,.45)" }}>
                Unlock AI for Work, AI for Creativity and AI Safety to complete your path.
              </p>
              <div className="flex gap-[5px] mt-[7px] flex-wrap">
                {[{l:"💼 AI for Work",c:"rgba(74,158,255,.15)",tc:"#93c5fd"},{l:"🎨 AI Creativity",c:"rgba(255,140,66,.15)",tc:"#fdba74"},{l:"🛡️ AI Safety",c:"rgba(155,109,255,.15)",tc:"#c4b5fd"}].map(m=>(
                  <span key={m.l} className="text-[10px] font-extrabold px-[8px] py-[2px] rounded-[5px]" style={{ background: m.c, color: m.tc }}>{m.l}</span>
                ))}
              </div>
            </div>
            <button className="relative z-10 px-5 py-[10px] rounded-[10px] bg-[#3db74a] text-white text-[13px] font-black border-none shrink-0 hover:-translate-y-[1px] transition-transform" style={{ boxShadow: "0 4px 0 #2ea33d" }}>
              Unlock All — $9.99
            </button>
          </div>

          {/* Row 2: Module progress + accuracy */}
          <div className="grid grid-cols-2 gap-[14px] mb-[14px]">
            <div className="bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-[18px]">
              <div className="flex items-center justify-between mb-[14px]">
                <span className="text-[13px] font-black text-[#111827]">Module progress</span>
                <span className="text-[11px] font-bold text-[#9ca3af]">4 / 7 unlocked</span>
              </div>
              {MODULES.map((m, i) => {
                const pct = moduleProgress[i]?.pct ?? 0;
                const pc = pct === 100 ? "#16a34a" : pct > 60 ? "#d97706" : pct > 0 ? "#6b7280" : "#9ca3af";
                return (
                  <div key={m.id} className="flex items-center gap-[10px] mb-[9px] last:mb-0">
                    <div className="flex items-center gap-[7px] w-[124px] shrink-0">
                      <span className="text-[14px] w-[18px] text-center shrink-0">{m.e}</span>
                      <span className={`text-[12px] font-bold truncate ${m.locked ? "text-[#9ca3af]" : "text-[#111827]"}`}>{m.n}</span>
                    </div>
                    <ProgressBar pct={pct} color={m.color} />
                    <span className="text-[11px] font-extrabold w-[30px] text-right shrink-0" style={{ color: pc }}>{pct}%</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-[18px]">
              <div className="text-[13px] font-black text-[#111827] mb-[14px]">Accuracy by topic</div>
              {TOPICS.map(t => {
                const c  = t.p >= 80 ? "#86efac" : t.p >= 65 ? "#fde68a" : "#fca5a5";
                const tc = t.p >= 80 ? "#166534" : t.p >= 65 ? "#92400e" : "#991b1b";
                return (
                  <div key={t.n} className="flex items-center gap-[10px] mb-[9px] last:mb-0">
                    <div className="w-[108px] shrink-0">
                      <span className="text-[12px] font-bold text-[#111827]">{t.n}</span>
                    </div>
                    <ProgressBar pct={t.p} color={c} />
                    <span className="text-[11px] font-extrabold w-[30px] text-right shrink-0" style={{ color: tc }}>{t.p}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 3: Game chart */}
          <div className="bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-[18px] mb-[14px]">
            <div className="text-[13px] font-black text-[#111827] mb-[14px]">Game mode performance</div>
            <div className="flex gap-[5px] mb-[14px] flex-wrap">
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
                ? <Bar data={gameChartData} options={chartOptions} />
                : <Line data={gameChartData} options={chartOptions} />
              }
            </div>
          </div>

          {/* Row 4: Activity + badges + leaderboard */}
          <div className="grid gap-[14px]" style={{ gridTemplateColumns: "2fr 1.3fr 1.3fr" }}>

            {/* Activity */}
            <div className="bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-[18px]">
              <div className="flex items-center justify-between mb-[14px]">
                <span className="text-[13px] font-black text-[#111827]">Recent activity</span>
                <button className="text-[11px] font-extrabold text-[#3db74a]">View all</button>
              </div>
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-[10px] py-[9px] border-b-[1.5px] border-[#f0f2f5] last:border-none">
                  <div className="w-[7px] h-[7px] rounded-full shrink-0 mt-[5px]" style={{ background: a.color }} />
                  <div className="flex-1">
                    <div className="text-[12px] font-bold text-[#111827] leading-[1.4]">{a.text}</div>
                    <div className="text-[10.5px] font-semibold text-[#9ca3af] mt-[1px]">{a.time}</div>
                  </div>
                  <span className="text-[11px] font-extrabold text-[#166534] bg-[#f0fff4] border border-[rgba(61,183,74,.2)] px-[8px] py-[2px] rounded-[6px] whitespace-nowrap shrink-0">
                    {a.xp}
                  </span>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-[18px]">
              <div className="flex items-center justify-between mb-[14px]">
                <span className="text-[13px] font-black text-[#111827]">Badges</span>
                <span className="text-[11px] font-bold text-[#9ca3af]">4 / 10</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {BADGES.map((b, i) => (
                  <div
                    key={i}
                    className={`border-[1.5px] border-[#f0f2f5] rounded-[11px] p-3 text-center transition-all duration-100 hover:border-[#86efac] hover:-translate-y-[1px] ${!b.on ? "opacity-40" : ""}`}
                  >
                    <span className="text-[22px] block mb-1">{b.e}</span>
                    <span className="text-[10px] font-extrabold text-[#111827] block leading-[1.3]">{b.n}</span>
                    <span className={`text-[10px] font-bold block mt-[2px] ${b.on ? "text-[#166534]" : "text-[#9ca3af]"}`}>{b.s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white border-[1.5px] border-[#f0f2f5] rounded-[14px] p-[18px]">
              <div className="flex items-center justify-between mb-[14px]">
                <span className="text-[13px] font-black text-[#111827]">Leaderboard</span>
                <span className="text-[11px] font-bold text-[#9ca3af]">This week</span>
              </div>
              {LEADERBOARD.map((l, i) => {
                const ini = l.n.split(" ").map(w => w[0]).join("");
                const posC = l.r==="1"?"#d97706":l.r==="2"?"#6b7280":l.r==="3"?"#9a3412":l.you?"#16a34a":"#9ca3af";
                return (
                  <div key={i} className="flex items-center gap-[9px] py-[8px] border-b-[1.5px] border-[#f0f2f5] last:border-none">
                    <span className="text-[12px] font-black w-[18px] text-center shrink-0" style={{ color: posC }}>{l.r}</span>
                    <div className="w-[28px] h-[28px] rounded-[7px] flex items-center justify-center text-[10px] font-black shrink-0" style={{ background: l.bg, color: l.tc }}>{ini}</div>
                    <span className="flex-1 text-[12px] font-bold text-[#111827]">{l.n}</span>
                    {l.you && <span className="text-[9px] font-black uppercase tracking-[.04em] bg-[#f0fff4] text-[#166534] px-[5px] py-[2px] rounded-[4px]">You</span>}
                    <span className="text-[11px] font-extrabold text-[#6b7280]">{l.xp}</span>
                  </div>
                );
              })}
              <div className="grid grid-cols-2 gap-2 mt-3">
                {[{v:"87",l:"Questions answered"},{v:"5",l:"Lessons this week"},{v:"3",l:"Daily challenges"},{v:"2",l:"Freezes left"}].map((s,i) => (
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
    </div>
  );
};

export default DashboardScreen;
