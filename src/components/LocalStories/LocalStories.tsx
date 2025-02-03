import { FC } from "react";
import styles from "./LocalStories.module.css";
// import { ScrollReveal } from "../animation/ScrollReveal";

interface Story {
  name: string;
  role: string;
  quote: string;
  image: string;
}

interface LocalStoriesProps {
  stories: Story[];
}

export const LocalStories: FC<LocalStoriesProps> = ({ stories }) => {
  return (
    <section className={styles.storiesSection}>
      <div>
        <h2 className={styles.title}>Voices of the Baker</h2>
      </div>
      {/* <ScrollReveal direction="bottom"> */}
      <div className={styles.storiesGrid}>
        {stories?.map((story) => (
          <div key={story.name} className={styles.storyCard}>
            <div className={styles.content}>
              <blockquote className={styles.quote}>{story.quote}</blockquote>
            </div>
            <div className={styles.imageWrapper}>
              <img
                className={styles.image}
                src={story.image}
                alt={story.name}
              />
              <cite className={styles.caption}>
                <strong>{story.name}</strong>
                <span>{story.role}</span>
              </cite>
            </div>
          </div>
        ))}
      </div>
      {/* </ScrollReveal> */}
    </section>
  );
};

export default LocalStories;
