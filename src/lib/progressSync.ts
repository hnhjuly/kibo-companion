import { supabase } from "@/integrations/supabase/client";
import type { UserProgress } from "./progress";

/**
 * Load progress from the cloud for a given user.
 * Returns null if no cloud record exists.
 */
export async function loadCloudProgress(userId: string): Promise<UserProgress | null> {
  const { data, error } = await supabase
    .from("user_progress")
    .select("progress_data")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) return null;
  return data.progress_data as unknown as UserProgress;
}

/**
 * Save progress to the cloud (upsert).
 */
export async function saveCloudProgress(userId: string, progress: UserProgress): Promise<void> {
  await supabase
    .from("user_progress")
    .upsert(
      {
        user_id: userId,
        progress_data: progress as any,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
}

/**
 * Merge local and cloud progress, keeping the richer/more advanced data.
 */
export function mergeProgress(local: UserProgress, cloud: UserProgress): UserProgress {
  // Merge completed lessons (union)
  const completedSet = new Set([
    ...(local.completedLessons || []),
    ...(cloud.completedLessons || []),
  ]);

  // Merge daily XP (sum per day — take max of each day since they're the same user)
  const mergedDailyXP: Record<string, number> = { ...(cloud.dailyXP || {}) };
  for (const [day, xp] of Object.entries(local.dailyXP || {})) {
    mergedDailyXP[day] = Math.max(mergedDailyXP[day] || 0, xp);
  }

  // Merge active dates (union)
  const activeDates = [...new Set([
    ...(local.activeDates || []),
    ...(cloud.activeDates || []),
  ])].sort();

  // Merge activity log (union by time, dedup, keep 50)
  const allActivity = [...(local.activityLog || []), ...(cloud.activityLog || [])];
  const seen = new Set<string>();
  const mergedActivity = allActivity.filter(a => {
    const key = `${a.time}-${a.text}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 50);

  // Merge lesson accuracy (take whichever has more total)
  const mergedAccuracy = { ...(cloud.lessonAccuracy || {}) };
  for (const [id, acc] of Object.entries(local.lessonAccuracy || {})) {
    const existing = mergedAccuracy[id];
    if (!existing || acc.total > existing.total) {
      mergedAccuracy[id] = acc;
    }
  }

  // Merge game scores (union)
  const mergeScores = (a: any[], b: any[]) => {
    const seen = new Set<string>();
    return [...(a || []), ...(b || [])].filter(s => {
      const key = `${s.date}-${s.score}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const localGs = local.gameScores || { speed: [], flash: [], daily: [], pairs: [] };
  const cloudGs = cloud.gameScores || { speed: [], flash: [], daily: [], pairs: [] };

  // Pick the more advanced progress as base
  const base = local.xp + (local.level * 300) >= cloud.xp + (cloud.level * 300) ? local : cloud;

  return {
    ...base,
    completedLessons: Array.from(completedSet),
    totalCorrect: Math.max(local.totalCorrect || 0, cloud.totalCorrect || 0),
    totalAnswered: Math.max(local.totalAnswered || 0, cloud.totalAnswered || 0),
    bestStreak: Math.max(local.bestStreak || 0, cloud.bestStreak || 0),
    dailyXP: mergedDailyXP,
    activeDates,
    activityLog: mergedActivity,
    lessonAccuracy: mergedAccuracy,
    gameScores: {
      speed: mergeScores(localGs.speed, cloudGs.speed),
      flash: mergeScores(localGs.flash, cloudGs.flash),
      daily: mergeScores(localGs.daily, cloudGs.daily),
      pairs: mergeScores(localGs.pairs, cloudGs.pairs),
    },
  };
}
