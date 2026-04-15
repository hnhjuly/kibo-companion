import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import heroImg from "@/assets/waitlist-hero.png";
import kLogo from "@/assets/kibo-k-logo.png";
import NotoEmoji from "@/components/NotoEmoji";

const WaitlistScreen = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("waitlist").insert({ email: trimmed, module_title: "early-access" });
    setSubmitting(false);

    if (error && error.code === "23505") {
      toast({ title: "Already on the list!", description: "You're already signed up. We'll be in touch!" });
      setSubmitted(true);
    } else if (error) {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
      return;
    } else {
      toast({ title: "You're in! 🎉", description: "We'll notify you when Kibo launches." });
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-dvh w-full flex flex-col items-center justify-between relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f0faf2 0%, #e8f5eb 20%, #dff0e8 40%, #eef6f0 60%, #f5f9f6 80%, #fafcfb 100%)" }}>
      
      {/* Subtle sparkle overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle at 30% 20%, rgba(61,183,74,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,215,0,0.06) 0%, transparent 50%)" }} />

      <div className="w-full max-w-md mx-auto flex flex-col items-center px-6 pt-10 pb-8 relative z-10 flex-1 justify-center">
        
        {/* K Logo */}
        <img src={kLogo} alt="Kibo" className="w-16 h-16 object-contain mb-6 drop-shadow-sm" />

        {/* Heading */}
        <h1 className="text-[32px] font-black text-foreground leading-tight text-center mb-2">
          Learn <span className="text-kibo-green">AI skills</span>
          <br />in 5 minutes a day <NotoEmoji name="sparkles" size={24} />
        </h1>

        {/* Subtitle */}
        <p className="text-[16px] text-muted-foreground font-semibold text-center mb-6 leading-relaxed">
          No coding. No overwhelm. Just simple daily training.
        </p>

        {/* Hero Image */}
        <img src={heroImg} alt="Kibo and AI companion" className="w-full max-w-[340px] h-auto object-contain mb-8 drop-shadow-lg" />

        {/* Email input + button */}
        {!submitted ? (
          <div className="w-full flex items-center bg-card rounded-full border-[1.5px] border-border shadow-sm overflow-hidden pl-4 pr-1.5 py-1.5">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-foreground text-[15px] font-semibold placeholder:text-muted-foreground/50 outline-none min-w-0"
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="shrink-0 px-5 py-3 rounded-full font-black text-[15px] text-primary-foreground transition-all active:translate-y-[1px] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #3db74a, #2d9e38)" }}>
              {submitting ? "..." : "Join waitlist →"}
            </button>
          </div>
        ) : (
          <div className="w-full bg-kibo-green/10 rounded-2xl p-4 text-center border border-kibo-green/20">
            <div className="text-[15px] font-black text-kibo-green flex items-center justify-center gap-1.5">
              <NotoEmoji name="sparkles" size={16} /> You're on the list!
            </div>
            <p className="text-[12px] text-muted-foreground font-semibold mt-1">We'll let you know when Kibo is ready.</p>
          </div>
        )}

        {/* Early perks note */}
        <p className="text-[13px] text-muted-foreground/70 font-semibold mt-4 flex items-center gap-1">
          <NotoEmoji name="sparkles" size={12} />
          <em>Early users get lifetime perks</em>
        </p>
      </div>

      {/* Bottom social proof */}
      <div className="pb-8 text-center">
        <p className="text-[14px] text-muted-foreground font-bold">
          Join 1,200+ early learners
        </p>
      </div>
    </div>
  );
};

export default WaitlistScreen;
