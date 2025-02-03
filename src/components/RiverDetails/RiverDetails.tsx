import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SectionReveal } from "../animation/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

const RiverDetails = () => {
  return (
    <SectionReveal
      title="The Majestic Baker River"
      imageSrc="/images/bakerriver02.jpg"
      imageAlt="baker"
      imageCaption="The Baker River's pristine waters carve through Patagonia's rugged
            landscape."
    >
      <p>
        The Baker River, located in Chilean Patagonia's Aysén Region, is
        renowned for its stunning turquoise-blue waters, a result of glacial
        sediments from the Northern Patagonian Ice Field. Spanning approximately
        200 kilometers, it stands as Chile's most voluminous river.
      </p>
      <p>
        The river's journey is marked by diverse landscapes, including notable
        confluences where the Baker River merges with the Nef River north of
        Cochrane, creating a powerful and picturesque meeting of waters.
        Sections like "The Canyons" showcase the river's force as it carves
        through rugged terrains, offering breathtaking vistas.
      </p>
      <p>
        The riverbanks are adorned with lush forests, featuring species such as
        Nothofagus nitida and Pilgerodendron uviferum, contributing to the
        region's rich biodiversity. These geographical features not only
        highlight the river's natural beauty but also underscore its
        significance as a vital freshwater resource in Patagonia.
      </p>
    </SectionReveal>
  );
};

export default RiverDetails;
