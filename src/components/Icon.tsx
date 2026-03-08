import { ICONS } from "@/assets/icons";

type IconName = keyof typeof ICONS;

interface IconProps {
  name: IconName;
  size?: number | string;
  className?: string;
  alt?: string;
}

/** Inline custom icon replacement for text emojis */
const Icon = ({ name, size = 20, className = "", alt }: IconProps) => (
  <img
    src={ICONS[name]}
    alt={alt || name}
    className={`inline-block object-contain ${className}`}
    style={{ width: typeof size === "number" ? `${size}px` : size, height: typeof size === "number" ? `${size}px` : size }}
    draggable={false}
  />
);

export default Icon;
