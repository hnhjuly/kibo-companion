import { useApp } from "@/context/AppContext";
import { KIBO } from "@/data/curriculum";
import Icon from "@/components/Icon";
import ICONS from "@/assets/icons";

type IconName = keyof typeof ICONS;

interface Achievement {
  icon: IconName;
  title: string;
  desc: string;
  check: (p: { xp: number; streak: number; completedLessons: string[]; level: number }) => boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  { icon: "target", title: "First Steps", desc: "Complete your first lesson", check: p => p.completedLessons.length >= 1 },
  { icon: "fire", title: "On Fire", desc: "Reach a 3-day streak", check: p => p.streak >= 3 },
  { icon: "lightning", title: "XP Hunter", desc: "Earn 100 XP", check: p => p.xp >= 100 },
  { icon: "book", title: "Bookworm", desc: "Complete 5 lessons", check: p => p.completedLessons.length >= 5 },
  { icon: "fire", title: "Blazing", desc: "Reach a 7-day streak", check: p => p.streak >= 7 },
  { icon: "diamond", title: "XP Master", desc: "Earn 500 XP", check: p => p.xp >= 500 },
  { icon: "trophy", title: "Level Up!", desc: "Reach Level 2", check: p => p.level >= 2 },
  { icon: "graduation", title: "Scholar", desc: "Complete 10 lessons", check: p => p.completedLessons.length >= 10 },
  { icon: "star", title: "Superstar", desc: "Earn 1000 XP", check: p => p.xp >= 1000 },
  { icon: "trophy", title: "Unstoppable", desc: "Reach a 30-day streak", check: p => p.streak >= 30 },
];

const AchievementsScreen = () => {
  const { progress } = useApp();

  const unlocked = ACHIEVEMENTS.filter(a =>
    a.check({ xp: progress.xp, streak: progress.streak, completedLessons: progress.completedLessons, level: progress.level })
  ).length;

  return (
    <>
      <div className="bg-card px-5 pt-4 pb-3.5 border-b border-border shrink-0">
        <div className="text-[22px] font-black text-foreground flex items-center gap-2">
          <Icon name="trophy" size={24} /> Achievements
        </div>
        <div className="text-[13px] text-muted-foreground font-semibold mt-0.5">
          {unlocked}/{ACHIEVEMENTS.length} unlocked
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="p-[18px] pb-[100px]">
          {/* Stats summary */}
          <div className="flex gap-2.5 mb-5">
            {[
              { val: `${progress.xp}`, label: "Total XP", iconName: "lightning" as IconName },
              { val: `${progress.streak}`, label: "Streak", iconName: "fire" as IconName },
              { val: `${progress.completedLessons.length}`, label: "Lessons", iconName: "book" as IconName },
            ].map(s => (
              <div key={s.label} className="flex-1 bg-card rounded-2xl p-3.5 border-[1.5px] border-border text-center">
                <div className="mb-0.5 flex justify-center"><Icon name={s.iconName} size={22} /></div>
                <div className="text-xl font-black text-foreground">{s.val}</div>
                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Kibo encouragement */}
          <div className="flex items-center gap-3 bg-card rounded-2xl p-4 border-[1.5px] border-border mb-5">
            <img src={
              unlocked >= 8 ? KIBO.streak30 :
              unlocked >= 5 ? KIBO.trophy :
              unlocked >= 3 ? KIBO.celebrate :
              unlocked > 0 ? KIBO.streak3 :
              KIBO.studying
            } alt="Kibo" className="w-14 h-14 object-contain" />
            <div className="text-[13px] text-muted-foreground leading-relaxed">
              {unlocked === 0
                ? "Complete lessons to unlock badges! You got this! 💪"
                : unlocked < 5
                  ? `${unlocked} badge${unlocked > 1 ? "s" : ""} earned! Keep going! ✨`
                  : <span>You're an AI learning machine! <Icon name="rocket" size={14} /></span>}
            </div>
          </div>

          {/* Achievements grid */}
          <div className="flex flex-col gap-2.5">
            {ACHIEVEMENTS.map((a, i) => {
              const earned = a.check({
                xp: progress.xp,
                streak: progress.streak,
                completedLessons: progress.completedLessons,
                level: progress.level,
              });
              return (
                <div key={i}
                  className={`flex items-center gap-3.5 bg-card rounded-xl p-4 border-[1.5px] transition-all
                    ${earned ? "border-kibo-gold bg-kibo-gold/5" : "border-border opacity-50"}`}>
                  <div className={`w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0
                    ${earned ? "bg-kibo-gold/15" : "bg-background"}`}>
                    {earned ? <Icon name={a.icon} size={26} /> : "🔒"}
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] font-extrabold text-foreground">{a.title}</div>
                    <div className="text-xs text-muted-foreground font-semibold mt-0.5">{a.desc}</div>
                  </div>
                  {earned && <Icon name="checkmark" size={20} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AchievementsScreen;
