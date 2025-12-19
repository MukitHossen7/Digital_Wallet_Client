import FeaturesHeader from "@/components/modules/features/FeaturesHeader";
import FeaturesStats from "@/components/modules/features/FeaturesStats";
import FeaturesPanel from "@/components/modules/features/FeaturesPanel";
import FeaturesTech from "@/components/modules/features/FeaturesTech";
import { Helmet } from "react-helmet";

export default function Features() {
  return (
    <main className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto py-20">
      <Helmet>
        <title>Features - NEOPAY</title>
        <meta name="description" content="This is Features Page" />
      </Helmet>
      <FeaturesHeader />
      <FeaturesStats />
      <FeaturesPanel />
      <FeaturesTech />
    </main>
  );
}
