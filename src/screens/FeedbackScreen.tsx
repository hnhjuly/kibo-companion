import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { KIBO } from "@/data/curriculum";
import { Send } from "lucide-react";

const FeedbackScreen = () => {
  const { setScreen } = useApp();
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!feedback.trim()) return;

    const emailBody = `Feedback from Kibo User:\n\n${feedback}\n\n---\nSent from Kibo Learning App`;
    const mailto = `mailto:hanahjuly.studio@gmail.com?subject=Kibo%20Feedback&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailto;
    
    // Reset after a short delay
    setTimeout(() => {
      setFeedback("");
    }, 500);
  };

  return (
    <div className="flex flex-col flex-1 justify-between p-7 pt-8"
      style={{ background: "linear-gradient(160deg, #dff4ff, #f0fdf4 55%, #fffde8)" }}>
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setScreen("home")}
          className="text-3xl font-black text-foreground">←</button>
        <h1 className="text-[24px] font-black text-foreground flex-1">Send Feedback</h1>
      </div>

      {/* Mascot & Message */}
      <div className="flex flex-col items-center justify-center gap-4 mb-8">
        <img src={KIBO.waiting} alt="Kibo" className="w-40 h-40 object-contain" />
        <div className="text-center">
          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-[300px]">
            Help us improve Kibo! Share your thoughts, suggestions, or bugs you've found.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col gap-3 mb-6">
        <label className="text-[13px] font-bold text-foreground">Your Feedback</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Tell us what's on your mind..."
          className="flex-1 bg-card border-[1.5px] border-border rounded-2xl p-4 text-foreground text-[15px] font-medium resize-none focus:outline-none focus:border-kibo-green"
          style={{ minHeight: "120px" }}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <button onClick={handleSubmit}
          disabled={!feedback.trim()}
          className="w-full py-[18px] bg-kibo-green text-primary-foreground rounded-2xl font-black text-lg kibo-shadow active:translate-y-[3px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          <Send className="w-5 h-5" />
          Send Feedback
        </button>
        <button onClick={() => setScreen("home")}
          className="bg-transparent border-none text-muted-foreground font-bold text-[15px] py-2.5 text-center">
          Skip
        </button>
      </div>
    </div>
  );
};

export default FeedbackScreen;
