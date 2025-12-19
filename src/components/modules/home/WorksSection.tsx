import { motion } from "framer-motion";
import { BarChart, DollarSign, UserPlus, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up & Verify",
    desc: "Create your secure account in minutes and complete a simple identity verification.",
    step: "01",
  },
  {
    icon: DollarSign,
    title: "Add / Send Money",
    desc: "Instantly top up your wallet via bank or card and send money to anyone, anywhere.",
    step: "02",
  },
  {
    icon: BarChart,
    title: "Track Transactions",
    desc: "Monitor your spending habits with real-time analytics and detailed history logs.",
    step: "03",
  },
];

const WorksSection = () => {
  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase rounded-full bg-primary/10 text-primary"
          >
            Process Flow
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          >
            Start your journey in{" "}
            <span className="text-primary">3 simple steps</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            NeoPay makes managing your money simple and secure. Follow these
            easy steps to take full control of your digital finances.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Connecting Line (Only for Desktop) */}
          <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 border-t-2 border-dashed border-primary/20 -z-0" />

          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group flex flex-col items-center text-center px-4"
            >
              {/* Step Number Indicator */}
              <div className="absolute -top-4 right-1/2 translate-x-12 md:translate-x-16 text-5xl font-black text-primary/5 select-none transition-colors group-hover:text-primary/10">
                {item.step}
              </div>

              {/* Icon Container */}
              <div className="relative z-10 w-20 h-20 mb-8 flex items-center justify-center rounded-2xl bg-card border border-border shadow-xl group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-300">
                <div className="absolute inset-0 rounded-2xl bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
                <item.icon className="w-10 h-10 text-primary transition-transform duration-300 group-hover:scale-110" />

                {/* Mobile/Tab Arrow indicator (shows below icon on mobile, but we use the desktop line) */}
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden lg:group-last:hidden lg:block text-primary/20">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-xl lg:text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                {item.desc}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA (Optional) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        ></motion.div>
      </div>
    </section>
  );
};

export default WorksSection;
