// Testimonial.tsx
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Testimonial.module.css";

gsap.registerPlugin(ScrollTrigger);

interface TestimonialProps {
  image: string;
  quote: string;
  name: string;
  role: string;
  position: "left" | "right";
}

const Testimonial: React.FC<TestimonialProps> = ({
  image,
  quote,
  name,
  role,
  position,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const personaRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<gsap.core.Tween[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useGSAP(() => {
    const container = containerRef.current;
    const quoteElement = quoteRef.current;
    const personaElement = personaRef.current;

    if (!container || !quoteElement || !personaElement) return;

    // Initial state
    gsap.set([quoteElement, personaElement], {
      opacity: 0,
      x:
        position === "left"
          ? (i) => (i === 0 ? -50 : 50)
          : (i) => (i === 0 ? 50 : -50),
    });

    // Entrance animation
    const entranceAnimation = gsap.to([quoteElement, personaElement], {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.3,
      paused: true,
    });

    // Create ScrollTrigger for entrance
    const entranceScrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top center+=100",
      onEnter: () => entranceAnimation.play(),
      onLeaveBack: () => entranceAnimation.reverse(),
    });

    // Fade effect
    const fadeAnimation = gsap.to(container, {
      opacity: 0,
      paused: true,
      duration: 0.5,
    });

    // Create ScrollTrigger for fade
    const fadeScrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom top",
      onEnter: () => gsap.to(container, { opacity: 1 }),
      onLeave: () => fadeAnimation.play(),
      onEnterBack: () => fadeAnimation.reverse(),
    });

    // Hover animations
    const moveDirection = position === "left" ? -1 : 1;

    const quoteHoverAnimation = gsap.to(quoteElement, {
      x: 10 * moveDirection * -1,
      duration: 0.3,
      ease: "power2.out",
      paused: true,
    });

    const personaHoverAnimation = gsap.to(personaElement, {
      x: 10 * moveDirection,
      duration: 0.3,
      ease: "power2.out",
      paused: true,
    });

    // Store animations for cleanup
    animationsRef.current = [
      entranceAnimation,
      fadeAnimation,
      quoteHoverAnimation,
      personaHoverAnimation,
    ];

    // Store ScrollTriggers for cleanup
    scrollTriggersRef.current = [entranceScrollTrigger, fadeScrollTrigger];

    // Event listeners
    const handleEnter = () => {
      quoteHoverAnimation.play();
      personaHoverAnimation.play();
    };

    const handleLeave = () => {
      quoteHoverAnimation.reverse();
      personaHoverAnimation.reverse();
    };

    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);

    // Cleanup function
    return () => {
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);

      // Kill only our animations
      animationsRef.current.forEach((animation) => {
        if (animation) animation.kill();
      });

      // Kill only our ScrollTriggers
      scrollTriggersRef.current.forEach((trigger) => {
        if (trigger) trigger.kill();
      });
    };
  }, [position]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div
        ref={quoteRef}
        className={`${styles.quoteContainer} ${
          position === "right" ? styles.rightQuote : ""
        }`}
      >
        <blockquote className={styles.quote}>{quote}</blockquote>
      </div>

      <div
        ref={personaRef}
        className={`${styles.personaContainer} ${
          position === "right" ? styles.rightPersona : ""
        }`}
      >
        {position === "left" ? (
          <>
            <div className={styles.imageContainer}>
              <img src={image} alt="" className={styles.image} />
            </div>
            <div className={styles.personaInfo}>
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.role}>{role}</p>
            </div>
          </>
        ) : (
          <>
            <div className={styles.personaInfo}>
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.role}>{role}</p>
            </div>
            <div className={styles.imageContainer}>
              <img src={image} alt="" className={styles.image} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Testimonial);
