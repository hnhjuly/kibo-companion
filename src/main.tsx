import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const SERVICE_WORKER_CLEANUP_KEY = "kibo-service-worker-cleanup-v2";

const cleanupOldCaches = async () => {
  const registrations = await navigator.serviceWorker?.getRegistrations();
  await Promise.all((registrations ?? []).map((registration) => registration.unregister()));

  const cacheKeys = await window.caches?.keys();
  await Promise.all((cacheKeys ?? []).map((key) => window.caches.delete(key)));

  return (registrations?.length ?? 0) > 0 || (cacheKeys?.length ?? 0) > 0;
};

if (window.localStorage.getItem(SERVICE_WORKER_CLEANUP_KEY) !== "done") {
  void cleanupOldCaches()
    .catch(() => false)
    .then((didCleanup) => {
      window.localStorage.setItem(SERVICE_WORKER_CLEANUP_KEY, "done");

      if (didCleanup) {
        window.location.reload();
      }
    });
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
