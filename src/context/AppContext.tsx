import { createContext, useContext, useState, ReactNode } from "react";
import { Lesson } from "@/data/curriculum";

type Screen = "onboarding" | "home" | "lessons" | "quiz" | "complete" | "train" | "rank" | "more";

interface AppState {
  screen: Screen;
  setScreen: (s: Screen) => void;
  currentLesson: Lesson | null;
  setCurrentLesson: (l: Lesson | null) => void;
  quizStats: { correct: number; total: number; time: number };
  setQuizStats: (s: { correct: number; total: number; time: number }) => void;
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

  return (
    <AppContext.Provider value={{ screen, setScreen, currentLesson, setCurrentLesson, quizStats, setQuizStats }}>
      {children}
    </AppContext.Provider>
  );
};
