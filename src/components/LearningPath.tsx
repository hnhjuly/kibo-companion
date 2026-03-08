import { ArrowRight, ChevronRight, Star } from "lucide-react";

const lessons = [
  { label: "What's AI?", done: true },
  { label: "AI vs Humans", done: true },
  { label: "Types of AI Tools", done: false },
];

const LearningPath = () => {
  return (
    <div className="mx-4 mb-24">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">📚</span>
          <h3 className="text-lg font-extrabold text-foreground">Learning Path</h3>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-kibo-orange">3/10</span>
          <ChevronRight className="w-4 h-4 text-kibo-orange" />
        </div>
      </div>

      <div className="bg-card rounded-2xl p-4 card-shadow">
        <h4 className="text-sm font-extrabold text-foreground mb-3">
          LEVEL 1: <span className="text-secondary">AI BASICS</span>
        </h4>

        <div className="flex items-start gap-4">
          <div className="flex-1 space-y-2">
            {lessons.map((lesson, i) => (
              <div key={i} className="flex items-center gap-2">
                <Star
                  className={`w-4 h-4 ${lesson.done ? "text-kibo-gold fill-kibo-gold" : "text-border"}`}
                />
                <span className={`text-sm font-semibold ${lesson.done ? "text-foreground" : "text-muted-foreground"}`}>
                  {lesson.label}
                </span>
              </div>
            ))}
          </div>

          {/* Level steps visual */}
          <div className="flex items-end gap-1">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`w-10 h-${6 + n * 2} rounded-lg flex items-center justify-center text-xs font-black ${
                  n <= 2
                    ? "bg-kibo-gold text-primary-foreground"
                    : "bg-kibo-green text-primary-foreground"
                }`}
                style={{ height: `${24 + n * 8}px` }}
              >
                {n}
              </div>
            ))}
            <ArrowRight className="w-4 h-4 text-kibo-orange mb-1" />
          </div>
        </div>

        <button className="mt-3 flex items-center gap-2 bg-primary text-primary-foreground font-extrabold text-xs px-4 py-2 rounded-lg kibo-shadow active:translate-y-0.5 active:shadow-none transition-all ml-auto">
          VIEW LESSONS <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default LearningPath;
