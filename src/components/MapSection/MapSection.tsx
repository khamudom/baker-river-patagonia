import { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import riverGeoJson from "./riverBakerGeoJson";
import { SectionReveal } from "../animation/SectionReveal";
import styles from "./MapSection.module.css";

export const MapSection = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

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
    <SectionReveal className={styles.mapSection}>
      <div className={styles.contentContainer}>
        <p>
          The Baker River, located in Chilean Patagonia's Aysén Region, is
          renowned for its stunning turquoise-blue waters, a result of glacial
          sediments from the Northern Patagonian Ice Field. Spanning
          approximately 200 kilometers, it stands as Chile's most voluminous
          river.
        </p>
        <div ref={mapContainerRef} className={styles.map} />
        <figcaption className={styles.caption}>
          <p>
            Follow the winding path of the Baker River, a lifeline of Chilean
            Patagonia, as it carves through stunning landscapes. This map
            highlights key points of interest along the river, sharing its rich
            history, ecological significance, and the stories of those who live
            alongside its banks.
          </p>
        </figcaption>
      </div>
    </SectionReveal>
  );
};

export default MapSection;
