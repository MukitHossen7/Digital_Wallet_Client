// import { Badge } from "@/components/ui/badge";

// const FeaturesHeader = () => {
//   return (
//     <section className="text-center mb-12">
//       <Badge className="mx-auto mb-2 rounded-full">Features</Badge>
//       <h1 className="text-2xl md:text-4xl  font-bold">Features NeoPay</h1>
//       <p className="max-w-2xl mx-auto mt-3 text-muted-foreground">
//         Secure, role-based, and scalable features built for users, agents, and
//         admins. Real-world workflows, bank-level security, and mobile-first
//         experience.
//       </p>
//     </section>
//   );
// };

// export default FeaturesHeader;

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const FeaturesHeader = () => {
  return (
    <section className="relative pb-16 md:pb-20 overflow-hidden">
      {/* Background Decorative Glow (Subtle) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 size-[400px] md:size-[600px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="mx-auto max-w-6xl text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-bold tracking-wider uppercase mb-6"
          >
            <Sparkles className="size-4 animate-pulse" />
            <span>Powering Your Finances</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          >
            Powerful Features of <br />
            <span className="text-primary italic">NeoPay</span> Ecosystem
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Secure, role-based, and scalable features built for users, agents,
            and admins. Experience real-world workflows with bank-level security
            and a mobile-first design.
          </motion.p>

          {/* Decorative Bottom Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1.5 bg-primary rounded-full mx-auto mt-10"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesHeader;
