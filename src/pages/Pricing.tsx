import FeatureComparison from "@/components/modules/pricing/FeatureComparison";
import PricingFAQ from "@/components/modules/pricing/PricingFAQ";
import PricingSection from "@/components/modules/pricing/PricingSection";
import { Helmet } from "react-helmet";

const Pricing = () => {
  return (
    <div>
      <Helmet>
        <title>Pricing - NEOPAY</title>
        <meta name="description" content="This is About Page" />
      </Helmet>
      <PricingSection />
      <FeatureComparison />
      <PricingFAQ />
    </div>
  );
};

export default Pricing;
