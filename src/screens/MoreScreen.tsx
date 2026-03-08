import { MessageCircle, HelpCircle, ChevronRight, ExternalLink } from "lucide-react";
import { useApp } from "@/context/AppContext";
import kiboWave from "@/assets/kibo-wave.png";

const MoreScreen = () => {
  const { setScreen } = useApp();

  return (
    <>
      <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center justify-center gap-3.5">
        <span className="text-lg font-black text-foreground">More</span>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="p-[18px] pb-[100px] flex flex-col gap-3.5">
          {/* About */}
          <div className="bg-card rounded-[18px] p-[22px] text-center border-[1.5px] border-border">
            <img src={kiboWave} alt="Kibo" className="w-20 h-20 object-contain mx-auto mb-3" />
            <div className="text-xl font-black text-foreground mb-1">KIBO</div>
            <p className="text-sm text-muted-foreground font-bold leading-relaxed mb-4">
              A fun, gamified way to learn about AI. One bite-sized lesson at a time. Built for curious minds who want to understand artificial intelligence through interactive quizzes and daily challenges.
            </p>
            <p className="text-xs text-muted-foreground font-bold">
              Created by{" "}
              <a
                href="https://www.hanahjuly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-extrabold inline-flex items-center gap-1 hover:underline"
              >
                Hanah July <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          {/* Menu */}
          <div className="bg-card rounded-[18px] border-[1.5px] border-border overflow-hidden">
            {[
              { icon: <MessageCircle className="w-[22px] h-[22px]" />, label: "Feedback", action: () => setScreen("feedback") },
              { icon: <HelpCircle className="w-[22px] h-[22px]" />, label: "Help & FAQ", action: undefined },
            ].map(m => (
              <button key={m.label} onClick={m.action} className="w-full flex items-center gap-3.5 px-4 py-4 border-b border-border last:border-0 hover:bg-background transition-colors text-left">
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
