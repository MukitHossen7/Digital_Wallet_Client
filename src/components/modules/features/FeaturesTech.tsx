// import { Card } from "@/components/ui/card";
// import { Banknote, CloudLightning, PieChart, Settings } from "lucide-react";

// const FeaturesTech = () => {
//   return (
//     <section className="mb-12">
//       <h3 className="text-xl font-semibold mb-4">Integrations & Tech</h3>
//       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card className="p-4 flex items-center justify-center gap-2 text-center">
//           <Banknote className="w-8 h-8 text-primary" />
//           <div>
//             <div className="text-base font-medium mb-1">Payments</div>
//             <div className="text-sm text-muted-foreground">
//               Agent & Bank rails
//             </div>
//           </div>
//         </Card>

//         <Card className="p-4 flex items-center gap-2 text-center">
//           <PieChart className="w-8 h-8 text-primary" />
//           <div>
//             <div className="text-base font-medium mb-1">Analytics</div>
//             <div className="text-sm text-muted-foreground">
//               Realtime dashboards
//             </div>
//           </div>
//         </Card>

//         <Card className="p-4 flex items-center gap-2 text-center">
//           <Settings className="w-8 h-8 text-primary" />
//           <div>
//             <div className="text-base font-medium mb-1">Admin</div>
//             <div className="text-sm text-muted-foreground">
//               User & agent management
//             </div>
//           </div>
//         </Card>

//         <Card className="p-4 flex items-center gap-2 text-center">
//           <CloudLightning className="w-8 h-8 text-primary" />
//           <div>
//             <div className="text-base font-medium mb-1">Performance</div>
//             <div className="text-sm text-muted-foreground">
//               High availability
//             </div>
//           </div>
//         </Card>
//       </div>
//     </section>
//   );
// };

// export default FeaturesTech;

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Banknote,
  CloudLightning,
  PieChart,
  Settings,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const techFeatures = [
  {
    icon: Banknote,
    title: "Payment Rails",
    desc: "Seamless Agent & Bank settlements with low-latency processing.",
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: PieChart,
    title: "Realtime Insights",
    desc: "Interactive dashboards with live data visualization for all roles.",
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: Settings,
    title: "Operations Hub",
    desc: "Centralized user & agent management with granular permission controls.",
    accent: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: CloudLightning,
    title: "Edge Infrastructure",
    desc: "High availability system architecture ensuring 99.9% uptime.",
    accent: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
];

const FeaturesTech = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Infrastructure
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              Integrations &{" "}
              <span className="text-primary italic">Tech Stack</span>
            </h3>
          </div>
          <p className="max-w-md text-muted-foreground text-sm md:text-base leading-relaxed">
            Our platform is built on enterprise-grade infrastructure to ensure
            speed, security, and scalability for every user.
          </p>
        </div>

        {/* Tech Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {techFeatures.map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="h-full">
              <Card className="group relative h-full p-6 border-primary/5 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 rounded-[2rem]">
                {/* Icon Container */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110",
                    item.accent
                  )}
                >
                  <item.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h4 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Interactive Link */}
                <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-tighter text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 cursor-pointer">
                  Explore Tech <ArrowRight className="ml-1 w-3 h-3" />
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-tr-[2rem] -z-10" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesTech;
