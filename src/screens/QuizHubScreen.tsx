import { useApp } from "@/context/AppContext";
import { CURRICULUM } from "@/data/curriculum";
import { ArrowRight } from "lucide-react";
import NotoEmoji from "@/components/NotoEmoji";

const PASTEL_BGS = [
  "bg-kibo-teal-light", "bg-kibo-sky-light", "bg-kibo-lavender-light",
  "bg-kibo-pink-light", "bg-kibo-gold-light", "bg-kibo-coral-light", "bg-kibo-orange-light",
];
const PASTEL_BORDERS = [
  "border-kibo-teal/30", "border-kibo-sky/30", "border-kibo-lavender/30",
  "border-kibo-pink/30", "border-kibo-gold/30", "border-kibo-coral/30", "border-kibo-orange/30",
];
const EMOJIS = ["sparkles", "robot", "pencil", "lightbulb", "search", "shield", "star"] as const;

const QuizHubScreen = () => {
  const { setScreen, setCurrentLesson, progress } = useApp();
  const allLevels = CURRICULUM.levels;

  const startQuiz = (levelIdx: number) => {
    const level = allLevels[levelIdx];
    const available = level.lessons.filter(l => !progress.completedLessons.includes(l.id));
    const lesson = available.length > 0 ? available[0] : level.lessons[level.lessons.length - 1];
    setCurrentLesson({ ...lesson, state: "active" });
    setScreen("quiz");
  };

  return (
    <>
      <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center gap-3.5 justify-center">
        <span className="text-lg font-black text-foreground flex items-center gap-2">
          <NotoEmoji name="lightning" size={20} /> Quick Quiz
        </span>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="p-[18px] pb-[100px] flex flex-col gap-3">
          <p className="text-[13px] text-muted-foreground font-semibold text-center">
            Jump straight into a quiz from any module
          </p>
          {allLevels.map((level, idx) => {
            const done = level.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
            const total = level.lessons.length;
            const isLocked = idx > 0 && allLevels[idx - 1].lessons.some(l => !progress.completedLessons.includes(l.id)) && done === 0;
            const isDone = done === total;

            return (
              <button key={level.id} onClick={() => !isLocked && startQuiz(idx)} disabled={isLocked}
                className={`w-full rounded-[18px] p-4 border-[1.5px] flex items-center gap-4 text-left transition-all ${
                  isLocked
                    ? "bg-card border-border opacity-50"
                    : `${PASTEL_BGS[idx % PASTEL_BGS.length]} ${PASTEL_BORDERS[idx % PASTEL_BORDERS.length]} hover:shadow-md active:scale-[0.98]`
                }`}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/60 shadow-sm shrink-0">
                  <NotoEmoji name={EMOJIS[idx % EMOJIS.length]} size={26} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground/60 mb-0.5">
                    Module {level.id}
                  </div>
                  <div className="text-[15px] font-black text-foreground truncate">{level.title}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-2 bg-white/60 rounded-full overflow-hidden max-w-[140px] border border-black/5">
                      <div className="h-full rounded-full bg-kibo-green transition-all" style={{ width: `${(done / total) * 100}%` }} />
                    </div>
                    <span className="text-[11px] font-bold text-muted-foreground/80">{done}/{total}</span>
                  </div>
                </div>
                <div className="shrink-0">
                  {isLocked ? (
                    <NotoEmoji name="lock" size={18} />
                  ) : isDone ? (
                    <span className="text-[10px] font-black bg-kibo-green/20 text-kibo-green rounded-full px-2.5 py-1">Done</span>
                  ) : (
                    <ArrowRight className="w-5 h-5 text-muted-foreground/50" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default QuizHubScreen;
