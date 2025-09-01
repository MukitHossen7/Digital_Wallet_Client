import { motion } from "framer-motion";

const ContactHero = () => {
  return (
    <section className="relative py-20 md:py-32 px-4 md:px-0 text-gray-900 dark:text-gray-100">
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
