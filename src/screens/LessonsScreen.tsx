import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { CURRICULUM, KIBO } from "@/data/curriculum";
import { Check, Lock, ChevronDown, ChevronRight, RotateCcw, Sparkles, Star, X, BookOpen, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NotoEmoji from "@/components/NotoEmoji";
import PreloadedImg from "@/components/PreloadedImg";
import { COMING_SOON_MODULES } from "@/data/comingSoon";
import { ReadingCardState, READING_CARDS, MODULE_COLORS } from "@/data/readingCards";

const MODULE_EMOJIS: Record<number, string> = {
  1: "🧠", 2: "💬", 3: "🔍", 4: "⚡", 5: "🛡️", 6: "🎨", 7: "🚀",
};

const MODULE_DESCRIPTIONS: Record<number, string> = {
  1: "Learn what AI is, what it can and cannot do, and how it already touches your daily life.",
  2: "Master the art of writing prompts. Learn to give AI clear instructions and get great results.",
  3: "Understand how AI models think, where biases come from, and how to evaluate AI output.",
  4: "Use AI tools to boost your everyday productivity at work and study.",
  5: "Learn how to stay safe, spot deepfakes, and protect your privacy in an AI world.",
  6: "Create images, music, and designs with AI creative tools.",
  7: "Explore the future of AI: AGI, regulation, jobs, and what comes next.",
};

const LessonsScreen = () => {
  const { setScreen, setCurrentLesson, onResetProgress, progress, setReadingModule } = useApp();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);

  const allLessons = CURRICULUM.levels.flatMap(lv => lv.lessons);
  const completedSet = new Set(progress.completedLessons);
  const allDone = allLessons.every(l => completedSet.has(l.id));

  useEffect(() => {
    if (allDone) setScreen("all-complete");
  }, [allDone, setScreen]);

  // Auto-expand the level the user is currently working on
  useEffect(() => {
    if (expandedLevel !== null) return;
    for (const lv of CURRICULUM.levels) {
      const lvDone = lv.lessons.every(l => completedSet.has(l.id));
      if (!lvDone) {
        setExpandedLevel(lv.id);
        break;
      }
    }
  }, []);

  // Determine lesson states
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
      {/* Header */}
      <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center gap-3.5 pr-14">
        <span className="text-lg font-black text-foreground flex-1 flex items-center gap-2">
          <NotoEmoji name="graduation" size={20} /> Courses
        </span>
        <button onClick={() => setShowResetConfirm(true)}
          className="text-muted-foreground p-1.5 rounded-lg hover:bg-background transition-colors"
          title="Reset Progress">
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="p-[18px] pb-[100px] flex flex-col gap-3">
          {/* Overall progress */}
          <div className="rounded-2xl p-4 border-[1.5px] border-border bg-card flex items-center gap-3.5">
            <PreloadedImg src={KIBO.studying} alt="Kibo" className="w-14 h-14 object-contain shrink-0" />
            <div className="flex-1">
              <div className="text-[14px] font-black text-foreground mb-1">
                {completedSet.size} / {allLessons.length} lessons completed
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-kibo-green transition-all duration-500"
                  style={{ width: `${(completedSet.size / allLessons.length) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Module cards */}
          {CURRICULUM.levels.map((lv, lvIdx) => {
            const lvCompleted = lv.lessons.filter(l => completedSet.has(l.id)).length;
            const lvTotal = lv.lessons.length;
            const lvProgress = lvCompleted / lvTotal;
            const isExpanded = expandedLevel === lv.id;
            const isLevelDone = lvProgress === 1;
            const hasReadingCards = !!READING_CARDS[`m${lv.id}`];
            const hasReadAll = ReadingCardState.hasReadAll(`m${lv.id}`);
            const emoji = MODULE_EMOJIS[lv.id] || "📘";
            const description = MODULE_DESCRIPTIONS[lv.id] || "";

            // Check if this level is accessible (previous level must be done or it's level 1)
            const previousLevel = lvIdx > 0 ? CURRICULUM.levels[lvIdx - 1] : null;
            const prevLevelDone = !previousLevel || previousLevel.lessons.every(l => completedSet.has(l.id));
            const isAccessible = prevLevelDone;

            const pastelBgColors = [
              "bg-kibo-teal-light",
              "bg-kibo-sky-light",
              "bg-kibo-lavender-light",
              "bg-kibo-pink-light",
              "bg-kibo-gold-light",
              "bg-kibo-coral-light",
              "bg-kibo-orange-light",
            ];
            const moduleBg = pastelBgColors[lvIdx % pastelBgColors.length];

            return (
              <motion.div
                key={lv.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: lvIdx * 0.06 }}
                className={`rounded-2xl border-[1.5px] overflow-hidden transition-all ${
                  isExpanded ? "border-primary/40 shadow-sm" : "border-border hover:border-primary/20"
                } ${!isAccessible ? "opacity-50" : ""} ${moduleBg}`}
              >
                {/* Module card header */}
                <button
                  onClick={() => isAccessible && setExpandedLevel(isExpanded ? null : lv.id)}
                  disabled={!isAccessible}
                  className="w-full p-4 flex items-center gap-3.5 text-left bg-white/60 hover:bg-white/80 transition-colors"
                >
                  {/* Emoji badge */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 bg-white shadow-sm"
                    style={{ border: `2px solid ${lv.color}30` }}>
                    {isLevelDone ? <Check className="w-5 h-5" style={{ color: lv.color }} /> : emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground/70">
                        Module {lv.id}
                      </span>
                      {isLevelDone && (
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-kibo-green/20 text-kibo-green">
                          COMPLETE
                        </span>
                      )}
                      {!isAccessible && (
                        <Lock className="w-3 h-3 text-muted-foreground/50" />
                      )}
                    </div>
                    <div className="text-[15px] font-black text-foreground truncate">{lv.title}</div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-2 bg-white/70 rounded-full overflow-hidden max-w-[140px] border border-black/5">
                        <div className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${lvProgress * 100}%`, background: lv.color }} />
                      </div>
                      <span className="text-[11px] font-bold text-muted-foreground/80">{lvCompleted}/{lvTotal}</span>
                    </div>
                  </div>

                  {isAccessible && (
                    <div className="shrink-0">
                      {isExpanded
                        ? <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        : <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      }
                    </div>
                  )}
                </button>

                {/* Expanded lesson list */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1">
                        {/* Description */}
                        <p className="text-[12px] text-muted-foreground font-semibold leading-relaxed mb-3">
                          {description}
                        </p>

                        {/* Read first badge */}
                        {hasReadingCards && !hasReadAll && (
                          <button
                            onClick={() => {
                              setReadingModule(`m${lv.id}`);
                              setScreen("reading-cards" as any);
                            }}
                            className="w-full mb-3 p-3 rounded-xl border-[1.5px] border-dashed flex items-center gap-3 text-left hover:bg-muted/30 transition-colors"
                            style={{ borderColor: lv.color + "40" }}
                          >
                            <BookOpen className="w-4 h-4 shrink-0" style={{ color: lv.color }} />
                            <div className="flex-1">
                              <div className="text-[12px] font-black text-foreground">Read First</div>
                              <div className="text-[10px] text-muted-foreground font-semibold">
                                Short intro cards before you start the quizzes
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                          </button>
                        )}
                        {hasReadingCards && hasReadAll && (
                          <div className="flex items-center gap-2 mb-3 px-1">
                            <Check className="w-3.5 h-3.5 text-kibo-green" />
                            <span className="text-[11px] font-bold text-kibo-green">Reading cards completed</span>
                          </div>
                        )}

                        {/* Lesson list */}
                        <div className="flex flex-col gap-2">
                          {lv.lessons.map((lesson, i) => {
                            const state = lessonStates.get(lesson.id) || "locked";
                            const isLocked = state === "locked";
                            const isDone = state === "done";
                            const isActive = state === "active";

                            return (
                              <button
                                key={lesson.id}
                                disabled={isLocked || lesson.questions.length === 0}
                                onClick={() => {
                                  const moduleId = `m${lv.id}`;
                                  if (READING_CARDS[moduleId] && !ReadingCardState.hasReadAll(moduleId)) {
                                    setReadingModule(moduleId);
                                    setScreen("reading-cards" as any);
                                    return;
                                  }
                                  setCurrentLesson(lesson);
                                  setScreen("quiz");
                                }}
                                className={`w-full rounded-xl p-3 flex items-center gap-3 text-left transition-all ${
                                  isDone
                                    ? "bg-kibo-green/5 border-[1.5px] border-kibo-green/20"
                                    : isActive
                                      ? "bg-kibo-gold/5 border-[2px] border-kibo-gold/40 shadow-sm"
                                      : "bg-muted/30 border-[1.5px] border-border opacity-60"
                                } ${!isLocked ? "hover:shadow-sm cursor-pointer active:scale-[0.99]" : "cursor-not-allowed"}`}
                              >
                                {/* Number/icon */}
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-black shrink-0 ${
                                  isDone ? "bg-kibo-green text-primary-foreground"
                                    : isActive ? "bg-kibo-gold text-primary-foreground"
                                    : "bg-muted text-muted-foreground/40"
                                }`}>
                                  {isDone ? <Check className="w-4 h-4" />
                                    : isActive ? <Play className="w-4 h-4" />
                                    : <Lock className="w-3.5 h-3.5" />}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="text-[13px] font-extrabold text-foreground truncate">
                                    {i + 1}. {lesson.title}
                                  </div>
                                  <div className="text-[10px] text-muted-foreground font-semibold mt-0.5 flex items-center gap-1.5">
                                    <span>{lesson.duration}</span>
                                    <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/30" />
                                    <span>{lesson.questions.length} questions</span>
                                  </div>
                                </div>

                                <span className={`text-[10px] font-black px-2 py-1 rounded-lg shrink-0 ${
                                  isDone ? "bg-kibo-green/10 text-kibo-green"
                                    : isActive ? "bg-kibo-gold/10 text-kibo-gold"
                                    : "bg-muted text-muted-foreground/50"
                                }`}>
                                  +{lesson.xp} XP
                                </span>

                                {isActive && (
                                  <div className="absolute -inset-[2px] rounded-xl border-2 border-kibo-gold/30 animate-pulse pointer-events-none" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Coming Soon Modules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-2 mt-2">
              <NotoEmoji name="sparkles" size={14} />
              <span className="text-[12px] font-black uppercase tracking-wider text-muted-foreground">Coming Soon</span>
            </div>
            {COMING_SOON_MODULES.map((mod, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-dashed border-border/60 p-4 mb-2 flex items-center gap-3.5 opacity-50">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: mod.color + "10" }}>
                  {mod.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-black text-foreground flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" /> {mod.title}
                  </div>
                  <div className="text-[11px] text-muted-foreground font-semibold mt-0.5">{mod.desc}</div>
                </div>
              </div>
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
