import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Lesson } from "@/data/curriculum";
import { ReadingCardState } from "@/data/readingCards";
import { UserProgress, UserGoal, loadProgress, saveProgress, resetProgress, loseHeart, restoreHeart, completeLesson, markActive, useFreeze, getHeartsTimeRemaining, HEARTS_MAX, recordGameScore } from "@/lib/progress";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

type Screen = "waitlist" | "onboarding" | "home" | "lessons" | "glossary" | "quiz" | "complete" | "train" | "achievements" | "more" | "hearts-depleted" | "feedback" | "all-complete" | "help-faq" | "daily-challenge" | "flashcards" | "speed-round" | "match-pairs" | "reading-cards" | "dashboard";

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
  onRecordGameScore: (mode: "speed" | "flash" | "daily" | "pairs", score: number, xpEarned: number) => void;
  heartsTimeRemaining: number;
  canPlay: boolean;
  readingModule: string | null;
  setReadingModule: (m: string | null) => void;
  showAuth: boolean;
  setShowAuth: (v: boolean) => void;
  user: User | null;
  showLoginSuccess: boolean;
}

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }
  return ctx;
};

export const AppProvider = ({ children, initialScreen = "waitlist" }: { children: ReactNode; initialScreen?: Screen }) => {
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [quizStats, setQuizStats] = useState({ correct: 0, total: 0, time: 0 });
  const [readingModule, setReadingModule] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  // Track auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const wasLoggedOut = !user;
      const nowLoggedIn = !!session?.user;
      setUser(session?.user ?? null);
      if (event === 'SIGNED_IN' && wasLoggedOut && nowLoggedIn) {
        setShowAuth(false);
        setShowLoginSuccess(true);
        setTimeout(() => {
          setShowLoginSuccess(false);
          setScreen("dashboard");
        }, 2000);
      }
    });
    return () => subscription.unsubscribe();
  }, [user]);
  const [heartsTimeRemaining, setHeartsTimeRemaining] = useState(0);

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
    ReadingCardState.reset();
    setScreen("home");
  }, []);

  const onRestoreHeart = useCallback(() => {
    setProgress(p => restoreHeart(p));
  }, []);

  const onSetGoal = useCallback((goal: UserGoal) => {
    setProgress(p => ({ ...p, goal }));
  }, []);

  const onRecordGameScore = useCallback((mode: "speed" | "flash" | "daily" | "pairs", score: number, xpEarned: number) => {
    setProgress(p => recordGameScore(p, mode, score, xpEarned));
  }, []);

  // Override setScreen to check hearts
  const safeSetScreen = useCallback((s: Screen) => {
    if ((s === "quiz") && !canPlay) {
      setScreen("hearts-depleted");
      return;
    }
    if (s === "dashboard" && !user) {
      setShowAuth(true);
      return;
    }
    if (s === "home") {
      setProgress(p => markActive(p));
    }
    setScreen(s);
  }, [canPlay, user]);

  return (
    <AppContext.Provider value={{
      screen, setScreen: safeSetScreen, currentLesson, setCurrentLesson,
      quizStats, setQuizStats, progress, onLoseHeart, onCompleteLesson,
      onUseFreeze, onResetProgress, onRestoreHeart, onSetGoal, onRecordGameScore,
      heartsTimeRemaining, canPlay,
      readingModule, setReadingModule, showAuth, setShowAuth, user, showLoginSuccess
    }}>
      {children}
    </AppContext.Provider>
  );
};
