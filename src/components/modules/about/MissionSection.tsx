import { motion } from "framer-motion";
import { DollarSign, Globe, Shield, Users, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const missions = [
  {
    icon: Shield,
    title: "Security First",
    desc: "Ensuring bank-level encryption and multi-factor security for every transaction.",
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: DollarSign,
    title: "Affordable",
    desc: "We believe in transparent pricing and the lowest transaction fees in the market.",
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: Globe,
    title: "Accessible",
    desc: "Empowering people worldwide by making financial services available everywhere.",
    accent: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Users,
    title: "Trusted",
    desc: "Built on transparency and reliability, trusted by a global community of users.",
    accent: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
];

const MissionSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-background">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-15%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Target className="w-4 h-4" />
            <span>Our Commitment</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          >
            Banking for the{" "}
            <span className="text-primary italic">next generation</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            We aim to make digital finance secure, affordable, accessible, and
            trusted by everyone. At NeoPay, we don't just transfer money; we
            build trust.
          </motion.p>
        </div>

        {/* Mission Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {missions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="h-full p-8 rounded-3xl border bg-card/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-card group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/5">
                {/* Icon Box */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-[360deg]",
                    item.accent
                  )}
                >
                  <item.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>

                {/* Decorative Bottom Line */}
                <div className="absolute bottom-4 left-8 right-8 h-1 bg-primary/20 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
