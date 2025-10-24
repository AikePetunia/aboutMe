/**
 * Discord activity image URLs
 * @param appId Application ID for the activity
 * @param key Image key from Discord
 * @returns Full image URL or null if not available
 */
export function resolveActivityImage(appId: string, key?: string | null) {
  if (!key) return null;
  if (key.startsWith("http")) return key;
  if (key.startsWith("mp:"))
    return "https://media.discordapp.net/" + key.slice(3);
  return `https://cdn.discordapp.com/app-assets/${appId}/${key}.png`;
}

/**
 *  Discord emoji URL
 * @param emoji Emoji object from Discord
 * @returns Full emoji URL or null if not available
 */
export function resolveEmojiUrl(emoji: { id?: string; animated?: boolean }) {
  if (!emoji?.id) return null; // For Unicode emojis (no ID)
  const ext = emoji.animated ? "gif" : "png";
  return `https://cdn.discordapp.com/emojis/${emoji.id}.${ext}?v=1`;
}

/**
 * Formats time display from timestamps
 * @param start Start timestamp in ms
 * @param end End timestamp in ms (optional)
 * @returns Formatted time string (e.g. "5:23" or "1:05:23")
 */
export function formatTimeDisplay(start?: number, end?: number): string {
  if (!start) return "";

  const now = Date.now();
  const endTime = end || now;
  const durationMs = endTime - start;
  const seconds = Math.floor((durationMs / 1000) % 60);
  const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
  const hours = Math.floor(durationMs / (1000 * 60 * 60));

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

/**
 * Formats music player time display with progress calculation
 * @param start Start timestamp in ms
 * @param end End timestamp in ms
 * @returns Object with current time, total time, and progress percentage
 */
export function formatMusicTime(
  start?: number,
  end?: number
): { current: string; total: string; progress: number } {
  if (!start || !end) return { current: "0:00", total: "0:00", progress: 0 };

  const now = Date.now();
  const totalDuration = end - start;
  const currentPosition = now - start;

  const progress = Math.min(
    Math.max((currentPosition / totalDuration) * 100, 0),
    100
  );

  return {
    current: formatTimeDisplay(start, now),
    total: formatTimeDisplay(start, end),
    progress,
  };
}
