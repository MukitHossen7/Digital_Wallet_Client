import { ExternalLink } from "lucide-react";
import logo from "../../../assets/images/logo (1).png";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:24 xl:py-32">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>
      <div className="relative z-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="">
              <img className="w-12 h-12" src={logo} />
            </div>
            <div>
              <motion.h1
                className="text-4xl md:text-6xl mb-6 font-bold tracking-tight text-pretty px-2 md:px-10 lg:px-12 xl:px-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Your Money, Your Control — Anytime, Anywhere
              </motion.h1>
              <motion.p
                className="mx-auto max-w-3xl text-muted-foreground lg:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Secure, fast and reliable NeoPay solution.
              </motion.p>
            </div>
            <motion.div
              className="mt-6 flex justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={() => navigate("/login")}
                className="shadow-sm transition-shadow hover:shadow cursor-pointer"
              >
                Get Started
              </Button>
              <Button
                onClick={() => navigate("/feature")}
                variant="outline"
                className="group cursor-pointer"
              >
                Learn more{" "}
                <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
