import {
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { Logo } from "@/components/layout/Logo";

const HeroSection = () => {
  const navigate = useNavigate();
  const { data: userData } = useGetMeQuery(undefined);

  const floatingVariants: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const globalCardVariants: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, 20, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background pt-10 pb-20">
      <div className="absolute inset-0 z-0">
        <img
          alt="grid pattern"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="h-full w-full object-cover opacity-40 dark:opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
        />
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
      </div>

      <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container relative z-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Trusted by 1M+ active users</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Your Money, <br />
              <span className="text-primary">Your Control</span> <br />
              <span className="text-foreground/80">Anytime, Anywhere.</span>
            </h1>

            <p className="max-w-xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Experience the next generation of digital finance. Secure,
              lightning-fast transactions for all your daily needs with{" "}
              <span className="font-bold text-foreground">NeoPay</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() =>
                  navigate(userData?.data?.email ? "/user" : "/login")
                }
                className="h-12 lg:h-14 px-10 text-md font-bold rounded-md shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all group"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/feature")}
                className="h-12 lg:h-14 px-10 text-md font-semibold rounded-md border-primary/20 hover:bg-primary/5 group"
              >
                Learn more
                <ExternalLink className="ml-2 w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-border pt-8">
              <div>
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime Rate</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-2xl font-bold">0.01s</p>
                <p className="text-sm text-muted-foreground">Tx Speed</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <div className="relative flex items-center justify-center">
            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative z-20 w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden"
            >
              <div className="p-5 flex flex-col gap-6 pt-12">
                <div className="flex justify-between items-center">
                  <Logo className="w-8 h-8" />
                  <div className="w-8 h-8 rounded-full bg-primary/20" />
                </div>
                <div className="h-32 w-full bg-primary rounded-2xl p-4 text-primary-foreground flex flex-col justify-end">
                  <p className="text-xs opacity-80">Current Balance</p>
                  <p className="text-2xl font-bold">$24,500.00</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-16 rounded-xl bg-white/5 border border-white/10"
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-3 mt-4 text-white">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-20 bg-white/10 rounded" />
                        <div className="h-2 w-full bg-white/5 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Success Notification Card */}
            <motion.div
              variants={floatingVariants}
              initial="initial"
              animate="animate"
              className="absolute -top-4 -right-4 lg:right-10 z-30 bg-card/95 backdrop-blur-md border border-border p-4 rounded-2xl shadow-xl flex items-center gap-4 w-60"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold">
                  Success Transfer
                </p>
                <p className="text-sm font-bold">+$1,250.00</p>
              </div>
            </motion.div>

            {/* Global Access Card */}
            <motion.div
              variants={globalCardVariants}
              initial="initial"
              animate="animate"
              className="absolute bottom-10 -left-4 lg:-left-10 z-30 bg-card/95 backdrop-blur-md border border-border p-4 rounded-2xl shadow-xl flex items-center gap-4 w-56"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold">
                  Global Access
                </p>
                <p className="text-sm font-bold">150+ Countries</p>
              </div>
            </motion.div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary/5 rounded-full z-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
