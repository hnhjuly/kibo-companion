import { useApp } from "@/context/AppContext";
import { Home, Flame, BookOpen, Search, Award, MoreHorizontal, LayoutDashboard, Zap } from "lucide-react";
import kiboWave from "@/assets/kibo-wave.png";
import PreloadedImg from "@/components/PreloadedImg";

type Tab = "home" | "train" | "lessons" | "glossary" | "achievements" | "more" | "dashboard" | "quiz-hub";

const baseTabs: { id: Tab; icon: typeof Home; label: string; authOnly?: boolean }[] = [
  // { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", authOnly: true }, // Hidden for now
  { id: "home", icon: Home, label: "Home" },
  { id: "quiz-hub", icon: Zap, label: "Quiz" },
  { id: "lessons", icon: BookOpen, label: "Courses" },
  { id: "train", icon: Flame, label: "Train" },
  { id: "glossary", icon: Search, label: "Glossary" },
  { id: "achievements", icon: Award, label: "Badges" },
  { id: "more", icon: MoreHorizontal, label: "More" },
];

const DesktopSidebar = () => {
  const { screen, setScreen, user } = useApp();
  const tabs = baseTabs.filter(t => !t.authOnly || user);

  return (
    <aside className="md:flex hidden flex-col w-[240px] bg-card border-r border-border shrink-0 h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <PreloadedImg src={kiboWave} alt="Kibo" className="w-10 h-10 object-contain" />
        <span className="text-xl font-black text-foreground tracking-tight">KIBO</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
        {tabs.map(tab => {
          const active = screen === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setScreen(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-bold transition-all ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border">
        <p className="text-[11px] text-muted-foreground/60 font-semibold">Learn AI, one lesson at a time ✨</p>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
