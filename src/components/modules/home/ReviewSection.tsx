// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { useGetMeQuery } from "@/redux/features/auth/auth.api";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router";

// const ReviewSection = () => {
//   const { data: userData } = useGetMeQuery(undefined);
//   const navigate = useNavigate();
//   const handleLogin = () => {
//     navigate("/login");
//   };
//   return (
//     <div>
//       <section className="py-8  md:py-12 lg:pb-10 lg:pt-16 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
//         <div className="text-center">
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
//             What Our Users Say
//           </h2>
//           <div className="grid md:grid-cols-3 gap-6 mb-10">
//             {[
//               {
//                 name: "Rahim",
//                 feedback: "NeoPay makes money transfer super easy and secure!",
//               },
//               {
//                 name: "Karim",
//                 feedback:
//                   "I love the agent system, quick deposit and withdrawal anytime.",
//               },
//               {
//                 name: "Ayesha",
//                 feedback: "Very reliable and user-friendly digital wallet.",
//               },
//             ].map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.2 }}
//               >
//                 <Card className="h-full shadow-md rounded-xl hover:shadow-lg flex flex-col items-center p-6 transition">
//                   <p className="text-gray-500 italic">“{item.feedback}”</p>
//                   <p className="font-semibold text-indigo-600">- {item.name}</p>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//           <Button
//             onClick={handleLogin}
//             size="lg"
//             disabled={userData?.data?.email}
//           >
//             Join NeoPay Now
//           </Button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ReviewSection;

import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { reviewData } from "@/constants/ReviewData";

const ReviewSection = () => {
  const { data: userData } = useGetMeQuery(undefined);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <section className="py-8 md:py-12 lg:pb-10 lg:pt-16 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          What Our Users Say
        </h2>
        <p className="text-gray-500 mt-2">
          Real feedback from our awesome users
        </p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={24}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 16 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
      >
        {reviewData?.map((review) => (
          <SwiperSlide key={review.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="flex flex-col items-center p-6 shadow-lg rounded-xl h-full">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <p className="text-gray-500 italic mb-2">“{review.feedback}”</p>
                <p className="font-semibold text-gray-600 dark:text-gray-100">
                  {review.name}
                </p>
                <p className="text-sm text-gray-400">{review.role}</p>
              </Card>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {!userData?.data?.email && (
        <div className="text-center mt-8">
          <Button onClick={handleLogin} size="lg">
            Join NeoPay Now
          </Button>
        </div>
      )}
    </section>
  );
};

export default ReviewSection;
