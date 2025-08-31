import HeroSection from "@/components/modules/home/HeroSection";
import FeaturesSection from "@/components/modules/home/FeaturesSection";
import WorksSection from "@/components/modules/home/WorksSection";
import ChooseSection from "@/components/modules/home/ChooseSection";
import ReviewSection from "@/components/modules/home/ReviewSection";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <FeaturesSection></FeaturesSection>
      <WorksSection></WorksSection>
      <ChooseSection></ChooseSection>
      <ReviewSection></ReviewSection>
    </div>
  );
}
