import { useState, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import { READING_CARDS, MODULE_COLORS, ReadingCardState } from "@/data/readingCards";
import { KIBO } from "@/data/curriculum";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ArrowRight } from "lucide-react";
import PreloadedImg from "@/components/PreloadedImg";

const ReadingCardsScreen = () => {
  const { setScreen, readingModule, setReadingModule } = useApp();
  const [cardIndex, setCardIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [direction, setDirection] = useState(1);

  const moduleId = readingModule || "m1";
  const moduleData = READING_CARDS[moduleId];
  const cards = moduleData?.cards || [];
  const color = MODULE_COLORS[moduleId] || "#3db74a";
  const total = cards.length;
  const card = cards[cardIndex];
  const isLast = cardIndex === total - 1;

  const handleNext = useCallback(() => {
    if (isLast) {
      // Mark all cards read and show celebration
      ReadingCardState.markAllRead(moduleId);
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setReadingModule(null);
        setScreen("lessons");
      }, 1500);
    } else {
      setDirection(1);
      setCardIndex((i) => i + 1);
    }
  }, [isLast, moduleId, setScreen, setReadingModule]);

  const handleBack = useCallback(() => {
    setReadingModule(null);
    setScreen("lessons");
  }, [setScreen, setReadingModule]);

  if (!moduleData || !card) return null;

  return (
    <>
      {/* Header */}
      <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center gap-3.5">
        <button onClick={handleBack} className="text-foreground p-1">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-lg font-black text-foreground flex-1 text-center">
          {moduleData.moduleTitle}
        </span>
        <span className="text-xs font-bold text-muted-foreground shrink-0">
          {cardIndex + 1} of {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted shrink-0">
        <motion.div
          className="h-full rounded-r-full"
          style={{ background: color }}
          animate={{ width: `${((cardIndex + 1) / total) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Card area */}
      <div className="flex-1 overflow-y-auto flex flex-col" style={{ scrollbarWidth: "none" }}>
        <div className="flex-1 p-5 pb-3 flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={card.id}
              custom={direction}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-card rounded-3xl border-[1.5px] border-border shadow-sm p-6 flex-1 flex flex-col relative"
            >
              {/* Kibo on first card only */}
              {cardIndex === 0 && (
                <PreloadedImg
                  src={KIBO.happy}
                  alt="Kibo"
                  className="absolute -top-3 -right-2 w-10 h-10 object-contain drop-shadow-md"
                />
              )}

              {/* Emoji */}
              <div className="text-center text-[48px] mb-4 leading-none">{card.emoji}</div>

              {/* Title */}
              <h2 className="text-xl font-black text-foreground text-center mb-5 leading-tight">
                {card.title}
              </h2>

              {/* Body */}
              <div className="flex flex-col gap-3 flex-1">
                {card.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[15px] leading-[1.65] text-muted-foreground font-medium px-1"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tip callout */}
              {card.tip && (
                <div
                  className="mt-5 rounded-xl p-4 flex items-start gap-3"
                  style={{
                    background: "hsl(135 60% 96%)",
                    borderLeft: `3px solid ${MODULE_COLORS.m1}`,
                  }}
                >
                  <PreloadedImg
                    src={KIBO.thinking}
                    alt="Kibo tip"
                    className="w-8 h-8 object-contain shrink-0"
                  />
                  <p className="text-[13px] italic leading-relaxed" style={{ color: "#2a7a35" }}>
                    {card.tip}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next / Start Learning button */}
        <div className="p-5 pt-2 shrink-0">
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-xl font-black text-[15px] text-primary-foreground flex items-center justify-center gap-2 kibo-shadow active:translate-y-[2px] active:shadow-none transition-all"
            style={{ background: color }}
          >
            {isLast ? (
              <>
                START LEARNING <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              "NEXT"
            )}
          </button>
        </div>
      </div>

      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="flex flex-col items-center gap-3"
            >
              <PreloadedImg
                src={KIBO.celebrate}
                alt="Kibo celebrates"
                className="w-28 h-28 object-contain drop-shadow-lg"
              />
              <p className="text-lg font-black text-white drop-shadow-md text-center px-8">
                You're ready! Let's put this into practice.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReadingCardsScreen;
