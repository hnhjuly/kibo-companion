import { ArrowRight, ChevronRight, Pencil, MessageSquare, Bot } from "lucide-react";

const tasks = [
  { icon: <Pencil className="w-4 h-4" />, iconBg: "bg-kibo-pink/20 text-kibo-pink", label: "Fix a bad prompt" },
  { icon: <MessageSquare className="w-4 h-4" />, iconBg: "bg-kibo-green/20 text-kibo-green", label: "Summarize a long email" },
  { icon: <Bot className="w-4 h-4" />, iconBg: "bg-kibo-orange/20 text-kibo-orange", label: "Choose the best AI tool" },
];

const TrainingSection = () => {
  return (
    <div className="mx-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔥</span>
          <h3 className="text-lg font-extrabold text-foreground">Today's AI Training</h3>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${i < 2 ? "bg-secondary" : "bg-border"}`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((task, i) => (
          <button
            key={i}
            className="w-full flex items-center gap-3 bg-card rounded-xl px-4 py-3.5 card-shadow hover:scale-[1.01] active:scale-[0.99] transition-transform"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${task.iconBg}`}>
              {task.icon}
            </div>
            <span className="flex-1 text-left text-sm font-bold text-foreground">
              {i + 1}. {task.label}
            </span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      <button className="w-full mt-3 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-extrabold text-sm px-5 py-3 rounded-xl kibo-shadow active:translate-y-0.5 active:shadow-none transition-all">
        START TRAINING <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TrainingSection;
