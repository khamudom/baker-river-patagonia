// HoverImage.tsx
import { useRef, useLayoutEffect, useId } from "react";
import gsap from "gsap";
import styles from "./HoverImage.module.css";

interface HoverImageProps {
  src: string;
  alt: string;
  description: string;
  width?: number;
  height?: number;
}

const HoverImage = ({
  src,
  alt,
  description,
  width,
  height,
}: HoverImageProps) => {
  // Generate unique ID for this instance
  const componentId = useId().replace(/:/g, "");
  const namespace = `hover-image-${componentId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    // Kill any existing animations in this namespace
    gsap.killTweensOf(`[data-anim="${namespace}"]`);

    const ctx = gsap.context(() => {
      // Create timeline with unique ID
      tlRef.current = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
        id: namespace,
      });

      // Add data attribute for namespace targeting
      [circleRef.current, lineRef.current, descriptionRef.current].forEach(
        (el) => {
          if (el) el.setAttribute("data-anim", namespace);
        }
      );

      // Set initial states
      gsap.set(`[data-anim="${namespace}"]`, {
        opacity: 0,
      });
      gsap.set(circleRef.current, { scale: 0 });
      gsap.set(lineRef.current, { scaleX: 0 });
      gsap.set(descriptionRef.current, { x: 20 });

      // Build the timeline
      tlRef.current
        .to(circleRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
        })
        .to(
          lineRef.current,
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "-=0.1"
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
          },
          "-=0.2"
        );
    }, containerRef);

    return () => {
      // Cleanup context and kill any remaining tweens
      ctx.revert();
      gsap.killTweensOf(`[data-anim="${namespace}"]`);
    };
  }, [namespace]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      tlRef.current?.play();
    };

    const handleMouseLeave = () => {
      tlRef.current?.reverse();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update position with namespace
      gsap.to(`[data-anim="${namespace}"]`, {
        x: (index) => (index === 2 ? x + 100 : x), // description box offset
        y: (index) => (index === 2 ? y - 25 : y), // description box offset
        duration: 0.1,
        overwrite: "auto",
        id: `${namespace}-move`,
      });
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mousemove", handleMouseMove);
      // Kill any remaining tweens on cleanup
      gsap.killTweensOf(`[data-anim="${namespace}"]`);
    };
  }, [namespace]);

  return (
    <div ref={containerRef} className={styles.container}>
      <img
        src={src}
        alt={alt}
        className={styles.image}
        width={width}
        height={height}
      />
      <div ref={circleRef} className={styles.circle} data-anim={namespace} />
      <div ref={lineRef} className={styles.line} data-anim={namespace} />
      <div
        ref={descriptionRef}
        className={styles.description}
        data-anim={namespace}
      >
        {description}
      </div>
    </div>
  );
};

export default HoverImage;
