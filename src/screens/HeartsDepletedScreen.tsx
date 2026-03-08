import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { KIBO } from "@/data/curriculum";
import { showRewardedAd, AD_CONFIG } from "@/lib/rewardedAd";
import NotoEmoji from "@/components/NotoEmoji";

function formatTime(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
}

const HeartsDepletedScreen = () => {
  const { setScreen, heartsTimeRemaining, progress, onRestoreHeart } = useApp();
  const [time, setTime] = useState(heartsTimeRemaining);
  const [watchingAd, setWatchingAd] = useState(false);
  const [adWatched, setAdWatched] = useState(false);

  useEffect(() => {
    setTime(heartsTimeRemaining);
    if (heartsTimeRemaining <= 0) {
      setScreen("home");
    }
  }, [heartsTimeRemaining, setScreen]);

  const handleWatchAd = async () => {
    setWatchingAd(true);
    const rewarded = await showRewardedAd();
    setWatchingAd(false);
    if (rewarded) {
      onRestoreHeart();
      setAdWatched(true);
      setTimeout(() => setScreen("home"), 1200);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-8 text-center"
      style={{ background: "linear-gradient(160deg, #fff0f0, #ffe8ea 50%, #fef0e7)" }}>
      
      {adWatched ? (
        <>
          <img src={KIBO.celebrate} alt="Kibo happy" className="w-[150px] h-[150px] object-contain mb-4 drop-shadow-lg" />
          <h1 className="text-[28px] font-black text-foreground mb-2 flex items-center justify-center gap-2">
            Heart Restored! <NotoEmoji name="heart" size={28} />
          </h1>
          <p className="text-muted-foreground text-[15px] mb-4">You're back in the game!</p>
        </>
      ) : (
        <>
          <img src={KIBO.lowStreak} alt="Kibo sad" className="w-[150px] h-[150px] object-contain mb-4 drop-shadow-lg" />
          
          <h1 className="text-[28px] font-black text-foreground mb-2 flex items-center justify-center gap-2">
            Out of Hearts! <NotoEmoji name="heartBroken" size={28} />
          </h1>
          <p className="text-muted-foreground text-[15px] mb-6 max-w-[260px]">
            You've used all 3 hearts. Take a break and come back when they refill!
          </p>

          {/* Watch Ad for Heart button */}
          {!adWatched && (
            <button onClick={handleWatchAd} disabled={watchingAd}
              className="w-full py-4 bg-kibo-green text-primary-foreground rounded-2xl font-black text-base mb-3 kibo-shadow active:translate-y-[3px] active:shadow-none transition-all disabled:opacity-60 flex items-center justify-center gap-2">
              {watchingAd ? (
                <>
                  <NotoEmoji name="hourglass" size={18} />
                  {AD_CONFIG.enabled ? "Watching ad..." : "Loading..."}
                </>
              ) : (
                <>
                  <NotoEmoji name="play" size={18} /> Watch Ad for 1 <NotoEmoji name="heart" size={18} />
                </>
              )}
            </button>
          )}

          {/* Timer */}
          <div className="bg-card rounded-2xl p-6 w-full mb-6 card-shadow border-[1.5px] border-destructive/20">
            <div className="text-sm font-extrabold text-muted-foreground mb-2 uppercase tracking-wide">Hearts refill in</div>
            <div className="text-[36px] font-black text-destructive tabular-nums">
              {formatTime(time)}
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {[0, 1, 2].map(i => (
                <NotoEmoji key={i} name="heartEmpty" size={28} />
              ))}
            </div>
          </div>

          {/* Tips while waiting */}
          <div className="bg-card rounded-2xl p-4 w-full card-shadow mb-6">
            <div className="text-sm font-extrabold text-foreground mb-2 flex items-center gap-1.5">
              <NotoEmoji name="lightbulb" size={16} /> While you wait...
            </div>
            <ul className="text-[13px] text-muted-foreground text-left space-y-1.5">
              <li className="flex items-center gap-1.5"><NotoEmoji name="book" size={14} /> Review what you learned today</li>
              <li className="flex items-center gap-1.5"><NotoEmoji name="fire" size={14} /> Your streak is at <b className="text-kibo-orange">{progress.streak} days</b></li>
              <li className="flex items-center gap-1.5"><NotoEmoji name="lightning" size={14} /> You've earned <b className="text-kibo-gold">{progress.xp} XP</b> total</li>
            </ul>
          </div>

          <button onClick={() => setScreen("home")}
            className="w-full py-4 bg-muted text-muted-foreground rounded-2xl font-black text-base transition-all">
            Back to Home
          </button>
        </>
      )}
    </div>
  );
};

export default HeartsDepletedScreen;
