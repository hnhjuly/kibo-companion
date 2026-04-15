import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Unregister service workers in iframe/preview contexts to prevent stale caching
const isInIframe = (() => {
  try { return window.self !== window.top; } catch { return true; }
})();
const isPreviewHost =
  window.location.hostname.includes("id-preview--") ||
  window.location.hostname.includes("lovableproject.com");
if (isPreviewHost || isInIframe) {
  navigator.serviceWorker?.getRegistrations().then((regs) =>
    regs.forEach((r) => r.unregister())
  );
}

// Preload mascot images for instant rendering
import kiboHappy from "@/assets/kibo-happy.png";
import kiboSmile from "@/assets/kibo-smile.png";
import kiboWave from "@/assets/kibo-wave.png";
import kiboSurprised from "@/assets/kibo-surprised.png";
import kiboThinking from "@/assets/kibo-thinking.png";
import kiboCelebrate from "@/assets/kibo-celebrate.png";
import kiboBg from "@/assets/kibo-bg.png";
import kiboSad from "@/assets/kibo-sad.png";
import kiboShocked from "@/assets/kibo-shocked.png";
import kiboThumbsup from "@/assets/kibo-thumbsup.png";
import kiboTrophy from "@/assets/kibo-trophy.png";
import kibo3DayStreak from "@/assets/kibo-3daystreak.png";
import kibo7DayStreak from "@/assets/kibo-7daystreak.png";
import kiboDay30 from "@/assets/kibo-day30.png";
import kiboFreezeStreak from "@/assets/kibo-freezestreak.png";
import kiboStudying from "@/assets/kibo-studying.png";
import kiboLowStreak from "@/assets/kibo-lowstreak.png";
import kiboStreakAtRisk from "@/assets/kibo-streakatrisk.png";
import streakBg1 from "@/assets/streak-bg-1.png";
import streakBg2 from "@/assets/streak-bg-2.png";
import streakBg3 from "@/assets/streak-bg-3.png";
import streakBg4 from "@/assets/streak-bg-4.png";

[kiboHappy, kiboSmile, kiboWave, kiboSurprised, kiboThinking, kiboCelebrate, kiboBg, kiboSad, kiboShocked, kiboThumbsup, kiboTrophy, kibo3DayStreak, kibo7DayStreak, kiboDay30, kiboFreezeStreak, kiboStudying, kiboLowStreak, kiboStreakAtRisk, streakBg1, streakBg2, streakBg3, streakBg4].forEach(src => {
  const img = new Image();
  img.src = src;
});

createRoot(document.getElementById("root")!).render(<App />);
