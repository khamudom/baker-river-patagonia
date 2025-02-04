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
}

const formatVideoUrl = (videoUrl: string) => {
  try {
    const url = new URL(videoUrl);
    let videoId = "";

    if (url.hostname.includes("youtube.com")) {
      videoId = url.searchParams.get("v") || ""; // Extracts ID from watch?v=
    } else if (url.hostname.includes("youtu.be")) {
      videoId = url.pathname.substring(1); // Extracts ID from short link
    }

    if (!videoId) return videoUrl; // If no valid video ID, return original URL

    return `https://www.youtube.com/embed/${videoId}`; // Returns clean embed URL
  } catch {
    console.error("Invalid video URL:", videoUrl);
    return videoUrl;
  }
};

export const ScrollVideo = ({
  imgSrc,
  videoUrl,
  title,
  subtitle,
}: ScrollVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !mediaWrapperRef.current ||
        !contentRef.current ||
        !titleRef.current ||
        !subtitleRef.current
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
          // markers: true,
        },
      });

      tl.to(mediaWrapperRef.current, {
        yPercent: -50,
        ease: "none",
      }).to(
        contentRef.current,
        {
          opacity: 0,
        },
        "<"
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className={styles.section}>
      <div ref={mediaWrapperRef} className={styles.mediaWrapper}>
        {videoUrl ? (
          videoUrl.includes("youtube.com") || videoUrl.includes("vimeo.com") ? (
            <iframe
              className={styles.media}
              src={formatVideoUrl(videoUrl)}
              title="Embedded Video"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <video className={styles.media} playsInline muted autoPlay loop>
              <source src={videoUrl} type="video/mp4" />
            </video>
          )
        ) : (
          <img src={imgSrc} alt="Hero background" className={styles.media} />
        )}
        <div className={styles.overlay} />
      </div>
      <div ref={contentRef} className={styles.content}>
        {title && <h1 ref={titleRef}>{title}</h1>}
        {subtitle && <h2 ref={subtitleRef}>{subtitle}</h2>}
      </div>
      <div className={styles.scrollIcon}>
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default ScrollVideo;
