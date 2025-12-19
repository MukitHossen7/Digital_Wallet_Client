import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import image4 from "../../../assets/images/mukit.jpeg";
import { Users } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
}

interface TeamProps {
  heading?: string;
  description?: string;
  members?: TeamMember[];
}

const OurTeam = ({
  heading = "Meet Our Team",
  description = "NeoPay is powered by a dedicated team of professionals committed to delivering a secure, fast, and user-friendly digital wallet experience.",
  members = [
    {
      id: "member-1",
      name: "Mukit Hossen",
      role: "Founder & CEO",
      avatar: image4,
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
    {
      id: "member-2",
      name: "Ayesha Khan",
      role: "Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
    {
      id: "member-3",
      name: "Shihab Hossen",
      role: "Full Stack Developer",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg",
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
    {
      id: "member-4",
      name: "Sabrina Noor",
      role: "Marketing Head",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
    {
      id: "member-5",
      name: "Lisa Thompson",
      role: "Product Manager",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
    {
      id: "member-6",
      name: "Alex Johnson",
      role: "UX Designer",
      avatar: "https://randomuser.me/api/portraits/men/28.jpg",
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
  ],
}: TeamProps) => {
  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[10%] right-[5%] w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[5%] w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Users className="w-4 h-4" />
            <span>Core Members</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          >
            {heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative p-8 rounded-3xl border bg-card/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-card group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/5 text-center">
                {/* Avatar with Glow */}
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg scale-0 group-hover:scale-125 transition-transform duration-500" />
                  <Avatar className="size-24 lg:size-28 border-2 border-background shadow-xl relative z-10">
                    <AvatarImage src={member.avatar} className="object-cover" />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {member.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Name & Role */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium mt-1 uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  {[
                    {
                      icon: FaLinkedinIn,
                      link: member.linkedin,
                      label: "LinkedIn",
                    },
                    { icon: FaTwitter, link: member.twitter, label: "Twitter" },
                    { icon: FaGithub, link: member.github, label: "GitHub" },
                  ].map(
                    (social, idx) =>
                      social.link && (
                        <a
                          key={idx}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="size-10 flex items-center justify-center rounded-xl bg-muted/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          title={social.label}
                        >
                          <social.icon className="size-5" />
                        </a>
                      )
                  )}
                </div>

                {/* Decorative Bottom Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
