import { useApp } from "@/context/AppContext";
import { KIBO, CURRICULUM } from "@/data/curriculum";
import { ChevronRight, ArrowRight, Check, Lock, Star } from "lucide-react";
import { getXPForLevel } from "@/lib/progress";
import { getTodaysTraining, exerciseToQuestion } from "@/data/dailyTraining";
import type { Lesson } from "@/data/curriculum";
import kiboBg from "@/assets/kibo-bg.png";
import Icon from "@/components/Icon";
import NotoEmoji from "@/components/NotoEmoji";
import ICONS from "@/assets/icons";

const HomeScreen = () => {
  const { setScreen, setCurrentLesson, progress, canPlay } = useApp();

  const training = getTodaysTraining(progress.completedLessons);
  const { topic, exercises: quizExercises, tierLabel } = training;

  const startDailyTraining = () => {
    const dailyLesson: Lesson = {
      id: `daily-${topic.id}`,
      title: topic.title,
      duration: `${quizExercises.length} min`,
      xp: quizExercises.length * 10,
      state: "active",
      questions: quizExercises.map(exerciseToQuestion),
    };
    setCurrentLesson(dailyLesson);
    setScreen("quiz");
  };

  return (
    <>
      {/* Header */}
      <div className="bg-card px-5 pt-4 pb-3.5 border-b border-border shrink-0">
        <div className="flex justify-between items-start mb-2.5">
          <div>
            <div className="text-[22px] font-black text-foreground flex items-center gap-1.5">Hello! <NotoEmoji name="wave" size={24} /></div>
            <div className="text-[13px] text-muted-foreground font-semibold mt-0.5">Learn AI with Kibo</div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 bg-background rounded-full px-3.5 py-1.5 text-sm font-extrabold text-kibo-orange">
              <Icon name="fire" size={16} /> {progress.streak}
            </div>
            <div className="flex items-center gap-1.5 bg-background rounded-full px-3.5 py-1.5 text-sm font-extrabold text-kibo-gold">
              <Icon name="diamond" size={16} /> {progress.xp}
            </div>
            <div className="flex items-center gap-1 bg-background rounded-full px-3.5 py-1.5 text-sm font-extrabold">
              {Array.from({ length: progress.hearts }).map((_, i) => (
                <Icon key={`h${i}`} name="heart" size={16} />
              ))}
              {Array.from({ length: 3 - progress.hearts }).map((_, i) => (
                <Icon key={`e${i}`} name="heartEmpty" size={16} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black text-muted-foreground tracking-wide whitespace-nowrap">LEVEL {progress.level}</span>
          <div className="flex-1 h-[9px] bg-background rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${(progress.xp / getXPForLevel(progress.level)) * 100}%`, background: "linear-gradient(90deg, #3db74a, #72e07a)" }} />
          </div>
          <span className="text-[11px] font-black text-kibo-green whitespace-nowrap">{progress.xp}/{getXPForLevel(progress.level)} XP</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: "none" }}>
        <div className="p-[18px] pb-[100px] flex flex-col gap-4">
          {/* Kibo Hero Card */}
          <div className="rounded-[18px] p-0 relative overflow-hidden flex items-end min-h-[180px]"
            style={{ backgroundImage: `url(${kiboBg})`, backgroundSize: "cover", backgroundPosition: "center", border: "1.5px solid rgba(74,158,255,0.15)" }}>
            <div className="absolute inset-0 bg-white/20" />
            <div className="flex-1 pt-5 pl-5 pb-5 relative z-10">
              <div className="text-base font-black text-foreground mb-1">Hi, I'm Kibo! ✨</div>
              <div className="text-[13px] text-muted-foreground leading-relaxed mb-3 max-w-[160px]">
                {!canPlay ? "Your hearts are refilling... Take a break! 😴" :
                  progress.streak >= 30 ? <span>Legendary {progress.streak} day streak! You're unstoppable! 👑</span> :
                  progress.streak >= 7 ? <span>Amazing {progress.streak} day streak! Keep it up! <Icon name="star" size={14} /></span> :
                  progress.streak >= 3 ? <span>{progress.streak} day streak! You're on fire! <Icon name="fire" size={14} /></span> :
                  progress.streak > 0 ? <span>Let's train your AI skills! You're on a {progress.streak} day streak <Icon name="fire" size={14} /></span> :
                  "Let's start training your AI skills! 💪"}
              </div>
              <button onClick={() => setScreen("lessons")}
                className="bg-kibo-green text-primary-foreground rounded-xl px-[22px] py-2.5 font-black text-sm inline-flex items-center gap-2 kibo-shadow active:translate-y-[2px] active:shadow-none transition-all">
                START <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <img src={
              progress.streak >= 30 ? KIBO.streak30 :
              progress.streak >= 7 ? KIBO.streak7 :
              progress.streak >= 3 ? KIBO.streak3 :
              KIBO.happy
            } alt="Kibo" className="w-[200px] h-[200px] object-contain shrink-0 relative z-10 -mb-1 mr-2 drop-shadow-lg" />
          </div>

          {/* Today's Training */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[17px] font-black text-foreground flex items-center gap-2">
                <Icon name="fire" size={20} /> Today's AI Training
              </h3>
              <span className="text-xs font-extrabold px-2.5 py-1 rounded-full" style={{ background: topic.color + "20", color: topic.color }}>{tierLabel}</span>
            </div>
            <div className="bg-card rounded-[18px] p-4 border-[1.5px] border-border">
              {quizExercises.slice(0, 3).map((ex, i) => {
                const typeLabels: Record<string, { icon: string; bg: string }> = {
                  MULTIPLE_CHOICE: { icon: "pencil", bg: "bg-[#ffe8ea]" },
                  IDENTIFY: { icon: "search", bg: "bg-[#e0faf0]" },
                  SCENARIO: { icon: "lightbulb", bg: "bg-[#ffe8d6]" },
                };
                const meta = typeLabels[ex.type] || { icon: "target", bg: "bg-muted" };
                return (
                  <button key={ex.id} onClick={startDailyTraining}
                    className="w-full bg-background rounded-xl p-3.5 flex items-center gap-3.5 mb-2 last:mb-0 border-[1.5px] border-transparent hover:border-kibo-green hover:bg-kibo-green/5 hover:translate-x-0.5 transition-all text-left">
                    <div className={`w-[38px] h-[38px] rounded-[11px] flex items-center justify-center shrink-0 ${meta.bg}`}>
                      <Icon name={meta.icon as any} size={22} />
                    </div>
                    <span className="flex-1 text-[15px] font-bold text-foreground">
                      {i + 1}. {ex.question.length > 35 ? ex.question.slice(0, 32) + "..." : ex.question}
                    </span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                  </button>
                );
              })}
              <button onClick={() => setScreen("train")}
                className="w-full py-3.5 bg-kibo-green text-primary-foreground rounded-xl font-black text-[15px] mt-3 kibo-shadow active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2">
                START TRAINING <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Learning Path */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[17px] font-black text-foreground flex items-center gap-2">
                <Icon name="graduation" size={20} /> Learning Path
              </h3>
            </div>
            <div className="bg-card rounded-[18px] p-4 border-[1.5px] border-border">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] font-black text-foreground">LEVEL 1: <span className="text-kibo-green">AI BASICS</span></span>
                <button onClick={() => setScreen("lessons")} className="text-[13px] font-extrabold text-kibo-green">
                  {progress.completedLessons.length}/{CURRICULUM.levels.flatMap(l => l.lessons).length} ›
                </button>
              </div>
              {(() => {
                const allLessons = CURRICULUM.levels[0].lessons;
                const completed = allLessons.filter(l => progress.completedLessons.includes(l.id));
                const recentDone = completed.slice(-3);
                return recentDone.length > 0 ? (
                  <div className="flex flex-col gap-1.5 mb-3.5">
                    {recentDone.map((l, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                        <Icon name="star" size={16} /> {l.title}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[13px] text-muted-foreground mb-3.5">
                    Start your first lesson! <Icon name="rocket" size={14} />
                  </div>
                );
              })()}
              <div className="flex items-center gap-[7px] mb-3.5">
                {CURRICULUM.levels[0].lessons.slice(0, 4).map((lesson, i) => {
                  const isDone = progress.completedLessons.includes(lesson.id);
                  const isActive = !isDone && !progress.completedLessons.includes(lesson.id) && 
                    (i === 0 || progress.completedLessons.includes(CURRICULUM.levels[0].lessons[i-1]?.id));
                  return (
                    <div key={lesson.id} className="flex items-center gap-[7px]">
                      {i > 0 && <span className="text-muted-foreground/50 text-sm">→</span>}
                      <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-[13px] font-black
                        ${isDone ? "bg-secondary/20 text-secondary" : isActive ? "bg-kibo-gold/20 text-kibo-gold border-2 border-kibo-gold" : "bg-background text-muted-foreground/50"}`}>
                        {isDone ? <Check className="w-4 h-4" /> : isActive ? i + 1 : <Lock className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => setScreen("lessons")}
                className="w-full py-3 bg-secondary/15 text-secondary rounded-xl font-black text-sm hover:bg-secondary hover:text-primary-foreground transition-all">
                VIEW LESSONS ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
