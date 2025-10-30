import FeatureComparison from "@/components/modules/pricing/FeatureComparison";
import PricingFAQ from "@/components/modules/pricing/PricingFAQ";
import PricingSection from "@/components/modules/pricing/PricingSection";

const Pricing = () => {
  return (
    <div>
      <PricingSection />
      <FeatureComparison />
      <PricingFAQ />
    </div>
  );
};

export default Pricing;
