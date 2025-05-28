import React from "react";
import Image from "next/image";
import styles from "./GlitchImage.module.css";

interface GlitchImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  onClick?: () => void;
}

export const GlitchImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  onClick,
}: GlitchImageProps) => {
  return (
    <div className={`${styles.glitch} ${className}`} onClick={onClick}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={styles.glitchImage}
      />
      <div className={styles.glitchLayers}>
        <div
          className={styles.glitchLayer}
          style={{ backgroundImage: `url(${src})` }}
        ></div>
        <div
          className={styles.glitchLayer}
          style={{ backgroundImage: `url(${src})` }}
        ></div>
        <div
          className={styles.glitchLayer}
          style={{ backgroundImage: `url(${src})` }}
        ></div>
      </div>
    </div>
  );
};
