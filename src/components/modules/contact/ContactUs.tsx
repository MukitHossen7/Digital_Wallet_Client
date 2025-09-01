import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Mail, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ContactUs = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 ">
      <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <Card className="rounded-md shadow-md">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we will get back to you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4 flex-col md:flex-row">
                <div className="flex-1">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    type="text"
                    id="firstname"
                    placeholder="First Name"
                    className="mt-1"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    type="text"
                    id="lastname"
                    placeholder="Last Name"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  placeholder="Type your message here."
                  id="message"
                  className="mt-1"
                />
              </div>

              <Button className="w-full transition">Send Message</Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-center lg:text-left">
            Contact Details
          </h2>
          <div className="space-y-4">
            <Card className="flex items-center flex-row gap-3 p-4  rounded-lg shadow hover:shadow-md transition">
              <PhoneCall className="w-6 h-6 text-gray-900 dark:text-white" />
              <span className="font-medium">+88801326153447</span>
            </Card>
            <Card className="flex items-center flex-row gap-3 p-4 rounded-lg shadow hover:shadow-md transition">
              <Mail className="w-6 h-6 text-gray-900 dark:text-gray-100" />
              <span className="font-medium">hossenmukit7@gmail.com</span>
            </Card>
            <Card className="flex items-center flex-row gap-3 p-4 rounded-lg shadow hover:shadow-md transition">
              <Globe className="w-6 h-6 text-gray-900 dark:text-gray-100" />
              <span className="font-medium">shadcnblocks.com</span>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
