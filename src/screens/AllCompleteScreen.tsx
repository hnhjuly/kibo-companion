import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { KIBO, CURRICULUM } from "@/data/curriculum";
import { ChevronLeft, X } from "lucide-react";
import NotoEmoji from "@/components/NotoEmoji";
import PreloadedImg from "@/components/PreloadedImg";
import { COMING_SOON_MODULES } from "@/data/comingSoon";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const AllCompleteScreen = () => {
  const { setScreen, progress } = useApp();
  const [notified, setNotified] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("kibo_waitlist");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingModule, setPendingModule] = useState<string>("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const totalLessons = CURRICULUM.levels.flatMap(l => l.lessons).length;
  const totalXP = progress.xp;

  const handleNotifyClick = (moduleTitle: string) => {
    if (notified.has(moduleTitle)) return;
    setPendingModule(moduleTitle);
    setEmail("");
    setShowEmailModal(true);
  };

  const handleSubmitEmail = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("waitlist").insert({ email: trimmed, module_title: pendingModule });
    setSubmitting(false);

    if (error && error.code === "23505") {
      toast({ title: "Already subscribed!", description: "You're already on the list for this module." });
    } else if (error) {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
      return;
    } else {
      toast({ title: "You're on the list! 🎉", description: `We'll notify you when "${pendingModule}" launches.` });
    }

    const next = new Set(notified);
    next.add(pendingModule);
    setNotified(next);
    localStorage.setItem("kibo_waitlist", JSON.stringify([...next]));
    setShowEmailModal(false);
  };

  return (
    <>
      <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center gap-3.5">
        <button onClick={() => setScreen("home")} className="text-foreground p-1"><ChevronLeft className="w-6 h-6" /></button>
        <span className="text-lg font-black text-foreground flex-1 flex items-center gap-2">
          <NotoEmoji name="graduation" size={20} /> Learning Path
        </span>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="p-[18px] pb-[100px] flex flex-col gap-4">
          
          {/* Celebration Card */}
          <div className="rounded-[18px] p-6 text-center border-[2px] border-kibo-gold/40"
            style={{ background: "linear-gradient(160deg, #fef9e7, #fff7ed 50%, #fef0f5)" }}>
            <PreloadedImg src={KIBO.graduate2} alt="Kibo graduated" className="w-32 h-32 object-contain mx-auto mb-3 drop-shadow-lg" />
            <div className="inline-flex items-center gap-1.5 bg-kibo-gold/15 text-kibo-gold rounded-full px-4 py-1.5 text-xs font-black mb-3">
              <NotoEmoji name="trophy" size={14} /> AI FOUNDATIONS COMPLETE
            </div>
            <h1 className="text-[22px] font-black text-foreground leading-tight mb-2">
              You've mastered<br />the basics! <NotoEmoji name="sparkles" size={20} />
            </h1>
            <p className="text-[13px] text-muted-foreground font-semibold leading-relaxed mb-4">
              {totalLessons} lessons completed · {totalXP} XP earned
            </p>
            <div className="flex justify-center gap-3">
              <div className="bg-card rounded-xl px-4 py-2.5 border border-border">
                <div className="text-lg font-black text-kibo-green">{totalLessons}</div>
                <div className="text-[10px] font-bold text-muted-foreground">Lessons</div>
              </div>
              <div className="bg-card rounded-xl px-4 py-2.5 border border-border">
                <div className="text-lg font-black text-kibo-gold">{totalXP}</div>
                <div className="text-[10px] font-bold text-muted-foreground">Total XP</div>
              </div>
              <div className="bg-card rounded-xl px-4 py-2.5 border border-border">
                <div className="text-lg font-black text-kibo-orange">{progress.streak}</div>
                <div className="text-[10px] font-bold text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </div>

          {/* Coming Soon */}
          <div>
            <h3 className="text-[17px] font-black text-foreground mb-1 flex items-center gap-2">
              <NotoEmoji name="rocket" size={18} /> What's Next?
            </h3>
            <p className="text-[12px] text-muted-foreground font-semibold mb-3">
              Tool-specific modules are coming soon. Tap to get notified!
            </p>

            <div className="flex flex-col gap-2.5">
              {COMING_SOON_MODULES.map((mod, i) => (
                <div key={i} className="bg-card rounded-[14px] p-3.5 border-[1.5px] border-border flex items-center gap-3">
                  <div className="w-11 h-11 rounded-[12px] flex items-center justify-center text-xl shrink-0"
                    style={{ background: mod.color + "15" }}>
                    {mod.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-extrabold text-foreground flex items-center gap-1.5">
                      <NotoEmoji name="lock" size={12} /> {mod.title}
                    </div>
                    <div className="text-[11px] text-muted-foreground font-semibold truncate">{mod.desc}</div>
                  </div>
                  <button
                    onClick={() => handleNotifyClick(mod.title)}
                    disabled={notified.has(mod.title)}
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-extrabold transition-all ${
                      notified.has(mod.title)
                        ? "bg-kibo-green/15 text-kibo-green"
                        : "bg-muted text-muted-foreground hover:bg-kibo-green/10 hover:text-kibo-green"
                    }`}>
                    {notified.has(mod.title) ? "✓ Notified" : "Notify me"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Keep Training CTA */}
          <div className="bg-card rounded-[18px] p-4 border-[1.5px] border-border text-center">
            <PreloadedImg src={KIBO.focusedIpad} alt="Kibo" className="w-16 h-16 object-contain mx-auto mb-2" />
            <div className="text-[14px] font-black text-foreground mb-1">
              Keep your streak alive! <NotoEmoji name="fire" size={14} />
            </div>
            <p className="text-[12px] text-muted-foreground font-semibold mb-3">
              While you wait — daily challenges keep your AI skills sharp
            </p>
            <button onClick={() => setScreen("train")}
              className="w-full py-3 bg-kibo-green text-primary-foreground rounded-xl font-black text-[15px] kibo-shadow active:translate-y-[2px] active:shadow-none transition-all">
              DAILY CHALLENGE →
            </button>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
          <div className="bg-card rounded-2xl p-5 w-full max-w-[320px] border border-border shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[16px] font-black text-foreground flex items-center gap-1.5">
                <NotoEmoji name="bell" size={16} /> Get Notified
              </h3>
              <button onClick={() => setShowEmailModal(false)} className="text-muted-foreground p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[12px] text-muted-foreground font-semibold mb-4">
              Enter your email and we'll let you know when <b className="text-foreground">{pendingModule}</b> launches!
            </p>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              autoFocus
              className="w-full px-4 py-3 rounded-xl border-[1.5px] border-border bg-background text-foreground text-[14px] font-semibold placeholder:text-muted-foreground/50 focus:outline-none focus:border-kibo-green transition-colors mb-3"
              onKeyDown={e => e.key === "Enter" && handleSubmitEmail()}
            />
            <button
              onClick={handleSubmitEmail}
              disabled={submitting}
              className="w-full py-3 bg-kibo-green text-primary-foreground rounded-xl font-black text-[14px] kibo-shadow active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50">
              {submitting ? "Submitting..." : "Notify Me 🔔"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AllCompleteScreen;
