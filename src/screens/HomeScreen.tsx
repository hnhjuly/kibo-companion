import { useApp } from "@/context/AppContext";
import { KIBO, CURRICULUM } from "@/data/curriculum";
import { Pencil, FileText, Bot, ChevronRight, ArrowRight, Check, Lock, Star, Heart } from "lucide-react";
import { getXPForLevel } from "@/lib/progress";

const HomeScreen = () => {
  const { setScreen, setCurrentLesson, progress, canPlay } = useApp();

  const startQuiz = () => {
    const fallback = CURRICULUM.levels[0].lessons[2];
    setCurrentLesson(fallback);
    setScreen("quiz");
  };

  return (
    <>
      {/* Header */}
      <div className="bg-card px-5 pt-4 pb-3.5 border-b border-border shrink-0">
        <div className="flex justify-between items-start mb-2.5">
          <div>
            <div className="text-[22px] font-black text-foreground">Hello! 👋</div>
            <div className="text-[13px] text-muted-foreground font-semibold mt-0.5">Learn AI with Kibo</div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 bg-background rounded-full px-3.5 py-1.5 text-sm font-extrabold text-kibo-orange">🔥 3</div>
            <div className="flex items-center gap-1.5 bg-background rounded-full px-3.5 py-1.5 text-sm font-extrabold text-kibo-gold">💎 230</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black text-muted-foreground tracking-wide whitespace-nowrap">LEVEL 1</span>
          <div className="flex-1 h-[9px] bg-background rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "87%", background: "linear-gradient(90deg, #3db74a, #72e07a)" }} />
          </div>
          <span className="text-[11px] font-black text-kibo-green whitespace-nowrap">260/300 XP</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: "none" }}>
        <div className="p-[18px] pb-[100px] flex flex-col gap-4">
          {/* Kibo Hero Card */}
          <div className="rounded-[18px] p-0 px-5 pb-5 relative overflow-hidden flex items-end"
            style={{ background: "linear-gradient(130deg, #e8f6ff, #f5fffc 55%, #f0ffe8)", border: "1.5px solid rgba(74,158,255,0.15)" }}>
            <div className="absolute top-4 right-5 text-[13px] opacity-45 text-kibo-gold">✦</div>
            <img src={KIBO.happy} alt="Kibo" className="w-[115px] h-[115px] object-contain shrink-0 -mt-2 animate-float drop-shadow-lg" />
            <div className="flex-1 pt-5 pl-1.5">
              <div className="text-base font-black text-foreground mb-1">Hi, I'm Kibo! ✨</div>
              <div className="text-[13px] text-muted-foreground leading-relaxed mb-3">Let's train your AI skills! You're on a 3 day streak 🔥</div>
              <button onClick={() => setScreen("lessons")}
                className="bg-kibo-green text-primary-foreground rounded-xl px-[22px] py-2.5 font-black text-sm inline-flex items-center gap-2 kibo-shadow active:translate-y-[2px] active:shadow-none transition-all">
                START <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Today's Training */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[17px] font-black text-foreground flex items-center gap-2">🔥 Today's AI Training</h3>
              <div className="flex gap-1.5">
                {[0, 1, 2].map(i => <div key={i} className={`w-[7px] h-[7px] rounded-full ${i === 0 ? "bg-kibo-green" : "bg-border"}`} />)}
              </div>
            </div>
            <div className="bg-card rounded-[18px] p-4 border-[1.5px] border-border">
              {[
                { icon: <Pencil className="w-5 h-5" />, bg: "bg-[#ffe8ea]", label: "1. Fix a bad prompt" },
                { icon: <FileText className="w-5 h-5" />, bg: "bg-[#e0faf0]", label: "2. Summarize a long email" },
                { icon: <Bot className="w-5 h-5" />, bg: "bg-[#ffe8d6]", label: "3. Choose the best AI tool" },
              ].map((t, i) => (
                <button key={i} onClick={startQuiz}
                  className="w-full bg-background rounded-xl p-3.5 flex items-center gap-3.5 mb-2 last:mb-0 border-[1.5px] border-transparent hover:border-kibo-green hover:bg-kibo-green/5 hover:translate-x-0.5 transition-all text-left">
                  <div className={`w-[38px] h-[38px] rounded-[11px] flex items-center justify-center shrink-0 ${t.bg}`}>{t.icon}</div>
                  <span className="flex-1 text-[15px] font-bold text-foreground">{t.label}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
                </button>
              ))}
              <button onClick={() => setScreen("train")}
                className="w-full py-3.5 bg-kibo-green text-primary-foreground rounded-xl font-black text-[15px] mt-3 kibo-shadow active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2">
                START TRAINING <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Learning Path */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[17px] font-black text-foreground flex items-center gap-2">🎓 Learning Path</h3>
            </div>
            <div className="bg-card rounded-[18px] p-4 border-[1.5px] border-border">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] font-black text-foreground">LEVEL 1: <span className="text-kibo-green">AI BASICS</span></span>
                <button onClick={() => setScreen("lessons")} className="text-[13px] font-extrabold text-kibo-green">3/10 ›</button>
              </div>
              <div className="flex flex-col gap-1.5 mb-3.5">
                {["What's AI?", "AI vs Humans", "Types of AI Tools"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                    <Star className="w-4 h-4 text-kibo-gold fill-kibo-gold" /> {t}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-[7px] mb-3.5">
                <div className="w-9 h-9 rounded-[10px] bg-secondary/20 text-secondary flex items-center justify-center"><Check className="w-4 h-4" /></div>
                <span className="text-muted-foreground/50 text-sm">→</span>
                <div className="w-9 h-9 rounded-[10px] bg-secondary/20 text-secondary flex items-center justify-center"><Check className="w-4 h-4" /></div>
                <span className="text-muted-foreground/50 text-sm">→</span>
                <div className="w-9 h-9 rounded-[10px] bg-kibo-gold/20 text-kibo-gold border-2 border-kibo-gold flex items-center justify-center text-[13px] font-black">3</div>
                <span className="text-muted-foreground/50 text-sm">→</span>
                <div className="w-9 h-9 rounded-[10px] bg-background text-muted-foreground/50 flex items-center justify-center"><Lock className="w-3.5 h-3.5" /></div>
              </div>
              <button onClick={() => setScreen("lessons")}
                className="w-full py-3 bg-secondary/15 text-secondary rounded-xl font-black text-sm hover:bg-secondary hover:text-primary-foreground transition-all">
                VIEW LESSONS ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
