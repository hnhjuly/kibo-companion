import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Lesson } from "@/data/curriculum";
import { UserProgress, UserGoal, loadProgress, saveProgress, resetProgress, loseHeart, restoreHeart, completeLesson, markActive, useFreeze, getHeartsTimeRemaining, HEARTS_MAX } from "@/lib/progress";

type Screen = "onboarding" | "home" | "lessons" | "glossary" | "quiz" | "complete" | "train" | "achievements" | "more" | "hearts-depleted" | "feedback" | "all-complete" | "help-faq" | "daily-challenge" | "flashcards" | "speed-round" | "match-pairs" | "reading-cards";

interface AppState {
  screen: Screen;
  setScreen: (s: Screen) => void;
  currentLesson: Lesson | null;
  setCurrentLesson: (l: Lesson | null) => void;
  quizStats: { correct: number; total: number; time: number };
  setQuizStats: (s: { correct: number; total: number; time: number }) => void;
  progress: UserProgress;
  onLoseHeart: () => boolean;
  onCompleteLesson: (lessonId: string, xpEarned: number, correct: number, total: number) => void;
  onUseFreeze: () => void;
  onResetProgress: () => void;
  onRestoreHeart: () => void;
  onSetGoal: (goal: UserGoal) => void;
  heartsTimeRemaining: number;
  canPlay: boolean;
  readingModule: string | null;
  setReadingModule: (m: string | null) => void;
}

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [quizStats, setQuizStats] = useState({ correct: 0, total: 0, time: 0 });
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [heartsTimeRemaining, setHeartsTimeRemaining] = useState(0);

  // Check if first time (has completed onboarding)
  useEffect(() => {
    if (progress.lastActiveDate !== "") {
      setScreen("home");
    }
  }, []);

  // Save progress on change
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Heart cooldown timer
  useEffect(() => {
    const update = () => {
      const remaining = getHeartsTimeRemaining(progress);
      setHeartsTimeRemaining(remaining);
      if (remaining === 0 && progress.heartsDepletedAt) {
        setProgress(p => ({ ...p, hearts: HEARTS_MAX, heartsDepletedAt: null }));
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [progress.heartsDepletedAt]);

  const canPlay = progress.hearts > 0;

  const onLoseHeart = useCallback(() => {
    const updated = loseHeart(progress);
    setProgress(updated);
    if (updated.hearts === 0) {
      return false;
    }
    return true;
  }, [progress]);

  const onCompleteLesson = useCallback((lessonId: string, xpEarned: number, correct: number, total: number) => {
    setProgress(p => completeLesson(p, lessonId, xpEarned, correct, total));
  }, []);

  const onUseFreeze = useCallback(() => {
    setProgress(p => useFreeze(p));
  }, []);

  const onResetProgress = useCallback(() => {
    const fresh = resetProgress();
    setProgress(fresh);
    setScreen("home");
  }, []);

  const onRestoreHeart = useCallback(() => {
    setProgress(p => restoreHeart(p));
  }, []);

  const onSetGoal = useCallback((goal: UserGoal) => {
    setProgress(p => ({ ...p, goal }));
  }, []);

  // Override setScreen to check hearts
  const safeSetScreen = useCallback((s: Screen) => {
    if ((s === "quiz") && !canPlay) {
      setScreen("hearts-depleted");
      return;
    }
    if (s === "home") {
      setProgress(p => markActive(p));
    }
    setScreen(s);
  }, [canPlay]);

  return (
    <AppContext.Provider value={{
      screen, setScreen: safeSetScreen, currentLesson, setCurrentLesson,
      quizStats, setQuizStats, progress, onLoseHeart, onCompleteLesson,
      onUseFreeze, onResetProgress, onRestoreHeart, onSetGoal, heartsTimeRemaining, canPlay
    }}>
      {children}
    </AppContext.Provider>
  );
};
