import HeroSection from "@/components/modules/home/HeroSection";
import FeaturesSection from "@/components/modules/home/FeaturesSection";
import WorksSection from "@/components/modules/home/WorksSection";
import ChooseSection from "@/components/modules/home/ChooseSection";
import ReviewSection from "@/components/modules/home/ReviewSection";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home - NEOPAY</title>
        <meta name="description" content="This is Home Page" />
      </Helmet>
      <HeroSection></HeroSection>
      <FeaturesSection></FeaturesSection>
      <WorksSection></WorksSection>
      <ChooseSection></ChooseSection>
      <ReviewSection></ReviewSection>
    </div>
  );
}
