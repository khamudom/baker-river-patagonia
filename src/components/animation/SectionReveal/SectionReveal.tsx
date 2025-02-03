import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./SectionReveal.module.css";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface RevealSectionProps {
  title: string;
  children: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  className?: string;
}

const SectionReveal = ({
  title,
  children,
  imageSrc,
  imageAlt = "",
  imageCaption,
  className = "",
}: RevealSectionProps) => {
  // Refs for animation targets
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Setup GSAP animations using useGSAP hook
  useGSAP(
    () => {
      // Content animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
              id: "contentTrigger",
            },
          }
        );
      }

      // Image animation (only if image is present)
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.1 },
          {
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              id: "imageTrigger",
            },
          }
        );
      }
    },
    { scope: sectionRef } // Scope animations to this component
  );

  return (
    <section
      ref={sectionRef}
      className={`${styles.revealSection} ${className}`}
    >
      <div className={styles.container}>
        {imageSrc && (
          <div className={styles.imageContainer}>
            <img
              ref={imageRef}
              src={imageSrc}
              alt={imageAlt}
              className={styles.mainImage}
            />
            {imageCaption && <p className={styles.caption}>{imageCaption}</p>}
          </div>
        )}

        <div ref={contentRef} className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
};

export default SectionReveal;
