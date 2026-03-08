import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { KIBO } from "@/data/curriculum";

const Confetti = () => {
  const cols = ["#3db74a", "#4a9eff", "#ffb800", "#ff8c42", "#9b6dff", "#ff5a5a"];
  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
        <div key={i} className="absolute -top-2.5 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            background: cols[i % cols.length],
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `cffall ${1.2 + Math.random() * 1.2}s linear ${Math.random() * 0.4}s forwards`,
          }} />
      ))}
    </div>
  );
};

const CompleteScreen = () => {
  const { setScreen, quizStats, progress } = useApp();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(true), 200);
    return () => clearTimeout(t);
  }, []);

  const acc = quizStats.total ? Math.round((quizStats.correct / quizStats.total) * 100) : 0;
  const kiboImg = acc === 100 ? KIBO.trophy : acc >= 70 ? KIBO.celebrate : acc >= 40 ? KIBO.thumbsup : KIBO.sad;
  const title = acc === 100 ? "Perfect Score! 🏆" : acc >= 70 ? "Lesson Complete! 🎉" : acc >= 40 ? "Not bad! 👍" : "Keep Practicing! 💪";
  const subtitle = acc === 100 ? "Flawless! Kibo is amazed!" : acc >= 70 ? "Kibo is so proud of you!" : acc >= 40 ? "You're getting there!" : "Don't give up — try again!";

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-10 text-center relative"
      style={{ background: "linear-gradient(160deg, #f0fff4, #e8f4ff)" }}>
      <img src={kiboImg} alt="Kibo" className="w-[160px] h-[160px] object-contain mb-4 drop-shadow-xl" />
      <h1 className="text-[32px] font-black text-foreground mb-1.5">{title}</h1>
      <p className="text-muted-foreground mb-7 text-[15px]">{subtitle}</p>
      <div className="bg-kibo-gold/15 border-2 border-kibo-gold rounded-[14px] px-6 py-3.5 text-xl font-black text-kibo-gold mb-6 inline-flex items-center gap-2">
        ⚡ +{quizStats.correct * 20} XP earned
      </div>
      <div className="flex gap-3 mb-8 w-full">
        {[
          { val: `${acc}%`, label: "Accuracy" },
          { val: `${quizStats.time}s`, label: "Time" },
          { val: `🔥 ${progress.streak}`, label: "Streak" },
        ].map(s => (
          <div key={s.label} className="flex-1 bg-card rounded-2xl p-4 border-[1.5px] border-border">
            <div className="text-2xl font-black text-foreground">{s.val}</div>
            <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <button onClick={() => setScreen("home")}
        className="w-full py-[18px] bg-kibo-green text-primary-foreground rounded-2xl font-black text-lg kibo-shadow active:translate-y-[3px] active:shadow-none transition-all">
        Continue →
      </button>
      {showConfetti && <Confetti />}
    </div>
  );
};

export default CompleteScreen;
