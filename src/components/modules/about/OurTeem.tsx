import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import image1 from "../../../assets/images/image1.jpg";
import image2 from "../../../assets/images/image2.jpeg";
import image3 from "../../../assets/images/shihab.jpg";
import image4 from "../../../assets/images/mukit.jpeg";
interface TeamMember {
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Mukit Hossen",
    role: "Founder & CEO",
    image: image4,
    linkedin: "https://linkedin.com/in/rahimhossen",
    twitter: "https://twitter.com/rahimhossen",
  },
  {
    name: "Ayesha Khan",
    role: "Frontend Developer",
    image: image1,
    linkedin: "https://linkedin.com/in/ayeshakhan",
    twitter: "https://twitter.com/ayeshakhan",
  },
  {
    name: "Shihab Hossen",
    role: "Full Stack Developer",
    image: image3,
    linkedin: "https://linkedin.com/in/karimahmed",
    twitter: "https://twitter.com/karimahmed",
  },
  {
    name: "Sabrina Noor",
    role: "Marketing Head",
    image: image2,
    linkedin: "https://linkedin.com/in/sabrina",
    twitter: "https://twitter.com/sabrina",
  },
];

const OurTeem = () => {
  return (
    <div>
      <section className="py-8 md:py-12 lg:py-16 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-5">
            Meet Our Team
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            NeoPay is powered by a dedicated team of professionals committed to
            delivering a secure, fast, and user-friendly digital wallet
            experience.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="transition-transform hover:-translate-y-2 text-center   h-full shadow-md rounded-xl hover:shadow-lg p-6 w-full">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-100 mx-auto">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover ring-1"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-xl font-semibold">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400 w-full">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <div className="flex items-center justify-center mt-2 space-x-4">
                    {member.linkedin && (
                      <FaLinkedin className="w-5 h-5 transition" />
                    )}
                    {member.twitter && <FaTwitter className="transition" />}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeem;
