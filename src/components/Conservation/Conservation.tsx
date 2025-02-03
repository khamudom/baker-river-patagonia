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
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    title: "Modern Architecture",
    description:
      "Contemporary design meets urban living in this stunning architectural masterpiece.",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    title: "Interior Design",
    description:
      "Minimalist aesthetics create a sense of calm and sophistication.",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    title: "Living Spaces",
    description:
      "Where comfort meets style in thoughtfully designed environments.",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    title: "Urban Living",
    description:
      "City life reimagined through innovative architectural solutions.",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    title: "Design Details",
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
      const scrollDistance = (galleryHeight - viewportHeight) * 1.08;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 5%",
          end: `+=${scrollDistance}`,
          pin: containerRef.current,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
          markers: true, // Remove this in production
        },
      });

      tl.to(galleryRef.current, {
        y: -scrollDistance,
        ease: "power2.inOut",
      });
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
