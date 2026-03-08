import { KIBO } from "@/data/curriculum";
import { User, Bell, Clock, HelpCircle, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

const MoreScreen = () => {
  const { progress } = useApp();
  return (
    <>
      <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center justify-center gap-3.5">
        <span className="text-lg font-black text-foreground">⚙️ More</span>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="p-[18px] pb-[100px] flex flex-col gap-3.5">
          {/* Profile */}
          <div className="bg-card rounded-[18px] p-[22px] text-center border-[1.5px] border-border">
            <img src={KIBO.celebrate} alt="Kibo" className="w-24 h-24 object-contain mx-auto mb-2.5" />
            <div className="text-xl font-black text-foreground">Your Name</div>
            <div className="text-sm text-muted-foreground font-bold mb-4">Level {progress.level} · AI {progress.level <= 1 ? "Beginner" : progress.level <= 3 ? "Learner" : "Expert"}</div>
            <div className="flex gap-2">
              {[
                { val: String(progress.xp), label: "Total XP" },
                { val: `🔥 ${progress.streak}`, label: "Streak" },
                { val: String(progress.completedLessons.length), label: "Lessons" },
              ].map(s => (
                <div key={s.label} className="flex-1 bg-background rounded-xl p-3 text-center">
                  <div className="text-xl font-black text-foreground">{s.val}</div>
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium */}
          <div className="rounded-[18px] p-[18px] flex items-center gap-3.5 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #7c3aed, #c084fc)" }}>
            <div className="flex-1">
              <div className="text-base font-black text-primary-foreground mb-0.5">✨ Go Premium</div>
              <div className="text-xs text-primary-foreground/80 font-bold">All levels · Unlimited · No ads</div>
            </div>
            <button className="bg-card text-[#7c3aed] rounded-[10px] px-4 py-2 text-[13px] font-black">Upgrade</button>
          </div>

          {/* Badges */}
          <div className="bg-card rounded-[18px] p-4 border-[1.5px] border-border">
            <h3 className="text-[15px] font-black text-foreground mb-3">🏅 Badges</h3>
            <div className="flex gap-2.5 flex-wrap">
              {["🔥", "⚡", "🎯"].map(b => (
                <div key={b} className="w-[54px] h-[54px] bg-background rounded-[14px] flex items-center justify-center text-[26px] hover:scale-110 transition-transform">{b}</div>
              ))}
              {["🏆", "💎", "🚀"].map(b => (
                <div key={b} className="w-[54px] h-[54px] bg-background rounded-[14px] flex items-center justify-center text-[26px] opacity-30 grayscale">{b}</div>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div className="bg-card rounded-[18px] border-[1.5px] border-border overflow-hidden">
            {[
              { icon: <User className="w-[22px] h-[22px]" />, label: "Edit Profile" },
              { icon: <Bell className="w-[22px] h-[22px]" />, label: "Notifications" },
              { icon: <Clock className="w-[22px] h-[22px]" />, label: "Daily Goal" },
              { icon: <HelpCircle className="w-[22px] h-[22px]" />, label: "Help & FAQ" },
            ].map(m => (
              <button key={m.label} className="w-full flex items-center gap-3.5 px-4 py-4 border-b border-border last:border-0 hover:bg-background transition-colors text-left">
                <div className="w-9 flex items-center justify-center text-muted-foreground">{m.icon}</div>
                <span className="flex-1 text-[15px] font-bold text-foreground">{m.label}</span>
                <ChevronRight className="w-[18px] h-[18px] text-muted-foreground/50" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreScreen;
