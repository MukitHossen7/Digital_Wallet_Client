import { Card } from "@/components/ui/card";
import { Banknote, CloudLightning, PieChart, Settings } from "lucide-react";

const FeaturesTech = () => {
  return (
    <section className="mb-12">
      <h3 className="text-xl font-semibold mb-4">Integrations & Tech</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center justify-center gap-2 text-center">
          <Banknote className="w-6 h-6 text-primary" />
          <div>
            <div className="text-sm font-medium mb-1">Payments</div>
            <div className="text-xs text-muted-foreground">
              Agent & Bank rails
            </div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-2 text-center">
          <PieChart className="w-6 h-6 text-primary" />
          <div>
            <div className="text-sm font-medium mb-1">Analytics</div>
            <div className="text-xs text-muted-foreground">
              Realtime dashboards
            </div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-2 text-center">
          <Settings className="w-6 h-6 text-primary" />
          <div>
            <div className="text-sm font-medium mb-1">Admin</div>
            <div className="text-xs text-muted-foreground">
              User & agent management
            </div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-2 text-center">
          <CloudLightning className="w-6 h-6 text-primary" />
          <div>
            <div className="text-sm font-medium">Performance</div>
            <div className="text-xs text-muted-foreground">
              High availability
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FeaturesTech;
