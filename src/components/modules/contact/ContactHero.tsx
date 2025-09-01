import { motion } from "framer-motion";

const ContactHero = () => {
  return (
    // <section className="py-16 md:py-20 px-10 md:px-0">
    //   <div className="text-center">
    //     <motion.h1
    //       initial={{ opacity: 0, y: 40, scale: 0.95 }}
    //       animate={{ opacity: 1, y: 0, scale: 1 }}
    //       transition={{ duration: 0.6, ease: "easeOut" }}
    //       className="text-3xl md:text-5xl font-bold mb-4"
    //     >
    //       Contact NeoPay
    //     </motion.h1>
    //     <motion.p
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    //       className="text-lg md:text-xl max-w-2xl mx-auto"
    //     >
    //       Have questions, need support, or want to request a sandbox account?
    //       Our team is ready to assist you.
    //     </motion.p>
    //   </div>
    // </section>
    <section className="relative py-20 md:py-32 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4 md:px-0"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact NeoPay</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Have questions, need support, or want to request a sandbox account?
          Our team is ready to assist you.
        </p>
      </motion.div>
    </section>
  );
};

export default ContactHero;
