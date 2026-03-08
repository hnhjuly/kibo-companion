import kiboHappy from "@/assets/kibo-happy.png";
import { ArrowRight } from "lucide-react";

const HeroCard = () => {
  return (
    <div className="mx-4 mb-4">
      <div className="relative bg-kibo-sky rounded-2xl overflow-hidden p-5 min-h-[180px] card-shadow">
        {/* Decorative sparkles */}
        <div className="absolute top-4 left-[45%] text-kibo-gold text-lg">✨</div>
        <div className="absolute top-12 right-[30%] text-kibo-gold text-sm">⭐</div>
        
        <div className="relative z-10 max-w-[55%]">
          <h2 className="text-xl font-black text-foreground mb-0.5">
            Hi, I'm Kibo!
          </h2>
          <p className="text-sm font-semibold text-foreground/80 mb-3">
            Let's train your AI skills! 💪
          </p>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground font-extrabold text-sm px-5 py-2.5 rounded-xl kibo-shadow active:translate-y-0.5 active:shadow-none transition-all">
            START <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <img
          src={kiboHappy}
          alt="Kibo mascot"
          className="absolute right-2 bottom-0 w-36 h-36 object-contain animate-float"
        />
      </div>
    </div>
  );
};

export default HeroCard;
