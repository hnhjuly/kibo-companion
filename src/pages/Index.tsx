import { AppProvider, useApp } from "@/context/AppContext";
import { AnimatePresence, motion } from "framer-motion";
import { User, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupaUser } from "@supabase/supabase-js";
import WaitlistScreen from "@/screens/WaitlistScreen";
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
import DashboardScreen from "@/screens/DashboardScreen";
import BottomNav from "@/components/BottomNav";
import DesktopSidebar from "@/components/DesktopSidebar";
import AuthModal from "@/components/AuthModal";

const screens: Record<string, React.FC> = {
  waitlist: WaitlistScreen,
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
  "dashboard": DashboardScreen,
};

const GlobalAuthButton = () => {
  const { setShowAuth } = useApp();
  const [user, setUser] = useState<SupaUser | null>(null);
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="absolute top-3 right-3 z-[50]">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-8 h-8 rounded-full bg-kibo-green text-primary-foreground flex items-center justify-center font-extrabold text-sm shadow-sm outline-none">
              {user.email?.[0]?.toUpperCase() || "U"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[160px]">
            <DropdownMenuLabel className="text-xs text-muted-foreground truncate max-w-[150px]">{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
              <LogOut className="w-3.5 h-3.5 mr-2" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
  const showNav = screen !== "waitlist" && ["home", "train", "achievements", "lessons", "glossary", "more", "all-complete"].includes(screen);
  const Screen = screens[screen];
  const isWaitlist = screen === "waitlist";

  return (
    <div className="w-full h-dvh flex bg-background overflow-hidden">
      {showNav && <DesktopSidebar />}
      <div className="flex-1 flex flex-col relative overflow-hidden max-w-3xl mx-auto w-full">
        {!isWaitlist && <GlobalAuthButton />}
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
        {showNav && (
          <div className="md:hidden">
            <BottomNav />
          </div>
        )}
      </div>
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};

const Index = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default Index;
