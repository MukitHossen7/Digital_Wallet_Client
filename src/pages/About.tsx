import AboutHero from "@/components/modules/about/HeroSection";
// import StorySection from "@/components/modules/about/StorySection";
import MissionSection from "@/components/modules/about/MissionSection";
import { Helmet } from "react-helmet";
import OurTeems from "@/components/modules/about/OurTeems";
import OurStory from "@/components/modules/about/OurStory";

const About = () => {
  return (
    <div>
      <Helmet>
        <title>About - NEOPAY</title>
        <meta name="description" content="This is About Page" />
      </Helmet>
      <AboutHero></AboutHero>
      {/* <StorySection></StorySection> */}
      <OurStory />
      <MissionSection></MissionSection>
      {/* <OurTeem></OurTeem> */}
      <OurTeems />
    </div>
  );
};

export default About;
