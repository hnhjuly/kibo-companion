import { ArrowLeft } from "lucide-react";
import { useApp } from "@/context/AppContext";
import NotoEmoji from "@/components/NotoEmoji";
import PreloadedImg from "@/components/PreloadedImg";
import { KIBO } from "@/data/curriculum";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    q: "How does Kibo work?",
    a: "Kibo teaches you how to use AI through short, interactive lessons, just like Duolingo but for AI skills. Pick a goal, work through bite-sized lessons, answer questions, and earn XP and streaks as you go. Each lesson takes about 3 to 5 minutes. The more consistently you show up, the faster you level up.",
  },
  {
    q: "What is the difference between Lessons and Daily Training?",
    a: "Lessons are structured modules that build your AI knowledge step by step, from AI basics all the way to AI safety. Daily Training is a quick daily challenge on a rotating topic, designed to keep your skills sharp once you know the fundamentals. Think of Lessons as your main course and Daily Training as your daily workout.",
  },
  {
    q: "What happens if I lose all my hearts?",
    a: "Hearts are your lives during a lesson. You start with 3 and lose one for every wrong answer. If you run out, the lesson ends and you restart from the beginning. No progress is lost on lessons you already completed. Use a Streak Freeze on the Train screen if you want to protect your streak on a busy day.",
  },
  {
    q: "How is my XP calculated?",
    a: "You earn XP at the end of every completed lesson. The amount depends on three things: how many answers you got right, how quickly you finished, and whether you kept all your hearts intact. A perfect run with no wrong answers gives you the maximum XP bonus.",
  },
  {
    q: "What does picking a goal actually change?",
    a: "When you select a goal during onboarding, like Work Smarter or Build a Product, Kibo reorders the modules to put the most relevant content first for you. It also personalises your home screen greeting and Kibo's messages. You can update your goal anytime from the More screen.",
  },
  {
    q: "Why are some modules locked?",
    a: "Modules unlock as you progress through earlier ones. This keeps the learning path structured so you build the right foundations before moving into more advanced topics. Complete the available lessons and the next module will unlock automatically.",
  },
  {
    q: "What is a Streak Freeze and how do I use it?",
    a: "A Streak Freeze protects your streak for one day if you miss a session. Head to the Train screen, tap the snowflake button, and your streak is safe for 24 hours. Use it wisely as you only have a limited supply. You can earn more by completing lessons and daily challenges.",
  },
  {
    q: "Will there be more content added to Kibo?",
    a: "Yes! The current version covers AI Fundamentals across 7 core modules. Coming soon are tool-specific learning paths for Claude, ChatGPT, Midjourney, Gemini, and more. Finish all current modules and you will see a preview of what is coming next. Tap \"Notify Me\" on any upcoming module to be first to know when it drops.",
  },
];

const HelpFaqScreen = () => {
  const { setScreen } = useApp();

  return (
    <>
      <div className="bg-card px-5 py-3.5 border-b border-border shrink-0 flex items-center gap-3">
        <button onClick={() => setScreen("more")} className="p-1 -ml-1 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-lg font-black text-foreground flex items-center gap-1.5">
          <NotoEmoji name="question" size={20} /> Help & FAQ
        </span>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="p-[18px] pb-[100px] flex flex-col gap-3">
          {/* Header card */}
          <div className="flex items-center gap-3 bg-card rounded-2xl p-4 border-[1.5px] border-border">
            <PreloadedImg src={KIBO.focusedIpad} alt="Kibo" className="w-14 h-14 object-contain" />
            <div className="text-[13px] text-muted-foreground leading-relaxed font-semibold">
              Got questions? Here are the most common ones about Kibo. <NotoEmoji name="sparkles" size={14} />
            </div>
          </div>

          {/* FAQ items */}
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="bg-card rounded-2xl border-[1.5px] border-border overflow-hidden">
              <div className="px-4 py-3.5">
                <div className="text-[14px] font-extrabold text-foreground flex items-start gap-2">
                  <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-[12px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {item.q}
                </div>
                <div className="text-[13px] text-muted-foreground font-medium leading-relaxed mt-2.5 pl-8">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HelpFaqScreen;
