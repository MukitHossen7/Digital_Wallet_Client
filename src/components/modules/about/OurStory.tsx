import { motion } from "framer-motion";
import storyImage1 from "../../../assets/images/People working at a desk.jpg";
import storyImage2 from "../../../assets/images/Team member working.jpg";
import storyImage3 from "../../../assets/images/images-story3.jpg";
import storyImage4 from "../../../assets/images/Motivating quote on wall.webp";
import storyImage5 from "../../../assets/images/Person working on laptop.jpg";
import storyImage6 from "../../../assets/images/images-story6.jpg";
import visionImage7 from "../../../assets/images/our-vision-images.webp";
import workPlaceImage8 from "../../../assets/images/our-work-place.jpg";

const StoryPage = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
      {/* Hero Section */}
      <div className="relative text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Story</h2>
        <p className="text-gray-700 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
          NeoPay started with a bold dream — to simplify digital transactions
          and make them accessible, safe, and effortless for everyone. What
          began as an idea has now become a trusted digital wallet, shaping the
          future of financial freedom.
        </p>
      </div>

      {/* Gallery Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {[
          storyImage1,
          storyImage6,
          storyImage4,
          storyImage3,
          storyImage2,
          storyImage5,
        ].map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="relative group overflow-hidden rounded-xl shadow-lg"
          >
            <img
              src={img}
              alt={`story-${idx}`}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white text-lg font-medium">NeoPay Moments</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Vision Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Vision</h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            We envision a future where financial empowerment is in everyone’s
            hands. NeoPay is not just about sending and receiving money — it’s
            about creating opportunities, fostering trust, and redefining the
            way people experience finance.
          </p>
        </motion.div>
        <motion.img
          src={visionImage7}
          alt="Vision"
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-xl  w-full object-cover"
        />
      </div>

      {/* Workplace Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center  rounded-2xl">
        <motion.img
          src={workPlaceImage8}
          alt="Workplace"
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-xl w-full object-cover"
        />
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Workplace</h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">
            At NeoPay, we foster innovation through collaboration. Our culture
            encourages creativity, teamwork, and support, making space for
            breakthrough ideas in digital finance.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            We don’t just build a product — we are building a movement where
            payments become faster, safer, and smarter for everyone.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StoryPage;
