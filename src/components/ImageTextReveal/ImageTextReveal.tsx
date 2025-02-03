import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./ImageTextReveal.module.css";

gsap.registerPlugin(ScrollTrigger);

// Sample data - you can replace with your own
const contentData = [
  {
    id: 1,
    image: "/api/placeholder/800/600",
    title: "Mountain Landscapes",
    description:
      "Majestic peaks reaching into the clouds, where the air is crisp and the views are breathtaking.",
  },
  {
    id: 2,
    image: "/api/placeholder/800/600",
    title: "Ocean Depths",
    description:
      "Mysterious underwater worlds teeming with life and color in the deep blue seas.",
  },
  {
    id: 3,
    image: "/api/placeholder/800/600",
    title: "Desert Horizons",
    description:
      "Endless golden dunes shaped by wind and time, creating nature's most impressive sculptures.",
  },
];

const ImageTextReveal = () => {
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize refs arrays
      sectionRefs.current = sectionRefs.current.slice(0, contentData.length);
      imageRefs.current = imageRefs.current.slice(0, contentData.length);
      textRefs.current = textRefs.current.slice(0, contentData.length);

      // Create animations for each section
      sectionRefs.current.forEach((sectionRef, index) => {
        if (
          !sectionRef ||
          !imageRefs.current[index] ||
          !textRefs.current[index]
        )
          return;

        // Set initial states
        gsap.set(imageRefs.current[index], {
          y: 100,
          opacity: 0,
          xPercent: -50,
          left: "50%", // Start centered
        });

        gsap.set(textRefs.current[index], {
          opacity: 0,
          x: -50,
        });

        // Create timeline for this section
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef,
            start: "top 60%",
            end: "top 20%",
            toggleActions: "play none none reverse",
            id: `imageTextRevealTrigger-${index}`,
          },
        });

        // Animation sequence
        timeline
          // First: Fade in image from bottom while centered
          .to(imageRefs.current[index], {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          })
          // Then: Move image to the left
          .to(imageRefs.current[index], {
            xPercent: 0,
            left: "0%",
            duration: 0.8,
            ease: "power2.inOut",
          })
          // Finally: Reveal text
          .to(
            textRefs.current[index],
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4"
          );
      });
    });

    // Cleanup function
    return () => {
      contentData.forEach((_, index) => {
        ScrollTrigger.getById(`imageTextRevealTrigger-${index}`)?.kill();
      });
      ctx.revert();
    };
  }, []);

  return (
    <div className={styles.sections}>
      {contentData.map((content, index) => (
        <div
          key={content.id}
          ref={(el) => (sectionRefs.current[index] = el)}
          className={styles.section}
        >
          <div className={styles.container}>
            <div className={styles.contentWrapper}>
              {/* Image Container */}
              <div
                ref={(el) => (imageRefs.current[index] = el)}
                className={styles.imageContainer}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={content.image}
                    alt={content.title}
                    className={styles.image}
                  />
                </div>
              </div>

              {/* Text Container */}
              <div
                ref={(el) => (textRefs.current[index] = el)}
                className={styles.textContainer}
              >
                <div className={styles.textContent}>
                  <h2 className={styles.heading}>{content.title}</h2>
                  <p className={styles.paragraph}>{content.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageTextReveal;
