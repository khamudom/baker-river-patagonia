import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./Header.module.css";

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const prevScrollPos = useRef(window.scrollY);
  const isHidden = useRef(false); // Track hidden state

  useGSAP(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const currentScrollPos = window.scrollY;
        const isScrollingDown = currentScrollPos > prevScrollPos.current;
        prevScrollPos.current = currentScrollPos;

        if (isScrollingDown && currentScrollPos > 50 && !isHidden.current) {
          gsap.set(header, { y: -100 }); // Hide Header
          isHidden.current = true;
        } else if (!isScrollingDown && isHidden.current) {
          gsap.set(header, { y: 0 }); // Show Header
          isHidden.current = false;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <img
        className={styles.logo}
        src="images/patagonia-logo.png"
        alt="Patagonia logo"
      />
    </header>
  );
};

export default Header;
