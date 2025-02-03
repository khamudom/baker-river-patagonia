import { memo } from "react";
import styles from "./Conservation.module.css";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

interface GalleryImageProps {
  image: GalleryImage;
  index: number;
}

export const GalleryImage = memo<GalleryImageProps>(({ image, index }) => (
  <div className={styles.imageWrapper}>
    <img
      src={image.url}
      alt={image.title}
      loading={index > 1 ? "lazy" : undefined}
      className={styles.image}
    />
  </div>
));

GalleryImage.displayName = "GalleryImage";
