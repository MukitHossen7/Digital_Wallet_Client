import { motion } from "framer-motion";

const FAQHeader = () => {
  return (
    <div className="relative text-center mb-16">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/10 blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
          Support Center
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight">
          Frequently Asked <span className="text-primary">Questions</span>
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground leading-relaxed">
          Need help with NeoPay? Find answers for users, agents, and admins in
          our comprehensive guide.
        </p>
      </motion.div>
    </div>
  );
};

export default FAQHeader;
