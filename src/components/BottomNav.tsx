import { Home, Flame, Crown, MoreHorizontal } from "lucide-react";

const tabs = [
  { icon: <Home className="w-6 h-6" />, label: "Learn", active: true },
  { icon: <Flame className="w-6 h-6" />, label: "Train", active: false, badge: true },
  { icon: <Crown className="w-6 h-6" />, label: "Rank", active: false },
  { icon: <MoreHorizontal className="w-6 h-6" />, label: "More", active: false },
];

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-[480px] mx-auto flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom,8px)]">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 relative transition-colors ${
              tab.active ? "text-secondary" : "text-muted-foreground"
            }`}
          >
            <div className="relative">
              {tab.icon}
              {tab.badge && (
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-[8px] font-bold text-destructive-foreground">3</span>
                </div>
              )}
            </div>
            <span className="text-[10px] font-bold">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
