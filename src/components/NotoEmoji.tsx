import { Icon as IconifyIcon } from "@iconify/react";

// Map friendly names to noto-v1 icon names
const EMOJI_MAP: Record<string, string> = {
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
