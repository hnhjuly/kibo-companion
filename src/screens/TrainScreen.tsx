import { useApp } from "@/context/AppContext";
import { CURRICULUM } from "@/data/curriculum";
import { ArrowRight } from "lucide-react";

const TrainScreen = () => {
  const { setScreen, setCurrentLesson, progress } = useApp();

  const startQuiz = () => {
    setCurrentLesson(CURRICULUM.levels[0].lessons[2]);
    setScreen("quiz");
  };

  return (
    <>
      <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center gap-3.5 justify-center">
        <span className="text-lg font-black text-foreground">🔥 Daily Challenge</span>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="p-[18px] pb-[100px] flex flex-col gap-4">
          {/* Streak */}
          <div className="rounded-[18px] p-[18px] flex items-center gap-4"
            style={{ background: "linear-gradient(135deg, #fff8e0, #ffe8d6)", border: "1.5px solid #ffb800" }}>
            <span className="text-[50px]">🔥</span>
            <div className="flex-1">
              <div className="text-[28px] font-black text-foreground">{progress.streak} Day Streak</div>
              <div className="text-[13px] text-muted-foreground font-bold">Don't break it!</div>
            </div>
            <button className="bg-card border-2 border-kibo-gold rounded-[10px] px-3 py-1.5 text-xs font-extrabold text-kibo-orange">❄️ Freeze</button>
          </div>

          {/* Daily tasks */}
          <div className="bg-card rounded-[18px] p-4 border-[1.5px] border-border">
            <h3 className="text-[17px] font-black text-foreground mb-3">Today's 3 Tasks</h3>
            <div className="flex gap-[7px] mb-4">
              {[true, false, false].map((done, i) => (
                <div key={i} className={`flex-1 h-1.5 rounded-full ${done ? "bg-kibo-green" : "bg-border"}`} />
              ))}
            </div>
            {[
              { type: "✏️ Prompt Fix", title: "Fix a bad prompt about recipes", xp: 20, time: "~2 min" },
              { type: "📋 Summarize", title: "Summarize a long email thread", xp: 20, time: "~2 min" },
              { type: "🤖 AI Tools", title: "Which AI handles images best?", xp: 20, time: "~1 min" },
            ].map((c, i) => (
              <button key={i} onClick={startQuiz}
                className="w-full bg-background rounded-[14px] p-4 mb-2.5 text-left border-2 border-transparent hover:border-kibo-green transition-all">
                <div className="text-[11px] font-extrabold text-muted-foreground/50 uppercase tracking-wider mb-1">{c.type}</div>
                <div className="text-[15px] font-extrabold text-foreground mb-1.5">{c.title}</div>
                <div className="flex items-center gap-2">
                  <span className="bg-kibo-gold/15 text-kibo-gold rounded-full px-2.5 py-0.5 text-[11px] font-extrabold">+{c.xp} XP</span>
                  <span className="text-xs text-muted-foreground/50 font-bold">{c.time}</span>
                </div>
              </button>
            ))}
            <button onClick={startQuiz}
              className="w-full py-3.5 bg-kibo-green text-primary-foreground rounded-xl font-black text-[15px] kibo-shadow active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2">
              START CHALLENGE <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainScreen;
