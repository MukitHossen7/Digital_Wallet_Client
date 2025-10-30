import image4 from "../../../assets/images/mukit.jpeg";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
}

interface Team1Props {
  heading?: string;
  subheading?: string;
  description?: string;
  members?: TeamMember[];
}

const OurTeems = ({
  heading = "Meet Our Team",
  description = "NeoPay is powered by a dedicated team of professionals committed to delivering a secure, fast, and user-friendly digital wallet experience.",
  members = [
    {
      id: "member-1",
      name: "Mukit Hossen",
      role: "Founder & CEO",
      avatar: image4,
      linkedin: "https://linkedin.com/in/rahimhossen",
      twitter: "https://twitter.com/rahimhossen",
      github: "#",
    },
    {
      id: "member-2",
      name: "Ayesha Khan",
      role: "Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      linkedin: "https://linkedin.com/in/ayeshakhan",
      twitter: "https://twitter.com/ayeshakhan",
      github: "#",
    },
    {
      id: "member-3",
      name: "Shihab Hossen",
      role: "Full Stack Developer",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg",
      linkedin: "https://linkedin.com/in/karimahmed",
      twitter: "https://twitter.com/karimahmed",
      github: "#",
    },
    {
      id: "member-4",
      name: "Sabrina Noor",
      role: "Marketing Head",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      linkedin: "https://linkedin.com/in/sabrina",
      twitter: "https://twitter.com/sabrina",
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
}: Team1Props) => {
  return (
    <div className="py-8 md:py-12 lg:py-16 w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-5">
          {heading}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div key={member.id} className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Avatar className="size-20 lg:size-24  object-cover ring-1">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-lg font-semibold">
                    {member.name}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="mb-6">
                <h3 className="mb-1 text-lg font-semibold">{member.name}</h3>
                <p className="text-primary text-sm font-medium">
                  {member.role}
                </p>
              </div>

              <div className="flex gap-3">
                {member.github && (
                  <a
                    href={member.github}
                    className="bg-muted/50 rounded-lg p-2"
                  >
                    <FaGithub className="text-muted-foreground size-4" />
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    className="bg-muted/50 rounded-lg p-2"
                  >
                    <FaTwitter className="text-muted-foreground size-4" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    className="bg-muted/50 rounded-lg p-2"
                  >
                    <FaLinkedinIn className="text-muted-foreground size-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeems;
