import { useState, useMemo, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { FlashcardState, Flashcard } from "@/data/flashcards";
import { KIBO } from "@/data/curriculum";
import { ArrowLeft } from "lucide-react";
import PreloadedImg from "@/components/PreloadedImg";
import DidYouKnowCard from "@/components/DidYouKnowCard";
import ExitGameDialog from "@/components/ExitGameDialog";

const FlashcardScreen = () => {
  const { setScreen } = useApp();
  const queue = useMemo(() => FlashcardState.getSessionQueue(5), []);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);
  const [showDYK, setShowDYK] = useState(false);
  const [rated, setRated] = useState(0);
  const [showExit, setShowExit] = useState(false);

  const card = queue[idx] as Flashcard | undefined;

  const handleRate = useCallback((rating: 'again' | 'almost' | 'got-it') => {
    if (!card) return;
    FlashcardState.rate(card.id, rating);
    setRated(r => r + 1);
    const next = idx + 1;
    if (next >= queue.length) {
      setShowDYK(true);
    } else {
      setIdx(next);
      setFlipped(false);
    }
  }, [card, idx, queue.length]);

  if (showDYK && !done) {
    return <DidYouKnowCard onDismiss={() => setDone(true)} />;
  }

  if (done || queue.length === 0) {
    return (
      <div className="flex flex-col flex-1 bg-card">
        <div className="px-5 py-3.5 border-b border-border flex items-center gap-3">
          <button onClick={() => setScreen("train")}><ArrowLeft className="w-5 h-5 text-muted-foreground" /></button>
          <span className="font-black text-foreground">🃏 Flashcards</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-5">
          <PreloadedImg src={KIBO.celebrate} alt="Kibo" className="w-32 h-32 object-contain" />
          <h2 className="text-2xl font-black text-foreground text-center">
            {queue.length === 0 ? "All caught up!" : "Session complete!"}
          </h2>
          <p className="text-muted-foreground font-bold">{rated} cards reviewed</p>
          <button onClick={() => setScreen("train")} className="mt-4 px-8 py-3.5 bg-kibo-green text-primary-foreground rounded-xl font-black kibo-shadow">
            Back to Train
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-card">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-border flex items-center gap-3">
        <button onClick={() => setScreen("train")}><ArrowLeft className="w-5 h-5 text-muted-foreground" /></button>
        <span className="font-black text-foreground">🃏 Flashcards</span>
        <span className="ml-auto text-xs font-bold text-muted-foreground">{idx + 1} / {queue.length}</span>
      </div>

      {/* Progress */}
      <div className="px-5 pt-3">
        <div className="h-2 bg-background rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-secondary transition-all duration-300" style={{ width: `${((idx + 1) / queue.length) * 100}%` }} />
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center p-5">
        <div className="w-full max-w-sm perspective-1000" style={{ perspective: "1000px" }}>
          <div
            onClick={() => !flipped && setFlipped(true)}
            className="relative w-full cursor-pointer transition-transform duration-[550ms]"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              minHeight: "320px",
            }}
          >
            {/* Front */}
            <div className="absolute inset-0 rounded-[20px] p-6 flex flex-col items-center justify-center gap-4 backface-hidden"
              style={{
                backfaceVisibility: "hidden",
                background: "linear-gradient(135deg, #1a1a2e, #2d2d5e)",
              }}
            >
              <span className="text-5xl">{card.icon}</span>
              <span className="px-3 py-1 rounded-full text-xs font-black" style={{ color: card.moduleColor, background: card.moduleBg }}>
                {card.module}
              </span>
              <h3 className="text-2xl font-black text-white text-center">{card.term}</h3>
              <p className="text-white/40 text-sm font-bold mt-2">tap to reveal definition</p>
            </div>

            {/* Back */}
            <div className="absolute inset-0 rounded-[20px] p-6 flex flex-col items-center justify-center gap-4 bg-card border-2 border-border backface-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <span className="text-3xl">{card.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-[2px] text-muted-foreground/50">Definition</span>
              <p className="text-foreground font-bold text-center text-[15px] leading-relaxed">{card.definition}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rating buttons */}
      {flipped && (
        <div className="px-5 pb-[max(2rem,calc(env(safe-area-inset-bottom)+1rem))] flex gap-2.5">
          <button onClick={() => handleRate('again')}
            className="flex-1 py-3.5 rounded-xl font-black text-sm border-2 transition-all"
            style={{ background: "#fff0f0", color: "#ff4f4f", borderColor: "#ffdede" }}>
            😬 Again
          </button>
          <button onClick={() => handleRate('almost')}
            className="flex-1 py-3.5 rounded-xl font-black text-sm border-2 transition-all"
            style={{ background: "#fff8e6", color: "#ffb800", borderColor: "#ffebad" }}>
            😐 Almost
          </button>
          <button onClick={() => handleRate('got-it')}
            className="flex-1 py-3.5 rounded-xl font-black text-sm border-2 transition-all"
            style={{ background: "#edfff0", color: "#3db74a", borderColor: "#c3f0c8" }}>
            ✅ Got it!
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashcardScreen;
