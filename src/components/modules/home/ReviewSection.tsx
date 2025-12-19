import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Quote, Star } from "lucide-react";

// Swiper Styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { reviewData } from "@/constants/ReviewData";

const ReviewSection = () => {
  const { data: userData } = useGetMeQuery(undefined);
  const navigate = useNavigate();

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase rounded-full bg-primary/10 text-primary"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight"
          >
            What our <span className="text-primary">users say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Join thousands of satisfied users who have transformed their digital
            banking experience with NeoPay.
          </motion.p>
        </div>

        {/* Reviews Slider */}
        <div className="pb-12">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="review-swiper !pb-14"
          >
            {reviewData?.map((review) => (
              <SwiperSlide key={review.id} className="max-w-[450px]">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="h-full"
                >
                  <Card className="relative p-8 shadow-xl border-primary/5 rounded-[2rem] bg-card h-full flex flex-col justify-between group transition-all duration-300 hover:border-primary/20 hover:shadow-primary/5">
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                      <Quote size={48} fill="currentColor" />
                    </div>

                    <div className="relative z-10">
                      {/* Ratings */}
                      <div className="flex gap-1 mb-6 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>

                      {/* Feedback */}
                      <p className="text-lg text-foreground/80 leading-relaxed mb-8 italic">
                        "{review.feedback}"
                      </p>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-4 border-t pt-6 border-border">
                      <div className="relative">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 p-0.5"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full border-2 border-background">
                          <Star size={8} fill="currentColor" />
                        </div>
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-foreground text-base">
                          {review.name}
                        </h4>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {review.role}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Call to Action */}
        {!userData?.data?.email && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              className="h-12 lg:h-14 px-10 rounded-lg font-bold text-md shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95"
            >
              Start Your Journey with NeoPay
            </Button>
          </motion.div>
        )}
      </div>

      {/* Global CSS for Pagination Styling */}
      <style>{`
        .swiper-pagination-bullet-active {
          background: var(--primary) !important;
          width: 24px !important;
          border-radius: 10px !important;
        }
        .review-swiper .swiper-slide {
          height: auto !important;
          display: flex !important;
        }
      `}</style>
    </section>
  );
};

export default ReviewSection;
