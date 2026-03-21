import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { CURRICULUM, KIBO } from "@/data/curriculum";
import { Check, Lock, ChevronLeft, RotateCcw, Sparkles, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NotoEmoji from "@/components/NotoEmoji";
import PreloadedImg from "@/components/PreloadedImg";
import { COMING_SOON_MODULES } from "@/data/comingSoon";
import { ReadingCardState, READING_CARDS, MODULE_COLORS } from "@/data/readingCards";

const ZIGZAG_OFFSETS = [0, 30, 0, -30, 0, 30, 0, -30, 0, 30, 0, -30, 0, 30, 0];

const LessonsScreen = () => {
  const { setScreen, setCurrentLesson, onResetProgress, progress, setReadingModule } = useApp();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [justReadModule, setJustReadModule] = useState<string | null>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  const allLessons = CURRICULUM.levels.flatMap(lv => lv.lessons);
  const completedSet = new Set(progress.completedLessons);
  const allDone = allLessons.every(l => completedSet.has(l.id));

  useEffect(() => {
    if (allDone) setScreen("all-complete");
  }, [allDone, setScreen]);

  // Scroll to active lesson on mount
  useEffect(() => {
    const t = setTimeout(() => {
      activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 400);
    return () => clearTimeout(t);
  }, []);

  // Detect if user just came back from reading cards
  useEffect(() => {
    const moduleIds = ['m1','m2','m3','m4','m5','m6','m7'];
    for (const mId of moduleIds) {
      if (ReadingCardState.hasReadAll(mId) && ReadingCardState.wasJustCompleted(mId)) {
        setJustReadModule(mId);
        ReadingCardState.clearJustCompleted(mId);
        break;
      }
    }
  }, []);

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

  let globalIdx = 0;

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
          {/* Ready to train banner */}
          <AnimatePresence>
            {justReadModule && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl p-4 border-[1.5px] flex items-center gap-3"
                style={{ background: 'hsl(135 60% 96%)', borderColor: 'hsla(135, 60%, 40%, 0.25)' }}
              >
                <PreloadedImg
                  src={KIBO.celebrate}
                  alt="Kibo"
                  className="w-12 h-12 object-contain shrink-0"
                />
                <div className="flex-1">
                  <div className="text-[14px] font-black text-foreground">
                    Reading done! Ready to train?
                  </div>
                  <div className="text-[12px] text-muted-foreground font-semibold mt-0.5">
                    Tap your first lesson below to test your knowledge.
                  </div>
                </div>
                <button
                  onClick={() => setJustReadModule(null)}
                  className="text-muted-foreground p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Kibo studying header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 rounded-2xl p-4 border-[1.5px] border-border"
            style={{ background: "linear-gradient(135deg, hsl(var(--card)), hsl(200 80% 97%))" }}
          >
            <PreloadedImg src={KIBO.studying} alt="Kibo studying" className="w-14 h-14 object-contain" />
            <div className="text-[13px] text-muted-foreground leading-relaxed font-semibold">
              Keep learning! Each lesson brings you closer to AI mastery <NotoEmoji name="book" size={14} />
            </div>
          </motion.div>

          {CURRICULUM.levels.map((lv, lvIdx) => {
            const lvLessons = lv.lessons;
            const lvCompleted = lvLessons.filter(l => completedSet.has(l.id)).length;
            const lvProgress = lvCompleted / lvLessons.length;

            return (
              <motion.div
                key={lv.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: lvIdx * 0.1 }}
              >
                {/* Level header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wide flex items-center gap-1.5"
                    style={{ background: lv.color + "18", color: lv.color, border: `1.5px solid ${lv.color}30` }}>
                    {lvProgress === 1 && <Check className="w-3 h-3" />}
                    LEVEL {lv.id}
                  </div>
                  <span className="text-[15px] font-black text-foreground flex-1">{lv.title}</span>
                  {!ReadingCardState.hasReadAll(`m${lv.id}`) && READING_CARDS[`m${lv.id}`] && (
                    <span className="text-[11px] font-bold rounded-full px-2 py-0.5 mr-1" style={{ background: "#f0f4ff", color: "#6b7280" }}>
                      Read first
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-muted-foreground">{lvCompleted}/{lvLessons.length}</span>
                </div>

                {/* Level progress bar */}
                <div className="h-1.5 bg-muted rounded-full mb-4 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${lv.color}, ${lv.color}88)` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${lvProgress * 100}%` }}
                    transition={{ duration: 0.8, delay: lvIdx * 0.1 + 0.3 }}
                  />
                </div>

                {/* Lessons in zigzag path */}
                <div className="flex flex-col items-center gap-2 relative">
                  {/* Connecting path line */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-border -translate-x-1/2 z-0" />

                  {lvLessons.map((lesson, i) => {
                    const state = lessonStates.get(lesson.id) || "locked";
                    const isLocked = state === "locked";
                    const isDone = state === "done";
                    const isActive = state === "active";
                    const offset = ZIGZAG_OFFSETS[globalIdx % ZIGZAG_OFFSETS.length];
                    globalIdx++;

                    return (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.08 + lvIdx * 0.15 }}
                        className="relative z-10 w-full flex justify-center"
                        style={{ transform: `translateX(${offset}px)` }}
                      >
                        <button
                          ref={isActive ? activeRef : undefined}
                          disabled={isLocked || lesson.questions.length === 0}
                          onClick={() => {
                            // Check if reading cards need to be shown for this lesson's module
                            const moduleId = `m${lvIdx + 1}`;
                            if (READING_CARDS[moduleId] && !ReadingCardState.hasReadAll(moduleId)) {
                              setReadingModule(moduleId);
                              setScreen("reading-cards" as any);
                              return;
                            }
                            setCurrentLesson(lesson);
                            setScreen("quiz");
                          }}
                          className={`relative w-full max-w-[320px] rounded-2xl p-4 flex items-center gap-3.5 transition-all text-left
                            ${isDone
                              ? "bg-card border-[2px] border-kibo-green/30 shadow-sm"
                              : isActive
                                ? "bg-card border-[2.5px] border-kibo-gold shadow-[0_4px_20px_rgba(255,184,0,0.2)]"
                                : "bg-card/60 border-[1.5px] border-border opacity-50 cursor-not-allowed"
                            }
                            ${!isLocked ? "hover:shadow-md cursor-pointer active:scale-[0.98]" : ""}
                          `}
                        >
                          {/* Node circle */}
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-base font-black shrink-0 transition-all
                            ${isDone
                              ? "bg-kibo-green text-primary-foreground"
                              : isActive
                                ? "bg-kibo-gold text-primary-foreground"
                                : "bg-muted text-muted-foreground/40"
                            }`}
                          >
                            {isDone ? <Check className="w-5 h-5" /> : isActive ? <Sparkles className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="text-[14px] font-extrabold text-foreground truncate">{lesson.title}</div>
                            <div className="text-[11px] text-muted-foreground font-semibold mt-0.5 flex items-center gap-2">
                              <span>{lesson.duration}</span>
                              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                              <span>{lesson.questions.length} Q's</span>
                            </div>
                          </div>

                          {/* XP badge */}
                          <div className={`rounded-xl px-2.5 py-1.5 text-[11px] font-black shrink-0 ${
                            isDone ? "bg-kibo-green/10 text-kibo-green" : "bg-kibo-gold/10 text-kibo-gold"
                          }`}>
                            +{lesson.xp} XP
                          </div>

                          {/* Active pulse ring */}
                          {isActive && (
                            <div className="absolute -inset-[3px] rounded-2xl border-2 border-kibo-gold/40 animate-pulse pointer-events-none" />
                          )}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}

          {/* Coming Soon Modules */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide bg-muted text-muted-foreground border-[1.5px] border-border">
                <NotoEmoji name="sparkles" size={12} /> COMING SOON
              </span>
              <span className="text-[15px] font-black text-muted-foreground">AI Tool Mastery</span>
            </div>
            {COMING_SOON_MODULES.map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.6, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                className="w-full bg-card rounded-xl p-3.5 flex items-center gap-3.5 mb-2 border-[1.5px] border-dashed border-border/80"
              >
                <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-sm shrink-0"
                  style={{ background: mod.color + "15" }}>
                  {mod.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-extrabold text-foreground flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" /> {mod.title}
                  </div>
                  <div className="text-xs text-muted-foreground font-semibold mt-0.5">{mod.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Reset confirmation modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            onClick={() => setShowResetConfirm(false)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-card rounded-2xl p-6 w-full max-w-[320px] border-[1.5px] border-border text-center"
              onClick={e => e.stopPropagation()}
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LessonsScreen;
