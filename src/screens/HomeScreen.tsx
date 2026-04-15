import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { KIBO, CURRICULUM } from "@/data/curriculum";
import { ChevronRight, ArrowRight, X } from "lucide-react";
import { COMING_SOON_MODULES } from "@/data/comingSoon";
import { getXPForLevel } from "@/lib/progress";
import { getTodaysTraining, exerciseToQuestion } from "@/data/dailyTraining";
import type { Lesson } from "@/data/curriculum";
import kiboBg from "@/assets/kibo-bg.png";
import NotoEmoji from "@/components/NotoEmoji";
import PreloadedImg from "@/components/PreloadedImg";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";


const HomeScreen = () => {
  const { setScreen, setCurrentLesson, progress, canPlay } = useApp();
  const [notified, setNotified] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("kibo_waitlist");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingModule, setPendingModule] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleNotifyClick = (moduleTitle: string) => {
    if (notified.has(moduleTitle)) return;
    setPendingModule(moduleTitle);
    setEmail("");
    setShowEmailModal(true);
  };

  const handleSubmitEmail = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("waitlist").insert({ email: trimmed, module_title: pendingModule });
    setSubmitting(false);
    if (error && error.code === "23505") {
      toast({ title: "Already subscribed!", description: "You're already on the list for this module." });
    } else if (error) {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
      return;
    } else {
      toast({ title: "You're on the list! 🎉", description: `We'll notify you when "${pendingModule}" launches.` });
    }
    const next = new Set(notified);
    next.add(pendingModule);
    setNotified(next);
    localStorage.setItem("kibo_waitlist", JSON.stringify([...next]));
    setShowEmailModal(false);
  };

  const training = getTodaysTraining(progress.completedLessons, progress.goal);
  const { topic, exercises: quizExercises, tierLabel } = training;

  const goalGreeting = progress.goal === "work" ? "Ready to work smarter with AI?" 
    : progress.goal === "study" ? "Let's ace your studies with AI!"
    : progress.goal === "build" ? "Let's build something amazing!"
    : null;

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

  // Quick Quiz: pick a random lesson from a level and jump in
  const allLevels = CURRICULUM.levels;
  const startQuickQuiz = (levelIdx: number) => {
    const level = allLevels[levelIdx];
    const availableLessons = level.lessons.filter(
      l => !progress.completedLessons.includes(l.id)
    );
    const lesson = availableLessons.length > 0
      ? availableLessons[0]
      : level.lessons[level.lessons.length - 1];
    setCurrentLesson({ ...lesson, state: "active" });
    setScreen("quiz");
  };

  return (
    <>
      {/* Header */}
      <div className="bg-card px-5 pt-4 pb-3.5 border-b border-border shrink-0 pr-14">
        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
          <div className="text-[18px] font-black text-foreground leading-tight mr-auto">
            {goalGreeting ? goalGreeting : <>Hello! <NotoEmoji name="wave" size={20} /></>}
          </div>
          <div className="flex gap-1.5 shrink-0 items-center">
            <div className="flex items-center gap-1.5 bg-background rounded-full px-3 py-1.5 text-[13px] font-extrabold text-kibo-orange">
              <NotoEmoji name="fire" size={15} /> {progress.streak}
            </div>
            <div className="flex items-center gap-1.5 bg-background rounded-full px-3 py-1.5 text-[13px] font-extrabold text-kibo-gold">
              <NotoEmoji name="diamond" size={15} /> {progress.xp}
            </div>
            <div className="flex items-center gap-0.5 bg-background rounded-full px-2.5 py-1.5">
              {Array.from({ length: progress.hearts }).map((_, i) => (
                <NotoEmoji key={`h${i}`} name="heart" size={14} />
              ))}
              {Array.from({ length: 3 - progress.hearts }).map((_, i) => (
                <NotoEmoji key={`e${i}`} name="heartEmpty" size={14} />
              ))}
            </div>
          </div>
        </div>
        <div className="text-[12px] text-muted-foreground font-semibold mb-2">Learn AI with Kibo</div>
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
              <div className="text-base font-black text-foreground mb-1 flex items-center gap-1">Hi, I'm Kibo! <NotoEmoji name="sparkles" size={16} /></div>
              <div className="text-[13px] text-muted-foreground leading-relaxed mb-3 max-w-[160px]">
                {!canPlay ? <span>Your hearts are refilling... Take a break! <NotoEmoji name="sleeping" size={14} /></span> :
                  progress.streak >= 30 ? <span>Legendary {progress.streak} day streak! You're unstoppable! <NotoEmoji name="crown" size={14} /></span> :
                  progress.streak >= 7 ? <span>Amazing {progress.streak} day streak! Keep it up! <NotoEmoji name="star" size={14} /></span> :
                  progress.streak >= 3 ? <span>{progress.streak} day streak! You're on fire! <NotoEmoji name="fire" size={14} /></span> :
                  progress.streak > 0 ? <span>Let's train your AI skills! You're on a {progress.streak} day streak <NotoEmoji name="fire" size={14} /></span> :
                  <span>Let's start training your AI skills! <NotoEmoji name="flexed" size={14} /></span>}
              </div>
              <button onClick={() => setScreen("lessons")}
                className="bg-kibo-green text-primary-foreground rounded-xl px-[22px] py-2.5 font-black text-sm inline-flex items-center gap-2 kibo-shadow active:translate-y-[2px] active:shadow-none transition-all">
                START <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <PreloadedImg src={
              progress.streak >= 30 ? KIBO.streak30 :
              progress.streak >= 7 ? KIBO.streak7 :
              progress.streak >= 3 ? KIBO.streak3 :
              progress.streak > 0 ? KIBO.robotics :
              KIBO.focusedLaptop
            } alt="Kibo" className="w-[200px] h-[200px] object-contain shrink-0 relative z-10 -mb-1 mr-2 drop-shadow-lg" />
          </div>

          {/* Quick Quiz */}
          <div>
            <h3 className="text-[17px] font-black text-foreground mb-3 flex items-center gap-2">
              <NotoEmoji name="target" size={20} /> Quick Quiz
            </h3>
            <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {allLevels.map((level, idx) => {
                const done = level.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
                const total = level.lessons.length;
                const isLocked = idx > 0 && allLevels[idx - 1].lessons.some(l => !progress.completedLessons.includes(l.id)) && done === 0;
                const pastelBgs = [
                  "bg-kibo-teal-light",
                  "bg-kibo-sky-light", 
                  "bg-kibo-lavender-light",
                  "bg-kibo-pink-light",
                  "bg-kibo-gold-light",
                  "bg-kibo-coral-light",
                  "bg-kibo-orange-light",
                ];
                const pastelBorders = [
                  "border-kibo-teal/40",
                  "border-kibo-sky/40",
                  "border-kibo-lavender/40", 
                  "border-kibo-pink/40",
                  "border-kibo-gold/40",
                  "border-kibo-coral/40",
                  "border-kibo-orange/40",
                ];
                return (
                  <button key={level.id} onClick={() => !isLocked && startQuickQuiz(idx)} disabled={isLocked}
                    className={`rounded-[16px] p-3.5 border-[1.5px] min-w-[140px] shrink-0 flex flex-col text-left transition-all ${
                      isLocked 
                        ? "bg-card border-border opacity-50" 
                        : `${pastelBgs[idx % pastelBgs.length]} ${pastelBorders[idx % pastelBorders.length]} hover:shadow-md hover:-translate-y-0.5`
                    }`}>
                    <div className="w-10 h-10 rounded-[12px] flex items-center justify-center text-xl mb-2.5 bg-white/60 shadow-sm">
                      <NotoEmoji name={idx === 0 ? "sparkles" : idx === 1 ? "robot" : idx === 2 ? "pencil" : idx === 3 ? "lightbulb" : idx === 4 ? "search" : idx === 5 ? "shield" : "star"} size={22} />
                    </div>
                    <div className="text-[12px] font-extrabold text-foreground leading-tight mb-1">{level.title}</div>
                    <div className="text-[10px] text-muted-foreground font-semibold mb-2">
                      {isLocked ? <><NotoEmoji name="lock" size={10} /> Locked</> : `${done}/${total} done`}
                    </div>
                    {!isLocked && (
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden w-full">
                        <div className="h-full rounded-full bg-kibo-green transition-all" style={{ width: `${(done / total) * 100}%` }} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Today's Training */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[17px] font-black text-foreground flex items-center gap-2">
                <NotoEmoji name="fire" size={20} /> Today's AI Training
              </h3>
              <span className="text-xs font-extrabold px-2.5 py-1 rounded-full" style={{ background: topic.color + "20", color: topic.color }}>{tierLabel}</span>
            </div>
            <div className="bg-card rounded-[18px] p-4 border-[1.5px] border-border">
              {quizExercises.slice(0, 3).map((ex, i) => {
                const typeLabels: Record<string, { icon: string; bg: string; border: string }> = {
                  MULTIPLE_CHOICE: { icon: "pencil", bg: "bg-kibo-pink-light", border: "border-kibo-pink/30" },
                  IDENTIFY: { icon: "search", bg: "bg-kibo-teal-light", border: "border-kibo-teal/30" },
                  SCENARIO: { icon: "lightbulb", bg: "bg-kibo-gold-light", border: "border-kibo-gold/30" },
                };
                const meta = typeLabels[ex.type] || { icon: "target", bg: "bg-muted", border: "border-border" };
                return (
                  <button key={ex.id} onClick={() => setScreen("lessons")}
                    className={`w-full bg-background rounded-xl p-3.5 flex items-center gap-3.5 mb-2 last:mb-0 border-[1.5px] ${meta.border} hover:shadow-sm hover:translate-x-0.5 transition-all text-left`}>
                    <div className={`w-[38px] h-[38px] rounded-[11px] flex items-center justify-center shrink-0 ${meta.bg}`}>
                      <NotoEmoji name={meta.icon as any} size={22} />
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

          {/* Quick Course Progress */}
          <div className="bg-kibo-green-light/50 rounded-[18px] p-4 border-[1.5px] border-kibo-green/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-[12px] bg-white/70 flex items-center justify-center text-2xl shadow-sm">🧠</div>
              <div className="flex-1">
                <div className="text-[14px] font-black text-foreground">
                  {progress.completedLessons.length} / {CURRICULUM.levels.flatMap(l => l.lessons).length} lessons done
                </div>
                <div className="h-2.5 bg-white/60 rounded-full overflow-hidden mt-1.5 border border-kibo-green/10">
                  <div className="h-full rounded-full bg-kibo-green transition-all" 
                    style={{ width: `${(progress.completedLessons.length / CURRICULUM.levels.flatMap(l => l.lessons).length) * 100}%` }} />
                </div>
              </div>
            </div>
            <button onClick={() => setScreen("lessons")}
              className="w-full py-3 bg-white/70 text-kibo-teal-dark rounded-xl font-black text-sm hover:bg-white hover:shadow-sm transition-all border border-kibo-green/20">
              CONTINUE LEARNING ›
            </button>
          </div>

          {/* Coming Soon Teaser */}
          <div>
            <h3 className="text-[17px] font-black text-foreground mb-3 flex items-center gap-2">
              <NotoEmoji name="rocket" size={18} /> Coming Soon
            </h3>
            <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {COMING_SOON_MODULES.slice(0, 3).map((mod, i) => (
                <div key={i} className="bg-card rounded-[14px] p-3.5 border-[1.5px] border-border min-w-[140px] shrink-0 flex flex-col">
                  <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg mb-2"
                    style={{ background: mod.color + "15" }}>
                    {mod.icon}
                  </div>
                  <div className="text-[12px] font-extrabold text-foreground leading-tight mb-0.5">{mod.title}</div>
                  <div className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1 mb-2">
                    <NotoEmoji name="lock" size={10} /> Coming soon
                  </div>
                  <button
                    onClick={() => handleNotifyClick(mod.title)}
                    disabled={notified.has(mod.title)}
                    className={`mt-auto text-[10px] font-extrabold rounded-md px-2 py-1 transition-all ${
                      notified.has(mod.title)
                        ? "bg-kibo-green/15 text-kibo-green"
                        : "bg-muted text-muted-foreground hover:bg-kibo-green/10 hover:text-kibo-green"
                    }`}>
                    {notified.has(mod.title) ? "✓ Notified" : "🔔 Notify me"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
          <div className="bg-card rounded-2xl p-5 w-full max-w-[320px] border border-border shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[16px] font-black text-foreground flex items-center gap-1.5">
                <NotoEmoji name="bell" size={16} /> Get Notified
              </h3>
              <button onClick={() => setShowEmailModal(false)} className="text-muted-foreground p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[12px] text-muted-foreground font-semibold mb-4">
              Enter your email and we'll let you know when <b className="text-foreground">{pendingModule}</b> launches!
            </p>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              autoFocus
              className="w-full px-4 py-3 rounded-xl border-[1.5px] border-border bg-background text-foreground text-[14px] font-semibold placeholder:text-muted-foreground/50 focus:outline-none focus:border-kibo-green transition-colors mb-3"
              onKeyDown={e => e.key === "Enter" && handleSubmitEmail()}
            />
            <button
              onClick={handleSubmitEmail}
              disabled={submitting}
              className="w-full py-3 bg-kibo-green text-primary-foreground rounded-xl font-black text-[14px] kibo-shadow active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50">
              {submitting ? "Submitting..." : "Notify Me 🔔"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
