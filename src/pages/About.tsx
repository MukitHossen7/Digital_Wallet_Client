import AboutHero from "@/components/modules/about/HeroSection";
import StorySection from "@/components/modules/about/StorySection";
import MissionSection from "@/components/modules/about/MissionSection";
import OurTeem from "@/components/modules/about/OurTeem";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div>
      <Helmet>
        <title>About - NEOPAY</title>
        <meta name="description" content="This is About Page" />
      </Helmet>
      <AboutHero></AboutHero>
      <StorySection></StorySection>
      <MissionSection></MissionSection>
      <OurTeem></OurTeem>
    </div>
  );
};

export default About;
