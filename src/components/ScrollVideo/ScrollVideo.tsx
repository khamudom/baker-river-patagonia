import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import styles from "./ScrollVideo.module.css";

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoProps {
  imgSrc?: string;
  videoUrl?: string;
  title?: string;
  subtitle?: string;
  overlayColor?: string;
}

export const ScrollVideo = ({
  imgSrc,
  videoUrl,
  title,
  subtitle,
  overlayColor = "rgba(0, 0, 0, 0.2)",
}: ScrollVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !mediaWrapperRef.current ||
        !contentRef.current
      )
        return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: false, // Prevents GSAP from adding extra spacing
          anticipatePin: 1,
          id: "scrollVideoTrigger",
        },
      });

      tl.to(mediaWrapperRef.current, {
        yPercent: -50,
        opacity: 0,
        ease: "none",
      }).to(
        contentRef.current,
        {
          yPercent: -100,
          opacity: 0,
          ease: "power2.out",
        },
        "<"
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={styles.section}>
      <div ref={mediaWrapperRef} className={styles.mediaWrapper}>
        {videoUrl ? (
          <video className={styles.media} playsInline muted autoPlay loop>
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img src={imgSrc} alt="Hero background" className={styles.media} />
        )}
        <div
          className={styles.overlay}
          style={{ backgroundColor: overlayColor }}
        />
      </div>
      <div ref={contentRef} className={styles.content}>
        {title && <h1>{title}</h1>}
        {subtitle && <h2>{subtitle}</h2>}
      </div>
      <div className={styles.scrollIcon}>
        <ChevronDown size={32} />
      </div>
    </div>
  );
};

export default ScrollVideo;
