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
// import { HoverImage } from "./components/HoverImage";
// import { ImageTextReveal } from "./components/ImageTextReveal";

function App() {
  return (
    <>
      {/** Header */}
      <Header />

      <main>
        {/** Hero */}
        <section className={styles.hero}>
          <ScrollVideo
            imgSrc="/images/bakerriver04.png"
            title="The Language of Rapids"
            subtitle="Decoding the Baker River"
          />
        </section>
        {/** Introduction */}
        <section className={styles.intro}>
          <p className={styles.leadText}>
            It is more than a river—it is the lifeblood of an untamed land, a
            force that has shaped the stories of those who call its banks home.
          </p>
        </section>
        <MapSection />
        <RiverDetails />
        {/* <HoverImage
          src="/images/br_thecanyons.jpg"
          alt="baker river canyons"
          description="this the canyons"
          width={400}
        /> */}
        {/** Rich Biodiversity – A River Full of Life */}
        <RiverTimeline />
        {/** Conservation Efforts – Protecting the River’s Future */}
        <Conservation />
        <TestimonialSection />
        <CallToAction />
        <Footer />
      </main>
    </>
  );
}

export default App;
