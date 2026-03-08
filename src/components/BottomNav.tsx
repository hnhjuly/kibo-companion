import { useApp } from "@/context/AppContext";
import { Home, Flame, Award, BookOpen, Info } from "lucide-react";

type Tab = "home" | "train" | "achievements" | "lessons" | "about";

const tabs: { id: Tab; icon: typeof Home; label: string; badge?: number }[] = [
  { id: "home", icon: Home, label: "Learn" },
  { id: "train", icon: Flame, label: "Train", badge: 3 },
  { id: "achievements", icon: Award, label: "Badges" },
  { id: "lessons", icon: BookOpen, label: "Lessons" },
  { id: "about", icon: Info, label: "About" },
];

const BottomNav = () => {
  const { screen, setScreen } = useApp();

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-card border-t border-border flex pt-2.5 pb-6 z-[100]">
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
