import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { ArrowRight, Globe, ShieldCheck, Sparkles } from "lucide-react";

const AboutHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background py-20 px-4">
      {/* --- Interactive Background Decorations --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {/* Animated Concentric Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute size-[500px] md:size-[800px] lg:size-[1000px] rounded-full border border-primary/10 opacity-50"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          className="absolute size-[350px] md:size-[600px] lg:size-[800px] rounded-full border border-dashed border-primary/20 opacity-30"
        />

        {/* Soft Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] md:size-[600px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* --- Main Content --- */}
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-bold tracking-wider uppercase"
          >
            <Sparkles className="size-4" />
            <span>Redefining Digital Payments</span>
          </motion.div>

          {/* Heading with Gradient Accent */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
            >
              The Story Behind <br />
              <span className="text-primary italic">NeoPay</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto max-w-3xl text-muted-foreground text-lg md:text-xl leading-relaxed"
            >
              NeoPay is a secure, user-friendly digital wallet platform designed
              for seamless financial transactions. Empowering millions through
              innovative technology and borderless connectivity.
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => navigate("/feature")}
              className="h-12 lg:h-14 px-8 text-md font-bold rounded-lg shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-95 group"
            >
              Explore Features
              <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/contact")}
              className="h-12 lg:h-14 px-8 text-md font-semibold rounded-lg border-primary/20 hover:bg-primary/5 transition-all"
            >
              Our Mission
            </Button>
          </motion.div>

          {/* Trust Indicators / Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="pt-12 grid grid-cols-2 md:grid-cols-3 gap-8 text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-primary size-5" />
              <span className="text-sm font-medium">Bank-level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="text-primary size-5" />
              <span className="text-sm font-medium">Global Network</span>
            </div>
            <div className="flex items-center gap-2 hidden md:flex">
              <Sparkles className="text-primary size-5" />
              <span className="text-sm font-medium">Fast Transactions</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
