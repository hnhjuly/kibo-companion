import { Flame, Diamond, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-2">
      <div>
        <h1 className="text-2xl font-black text-foreground">Hello!</h1>
        <p className="text-sm font-semibold text-muted-foreground">
          Learn AI with <span className="text-foreground font-bold">Kibo</span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-card rounded-full px-3 py-1.5 card-shadow">
          <Flame className="w-4 h-4 text-kibo-orange" />
          <span className="text-sm font-bold text-foreground">3</span>
          <span className="text-kibo-orange font-bold text-xs">🔥</span>
        </div>
        <div className="flex items-center gap-1 bg-card rounded-full px-3 py-1.5 card-shadow">
          <Diamond className="w-4 h-4 text-kibo-green" />
          <span className="text-sm font-bold text-foreground">230</span>
          <button className="w-5 h-5 rounded-full bg-kibo-teal flex items-center justify-center">
            <Plus className="w-3 h-3 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const LevelBar = () => (
  <div className="mx-4 mb-3">
    <div className="flex items-center gap-2 bg-card rounded-full px-3 py-1.5 card-shadow">
      <span className="text-xs font-bold text-secondary">LEVEL 1</span>
      <Progress value={87} className="flex-1 h-2" />
      <span className="text-xs font-semibold text-muted-foreground">260/300 XP</span>
    </div>
  </div>
);

export default Header;
