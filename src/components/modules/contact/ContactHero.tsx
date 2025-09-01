import { motion } from "framer-motion";

const ContactHero = () => {
  return (
    <section className="py-16 md:py-20 px-10 md:px-0">
      <div className="text-center">
        {/* Heading Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Contact NeoPay
        </motion.h1>

        {/* Paragraph Animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto"
        >
          Have questions, need support, or want to request a sandbox account?
          Our team is ready to assist you.
        </motion.p>
      </div>
    </section>
  );
};

export default ContactHero;
