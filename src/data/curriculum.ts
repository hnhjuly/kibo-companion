import kiboHappy from "@/assets/kibo-happy.png";
import kiboSmile from "@/assets/kibo-smile.png";
import kiboWave from "@/assets/kibo-wave.png";
import kiboSurprised from "@/assets/kibo-surprised.png";
import kiboThinking from "@/assets/kibo-thinking.png";
import kiboCelebrate from "@/assets/kibo-celebrate.png";
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
import kiboCelebration2 from "@/assets/kibo-celebration2.png";
import kiboGraduate from "@/assets/kibo-graduate.png";
import kiboGraduate2 from "@/assets/kibo-graduate2.png";
import kiboFocusedIpad from "@/assets/kibo-focused-ipad.png";
import kiboFocusedLaptop from "@/assets/kibo-focused-laptop.png";
import kiboRobotics from "@/assets/kibo-robotics.png";
import kiboDetective from "@/assets/kibo-detective.png";
import kiboSad2 from "@/assets/kibo-sad2.png";

import { level1 } from "./levels/level1";
import { level2 } from "./levels/level2";
import { level3 } from "./levels/level3";
import { level4 } from "./levels/level4";
import { level5 } from "./levels/level5";
import { level6 } from "./levels/level6";
import { level7 } from "./levels/level7";

export type { Question, Lesson, Level, Curriculum } from "./curriculumTypes";
import type { Curriculum } from "./curriculumTypes";

export const KIBO = {
  happy: kiboHappy, neutral: kiboSmile, wave: kiboWave, surprised: kiboSurprised,
  thinking: kiboThinking, celebrate: kiboCelebrate, focused: kiboStudying, sad: kiboSad,
  shocked: kiboShocked, thumbsup: kiboThumbsup, trophy: kiboTrophy, streak3: kibo3DayStreak,
  streak7: kibo7DayStreak, streak30: kiboDay30, freezeStreak: kiboFreezeStreak,
  studying: kiboStudying, lowStreak: kiboLowStreak, streakAtRisk: kiboStreakAtRisk,
  celebration2: kiboCelebration2, graduate: kiboGraduate, graduate2: kiboGraduate2,
  focusedIpad: kiboFocusedIpad, focusedLaptop: kiboFocusedLaptop, robotics: kiboRobotics,
  detective: kiboDetective, sad2: kiboSad2,
};

export const CURRICULUM: Curriculum = {
  levels: [level1, level2, level3, level4, level5, level6, level7]
};
