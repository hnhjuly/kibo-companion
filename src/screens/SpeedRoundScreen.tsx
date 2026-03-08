import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { SPEED_ROUND_QUESTIONS } from "@/data/gameModes";
import { KIBO } from "@/data/curriculum";
import { ArrowLeft } from "lucide-react";
import NotoEmoji from "@/components/NotoEmoji";
import PreloadedImg from "@/components/PreloadedImg";
import DidYouKnowCard from "@/components/DidYouKnowCard";
import ExitGameDialog from "@/components/ExitGameDialog";

type Phase = "start" | "playing" | "dyk" | "results";

const SpeedRoundScreen = () => {
  const { setScreen } = useApp();
  const questions = useMemo(() => [...SPEED_ROUND_QUESTIONS].sort(() => Math.random() - 0.5), []);
  const [phase, setPhase] = useState<Phase>("start");
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const q = questions[qIdx % questions.length];

  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setPhase("dyk");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const pick = useCallback((i: number) => {
    if (answered) return;
    setAnswered(true);
    setSelected(i);
    setTotal(t => t + 1);
    const ok = i === q.correct;
    if (ok) {
      const mult = streak >= 2 ? 2 : 1;
      setScore(s => s + 10 * mult);
      setStreak(s => { const n = s + 1; if (n > bestStreak) setBestStreak(n); return n; });
      setCorrect(c => c + 1);
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      setQIdx(i => i + 1);
      setSelected(null);
      setAnswered(false);
    }, 600);
  }, [answered, q, streak, bestStreak]);

  const startGame = () => {
    setPhase("playing");
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCorrect(0);
    setTotal(0);
    setTimeLeft(60);
    setQIdx(0);
    setSelected(null);
    setAnswered(false);
  };

  // Save best score
  useEffect(() => {
    if (phase === "dyk" || phase === "results") {
      const prev = parseInt(sessionStorage.getItem("kibo_speed_best") || "0");
      if (score > prev) sessionStorage.setItem("kibo_speed_best", String(score));
    }
  }, [phase, score]);

  if (phase === "dyk") return <DidYouKnowCard onDismiss={() => setPhase("results")} />;

  if (phase === "start") {
    return (
      <div className="flex flex-col flex-1 bg-card">
        <div className="px-5 py-3.5 border-b border-border flex items-center gap-3">
          <button onClick={() => setScreen("train")}><ArrowLeft className="w-5 h-5 text-muted-foreground" /></button>
          <span className="font-black text-foreground">⚡ Speed Round</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-5">
          <span className="text-7xl">⚡</span>
          <h2 className="text-3xl font-black text-foreground">Speed Round</h2>
          <div className="text-muted-foreground font-bold text-center space-y-1.5 text-sm">
            <p>60 seconds, as many Qs as possible</p>
            <p>3-streak = 2x bonus</p>
            <p>+10 XP per correct answer</p>
          </div>
          <button onClick={startGame} className="mt-4 px-10 py-4 bg-destructive text-primary-foreground rounded-xl font-black text-lg shadow-[0_4px_0_#c00] active:translate-y-[2px] active:shadow-none transition-all">
            Let's Go! ⚡
          </button>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    const xp = Math.round(score * 0.5);
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const best = parseInt(sessionStorage.getItem("kibo_speed_best") || "0");
    return (
      <div className="flex flex-col flex-1 bg-card">
        <div className="px-5 py-3.5 border-b border-border flex items-center gap-3">
          <button onClick={() => setScreen("train")}><ArrowLeft className="w-5 h-5 text-muted-foreground" /></button>
          <span className="font-black text-foreground">⚡ Speed Round</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4">
          <PreloadedImg src={score >= best ? KIBO.celebrate : KIBO.sad} alt="Kibo" className="w-28 h-28 object-contain" />
          <h2 className="text-4xl font-black text-foreground">{score}</h2>
          <p className="text-kibo-gold font-black text-lg">+{xp} XP earned</p>
          <div className="grid grid-cols-3 gap-4 mt-2 text-center">
            <div><div className="text-xl font-black text-foreground">{correct}</div><div className="text-xs text-muted-foreground font-bold">Correct</div></div>
            <div><div className="text-xl font-black text-foreground">{bestStreak}</div><div className="text-xs text-muted-foreground font-bold">Best Streak</div></div>
            <div><div className="text-xl font-black text-foreground">{accuracy}%</div><div className="text-xs text-muted-foreground font-bold">Accuracy</div></div>
          </div>
          <button onClick={startGame} className="mt-4 px-10 py-3.5 bg-destructive text-primary-foreground rounded-xl font-black shadow-[0_4px_0_#c00] active:translate-y-[2px] active:shadow-none transition-all">
            Play Again ⚡
          </button>
          <button onClick={() => setScreen("train")} className="text-muted-foreground font-bold text-sm">Back to Train</button>
        </div>
      </div>
    );
  }

  // Playing
  return (
    <div className="flex flex-col flex-1 bg-card">
      {/* Header */}
      <div className="px-5 py-3 border-b border-border flex items-center gap-3">
        <div className={`text-2xl font-black ${timeLeft <= 10 ? "text-destructive animate-pulse" : "text-foreground"}`}>{timeLeft}s</div>
        <div className="flex-1 h-2.5 bg-background rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-destructive transition-all duration-1000" style={{ width: `${(timeLeft / 60) * 100}%` }} />
        </div>
        <div className="text-lg font-black text-foreground">{score}</div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-5 gap-5">
        <h2 className="text-xl font-black text-foreground text-center leading-tight">{q.question}</h2>
        {streak >= 3 && <div className="text-center text-sm font-black text-kibo-gold"><NotoEmoji name="fire" size={14} /> Streak: {streak} — 2x bonus!</div>}
        <div className="grid grid-cols-2 gap-2.5">
          {q.options.map((opt, i) => {
            let bg = "bg-background border-2 border-border";
            if (answered && i === q.correct) bg = "bg-kibo-green/15 border-2 border-kibo-green text-kibo-green";
            else if (answered && i === selected) bg = "bg-destructive/15 border-2 border-destructive text-destructive";
            return (
              <button key={i} onClick={() => pick(i)} disabled={answered}
                className={`${bg} rounded-[14px] p-4 font-bold text-[14px] text-center transition-all`}>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpeedRoundScreen;
