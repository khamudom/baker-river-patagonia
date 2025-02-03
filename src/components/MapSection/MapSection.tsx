import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import riverGeoJson from "./riverBakerGeoJson";
import styles from "./MapSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export const MapSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  // ✅ Staggered animation: Title first, then Map + Caption together
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=200",
          toggleActions: "play none none reverse",
        },
      });

      // Title animates first
      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })
        // Map + Caption animate together
        .from(
          contentContainerRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8" // Starts slightly before the title animation finishes
        );
    }, sectionRef);

    return () => ctx.revert(); // ✅ Cleanup on unmount
  }, []);

  // ✅ Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = L.map(mapContainer.current, {
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.current);

    const riverLayer = L.geoJSON(riverGeoJson, {
      style: {
        color: "#0077cc",
        weight: 5,
        opacity: 0.8,
      },
    }).addTo(map.current);

    map.current.fitBounds(riverLayer.getBounds());

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.mapSection}>
      {/* Title */}
      <div>
        <h2 ref={titleRef} className={styles.title}>
          Locating the Baker
        </h2>
      </div>

      {/* Content Container (Map + Caption together) */}
      <div ref={contentContainerRef} className={styles.contentContainer}>
        <div ref={mapContainer} className={styles.map} />
        <figcaption className={styles.caption}>
          <p>
            Follow the winding path of the Baker River, a lifeline of Chilean
            Patagonia, as it carves through stunning landscapes. This map
            highlights key points of interest along the river, sharing its rich
            history, ecological significance, and the stories of those who live
            alongside its banks. Explore and uncover the journey of one of the
            region's most iconic rivers.
          </p>
        </figcaption>
      </div>
    </section>
  );
};

export default MapSection;
