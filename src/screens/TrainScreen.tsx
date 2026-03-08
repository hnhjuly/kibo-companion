import { useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { getTodaysTraining, exerciseToQuestion } from "@/data/dailyTraining";
import { ArrowRight } from "lucide-react";
import { KIBO, type Lesson } from "@/data/curriculum";
import NotoEmoji from "@/components/NotoEmoji";
import PreloadedImg from "@/components/PreloadedImg";

import streakBg1 from "@/assets/streak-bg-1.png";
import streakBg2 from "@/assets/streak-bg-2.png";
import streakBg3 from "@/assets/streak-bg-3.png";
import streakBg4 from "@/assets/streak-bg-4.png";

const STREAK_BGS = [streakBg1, streakBg2, streakBg3, streakBg4];

const TrainScreen = () => {
  const { setScreen, setCurrentLesson, progress } = useApp();
  const randomBg = useMemo(() => STREAK_BGS[Math.floor(Math.random() * STREAK_BGS.length)], []);

  const training = getTodaysTraining(progress.completedLessons);
  const { topic, exercises: quizExercises, tierLabel } = training;

  const startDailyChallenge = () => {
    const dailyLesson: Lesson = {
      id: `daily-${topic.id}`,
      title: topic.title,
      duration: `${quizExercises.length * 1} min`,
      xp: quizExercises.length * 10,
      state: "active",
      questions: quizExercises.map(exerciseToQuestion),
    };
    setCurrentLesson(dailyLesson);
    setScreen("quiz");
  };

  return (
    <>
      <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center gap-3.5 justify-center">
        <span className="text-lg font-black text-foreground flex items-center gap-2">
          <NotoEmoji name="fire" size={20} /> Daily Challenge
        </span>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="p-[18px] pb-[100px] flex flex-col gap-4">
          {/* Streak */}
          <div className="rounded-[18px] overflow-hidden relative" style={{ border: "1.5px solid #ffb800" }}>
            <PreloadedImg src={randomBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative p-[18px] flex items-center gap-4">
              <PreloadedImg src={
                progress.streak >= 30 ? KIBO.streak30 :
                progress.streak >= 7 ? KIBO.streak7 :
                progress.streak >= 3 ? KIBO.streak3 :
                progress.streak > 0 ? KIBO.streakAtRisk :
                KIBO.neutral
              } alt="Kibo streak" className="w-[150px] h-[150px] object-contain drop-shadow-lg" />
              <div className="flex-1">
                <div className="text-[28px] font-black text-white drop-shadow-md">{progress.streak} Day Streak</div>
                <div className="text-[13px] text-white/80 font-bold drop-shadow-sm">
                  {progress.streak >= 30 ? <span>Legendary! <NotoEmoji name="crown" size={14} /></span> : progress.streak >= 7 ? <span>Amazing! <NotoEmoji name="star" size={14} /></span> : progress.streak >= 3 ? <span>On fire! <NotoEmoji name="fire" size={14} /></span> : "Don't break it!"}
                </div>
              </div>
              <button className="bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-[10px] px-3 py-1.5 text-xs font-extrabold text-white inline-flex items-center gap-1"><NotoEmoji name="snowflake" size={14} /> Freeze</button>
            </div>
          </div>

          {/* Today's topic header */}
          <div className="rounded-[18px] p-4 border-[1.5px] border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-[13px] flex items-center justify-center text-2xl"
                style={{ background: topic.color + "20" }}>
                {topic.icon}
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-black text-foreground">{tierLabel}</div>
                <div className="text-xs text-muted-foreground font-semibold">{topic.desc}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold mt-1">
              <span className="bg-kibo-gold/15 text-kibo-gold rounded-full px-2.5 py-0.5 font-extrabold">+{quizExercises.length * 10} XP</span>
              <span>{quizExercises.length} questions</span>
              <span>·</span>
              <span>~{quizExercises.length} min</span>
            </div>
          </div>

          {/* Daily exercises preview */}
          <div className="bg-card rounded-[18px] p-4 border-[1.5px] border-border">
            <h3 className="text-[17px] font-black text-foreground mb-3">Today's Questions</h3>
            <div className="flex gap-[7px] mb-4">
              {quizExercises.slice(0, 3).map((_, i) => (
                <div key={i} className="flex-1 h-1.5 rounded-full bg-border" />
              ))}
            </div>
            {quizExercises.slice(0, 3).map((ex, i) => {
              const typeLabels: Record<string, { label: string; icon: string }> = {
                MULTIPLE_CHOICE: { label: "Multiple Choice", icon: "pencil" },
                IDENTIFY: { label: "Identify", icon: "search" },
                SCENARIO: { label: "Scenario", icon: "lightbulb" },
              };
              const meta = typeLabels[ex.type] || { label: ex.type, icon: "target" };
              return (
                <button key={ex.id} onClick={startDailyChallenge}
                  className="w-full bg-background rounded-[14px] p-4 mb-2.5 text-left border-2 border-transparent hover:border-kibo-green transition-all">
                  <div className="text-[11px] font-extrabold text-muted-foreground/50 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <NotoEmoji name={meta.icon as any} size={12} /> {meta.label}
                  </div>
                  <div className="text-[15px] font-extrabold text-foreground mb-1.5">
                    {ex.question.length > 55 ? ex.question.slice(0, 52) + "..." : ex.question}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-kibo-gold/15 text-kibo-gold rounded-full px-2.5 py-0.5 text-[11px] font-extrabold">+10 XP</span>
                    <span className="text-xs text-muted-foreground/50 font-bold">~1 min</span>
                  </div>
                </button>
              );
            })}
            <button onClick={startDailyChallenge}
              className="w-full py-3.5 bg-kibo-green text-primary-foreground rounded-xl font-black text-[15px] kibo-shadow active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2">
              START CHALLENGE <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainScreen;
