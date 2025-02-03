import React, { useEffect } from "react";
import Testimonial from "./Testimonial";
import styles from "./TestimonialSection.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonialData = [
  {
    image: "/images/eduardo.webp",
    quote:
      "Each rapid has its own voice. When you learn to listen, the river warns you of changes upstream.",
    name: "Eduardo Campos",
    role: "River Guide",
  },
  {
    image: "/images/maria.webp",
    quote:
      "Our ancestors read these waters like you read books. The knowledge flows through generations.",
    name: "Maria Sepúlveda",
    role: "Indigenous Elder",
  },
  {
    image: "/images/pablo.webp",
    quote:
      "The Baker River is a living force. It gives life, it shapes the land, and it reminds us of nature’s power.",
    name: "Pablo Rojas",
    role: "Environmental Activist",
  },
  {
    image: "/images/sofia.webp",
    quote:
      "Standing at the river’s edge, you feel its pulse—wild, relentless, and full of stories waiting to be told.",
    name: "Sofía Álvarez",
    role: "Photographer & Writer",
  },
  {
    image: "/images/carlos.webp",
    quote:
      "Fishing here is more than a pastime; it’s a dialogue with the river, a lesson in patience and respect.",
    name: "Carlos Méndez",
    role: "Local Fisherman",
  },
  {
    image: "/images/valentina.webp",
    quote:
      "I have traveled the world, but nothing compares to the electric blue of the Baker’s waters. It’s a sight that stays with you forever.",
    name: "Valentina Araya",
    role: "Travel Journalist",
  },
];

export const TestimonialSection: React.FC = () => {
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {testimonialData.map((testimonial, index) => {
          const position = index % 2 === 0 ? "left" : "right";
          return (
            <div
              key={`testimonial-${index}`}
              className={`${styles.testimonialWrapper} ${
                position === "left" ? styles.alignLeft : styles.alignRight
              }`}
            >
              <Testimonial {...testimonial} position={position} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
