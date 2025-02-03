import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./styles.module.css";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  imageUrl: string;
  children: React.ReactNode;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  imageUrl,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {/* <div
        ref={imageRef}
        className={styles.parallaxImage}
        style={{ backgroundImage: `url(${imageUrl})` }}
      /> */}
      <img ref={imageRef} className={styles.parallaxImage} src={imageUrl} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default ParallaxSection;
