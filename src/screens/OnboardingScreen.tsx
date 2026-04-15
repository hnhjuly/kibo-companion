import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useUser } from "@clerk/clerk-react";
import { User } from "lucide-react";
import { KIBO } from "@/data/curriculum";
import { UserGoal } from "@/lib/progress";

import NotoEmoji from "@/components/NotoEmoji";
import PreloadedImg from "@/components/PreloadedImg";

const GOAL_MAP: UserGoal[] = ["work", "study", "build", "curious"];

const slides = [
  {
    img: KIBO.wave,
    title: <>Learn <b className="text-kibo-green">AI Skills</b><br />5 minutes a day</>,
    desc: "Join thousands mastering AI for work, school and life. Start right now.",
  },
  {
    img: KIBO.thinking,
    title: <>Practice <b className="text-kibo-green">real tasks</b>,<br />not just theory</>,
    desc: "Fix prompts. Summarize emails. Choose AI tools. Skills you'll use tomorrow.",
  },
  {
    img: KIBO.trophy,
    title: <>Earn XP,<br /><b className="text-kibo-green">build streaks</b></>,
    desc: null,
    pills: [
      { label: "Streaks", icon: "fire" as const },
      { label: "XP & Levels", icon: "lightning" as const },
      { label: "Badges", icon: "diamond" as const },
      { label: "Leaderboard", icon: "trophy" as const },
    ],
  },
  {
    img: KIBO.thumbsup,
    title: <>What's your <b className="text-kibo-green">goal?</b></>,
    desc: "We'll personalise your path with Kibo",
    goals: [
      { emoji: <NotoEmoji name="briefcase" size={28} />, label: "Work smarter" },
      { emoji: <NotoEmoji name="graduationCap" size={28} />, label: "Study / School" },
      { emoji: <NotoEmoji name="rocket" size={28} />, label: "Build a product" },
      { emoji: <NotoEmoji name="thinking" size={28} />, label: "Just curious" },
    ],
  },
];

const OnboardingScreen = () => {
  const { setScreen, onSetGoal } = useApp();
  const [slide, setSlide] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  const next = () => {
    if (slide >= 3) {
      if (selectedGoal !== null) onSetGoal(GOAL_MAP[selectedGoal]);
      setScreen("home");
      return;
    }
    setSlide(s => s + 1);
  };

  const s = slides[slide];

  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-col flex-1 justify-between p-7 pt-12"
      style={{ background: "linear-gradient(160deg, #e0f2ff, #edfcf2 40%, #fef9e7 75%, #fef0f5)" }}>
      {/* Sign in button */}
      {!isSignedIn && (
        <button
          onClick={() => setScreen("auth")}
          className="absolute top-5 right-5 z-10 flex items-center gap-1.5 bg-card text-foreground rounded-full px-4 py-2 text-[13px] font-extrabold shadow-sm border border-border"
        >
          <User className="w-4 h-4" /> Sign in
        </button>
      )}
      {/* Dots */}
      <div className="flex gap-2 justify-center mb-1">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`h-2 rounded-full transition-all ${i === slide ? "w-7 bg-kibo-green" : "w-2 bg-border"}`} />
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 mb-6">
        {s.img && (
          <div className="w-48 h-48 flex items-center justify-center">
            <PreloadedImg src={s.img} alt="Kibo" className="w-48 h-48 object-contain" />
          </div>
        )}
        <h1 className="text-[29px] font-black text-foreground leading-tight">{s.title}</h1>
        {s.desc && <p className="text-[15px] text-muted-foreground leading-relaxed max-w-[280px]">{s.desc}</p>}
        {s.pills && (
          <div className="flex gap-2 flex-wrap justify-center">
            {s.pills.map(p => (
              <div key={p.label} className="bg-card rounded-full px-4 py-2 text-[13px] font-extrabold card-shadow flex items-center gap-1.5">
                <NotoEmoji name={p.icon} size={16} /> {p.label}
              </div>
            ))}
          </div>
        )}
        {s.goals && (
          <div className="grid grid-cols-2 gap-3 w-full">
            {s.goals.map((g, i) => (
              <button key={i}
                onClick={() => setSelectedGoal(i)}
                className={`bg-card border-[3px] rounded-2xl p-5 text-center text-sm font-extrabold text-foreground transition-all
                  ${selectedGoal === i ? "border-kibo-green bg-kibo-green/10" : "border-border"}`}>
                <span className="text-3xl block mb-2">{g.emoji}</span>
                {g.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 w-full">
        <button onClick={next}
          className="w-full py-[18px] bg-kibo-green text-primary-foreground rounded-2xl font-black text-lg kibo-shadow active:translate-y-[3px] active:shadow-none transition-all">
          {slide === 3 ? "Start Learning with Kibo →" : "Continue →"}
        </button>
        <button onClick={() => setScreen("home")}
          className="bg-transparent border-none text-muted-foreground font-bold text-[15px] py-2.5 text-center">
          I already know AI →
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
