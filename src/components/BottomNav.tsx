import { useApp } from "@/context/AppContext";
import { Home, Flame, Award, BookOpen, Search, MoreHorizontal, Zap } from "lucide-react";

type Tab = "home" | "lessons" | "glossary" | "train" | "achievements" | "more" | "quiz-hub";

const tabs: { id: Tab; icon: typeof Home; label: string; badge?: number }[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "quiz-hub", icon: Zap, label: "Quiz" },
  { id: "train", icon: Flame, label: "Train" },
  { id: "lessons", icon: BookOpen, label: "Courses" },
  { id: "glossary", icon: Search, label: "Glossary" },
  { id: "more", icon: MoreHorizontal, label: "More" },
];

const BottomNav = () => {
  const { screen, setScreen } = useApp();

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-card border-t border-border flex pt-2.5 pb-[max(1.5rem,env(safe-area-inset-bottom))] z-[100]">
      {tabs.map(tab => {
        const active = screen === tab.id;
        const Icon = tab.icon;
        return (
          <button key={tab.id}
            onClick={() => setScreen(tab.id)}
            className="flex-1 flex flex-col items-center gap-1 py-1 bg-transparent border-none cursor-pointer transition-all">
            <div className="relative flex items-center justify-center w-7 h-7">
              <Icon className="w-6 h-6" style={{ color: active ? "#3db74a" : "#b0b8cc" }} />
              {tab.badge && (
                <span className="absolute -top-1 -right-1.5 bg-destructive text-primary-foreground rounded-full w-[15px] h-[15px] text-[8px] font-black flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className={`text-[11px] font-extrabold transition-colors ${active ? "text-kibo-green" : "text-muted-foreground/50"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
