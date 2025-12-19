import { motion } from "framer-motion";
import { Target, Zap, Heart, Award, ShieldCheck } from "lucide-react";
import storyImage1 from "../../../assets/images/People working at a desk.jpg";
import storyImage2 from "../../../assets/images/Team member working.jpg";
import storyImage3 from "../../../assets/images/images-story3.jpg";
import storyImage4 from "../../../assets/images/Motivating quote on wall.webp";
import storyImage6 from "../../../assets/images/images-story6.jpg";
import visionImage7 from "../../../assets/images/our-vision-images.webp";
import workPlaceImage8 from "../../../assets/images/our-work-place.jpg";
import { cn } from "@/lib/utils";

const StoryPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <section className="relative overflow-hidden bg-background py-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        {/* --- 1. Hero / Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            {...fadeIn}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Heart size={14} className="fill-current" />
            <span>Since 2023</span>
          </motion.div>
          <motion.h1
            {...fadeIn}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          >
            A Journey of{" "}
            <span className="text-primary italic">Financial Freedom</span>
          </motion.h1>
          <motion.p
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            NeoPay started with a bold dream — to simplify digital transactions
            and make them accessible, safe, and effortless for everyone.
          </motion.p>
        </div>

        {/* --- 2. Interactive Gallery (Bento Grid Style) --- */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-20 md:mb-32">
          {[
            {
              img: storyImage1,
              col: "col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2",
              label: "Innovation",
            },
            {
              img: storyImage6,
              col: "col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2",
              label: "Collaboration",
            },
            {
              img: storyImage4,
              col: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2",
              label: "Our Core",
            },
            {
              img: storyImage3,
              col: "col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3",
              label: "Growth",
            },
            {
              img: storyImage2,
              col: "col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3",
              label: "Team Spirit",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                item.col,
                "relative group overflow-hidden rounded-2xl shadow-xl min-h-[200px] sm:min-h-[250px] md:h-64 lg:h-72"
              )}
            >
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 sm:p-6">
                <p className="text-white font-bold text-base sm:text-lg translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 transition-transform duration-500">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- 3. Our Vision --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-32">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -top-10 -left-10 size-40 bg-primary/10 rounded-full blur-3xl -z-10" />
            <img
              src={visionImage7}
              alt="Our Vision"
              className="rounded-3xl shadow-2xl border-4 border-card"
            />
            {/* Stats Overlay Card */}
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-xl border border-primary/20 hidden md:block">
              <p className="text-primary font-black text-3xl">10M+</p>
              <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest">
                Global Users
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-3 text-primary mb-4">
              <Target size={32} />
              <h3 className="text-sm font-black uppercase tracking-[0.3em]">
                Our Vision
              </h3>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Empowering the world through{" "}
              <span className="text-primary">Financial Inclusivity.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We envision a future where financial empowerment is in everyone’s
              hands. NeoPay is about creating opportunities, fostering trust,
              and redefining the way people experience finance.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-primary" />
                <span className="font-bold">Trust First</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="text-primary" />
                <span className="font-bold">Lightning Fast</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- 4. Our Workplace --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 text-primary mb-4">
              <h3 className="text-sm font-black uppercase tracking-[0.3em]">
                Our Culture
              </h3>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 ">
              Where <span className="text-primary">Innovation</span> meets
              Collaboration.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              At NeoPay, we foster innovation through collaboration. Our culture
              encourages creativity, teamwork, and support, making space for
              breakthrough ideas in digital finance.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We don’t just build a product — we are building a movement where
              payments become faster, safer, and smarter for everyone.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20"
            >
              Join Our Team
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src={workPlaceImage8}
              alt="Workplace"
              className="rounded-3xl shadow-2xl border-4 border-card"
            />
            {/* Award Overlay */}
            <div className="absolute -top-6 -right-6 bg-card p-4 rounded-2xl shadow-xl border border-primary/20 flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <Award size={24} />
              </div>
              <div>
                <p className="font-bold text-sm">Top Workplace</p>
                <p className="text-[10px] text-muted-foreground uppercase">
                  2024 Winner
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StoryPage;
