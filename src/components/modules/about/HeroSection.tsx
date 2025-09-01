import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <section className="overflow-hidden py-16 md:py-20 lg:24 xl:py-32 mx-auto max-w-6xl">
      <div className="">
        <div className="relative flex flex-col gap-5 items-center">
          <div
            style={{
              transform: "translate(-50%, -50%)",
            }}
            className="absolute top-1/2 left-1/2 -z-10 mx-auto size-[800px] rounded-full border border-gray-300 dark:border-gray-100 [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] p-16 md:size-[1300px] md:p-32"
          >
            <div className="size-full rounded-full border border-gray-300 dark:border-gray-100 p-16 md:p-32">
              <div className="size-full rounded-full border border-gray-300 dark:border-gray-100"></div>
            </div>
          </div>

          <motion.h2
            className="text-4xl md:text-6xl mb-2 font-bold tracking-tight text-pretty px-2 md:px-10 lg:px-12 xl:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About NeoPay
          </motion.h2>
          <motion.p
            className="text-center md:text-lg mx-auto max-w-3xl text-muted-foreground lg:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            NeoPay is a secure, user-friendly digital wallet platform designed
            for seamless financial transactions. Trusted by thousands of users,
            agents, and businesses alike.
          </motion.p>
          <motion.div
            className="flex flex-col items-center justify-center  mt-4 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button>Learn More</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
