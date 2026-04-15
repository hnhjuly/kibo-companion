import { AppProvider, useApp } from "@/context/AppContext";
import { AnimatePresence, motion } from "framer-motion";
import { useUser, UserButton } from "@clerk/clerk-react";
import { User } from "lucide-react";
import OnboardingScreen from "@/screens/OnboardingScreen";
import HomeScreen from "@/screens/HomeScreen";
import LessonsScreen from "@/screens/LessonsScreen";
import GlossaryScreen from "@/screens/GlossaryScreen";
import QuizScreen from "@/screens/QuizScreen";
import CompleteScreen from "@/screens/CompleteScreen";
import TrainScreen from "@/screens/TrainScreen";
import AchievementsScreen from "@/screens/AchievementsScreen";
import MoreScreen from "@/screens/MoreScreen";
import HeartsDepletedScreen from "@/screens/HeartsDepletedScreen";
import FeedbackScreen from "@/screens/FeedbackScreen";
import AllCompleteScreen from "@/screens/AllCompleteScreen";
import HelpFaqScreen from "@/screens/HelpFaqScreen";
import DailyChallengeScreen from "@/screens/DailyChallengeScreen";
import FlashcardScreen from "@/screens/FlashcardScreen";
import SpeedRoundScreen from "@/screens/SpeedRoundScreen";
import MatchPairsScreen from "@/screens/MatchPairsScreen";
import ReadingCardsScreen from "@/screens/ReadingCardsScreen";
import AuthScreen from "@/screens/AuthScreen";
import BottomNav from "@/components/BottomNav";
import DesktopSidebar from "@/components/DesktopSidebar";
import AuthModal from "@/components/AuthModal";

const screens: Record<string, React.FC> = {
  onboarding: OnboardingScreen,
  home: HomeScreen,
  lessons: LessonsScreen,
  glossary: GlossaryScreen,
  quiz: QuizScreen,
  complete: CompleteScreen,
  train: TrainScreen,
  achievements: AchievementsScreen,
  more: MoreScreen,
  "hearts-depleted": HeartsDepletedScreen,
  feedback: FeedbackScreen,
  "all-complete": AllCompleteScreen,
  "help-faq": HelpFaqScreen,
  "daily-challenge": DailyChallengeScreen,
  "flashcards": FlashcardScreen,
  "speed-round": SpeedRoundScreen,
  "match-pairs": MatchPairsScreen,
  "reading-cards": ReadingCardsScreen,
  "auth": AuthScreen,
};

const GlobalAuthButton = () => {
  const { isSignedIn } = useUser();
  const { setShowAuth } = useApp();

  return (
    <div className="absolute top-3 right-3 z-[50]">
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <button
          onClick={() => setShowAuth(true)}
          className="flex items-center gap-1.5 bg-card text-foreground rounded-full px-3.5 py-2 text-[13px] font-extrabold shadow-sm border border-border hover:shadow-md transition-all"
        >
          <User className="w-3.5 h-3.5" /> Sign in
        </button>
      )}
    </div>
  );
};

const AppContent = () => {
  const { screen, showAuth, setShowAuth } = useApp();
  const showNav = ["home", "train", "achievements", "lessons", "glossary", "more", "all-complete"].includes(screen);
  const Screen = screens[screen];

  return (
    <div className="w-full h-dvh flex bg-background overflow-hidden">
      {/* Desktop sidebar — hidden on mobile */}
      {showNav && <DesktopSidebar />}

      {/* Main content area */}
      <div className="flex-1 flex flex-col relative overflow-hidden max-w-3xl mx-auto w-full">
        {/* Global sign-in / user button */}
        <GlobalAuthButton />
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

        {/* Mobile bottom nav — hidden on desktop */}
        {showNav && (
          <div className="md:hidden">
            <BottomNav />
          </div>
        )}
      </div>

      {/* Auth popup modal */}
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};

const Index = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
