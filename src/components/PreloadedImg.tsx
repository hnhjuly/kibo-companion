import { useState, ImgHTMLAttributes } from "react";

interface PreloadedImgProps extends ImgHTMLAttributes<HTMLImageElement> {}

/** Image that stays invisible until fully loaded, then fades in instantly. 
 *  Prevents the ugly top-to-bottom progressive loading look. */
const PreloadedImg = ({ className = "", style, onLoad, ...props }: PreloadedImgProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      {...props}
      className={`${className} transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}
      style={style}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
};

export default PreloadedImg;
