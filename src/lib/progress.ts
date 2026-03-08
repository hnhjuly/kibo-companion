const STORAGE_KEY = "kibo_progress";

export type UserGoal = "work" | "study" | "build" | "curious" | null;

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  hearts: number;
  heartsDepletedAt: number | null; // timestamp when hearts hit 0
  completedLessons: string[];
  totalCorrect: number;
  totalAnswered: number;
  dailyTasksDone: number;
  freezesAvailable: number;
  goal: UserGoal;
}

const HEARTS_MAX = 3;
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
    totalAnswered: 0,
    dailyTasksDone: 0,
    freezesAvailable: 1,
  };
}

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const data = JSON.parse(raw) as UserProgress;
    // Validate streak on load
    const today = getToday();
    const yesterday = getYesterday();
    if (data.lastActiveDate !== today && data.lastActiveDate !== yesterday) {
      // Streak broken (missed more than 1 day)
      data.streak = 0;
      data.dailyTasksDone = 0;
    }
    if (data.lastActiveDate !== today) {
      data.dailyTasksDone = 0;
    }
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
  if (progress.lastActiveDate === yesterday || progress.lastActiveDate === "") {
    updated.streak = progress.streak + 1;
  } else {
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
