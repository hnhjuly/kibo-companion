import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { KIBO } from "@/data/curriculum";

function formatTime(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
}

const HeartsDepletedScreen = () => {
  const { setScreen, heartsTimeRemaining, progress } = useApp();
  const [time, setTime] = useState(heartsTimeRemaining);

  useEffect(() => {
    setTime(heartsTimeRemaining);
    if (heartsTimeRemaining <= 0) {
      // Hearts restored, go back home
      setScreen("home");
    }
  }, [heartsTimeRemaining, setScreen]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 text-center"
      style={{ background: "linear-gradient(160deg, #fff0f0, #ffe8ea)" }}>
      <img src={KIBO.sad} alt="Kibo sad" className="w-[150px] h-[150px] object-contain mb-6 drop-shadow-lg" />
      
      <h1 className="text-[28px] font-black text-foreground mb-2">Out of Hearts! 💔</h1>
      <p className="text-muted-foreground text-[15px] mb-6 max-w-[260px]">
        You've used all 3 hearts. Take a break and come back when they refill!
      </p>

      {/* Timer */}
      <div className="bg-card rounded-2xl p-6 w-full mb-6 card-shadow border-[1.5px] border-destructive/20">
        <div className="text-sm font-extrabold text-muted-foreground mb-2 uppercase tracking-wide">Hearts refill in</div>
        <div className="text-[36px] font-black text-destructive tabular-nums">
          {formatTime(time)}
        </div>
        <div className="flex justify-center gap-2 mt-3">
          {"🖤🖤🖤".split("").filter((_, i) => i % 2 === 0).map((_, i) => (
            <span key={i} className="text-2xl">🖤</span>
          ))}
        </div>
      </div>

      {/* Tips while waiting */}
      <div className="bg-card rounded-2xl p-4 w-full card-shadow mb-6">
        <div className="text-sm font-extrabold text-foreground mb-2">💡 While you wait...</div>
        <ul className="text-[13px] text-muted-foreground text-left space-y-1.5">
          <li>📖 Review what you learned today</li>
          <li>🔥 Your streak is at <b className="text-kibo-orange">{progress.streak} days</b></li>
          <li>⚡ You've earned <b className="text-kibo-gold">{progress.xp} XP</b> total</li>
        </ul>
      </div>

      <button onClick={() => setScreen("home")}
        className="w-full py-4 bg-muted text-muted-foreground rounded-2xl font-black text-base transition-all">
        Back to Home
      </button>
    </div>
  );
};

export default HeartsDepletedScreen;
