import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const ReviewSection = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <section className="py-8  md:py-12 lg:pb-10 lg:pt-16 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                name: "Rahim",
                feedback: "NeoPay makes money transfer super easy and secure!",
              },
              {
                name: "Karim",
                feedback:
                  "I love the agent system, quick deposit and withdrawal anytime.",
              },
              {
                name: "Ayesha",
                feedback: "Very reliable and user-friendly digital wallet.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="h-full shadow-md rounded-xl hover:shadow-lg flex flex-col items-center p-6 transition">
                  <p className="text-gray-500 italic">“{item.feedback}”</p>
                  <p className="font-semibold text-indigo-600">- {item.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          <Button onClick={handleLogin} size="lg">
            Join NeoPay Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ReviewSection;
