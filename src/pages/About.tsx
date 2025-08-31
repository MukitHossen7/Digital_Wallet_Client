import AboutHero from "@/components/modules/about/HeroSection";
import StorySection from "@/components/modules/about/StorySection";
import MissionSection from "@/components/modules/about/MissionSection";
import OurTeem from "@/components/modules/about/OurTeem";

const AboutPage = () => {
  return (
    <div>
      <AboutHero></AboutHero>
      <StorySection></StorySection>
      <MissionSection></MissionSection>
      <OurTeem></OurTeem>
    </div>
  );
};

export default AboutPage;
