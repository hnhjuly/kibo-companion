import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { KIBO } from "@/data/curriculum";
import { Send, ExternalLink } from "lucide-react";
import Icon from "@/components/Icon";

const AboutScreen = () => {
  const { setScreen } = useApp();
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!feedback.trim()) return;
    const emailBody = `Feedback from Kibo User:\n\n${feedback}\n\n---\nSent from Kibo Learning App`;
    const mailto = `mailto:hanahjuly.studio@gmail.com?subject=Kibo%20Feedback&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailto;
    setTimeout(() => setFeedback(""), 500);
  };

  return (
    <>
      <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center justify-center gap-2">
        <span className="text-lg font-black text-foreground">About Kibo</span>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="p-5 pb-[120px] flex flex-col gap-4"
          style={{ background: "linear-gradient(160deg, #dff4ff, #f0fdf4 55%, #fffde8)" }}>

          {/* App Info Card */}
          <div className="bg-card rounded-[18px] p-5 border-[1.5px] border-border text-center">
            <img src={KIBO.wave} alt="Kibo" className="w-28 h-28 object-contain mx-auto mb-3" />
            <h2 className="text-xl font-black text-foreground mb-1">Kibo</h2>
            <p className="text-sm text-muted-foreground font-semibold leading-relaxed max-w-[280px] mx-auto mb-4">
              Your fun, bite-sized AI learning companion. Master artificial intelligence through interactive lessons, quizzes, and daily challenges — one day at a time.
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              <span className="bg-background rounded-full px-3 py-1.5 text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                <Icon name="lightbulb" size={14} /> AI Learning
              </span>
              <span className="bg-background rounded-full px-3 py-1.5 text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                <Icon name="lightning" size={14} /> Gamified
              </span>
              <span className="bg-background rounded-full px-3 py-1.5 text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                <Icon name="fire" size={14} /> Streaks
              </span>
            </div>
          </div>

          {/* Created By */}
          <div className="bg-card rounded-[18px] p-5 border-[1.5px] border-border">
            <h3 className="text-[13px] font-black text-muted-foreground uppercase tracking-wider mb-3">Created by</h3>
            <a href="https://www.hanahjuly.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-kibo-green to-kibo-green/70 flex items-center justify-center text-primary-foreground font-black text-lg">
                H
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-black text-foreground group-hover:text-kibo-green transition-colors">Hanah July</div>
                <div className="text-xs text-muted-foreground font-semibold">hanahjuly.com</div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground/50 group-hover:text-kibo-green transition-colors" />
            </a>
          </div>

          {/* Version & Info */}
          <div className="bg-card rounded-[18px] p-5 border-[1.5px] border-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-muted-foreground">Version</span>
              <span className="text-sm font-black text-foreground">1.0.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-muted-foreground">Made with</span>
              <span className="text-sm font-black text-foreground">💙 & Lovable</span>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="bg-card rounded-[18px] p-5 border-[1.5px] border-border">
            <div className="flex items-center gap-2 mb-3">
              <img src={KIBO.thinking} alt="Kibo" className="w-10 h-10 object-contain" />
              <div>
                <h3 className="text-[15px] font-black text-foreground">Send Feedback</h3>
                <p className="text-[11px] text-muted-foreground font-semibold">Help us improve Kibo!</p>
              </div>
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts, suggestions, or bugs..."
              className="w-full bg-background border-[1.5px] border-border rounded-2xl p-3.5 text-foreground text-[14px] font-medium resize-none focus:outline-none focus:border-kibo-green mb-3"
              style={{ minHeight: "100px" }}
            />
            <button onClick={handleSubmit}
              disabled={!feedback.trim()}
              className="w-full py-3.5 bg-kibo-green text-primary-foreground rounded-2xl font-black text-[15px] kibo-shadow active:translate-y-[3px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Send Feedback
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutScreen;
