import { useRef, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { GalleryImage } from "./ConservationGallery";
import styles from "./Conservation.module.css";

gsap.registerPlugin(ScrollTrigger);

const gallery = [
  {
    id: "1",
    url: "/images/conservation/Map-of-the-Patagonian-ice-001.webp",
    description:
      "Contemporary design meets urban living in this stunning architectural masterpiece.",
  },
  {
    id: "2",
    url: "/images/conservation/iLCP-Rave--Hydroaysen-dam-001.webp",
    description:
      "Contemporary design meets urban living in this stunning architectural masterpiece.",
  },
  {
    id: "3",
    url: "/images/conservation/iLCP-Rave--Hydroaysen-dam-008.webp",
    description:
      "Minimalist aesthetics create a sense of calm and sophistication.",
  },
  {
    id: "4",
    url: "/images/conservation/iLCP-Rave--Hydroaysen-dam-009.webp",
    description:
      "Where comfort meets style in thoughtfully designed environments.",
  },
  {
    id: "5",
    url: "/images/conservation/iLCP-Rave--Hydroaysen-dam-012.webp",
    description:
      "City life reimagined through innovative architectural solutions.",
  },
  {
    id: "6",
    url: "/images/conservation/iLCP-Rave--Hydroaysen-dam-014.webp",
    description:
      "Every element carefully considered to create harmonious spaces.",
  },
  {
    id: "7",
    url: "/images/conservation/Rapid-Assessment-Visual-E-002.webp",
    description:
      "Every element carefully considered to create harmonious spaces.",
  },
  {
    id: "8",
    url: "/images/conservation/Rapid-Assessment-Visual-E-013.webp",
    description:
      "Every element carefully considered to create harmonious spaces.",
  },
  {
    id: "9",
    url: "/images/conservation/Rapid-Assessment-Visual-E-014.webp",
    description:
      "Every element carefully considered to create harmonious spaces.",
  },
  {
    id: "10",
    url: "/images/conservation/Rapid-Assessment-Visual-E-020.webp",
    description:
      "Every element carefully considered to create harmonious spaces.",
  },
  {
    id: "11",
    url: "/images/conservation/Rapid-Assessment-Visual-E-022.webp",
    description:
      "Every element carefully considered to create harmonious spaces.",
  },
];

const Conservation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !galleryRef.current || !containerRef.current)
        return;

      const galleryHeight = galleryRef.current.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollDistance = galleryHeight - viewportHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 0%",
          // end: `+=${scrollDistance}`,
          end: `${galleryHeight}px`,
          pin: containerRef.current,
          // anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });

      tl.fromTo(
        galleryRef.current,
        { y: 0 },
        {
          y: -scrollDistance,
          ease: "none",
          immediateRender: false,
          delay: -0.5,
        }
      );
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={containerRef} className={styles.content}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>
            Conservation Efforts – Protecting the River’s Future
          </h2>
          <p className={styles.description}>
            The Baker River, one of Chile's most powerful and pristine
            waterways, has been at the heart of environmental battles for
            decades. In the early 2000s, a controversial hydroelectric project
            threatened to reshape its natural flow, endangering ecosystems and
            local communities. Thanks to the relentless efforts of
            conservationists, indigenous leaders, and activists, the project was
            ultimately canceled in 2014. Today, organizations like{" "}
            <strong>Patagonia Sin Represas</strong> and{" "}
            <strong>Rewilding Chile</strong> continue to advocate for
            sustainable tourism, wildlife protection, and the long-term
            preservation of this vital river.
          </p>
        </div>
        <div ref={galleryRef} className={styles.gallery}>
          {gallery.map((image, index) => (
            <GalleryImage key={image.id} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Conservation);
