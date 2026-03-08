import { useApp } from "@/context/AppContext";
import { CURRICULUM, KIBO } from "@/data/curriculum";
import { Check, Lock, ChevronLeft } from "lucide-react";

const LessonsScreen = () => {
  const { setScreen, setCurrentLesson } = useApp();

  return (
    <>
      <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center gap-3.5">
        <button onClick={() => setScreen("home")} className="text-foreground p-1"><ChevronLeft className="w-6 h-6" /></button>
        <span className="text-lg font-black text-foreground">🎓 Learning Path</span>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="p-[18px] pb-[100px] flex flex-col gap-5">
          {/* Kibo studying header */}
          <div className="flex items-center gap-3 bg-card rounded-2xl p-4 border-[1.5px] border-border">
            <img src={KIBO.studying} alt="Kibo studying" className="w-14 h-14 object-contain" />
            <div className="text-[13px] text-muted-foreground leading-relaxed font-semibold">
              Keep learning! Each lesson brings you closer to AI mastery 📚
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
                const isLocked = lesson.state === "locked";
                const isDone = lesson.state === "done";
                const isActive = lesson.state === "active";
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
    </>
  );
};

export default LessonsScreen;
