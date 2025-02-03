import { Github, Twitter, Facebook, Instagram } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>About</h3>
            <p className={styles.text}>
              The Baker River Project is dedicated to preserving and protecting
              one of Patagonia's most important waterways through education,
              conservation, and community engagement.
            </p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.title}>Contact</h3>
            <ul className={styles.list}>
              <li>Email: info@bakerriver.org</li>
              <li>Phone: +56 2 2123 4567</li>
              <li>Address: Cochrane, Aysén Region, Chile</li>
            </ul>
          </div>
          <div className={styles.section}>
            <h3 className={styles.title}>Follow Us</h3>
            <div className={styles.social}>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Baker River Project. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
