import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquare as ImageSquare } from "lucide-react";
import { imageData } from "./SideImageLayoutData";
import styles from "./SideImageLayout.module.css";

gsap.registerPlugin(ScrollTrigger);

export const SideImageLayout = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement[]>([]);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  useGSAP(
    () => {
      // Animate header with a slight delay
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out",
      });

      // Animate articles
      articlesRef.current.forEach((article) => {
        // Create a timeline for each article
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: article,
            start: "top bottom-=100",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        });

        // Animate the article container
        tl.fromTo(
          article,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }
        );

        // Animate the image scale
        const image = article.querySelector("img");
        const placeholder = article.querySelector(`.${styles.placeholder}`);
        const target = imageErrors[parseInt(article.dataset.imageId || "0")]
          ? placeholder
          : image;

        if (target) {
          tl.fromTo(
            target,
            {
              scale: 1.2,
            },
            {
              scale: 1,
              duration: 1.5,
              ease: "power2.out",
            },
            "-=1"
          );
        }
      });
    },
    { scope: containerRef }
  ); // Scope the animations to the container

  const handleImageError = (imageId: number) => {
    setImageErrors((prev) => ({ ...prev, [imageId]: true }));
  };

  return (
    <section className={styles.gallery}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.editorial}>
          {imageData.map((item, index) => (
            <article
              key={item.id}
              ref={(el) => (articlesRef.current[index] = el as HTMLDivElement)}
              className={styles.article}
              data-image-id={item.id}
            >
              <div className={styles.imageWrapper}>
                {imageErrors[item.id] ? (
                  <div className={styles.placeholder}>
                    <ImageSquare size={48} />
                    <span>Image Unavailable</span>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className={styles.image}
                    loading="lazy"
                    onError={() => handleImageError(item.id)}
                  />
                )}
              </div>
              <div className={styles.content}>
                <h2 className={styles.imageTitle}>{item.title}</h2>
                <p className={styles.imageDescription}>{item.description}</p>
                {/* <div className={styles.meta}>Photography • Patagonia</div> */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SideImageLayout;
