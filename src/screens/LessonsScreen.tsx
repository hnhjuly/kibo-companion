import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { CURRICULUM, KIBO } from "@/data/curriculum";
import { Check, Lock, ChevronLeft, RotateCcw } from "lucide-react";
import NotoEmoji from "@/components/NotoEmoji";
import PreloadedImg from "@/components/PreloadedImg";

const LessonsScreen = () => {
  const { setScreen, setCurrentLesson, onResetProgress, progress } = useApp();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const allLessons = CURRICULUM.levels.flatMap(lv => lv.lessons);
  const completedSet = new Set(progress.completedLessons);
  const allDone = allLessons.every(l => completedSet.has(l.id));

  // If all lessons complete, show the completion screen
  if (allDone) {
    setScreen("all-complete");
    return null;
  }
  
  let foundActive = false;
  const lessonStates = new Map<string, "done" | "active" | "locked">();
  for (const lesson of allLessons) {
    if (completedSet.has(lesson.id)) {
      lessonStates.set(lesson.id, "done");
    } else if (!foundActive) {
      lessonStates.set(lesson.id, "active");
      foundActive = true;
    } else {
      lessonStates.set(lesson.id, "locked");
    }
  }

  return (
    <>
      <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center gap-3.5">
        <button onClick={() => setScreen("home")} className="text-foreground p-1"><ChevronLeft className="w-6 h-6" /></button>
        <span className="text-lg font-black text-foreground flex-1 flex items-center gap-2">
          <NotoEmoji name="graduation" size={20} /> Learning Path
        </span>
        <button onClick={() => setShowResetConfirm(true)}
          className="text-muted-foreground p-1.5 rounded-lg hover:bg-background transition-colors"
          title="Reset Progress">
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="p-[18px] pb-[100px] flex flex-col gap-5">
          {/* Kibo studying header */}
          <div className="flex items-center gap-3 bg-card rounded-2xl p-4 border-[1.5px] border-border">
            <PreloadedImg src={KIBO.studying} alt="Kibo studying" className="w-14 h-14 object-contain" />
            <div className="text-[13px] text-muted-foreground leading-relaxed font-semibold">
              Keep learning! Each lesson brings you closer to AI mastery <NotoEmoji name="book" size={14} />
            </div>
          </div>
          {CURRICULUM.levels.map(lv => (
            <div key={lv.id}>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide"
                  style={{ background: lv.color + "22", color: lv.color }}>
                  LEVEL {lv.id}
                </span>
                <span className="text-[15px] font-black text-foreground">{lv.title}</span>
              </div>
              {lv.lessons.map((lesson, i) => {
                const state = lessonStates.get(lesson.id) || "locked";
                const isLocked = state === "locked";
                const isDone = state === "done";
                const isActive = state === "active";
                return (
                  <button key={lesson.id}
                    disabled={isLocked || lesson.questions.length === 0}
                    onClick={() => { setCurrentLesson(lesson); setScreen("quiz"); }}
                    className={`w-full bg-card rounded-xl p-3.5 flex items-center gap-3.5 mb-2 border-[1.5px] border-border transition-all text-left
                      ${isLocked ? "opacity-50 cursor-not-allowed" : "hover:border-kibo-green cursor-pointer"}`}>
                    <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-sm font-black shrink-0
                      ${isDone ? "bg-kibo-green/15 text-kibo-green" : isActive ? "bg-kibo-gold/15 text-kibo-gold border-2 border-kibo-gold" : "bg-background text-muted-foreground/50"}`}>
                      {isDone ? <Check className="w-4 h-4" /> : isActive ? i + 1 : <Lock className="w-3.5 h-3.5" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-extrabold text-foreground">{lesson.title}</div>
                      <div className="text-xs text-muted-foreground font-semibold mt-0.5">{lesson.duration} · {lesson.questions.length} questions</div>
                    </div>
                    <span className="text-xs font-extrabold text-kibo-gold">+{lesson.xp} XP</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          onClick={() => setShowResetConfirm(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-card rounded-2xl p-6 w-full max-w-[320px] border-[1.5px] border-border text-center"
            onClick={e => e.stopPropagation()}>
            <PreloadedImg src={KIBO.surprised} alt="Kibo" className="w-20 h-20 object-contain mx-auto mb-3" />
            <h2 className="text-xl font-black text-foreground mb-2">Reset Everything?</h2>
            <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">
              This will erase all your progress: XP, streaks, hearts, and completed lessons. Questions will be reshuffled. <b>This can't be undone!</b>
            </p>
            <div className="flex flex-col gap-2">
              <button onClick={() => { onResetProgress(); setShowResetConfirm(false); }}
                className="w-full py-3.5 bg-destructive text-primary-foreground rounded-xl font-black text-[15px] transition-all active:translate-y-[2px]">
                Reset Everything
              </button>
              <button onClick={() => setShowResetConfirm(false)}
                className="w-full py-3 bg-muted text-muted-foreground rounded-xl font-bold text-[15px] transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LessonsScreen;
