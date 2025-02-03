import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollReveal.module.css";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
  delay?: number;
  duration?: number;
  once?: boolean;
  triggerPosition?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = "bottom",
  delay = 0,
  duration = 1.2,
  once = false,
  triggerPosition = "top center+=300",
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null | undefined>(null); // ✅ Fix applied

  // Helper function for offsets
  const getOffset = (dir: string) => {
    switch (dir) {
      case "left":
        return { x: -100, y: 0 };
      case "right":
        return { x: 100, y: 0 };
      case "top":
        return { x: 0, y: -100 };
      case "bottom":
        return { x: 0, y: 100 };
      default:
        return { x: 0, y: 0 };
    }
  };

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    const { x, y } = getOffset(direction);

    const ctx = gsap.context(() => {
      const animation = gsap.fromTo(
        elementRef.current,
        { x, y, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elementRef.current,
            start: triggerPosition,
            end: "bottom center",
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
            onUpdate: (self) => {
              if (self.progress === 0 && !once) {
                gsap.set(elementRef.current, { opacity: 0, x, y });
              }
            },
          },
        }
      );

      // Store ScrollTrigger instance
      scrollTriggerRef.current = animation.scrollTrigger;
    }, elementRef);

    return () => {
      // Cleanup ScrollTrigger safely
      scrollTriggerRef.current?.kill();
      ctx.revert();
    };
  }, [direction, delay, duration, once, triggerPosition]);

  return (
    <div ref={elementRef} className={styles.reveal}>
      {children}
    </div>
  );
};

export default ScrollReveal;
