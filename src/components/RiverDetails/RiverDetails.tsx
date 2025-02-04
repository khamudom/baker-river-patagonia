import { SectionReveal } from "../animation/SectionReveal";
import styles from "./RiverDetails.module.css";

const RiverDetails = () => {
  return (
    <SectionReveal
      className={styles.riverDetails}
      title="The Majestic Baker River"
      imageSrc="/images/bakerriver02.jpg"
      imageAlt="baker"
      imageCaption="The Baker River's pristine waters carve through Patagonia's rugged
            landscape."
    >
      <p>
        The Baker River, known as "Baker" in Spanish, is a river in Patagonia,
        Chile. It is one of the most important rivers in the region and is
        renowned for its stunning turquoise waters, breathtaking landscapes, and
        opportunities for outdoor activities such as fishing, kayaking, and
        trekking. The river originates from the Southern Patagonian Ice Field,
        which feeds its glacial waters.
      </p>
      <p>
        The Baker River flows through the Aysén Region of Chile and eventually
        empties into the Gulf of Penas in the Pacific Ocean. Its course takes it
        through deep valleys, fjords, and dense forests, making it a popular
        destination for adventure seekers and nature enthusiasts.
      </p>
      <p>
        One of the most striking features of the Baker River is its vibrant blue
        color, which is a result of glacial meltwater carrying fine particles of
        rock flour. This unique coloration adds to the river's allure and makes
        it a popular subject for photographers and travelers.
      </p>
    </SectionReveal>
  );
};

export default RiverDetails;
