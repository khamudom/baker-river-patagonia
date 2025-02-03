import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./RiverTimeline.module.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: "8000 BCE",
    description:
      "First evidence of indigenous settlements along the Baker River, with archaeological findings suggesting early fishing and hunting practices.",
  },
  {
    year: "1898",
    description:
      "First documented expedition by European explorers, led by Hans Steffen, who mapped the river's course and noted its strategic importance.",
  },
  {
    year: "1940s",
    description:
      "The first permanent settlements were established along the river, as small farming and fishing communities emerged.",
  },
  {
    year: "1970s",
    description:
      "Early industrial interest in the river begins, with proposals for large-scale hydroelectric projects first being introduced.",
  },
  {
    year: "1990s",
    description:
      "Scientific recognition of the Baker River basin as one of Patagonia's most important freshwater ecosystems, fueling conservation discussions.",
  },
  {
    year: "2007",
    description:
      "HidroAysén, a controversial hydroelectric project proposing five large dams, sparks environmental protests and global activism.",
  },
  {
    year: "2014",
    description:
      "A major victory for conservation: plans for hydroelectric dams are officially canceled, preserving the river's natural flow.",
  },
  {
    year: "Present",
    description:
      "Ongoing conservation efforts continue, with local organizations working to protect the river and promote sustainable tourism.",
  },
];

const RiverTimeline = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      // Unique ID for ScrollTrigger instance
      const scrollTriggerId = "timelineScrollTrigger";

      // Kill existing ScrollTrigger instances with the same ID
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === scrollTriggerId) {
          trigger.kill();
        }
      });

      // Dynamic height for `.timeline`
      if (timelineRef.current) {
        const baseHeight = 120; // Increase for more spacing
        const newHeight = timelineData.length * baseHeight;
        timelineRef.current.style.height = `${newHeight}px`;
      }

      // Dynamic height for `.timelineLine`
      if (lineRef.current && timelineRef.current) {
        lineRef.current.style.height = `${timelineRef.current.scrollHeight}px`;
      }

      // Text animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Ensure the timeline line height is correct
      const lastItem = itemRefs.current[itemRefs.current.length - 1];
      if (lastItem) {
        const lastItemTop = lastItem.offsetTop;
        const lastItemHeight = lastItem.offsetHeight;
        const lineHeight = lastItemTop + lastItemHeight / 2;
        if (lineRef.current) {
          lineRef.current.style.height = `${lineHeight}px`;
        }
      }

      // Main GSAP timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
          id: scrollTriggerId, // Assigning the ID
        },
      });

      // Animate the timeline line
      mainTl.fromTo(
        lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 1, ease: "none" }
      );

      // Timeline items animations
      itemRefs.current.forEach((item, index) => {
        if (item) {
          const dot = item.querySelector(`.${styles.dot}`);
          const content = item.querySelector(`.${styles.timelineContent}`);
          const itemPosition = index / (timelineData.length - 1);

          // Set initial states
          gsap.set(dot, { scale: 0, opacity: 0 });
          gsap.set(content, {
            opacity: 0,
            x: item.classList.contains(styles.left) ? -30 : 30,
          });

          // Add dot animation
          mainTl.add(
            gsap.to(dot, {
              scale: 1,
              opacity: 1,
              duration: 0.1,
              ease: "power1.inOut",
            }),
            itemPosition * 0.8 // Sync dot with timeline line animation
          );

          // Add content animation
          mainTl.add(
            gsap.to(content, {
              opacity: 1,
              x: 0,
              duration: 0.2,
              ease: "power1.out",
            }),
            itemPosition * 0.8 + 0.1 // Slight delay after dot appears
          );
        }
      });

      return () => {
        // Cleanup: Kill all triggers related to this animation
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.id === scrollTriggerId) {
            trigger.kill();
          }
        });
      };
    }
  }, []);

  return (
    <section className={styles.intro}>
      {/* Title */}
      <div>
        <h2 className={styles.title}>A River Through Time</h2>
      </div>
      <div className={styles.container}>
        <p ref={textRef} className={styles.text}>
          The Baker River has been a witness to history for thousands of years.
          From its role in indigenous cultures to European exploration and
          modern conservation battles, this river has shaped and been shaped by
          those who have lived alongside it. Below is a journey through time,
          capturing the key moments that define the story of Chile's most
          powerful river.
        </p>

        <div ref={timelineRef} className={styles.timeline}>
          <div ref={lineRef} className={styles.timelineLine}></div>
          {timelineData.map((item, index) => (
            <div
              key={item.year}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`${styles.timelineItem} ${
                index % 2 === 0 ? styles.left : styles.right
              }`}
              style={{ top: `${(index / (timelineData.length - 1)) * 120}%` }}
            >
              <div className={styles.dot}></div>
              <div className={styles.timelineContent}>
                <div className={styles.year}>{item.year}</div>
                <div className={styles.description}>{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RiverTimeline;
