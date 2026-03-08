import { useState, useMemo, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { DailyChallengeManager } from "@/data/gameModes";
import { KIBO } from "@/data/curriculum";
import { ArrowLeft } from "lucide-react";
import NotoEmoji from "@/components/NotoEmoji";
import PreloadedImg from "@/components/PreloadedImg";
import ExitGameDialog from "@/components/ExitGameDialog";

const KEYS = ["A", "B", "C", "D"];

const DailyChallengeScreen = () => {
  const { setScreen, progress } = useApp();
  const challenge = useMemo(() => DailyChallengeManager.getToday(), []);
  const [isDone, setIsDone] = useState(() => DailyChallengeManager.hasCompletedToday());
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [showExit, setShowExit] = useState(false);

  useEffect(() => {
    if (!isDone) return;
    const tick = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(`${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isDone]);

  const pick = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const correct = challenge.options[i].correct;
    setIsCorrect(correct);
    DailyChallengeManager.markComplete();
  };

  if (isDone && !answered) {
    return (
      <div className="flex flex-col flex-1 bg-card">
        <div className="px-5 py-3.5 border-b border-border flex items-center gap-3">
          <button onClick={() => setScreen("train")}><ArrowLeft className="w-5 h-5 text-muted-foreground" /></button>
          <span className="font-black text-foreground">🎯 Daily Challenge</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-5">
          <PreloadedImg src={KIBO.celebrate} alt="Kibo" className="w-32 h-32 object-contain" />
          <h2 className="text-2xl font-black text-foreground text-center">Come back tomorrow!</h2>
          <p className="text-kibo-gold font-bold text-lg">+{challenge.xpReward * 2} XP earned today</p>
          <div className="text-muted-foreground font-bold text-sm">Next challenge in: <span className="text-foreground">{countdown}</span></div>
          <button onClick={() => setScreen("train")} className="mt-4 px-8 py-3.5 bg-kibo-green text-primary-foreground rounded-xl font-black kibo-shadow">
            Practice more →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-card relative overflow-hidden">
      <ExitGameDialog open={showExit} onOpenChange={setShowExit} onConfirm={() => setScreen("train")} gameName="Daily Challenge" />
      <div className="px-5 py-3.5 border-b border-border flex items-center gap-3">
        <button onClick={() => !answered ? setShowExit(true) : setScreen("train")}><ArrowLeft className="w-5 h-5 text-muted-foreground" /></button>
        <span className="font-black text-foreground flex items-center gap-2">🎯 Daily Challenge</span>
        <span className="ml-auto bg-destructive/15 text-destructive px-2.5 py-0.5 rounded-full text-xs font-black">2x XP</span>
        <span className="text-sm font-bold text-muted-foreground flex items-center gap-1"><NotoEmoji name="fire" size={14} /> {progress.streak}</span>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="px-5 pt-6 pb-8 flex flex-col gap-5">
          {/* Question card */}
          <div className="rounded-[18px] p-5" style={{ background: "linear-gradient(135deg, #1a1a2e, #2d2d5e)" }}>
            <div className="text-xs font-black text-kibo-gold uppercase tracking-wider mb-3 flex items-center gap-1.5">⭐ Today's Question</div>
            <p className="text-white font-black text-lg leading-relaxed mb-3">{challenge.question}</p>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < challenge.difficulty ? "bg-kibo-gold" : "bg-white/20"}`} />
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2.5">
            {challenge.options.map((opt, i) => {
              let cls = "bg-background border-[2.5px] border-border";
              let keyCls = "bg-card border-2 border-border text-muted-foreground";
              if (answered) {
                if (opt.correct) { cls = "bg-kibo-green/10 border-[2.5px] border-kibo-green text-kibo-green"; keyCls = "bg-kibo-green border-2 border-kibo-green text-primary-foreground"; }
                else if (i === selected) { cls = "bg-destructive/10 border-[2.5px] border-destructive text-destructive"; keyCls = "bg-destructive border-2 border-destructive text-primary-foreground"; }
              }
              return (
                <button key={i} onClick={() => pick(i)} disabled={answered}
                  className={`${cls} rounded-[14px] p-4 px-[18px] font-bold text-[15px] text-left transition-all flex items-center gap-3`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${keyCls}`}>{KEYS[i]}</div>
                  {opt.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feedback */}
      {answered && (
        <div className={`shrink-0 p-5 pb-[max(2.25rem,calc(env(safe-area-inset-bottom)+1rem))] border-t-[2.5px] backdrop-blur-xl
          ${isCorrect ? "bg-[rgba(240,255,244,0.97)] border-kibo-green" : "bg-[rgba(255,240,240,0.97)] border-destructive"}`}>
          <div className="flex items-center gap-3 mb-3">
            <PreloadedImg src={isCorrect ? KIBO.celebrate : KIBO.sad} alt="Kibo" className="w-14 h-14 object-contain" />
            <div className="flex-1">
              <div className={`text-lg font-black ${isCorrect ? "text-kibo-green" : "text-destructive"}`}>
                {isCorrect ? <span>Brilliant! <NotoEmoji name="party" size={18} /></span> : <span>Not this time <NotoEmoji name="heartBroken" size={18} /></span>}
              </div>
              {isCorrect && (
                <div className="text-kibo-gold font-black text-sm mt-1 animate-pulse">+{challenge.xpReward * 2} XP — 2x daily bonus applied!</div>
              )}
            </div>
          </div>
          <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">{challenge.explanation}</p>
          <button onClick={() => { setIsDone(true); setAnswered(false); }}
            className={`w-full py-3.5 rounded-[14px] font-black text-base ${isCorrect ? "bg-kibo-green text-primary-foreground kibo-shadow" : "bg-destructive text-primary-foreground"}`}>
            CONTINUE
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyChallengeScreen;
