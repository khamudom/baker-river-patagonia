import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Heart, Mail } from "lucide-react";
import styles from "./CallToAction.module.css";

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className={styles.cta}>
      <div ref={contentRef} className={styles.container}>
        <div className={styles.content}>
          <Heart className={styles.icon} size={48} />
          <h2 className={styles.title}>Help Preserve the Baker River</h2>
          <p className={styles.description}>
            Join us in protecting one of South America's most pristine rivers
            for future generations. Your support can make a difference in
            preserving this natural wonder.
          </p>
          <a
            href="mailto:volunteer@bakerriver.org"
            className={styles.secondaryButton}
          >
            Volunteer <Mail size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
