import { Header } from "./components/Header";
import { ScrollVideo } from "./components/ScrollVideo";
import styles from "./styles/App.module.css";
import { MapSection } from "./components/MapSection";
import { RiverTimeline } from "./components/RiverTimeline";
import { RiverDetails } from "./components/RiverDetails";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";
import { Conservation } from "./components/Conservation";
import { TestimonialSection } from "./components/Testimonial/TestimonialSection";
import { SideImageLayout } from "./components/SideImageLayout";
import { SectionReveal } from "./components/animation/SectionReveal";

function App() {
  return (
    <>
      <Header />
      <main>
        <ScrollVideo
          videoUrl="https://www.youtube.com/embed/Po26E1if46g?autoplay=1&loop=1&mute=1&playlist=Po26E1if46g&start=0&end=27"
          subtitle="The Journey of Patagonia’s Lifeline"
        />
        <div className={styles.intro}>
          <SectionReveal title="Born of Ice, Carved by Time">
            <p className={styles.leadText}>
              It is more than a river—it is the lifeblood of an untamed land, a
              force that has shaped the stories of those who call its banks
              home.
            </p>
          </SectionReveal>
        </div>
        {/* <section className={styles.intro}>
          <h1>Born of Ice, Carved by Time</h1>
          <p className={styles.leadText}>
            It is more than a river—it is the lifeblood of an untamed land, a
            force that has shaped the stories of those who call its banks home.
          </p>
        </section> */}
        <MapSection />
        <RiverDetails />
        <SideImageLayout />
        <RiverTimeline />
        <Conservation />
        <TestimonialSection />
        <CallToAction />
        <Footer />
      </main>
    </>
  );
}

export default App;
