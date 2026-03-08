import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Preload mascot images for instant rendering
import kiboHappy from "@/assets/kibo-happy.png";
import kiboSmile from "@/assets/kibo-smile.png";
import kiboWave from "@/assets/kibo-wave.png";
import kiboSurprised from "@/assets/kibo-surprised.png";
import kiboThinking from "@/assets/kibo-thinking.png";
import kiboCelebrate from "@/assets/kibo-celebrate.png";
import kiboBg from "@/assets/kibo-bg.png";

[kiboHappy, kiboSmile, kiboWave, kiboSurprised, kiboThinking, kiboCelebrate, kiboBg].forEach(src => {
  const img = new Image();
  img.src = src;
});

createRoot(document.getElementById("root")!).render(<App />);
