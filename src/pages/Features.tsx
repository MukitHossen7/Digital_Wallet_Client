import FeaturesHeader from "@/components/modules/features/FeaturesHeader";
import FeaturesStats from "@/components/modules/features/FeaturesStats";
import FeaturesPanel from "@/components/modules/features/FeaturesPanel";
import FeaturesTech from "@/components/modules/features/FeaturesTech";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto py-14">
        <FeaturesHeader />
        <FeaturesStats />
        <FeaturesPanel />
        <FeaturesTech />
      </main>
    </div>
  );
}
