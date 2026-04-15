import { Icon as IconifyIcon } from "@iconify/react";

const EMOJI_MAP: Record<string, string> = {
  // Original text emoji replacements
  wave: "noto-v1:waving-hand",
  sparkles: "noto-v1:sparkles",
  sleeping: "noto-v1:sleeping-face",
  crown: "noto-v1:crown",
  flexed: "noto-v1:flexed-biceps",
  party: "noto-v1:party-popper",
  thumbsUp: "noto-v1:thumbs-up",
  briefcase: "noto-v1:briefcase",
  graduationCap: "noto-v1:graduation-cap",
  rocket: "noto-v1:rocket",
  thinking: "noto-v1:thinking-face",
  gear: "noto-v1:gear",
  snowflake: "noto-v1:snowflake",
  // Custom icon replacements
  heart: "noto-v1:red-heart",
  heartBroken: "noto-v1:broken-heart",
  heartEmpty: "noto-v1:white-heart",
  diamond: "noto-v1:gem-stone",
  fire: "noto-v1:fire",
  lightning: "noto-v1:high-voltage",
  trophy: "noto-v1:trophy",
  star: "noto-v1:glowing-star",
  lightbulb: "noto-v1:light-bulb",
  book: "noto-v1:open-book",
  target: "noto-v1:direct-hit",
  pencil: "noto-v1:pencil",
  search: "noto-v1:magnifying-glass-tilted-left",
  checkmark: "noto-v1:check-mark-button",
  play: "noto-v1:play-button",
  graduation: "noto-v1:graduation-cap",
  dna: "noto-v1:dna",
  lock: "noto-v1:locked",
  hourglass: "noto-v1:hourglass-not-done",
  // Game mode icons
  puzzle: "noto:puzzle-piece",
  joker: "noto-v1:flower-playing-cards",
  grimacing: "noto-v1:grimacing-face",
  neutral: "noto-v1:neutral-face",
};

interface NotoEmojiProps {
  name: keyof typeof EMOJI_MAP;
  size?: number;
  className?: string;
}

const NotoEmoji = ({ name, size = 18, className = "" }: NotoEmojiProps) => {
  const icon = EMOJI_MAP[name];
  if (!icon) return null;
  return <IconifyIcon icon={icon} width={size} height={size} className={`inline-block align-middle ${className}`} />;
};

export default NotoEmoji;
