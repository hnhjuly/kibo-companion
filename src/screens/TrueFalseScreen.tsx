import { useState, useMemo, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { TrueFalseState, TrueFalseQuestion } from "@/data/kibo-true-false";
import { KIBO } from "@/data/curriculum";
import PreloadedImg from "@/components/PreloadedImg";
import NotoEmoji from "@/components/NotoEmoji";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import kiboTrue1 from "@/assets/kibo-true1.png";
import kiboTrue2 from "@/assets/kibo-true2.png";
import kiboTrue3 from "@/assets/kibo-true3.png";
import kiboFalse1 from "@/assets/kibo-false1.png";
import kiboFalse2 from "@/assets/kibo-false2.png";
import kiboFalse3 from "@/assets/kibo-false3.png";
import kiboCorrect from "@/assets/kibo-correct.png";
import kiboWrong from "@/assets/kibo-wrong.png";

const TRUE_IMAGES = [kiboTrue1, kiboTrue2, kiboTrue3];
const FALSE_IMAGES = [kiboFalse1, kiboFalse2, kiboFalse3];

const randomFrom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const MODULE_LABELS: Record<string, string> = {
  m1: "AI Basics", m2: "Talking to AI", m3: "AI Tools",
  m4: "AI for Daily Life", m5: "AI for Work", m6: "AI for Creativity", m7: "AI Safety",
};

const QUESTIONS_PER_ROUND = 10;
const XP_PER_CORRECT = 8;

type Phase = "start" | "playing" | "result" | "end";

const TrueFalseScreen = () => {
  const { setScreen, progress, onRecordGameScore } = useApp();
  const [phase, setPhase] = useState<Phase>("start");
  const [questions, setQuestions] = useState<TrueFalseQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [showNext, setShowNext] = useState(false);

  // Random button mascots per question
  const trueImg = useMemo(() => randomFrom(TRUE_IMAGES), [qIndex]);
  const falseImg = useMemo(() => randomFrom(FALSE_IMAGES), [qIndex]);

  const startGame = useCallback(() => {
    TrueFalseState.reset();
    const qs = TrueFalseState.getRandom(QUESTIONS_PER_ROUND);
    setQuestions(qs);
    setQIndex(0);
    setScore(0);
    setUserAnswer(null);
    setShowNext(false);
    setPhase("playing");
  }, []);

  const handleAnswer = useCallback((answer: boolean) => {
    if (userAnswer !== null) return;
    const q = questions[qIndex];
    const correct = answer === q.answer;
    if (correct) setScore(s => s + 1);
    setUserAnswer(answer);
    setPhase("result");
    setTimeout(() => setShowNext(true), 1500);
  }, [userAnswer, questions, qIndex]);

  const handleNext = useCallback(() => {
    const nextIdx = qIndex + 1;
    if (nextIdx >= questions.length) {
      const finalScore = score + (userAnswer === questions[qIndex]?.answer ? 0 : 0);
      // Score already updated in handleAnswer
      onRecordGameScore("speed", score, score * XP_PER_CORRECT);
      setPhase("end");
    } else {
      setQIndex(nextIdx);
      setUserAnswer(null);
      setShowNext(false);
      setPhase("playing");
    }
  }, [qIndex, questions, score, userAnswer, onRecordGameScore]);

  const currentQ = questions[qIndex];
  const isCorrect = userAnswer !== null && currentQ ? userAnswer === currentQ.answer : false;

  // START SCREEN
  if (phase === "start") {
    return (
      <div className="flex flex-col h-full">
        <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center gap-3">
          <button onClick={() => setScreen("train")} className="p-1"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
          <span className="text-lg font-black text-foreground flex items-center gap-2">
            <NotoEmoji name="checkmark" size={20} /> True or False
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
          <PreloadedImg src={KIBO.happy} alt="Kibo" className="w-40 h-40 object-contain drop-shadow-lg" />
          <h2 className="text-2xl font-black text-foreground text-center">True or False</h2>
          <p className="text-sm text-muted-foreground font-semibold text-center max-w-[280px]">
            Read the statement and tap TRUE or FALSE. Each correct answer earns you +{XP_PER_CORRECT} XP.
          </p>
          <button onClick={startGame}
            className="w-full max-w-[280px] py-4 bg-kibo-green text-primary-foreground rounded-2xl font-black text-[16px] kibo-shadow active:translate-y-[2px] active:shadow-none transition-all">
            Let's Go!
          </button>
        </div>
      </div>
    );
  }

  // END SCREEN
  if (phase === "end") {
    const kiboImg = score >= 7 ? KIBO.celebrate : score >= 4 ? KIBO.thinking : KIBO.sad;
    const xpEarned = score * XP_PER_CORRECT;
    return (
      <div className="flex flex-col h-full">
        <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center justify-center">
          <span className="text-lg font-black text-foreground">Results</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6">
          <PreloadedImg src={kiboImg} alt="Kibo" className="w-36 h-36 object-contain drop-shadow-lg" />
          <h2 className="text-2xl font-black text-foreground">{score} / {questions.length} correct</h2>
          <div className="bg-kibo-gold/15 text-kibo-gold rounded-full px-4 py-1.5 font-extrabold text-sm">
            +{xpEarned} XP earned
          </div>
          <div className="flex gap-3 w-full max-w-[300px] mt-4">
            <button onClick={startGame}
              className="flex-1 py-3.5 rounded-xl border-[2px] border-border bg-card text-foreground font-black text-sm hover:border-muted-foreground/40 transition-all">
              Play Again
            </button>
            <button onClick={() => setScreen("train")}
              className="flex-1 py-3.5 rounded-xl bg-kibo-green text-primary-foreground font-black text-sm kibo-shadow active:translate-y-[2px] active:shadow-none transition-all">
              Back to Train
            </button>
          </div>
        </div>
      </div>
    );
  }

  // PLAYING + RESULT SCREEN
  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center justify-between">
        <button onClick={() => setScreen("train")} className="p-1"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <span className="text-sm font-extrabold text-muted-foreground">Question {qIndex + 1} of {questions.length}</span>
        <span className="text-sm font-black text-kibo-green">{score} <NotoEmoji name="checkmark" size={13} /></span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5" style={{ scrollbarWidth: "none" }}>
        {/* Progress dots */}
        <div className="flex gap-[5px]">
          {questions.map((_, i) => (
            <div key={i} className={`flex-1 h-[5px] rounded-full transition-colors ${
              i < qIndex ? "bg-kibo-green" : i === qIndex ? "bg-secondary" : "bg-border"
            }`} />
          ))}
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div key={qIndex}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="bg-card rounded-[24px] border-[1.5px] border-border p-5 relative">
            {/* Module label */}
            <span className="inline-block bg-secondary/15 text-secondary px-3 py-1 rounded-full text-[11px] font-extrabold mb-3">
              {MODULE_LABELS[currentQ.moduleId] || currentQ.moduleId}
            </span>
            {/* Kibo thinking */}
            <PreloadedImg src={KIBO.thinking} alt="Kibo" className="absolute top-4 right-4 w-10 h-10 object-contain opacity-60" />
            {/* Statement */}
            <p className="text-[17px] font-bold text-foreground leading-relaxed mt-1 pr-10">
              {currentQ.statement}
            </p>
            {/* Difficulty dots */}
            <div className="flex gap-1.5 mt-4">
              {[1, 2, 3].map(d => (
                <div key={d} className={`w-2 h-2 rounded-full ${d <= currentQ.difficulty ? "bg-kibo-green" : "bg-border"}`} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Result feedback */}
        {phase === "result" && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3">
            <PreloadedImg src={isCorrect ? kiboCorrect : kiboWrong} alt={isCorrect ? "Correct" : "Wrong"}
              className="w-28 h-28 object-contain drop-shadow-lg" />
            {isCorrect && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-kibo-gold/15 text-kibo-gold rounded-full px-3 py-1 font-extrabold text-sm">
                +{XP_PER_CORRECT} XP
              </motion.div>
            )}
            <div className={`w-full rounded-2xl p-4 border-[1.5px] ${
              isCorrect ? "bg-kibo-green/5 border-kibo-green/30" : "bg-card border-border"
            }`}>
              <p className="text-sm text-foreground font-semibold leading-relaxed">{currentQ.explanation}</p>
            </div>
            {showNext && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleNext}
                className="w-full py-3.5 bg-secondary text-secondary-foreground rounded-xl font-black text-[15px] flex items-center justify-center gap-2 kibo-shadow active:translate-y-[2px] active:shadow-none transition-all">
                {qIndex + 1 >= questions.length ? "See Results" : "Next"} <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        )}

        {/* TRUE / FALSE buttons */}
        {phase === "playing" && (
          <div className="flex gap-3 mt-auto pb-4">
            <button onClick={() => handleAnswer(true)}
              className="flex-1 min-h-[72px] rounded-2xl border-[2px] border-[#3db74a] flex items-center justify-center gap-2 font-black text-[16px] text-[#3db74a] kibo-shadow active:translate-y-[2px] active:shadow-none transition-all"
              style={{ backgroundColor: "#e8fbe9" }}>
              <PreloadedImg src={trueImg} alt="True" className="w-9 h-9 object-contain" />
              TRUE
            </button>
            <button onClick={() => handleAnswer(false)}
              className="flex-1 min-h-[72px] rounded-2xl border-[2px] border-[#ff4f4f] flex items-center justify-center gap-2 font-black text-[16px] text-[#ff4f4f] kibo-shadow active:translate-y-[2px] active:shadow-none transition-all"
              style={{ backgroundColor: "#fff0f0" }}>
              <PreloadedImg src={falseImg} alt="False" className="w-9 h-9 object-contain" />
              FALSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrueFalseScreen;
