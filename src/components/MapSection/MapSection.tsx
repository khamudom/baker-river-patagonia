import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import riverGeoJson from "./riverBakerGeoJson";
import styles from "./MapSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export const MapSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center+=200",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(titleRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
        }).from(
          contentContainerRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        );
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  // Initialize Leaflet Map only once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapContainerRef.current, {
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance.current);

    const riverLayer = L.geoJSON(riverGeoJson, {
      style: {
        color: "#0077cc",
        weight: 5,
        opacity: 0.8,
      },
    }).addTo(mapInstance.current);

    mapInstance.current.fitBounds(riverLayer.getBounds());

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
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
        <div ref={mapContainerRef} className={styles.map} />
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
