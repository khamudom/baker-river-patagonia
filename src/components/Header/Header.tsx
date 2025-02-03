import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Show header at the top of the page
      if (currentScrollPos < 100) {
        setIsVisible(true);
        setPrevScrollPos(currentScrollPos);
        return;
      }

      // Determine scroll direction and distance
      const isScrollingDown = currentScrollPos > prevScrollPos;
      const scrollDistance = Math.abs(currentScrollPos - prevScrollPos);

      // Only trigger if scrolled more than 10px to prevent tiny movements
      if (scrollDistance > 10) {
        setIsVisible(!isScrollingDown);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header className={`${styles.header} ${!isVisible ? styles.hidden : ""}`}>
      <img
        className={styles.logo}
        src="images/patagonia-logo.png"
        alt="Patagonia logo"
      />
    </header>
  );
};

export default Header;
