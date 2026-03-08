import { AppProvider, useApp } from "@/context/AppContext";
import { AnimatePresence, motion } from "framer-motion";
import OnboardingScreen from "@/screens/OnboardingScreen";
import HomeScreen from "@/screens/HomeScreen";
import LessonsScreen from "@/screens/LessonsScreen";
import QuizScreen from "@/screens/QuizScreen";
import CompleteScreen from "@/screens/CompleteScreen";
import TrainScreen from "@/screens/TrainScreen";
import AchievementsScreen from "@/screens/AchievementsScreen";
import MoreScreen from "@/screens/MoreScreen";
import HeartsDepletedScreen from "@/screens/HeartsDepletedScreen";
import FeedbackScreen from "@/screens/FeedbackScreen";
import AllCompleteScreen from "@/screens/AllCompleteScreen";
import BottomNav from "@/components/BottomNav";

const screens: Record<string, React.FC> = {
  onboarding: OnboardingScreen,
  home: HomeScreen,
  lessons: LessonsScreen,
  quiz: QuizScreen,
  complete: CompleteScreen,
  train: TrainScreen,
  achievements: AchievementsScreen,
  more: MoreScreen,
  "hearts-depleted": HeartsDepletedScreen,
  feedback: FeedbackScreen,
  "all-complete": AllCompleteScreen,
};

const AppContent = () => {
  const { screen } = useApp();
  const showNav = ["home", "train", "achievements", "lessons", "more", "all-complete"].includes(screen);
  const Screen = screens[screen];

  return (
    <div className="w-[390px] h-[844px] bg-background rounded-[46px] overflow-hidden relative flex flex-col"
      style={{ boxShadow: "0 50px 100px rgba(0,0,0,0.28), 0 0 0 1.5px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
      {/* Status bar */}
      <div className="flex justify-between items-center px-7 pt-3.5 text-[13px] font-extrabold text-foreground shrink-0">
        <span>9:41</span>
        <div className="flex gap-1.5 items-center text-[11px]">
          <span>▲▼</span><span>WiFi</span><span>🔋</span>
        </div>
      </div>

      {/* Screen content with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col flex-1 overflow-hidden"
        >
          {Screen && <Screen />}
        </motion.div>
      </AnimatePresence>

      {showNav && <BottomNav />}
    </div>
  );
};

const Index = () => {
  return (
    <AppProvider>
      <div className="min-h-screen flex items-center justify-center p-5"
        style={{ background: "#dde3f0" }}>
        <AppContent />
      </div>
    </AppProvider>
  );
};

export default Index;
