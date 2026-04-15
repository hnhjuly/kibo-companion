const STORAGE_KEY = "kibo_progress";

export type UserGoal = "work" | "study" | "build" | "curious" | null;

export interface ActivityEntry {
  text: string;
  xp: number;
  time: string; // ISO timestamp
  type: "lesson" | "game" | "badge" | "streak" | "daily";
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  bestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  hearts: number;
  heartsDepletedAt: number | null; // timestamp when hearts hit 0
  completedLessons: string[];
  totalCorrect: number;
  totalAnswered: number;
  dailyTasksDone: number;
  freezesAvailable: number;
  goal: UserGoal;
  // History tracking for real dashboard
  dailyXP: Record<string, number>; // { "2026-04-15": 80 }
  activeDates: string[]; // ["2026-04-14", "2026-04-15"]
  activityLog: ActivityEntry[];
  lessonAccuracy: Record<string, { correct: number; total: number }>; // per lessonId
  gameScores: {
    speed: { date: string; score: number }[];
    flash: { date: string; score: number }[];
    daily: { date: string; score: number }[];
    pairs: { date: string; score: number }[];
  };
}

const HEARTS_MAX = 6;
const HEARTS_COOLDOWN_MS = 2 * 60 * 1000; // 2 minutes
const XP_PER_LEVEL = 300;

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function defaultProgress(): UserProgress {
  return {
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: "",
    hearts: HEARTS_MAX,
    heartsDepletedAt: null,
    completedLessons: [],
    totalCorrect: 0,
    goal: null,
    totalAnswered: 0,
    dailyTasksDone: 0,
    freezesAvailable: 1,
  };
}

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw);
    // Merge with defaults to handle missing fields gracefully
    const data: UserProgress = { ...defaultProgress(), ...parsed };
    // Ensure completedLessons is always a valid array (never lose lesson progress)
    if (!Array.isArray(data.completedLessons)) {
      data.completedLessons = [];
    }
    // --- STREAK VALIDATION ON LOAD ---
    const today = getToday();
    const yesterday = getYesterday();

    if (data.lastActiveDate === today) {
      // Active today — nothing to do
    } else if (data.lastActiveDate === yesterday) {
      // Was active yesterday — streak still alive, just reset daily tasks
      data.dailyTasksDone = 0;
    } else if (data.lastActiveDate === '') {
      // Brand new user — do not touch streak, it starts at 0
      data.dailyTasksDone = 0;
    } else {
      // Missed at least 2 days
      const last = new Date(data.lastActiveDate);
      const now = new Date(today);
      const diffMs = now.getTime() - last.getTime();
      const daysSince = Math.round(diffMs / (1000 * 60 * 60 * 24));

      if (daysSince === 2 && (data.freezesAvailable ?? 0) > 0) {
        // Missed exactly 1 day AND has a freeze — use it
        data.freezesAvailable = data.freezesAvailable - 1;
        data.lastActiveDate = today;
        data.dailyTasksDone = 0;
        // streak stays intact
      } else {
        // Missed 2+ days or no freeze — reset
        data.streak = 0;
        data.dailyTasksDone = 0;
      }
    }
    // --- END STREAK VALIDATION ---
    // Check heart regen
    if (data.heartsDepletedAt) {
      const elapsed = Date.now() - data.heartsDepletedAt;
      if (elapsed >= HEARTS_COOLDOWN_MS) {
        data.hearts = HEARTS_MAX;
        data.heartsDepletedAt = null;
      }
    }
    return data;
  } catch {
    // If parsing fails, try to salvage completedLessons from raw data
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const partial = JSON.parse(raw);
        const fresh = defaultProgress();
        if (Array.isArray(partial.completedLessons)) {
          fresh.completedLessons = partial.completedLessons;
        }
        return fresh;
      }
    } catch { /* truly corrupted */ }
    return defaultProgress();
  }
}

export function saveProgress(progress: UserProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetProgress(): UserProgress {
  const fresh = defaultProgress();
  localStorage.removeItem(STORAGE_KEY);
  return fresh;
}

export function addXP(progress: UserProgress, amount: number): UserProgress {
  const updated = { ...progress, xp: progress.xp + amount };
  // Level up check
  while (updated.xp >= updated.level * XP_PER_LEVEL) {
    updated.xp -= updated.level * XP_PER_LEVEL;
    updated.level += 1;
  }
  return updated;
}

export function markActive(progress: UserProgress): UserProgress {
  const today = getToday();
  const yesterday = getYesterday();
  if (progress.lastActiveDate === today) return progress;
  const updated = { ...progress, lastActiveDate: today };
  if (progress.lastActiveDate === yesterday) {
    updated.streak = progress.streak + 1;
  } else if (progress.lastActiveDate === "") {
    // First ever activity — start streak at 1
    updated.streak = 1;
  }
  return updated;
}

export function loseHeart(progress: UserProgress): UserProgress {
  const newHearts = Math.max(0, progress.hearts - 1);
  return {
    ...progress,
    hearts: newHearts,
    heartsDepletedAt: newHearts === 0 ? Date.now() : progress.heartsDepletedAt,
  };
}

/** Restore 1 heart (e.g. after watching a rewarded ad) */
export function restoreHeart(progress: UserProgress): UserProgress {
  if (progress.hearts >= HEARTS_MAX) return progress;
  const newHearts = progress.hearts + 1;
  return {
    ...progress,
    hearts: newHearts,
    heartsDepletedAt: newHearts > 0 ? null : progress.heartsDepletedAt,
  };
}

export function completeLesson(progress: UserProgress, lessonId: string, xpEarned: number, correctCount: number, totalCount: number): UserProgress {
  let updated = { ...progress };
  if (!updated.completedLessons.includes(lessonId)) {
    updated.completedLessons = [...updated.completedLessons, lessonId];
  }
  updated.totalCorrect += correctCount;
  updated.totalAnswered += totalCount;
  updated.dailyTasksDone += 1;
  updated = addXP(updated, xpEarned);
  updated = markActive(updated);
  return updated;
}

export function getHeartsTimeRemaining(progress: UserProgress): number {
  if (!progress.heartsDepletedAt || progress.hearts > 0) return 0;
  const remaining = HEARTS_COOLDOWN_MS - (Date.now() - progress.heartsDepletedAt);
  return Math.max(0, remaining);
}

export function useFreeze(progress: UserProgress): UserProgress {
  if (progress.freezesAvailable <= 0) return progress;
  return {
    ...progress,
    freezesAvailable: progress.freezesAvailable - 1,
    // Freeze preserves streak for today without doing a lesson
    lastActiveDate: getToday(),
  };
}

export function getXPForLevel(level: number): number {
  return level * XP_PER_LEVEL;
}

export { HEARTS_MAX, HEARTS_COOLDOWN_MS };
