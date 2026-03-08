import { useState, useRef, useCallback, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { KIBO, CURRICULUM } from "@/data/curriculum";
import { FILL_BLANK_QUESTIONS, FillBlankQuestion } from "@/data/fillBlankQuestions";
import { X } from "lucide-react";
import NotoEmoji from "@/components/NotoEmoji";
import PreloadedImg from "@/components/PreloadedImg";
import FillBlankCard from "@/components/FillBlankCard";

const KEYS = ["A", "B", "C", "D"];
const PRAISES = [
  <span key="p1">Brilliant! <NotoEmoji name="party" size={18} /></span>,
  <span key="p2">Correct! <NotoEmoji name="sparkles" size={18} /></span>,
  <span key="p3">Nailed it! <NotoEmoji name="fire" size={18} /></span>,
  <span key="p4">Spot on! <NotoEmoji name="lightning" size={18} /></span>,
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type MCQQuestion = {
  type: string;
  question: string;
  hint?: string;
  choices: string[];
  correct: number;
  explanation: string;
  xp: number;
};

type QuizItem =
  | { kind: 'mcq'; data: MCQQuestion }
  | { kind: 'fill_blank'; data: FillBlankQuestion };

/** Map lesson ID (e.g. "l2-3") to fill-blank key (e.g. "m2-l3") */
function lessonIdToFillBlankKey(lessonId: string): string {
  // lessonId format: "lX-Y" → fill-blank key: "mX-lY"
  const match = lessonId.match(/^l(\d+)-(\d+)$/);
  if (!match) return '';
  return `m${match[1]}-l${match[2]}`;
}

function buildQuizItems(rawMCQs: MCQQuestion[], lessonId: string): QuizItem[] {
  // Shuffle MCQs and their choices
  const shuffledMCQs = shuffleArray(rawMCQs).map(q => {
    const indices = q.choices.map((_, i) => i);
    const shuffledIndices = shuffleArray(indices);
    return {
      ...q,
      choices: shuffledIndices.map(i => q.choices[i]),
      correct: shuffledIndices.indexOf(q.correct),
    };
  });

  // Get fill-blank pool for this lesson
  const fbKey = lessonIdToFillBlankKey(lessonId);
  const fbPool = fbKey ? (FILL_BLANK_QUESTIONS[fbKey] || []) : [];
  const fbQuestions = shuffleArray(fbPool).slice(0, 2); // inject 1-2

  // Take MCQs to fill remaining slots (total 10)
  const mcqCount = Math.min(10 - fbQuestions.length, shuffledMCQs.length);
  const mcqItems: QuizItem[] = shuffledMCQs.slice(0, mcqCount).map(q => ({ kind: 'mcq' as const, data: q }));
  const fbItems: QuizItem[] = fbQuestions.map(q => ({ kind: 'fill_blank' as const, data: q }));

  // Interleave: place fill-blanks after every 4-5 MCQs
  const result: QuizItem[] = [];
  let fbIdx = 0;
  for (let i = 0; i < mcqItems.length; i++) {
    result.push(mcqItems[i]);
    // After positions 4 and 8 (0-indexed), inject a fill-blank
    if ((i === 3 || i === 7) && fbIdx < fbItems.length) {
      result.push(fbItems[fbIdx++]);
    }
  }
  // Append remaining fill-blanks
  while (fbIdx < fbItems.length) {
    result.push(fbItems[fbIdx++]);
  }

  return result.slice(0, 10);
}

const Confetti = ({ count }: { count: number }) => {
  const cols = ["#3db74a", "#4a9eff", "#ffb800", "#ff8c42", "#9b6dff", "#ff5a5a"];
  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="absolute -top-2.5 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            background: cols[i % cols.length],
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `cffall ${1.2 + Math.random() * 1.2}s linear ${Math.random() * 0.4}s forwards`,
          }} />
      ))}
    </div>
  );
};

const QuizScreen = () => {
  const { setScreen, currentLesson, setQuizStats, progress, onLoseHeart, onCompleteLesson } = useApp();
  const rawQuestions = currentLesson?.questions?.length
    ? currentLesson.questions
    : CURRICULUM.levels[0].lessons[0].questions;

  const lessonId = currentLesson?.id || "l1-1";

  const [items] = useState(() => buildQuizItems(rawQuestions, lessonId));
  const [qIdx, setQIdx] = useState(0);
  const [localHearts, setLocalHearts] = useState(progress.hearts);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFb, setShowFb] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const startT = useRef(Date.now());

  const item = items[qIdx];

  // MCQ pick handler
  const pick = useCallback((i: number) => {
    if (answered || item.kind !== 'mcq') return;
    setAnswered(true);
    setSelected(i);
    const ok = i === item.data.correct;
    setIsCorrect(ok);
    if (ok) {
      setCorrect(c => c + 1);
      setConfetti(10);
    } else {
      const hasHearts = onLoseHeart();
      setLocalHearts(h => Math.max(0, h - 1));
      if (!hasHearts) {
        setTimeout(() => setScreen("hearts-depleted"), 2000);
      }
    }
    setShowFb(true);
  }, [answered, item, onLoseHeart, setScreen]);

  // Fill-blank answer handler
  const handleFillBlankAnswer = useCallback((ok: boolean) => {
    setAnswered(true);
    setIsCorrect(ok);
    if (ok) {
      setCorrect(c => c + 1);
      setConfetti(10);
    } else {
      const hasHearts = onLoseHeart();
      setLocalHearts(h => Math.max(0, h - 1));
      if (!hasHearts) {
        setTimeout(() => setScreen("hearts-depleted"), 2000);
      }
    }
    setShowFb(true);
  }, [onLoseHeart, setScreen]);

  const nextQ = useCallback(() => {
    if (localHearts <= 0 && !isCorrect) {
      setScreen("hearts-depleted");
      return;
    }
    const nextIdx = qIdx + 1;
    if (nextIdx >= items.length) {
      const elapsed = Math.round((Date.now() - startT.current) / 1000);
      const xpEarned = correct * 20;
      setQuizStats({ correct, total: items.length, time: elapsed });
      if (currentLesson) {
        onCompleteLesson(currentLesson.id, xpEarned, correct, items.length);
      }
      setScreen("complete");
      return;
    }
    setQIdx(nextIdx);
    setAnswered(false);
    setSelected(null);
    setShowFb(false);
    setConfetti(0);
  }, [qIdx, items, localHearts, isCorrect, correct, setQuizStats, setScreen, currentLesson, onCompleteLesson]);

  useEffect(() => {
    setQIdx(0); setLocalHearts(progress.hearts); setCorrect(0); setAnswered(false);
    setSelected(null); setShowFb(false); setConfetti(0);
    startT.current = Date.now();
  }, [currentLesson]);

  const currentExplanation = item.kind === 'mcq' ? item.data.explanation : item.data.explanation;

  return (
    <div className="flex flex-col flex-1 bg-card relative overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-border shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => setScreen("home")} className="text-muted-foreground"><X className="w-5 h-5" /></button>
          <div className="flex-1 h-2.5 bg-background rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{
              width: `${(qIdx / items.length) * 100}%`,
              background: "linear-gradient(90deg, #3db74a, #72e07a)"
            }} />
          </div>
          <div className="flex gap-1">
            {Array.from({ length: localHearts }).map((_, i) => (
              <NotoEmoji key={`h${i}`} name="heart" size={20} />
            ))}
            {Array.from({ length: 6 - localHearts }).map((_, i) => (
              <NotoEmoji key={`e${i}`} name="heartEmpty" size={20} />
            ))}
          </div>
        </div>
      </div>

      {/* Quiz body */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="px-[22px] pt-7 pb-8 flex flex-col">
          <div className="text-[11px] font-black tracking-[2px] uppercase text-muted-foreground/50 mb-2.5">
            {item.kind === 'fill_blank' ? "Fill in the Blank" : 
              item.data.type === "mcq" ? "Multiple Choice" : 
              item.data.type === "identify" ? "Identify" : 
              item.data.type === "scenario" ? "Scenario" : "Multiple Choice"}
          </div>

          {item.kind === 'mcq' ? (
            <>
              <h2 className="text-[22px] font-black text-foreground leading-tight mb-1.5">{item.data.question}</h2>
              <p className="text-sm text-muted-foreground mb-7">
                {item.data.hint ? <span><NotoEmoji name="lightbulb" size={14} /> {item.data.hint}</span> : "Choose the best answer"}
              </p>
              <div className="flex flex-col gap-2.5">
                {item.data.choices.map((c, i) => {
                  let cls = "bg-background border-[2.5px] border-border";
                  if (answered) {
                    if (i === item.data.correct) cls = "bg-kibo-green/10 border-[2.5px] border-kibo-green text-kibo-green";
                    else if (i === selected) cls = "bg-destructive/10 border-[2.5px] border-destructive text-destructive";
                  } else if (i === selected) {
                    cls = "bg-secondary/10 border-[2.5px] border-secondary";
                  }
                  let keyCls = "bg-card border-2 border-border text-muted-foreground";
                  if (answered && i === item.data.correct) keyCls = "bg-kibo-green border-2 border-kibo-green text-primary-foreground";
                  else if (answered && i === selected) keyCls = "bg-destructive border-2 border-destructive text-primary-foreground";
                  else if (i === selected) keyCls = "bg-secondary border-2 border-secondary text-primary-foreground";

                  return (
                    <button key={i} onClick={() => pick(i)} disabled={answered}
                      className={`${cls} rounded-[14px] p-4 px-[18px] font-bold text-[15px] text-left transition-all flex items-center gap-3 hover:border-secondary hover:bg-secondary/10`}>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition-all ${keyCls}`}>{KEYS[i]}</div>
                      {c}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-[22px] font-black text-foreground leading-tight mb-5">
                <NotoEmoji name="pencil" size={20} /> Fill in the blank
              </h2>
              <FillBlankCard 
                key={item.data.id}
                question={item.data} 
                onAnswer={handleFillBlankAnswer} 
                answered={answered} 
              />
            </>
          )}
        </div>
      </div>

      {/* Feedback panel */}
      {showFb && (
        <div className={`shrink-0 p-5 pb-[max(2.25rem,calc(env(safe-area-inset-bottom)+1rem))] flex flex-col gap-2.5 border-t-[2.5px] backdrop-blur-xl
          ${isCorrect ? "bg-[rgba(240,255,244,0.97)] border-kibo-green" : "bg-[rgba(255,240,240,0.97)] border-destructive"}`}>
          <div className="flex items-center gap-3">
            <PreloadedImg src={isCorrect ? [KIBO.thumbsup, KIBO.celebration2, KIBO.happy][qIdx % 3] : localHearts === 0 ? KIBO.sad2 : [KIBO.detective, KIBO.shocked][qIdx % 2]} alt="Kibo" className="w-[60px] h-[60px] object-contain" />
            <div className="flex-1">
              <div className={`text-lg font-black ${isCorrect ? "text-kibo-green" : "text-destructive"}`}>
                {isCorrect ? PRAISES[Math.floor(Math.random() * 4)] : localHearts === 0 ? <span>No hearts left! <NotoEmoji name="heartBroken" size={18} /></span> : <span>Not quite... <NotoEmoji name="heartBroken" size={18} /></span>}
              </div>
              <div className="text-[13px] text-muted-foreground leading-relaxed mt-1">{currentExplanation}</div>
            </div>
          </div>
          <button onClick={nextQ}
            className={`w-full py-3.5 rounded-[14px] font-black text-base transition-all
              ${isCorrect ? "bg-kibo-green text-primary-foreground kibo-shadow active:translate-y-[2px] active:shadow-none" :
                "bg-destructive text-primary-foreground shadow-[0_4px_0_#c00]"}`}>
            {localHearts === 0 && !isCorrect ? "SEE RESULTS" : "CONTINUE"}
          </button>
        </div>
      )}

      {confetti > 0 && <Confetti count={confetti} />}
    </div>
  );
};

export default QuizScreen;
