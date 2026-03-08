import { useMemo } from "react";
import { getRandomFact } from "@/data/gameModes";
import { KIBO } from "@/data/curriculum";
import PreloadedImg from "@/components/PreloadedImg";

interface DidYouKnowCardProps {
  onDismiss: () => void;
}

const DidYouKnowCard = ({ onDismiss }: DidYouKnowCardProps) => {
  const fact = useMemo(() => getRandomFact(), []);

  return (
    <div className="flex flex-col flex-1 bg-card">
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-5">
        {/* Card */}
        <div className="w-full max-w-sm rounded-[20px] p-6 flex flex-col items-center gap-4 text-center"
          style={{ background: `linear-gradient(135deg, ${fact.cardColor[0]}, ${fact.cardColor[1]})` }}>
          <span className="text-5xl">{fact.icon}</span>
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-black">{fact.category}</span>
          <p className="text-white font-black text-[17px] leading-relaxed">{fact.fact}</p>
        </div>

        {/* Kibo reaction */}
        <div className="flex items-start gap-3 max-w-sm w-full">
          <PreloadedImg src={KIBO.surprised} alt="Kibo" className="w-14 h-14 object-contain shrink-0" />
          <div className="bg-background rounded-[14px] rounded-tl-sm p-3.5 flex-1">
            <p className="text-sm font-bold text-foreground">{fact.kiboReaction}</p>
          </div>
        </div>

        <button onClick={onDismiss}
          className="px-10 py-3.5 bg-kibo-green text-primary-foreground rounded-xl font-black kibo-shadow active:translate-y-[2px] active:shadow-none transition-all">
          Next →
        </button>
      </div>
    </div>
  );
};

export default DidYouKnowCard;
