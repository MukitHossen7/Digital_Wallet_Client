import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Mail, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    // <section className="py-12 md:pt-0 md:pb-16">
    //   <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:gap-20 p-10">
    //     {/* Contact Form - Left Side */}
    //     <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border p-10 lg:mx-0">
    //       <div className="flex gap-4">
    //         <div className="grid w-full items-center gap-1.5">
    //           <Label htmlFor="firstname">First Name</Label>
    //           <Input type="text" id="firstname" placeholder="First Name" />
    //         </div>
    //         <div className="grid w-full items-center gap-1.5">
    //           <Label htmlFor="lastname">Last Name</Label>
    //           <Input type="text" id="lastname" placeholder="Last Name" />
    //         </div>
    //       </div>
    //       <div className="grid w-full items-center gap-1.5">
    //         <Label htmlFor="email">Email</Label>
    //         <Input type="email" id="email" placeholder="Email" />
    //       </div>
    //       <div className="grid w-full items-center gap-1.5">
    //         <Label htmlFor="subject">Subject</Label>
    //         <Input type="text" id="subject" placeholder="Subject" />
    //       </div>
    //       <div className="grid w-full gap-1.5">
    //         <Label htmlFor="message">Message</Label>
    //         <Textarea placeholder="Type your message here." id="message" />
    //       </div>
    //       <Button className="w-full">Send Message</Button>
    //     </div>

    //     {/* Contact Details - Right Side */}
    //     <div className="mx-auto flex max-w-sm flex-col justify-end gap-10 lg:mx-0">
    //       <div className="mx-auto w-fit lg:mx-0">
    //         <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
    //           Contact Details
    //         </h3>
    //         <div className="">
    //           <div className="flex items-center gap-3 mb-2">
    //             <PhoneCall className="w-6 h-6" />
    //             <span className="font-bold">Phone: </span>
    //             +88801326153447
    //           </div>
    //           <div className="flex items-center gap-3 mb-2">
    //             <Mail className="w-6 h-6" />
    //             <span className="font-bold"> Email: </span>
    //             hossenmukit7@gmail.com
    //           </div>
    //           <div className="flex items-center gap-3 mb-2">
    //             <Globe className="w-6 h-6" />
    //             <span className="font-bold">Web: </span>
    //             shadcnblocks.com
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-10"
        >
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
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
          <Button className="w-full bg-gray-900 hover:bg-gray-700 text-white transition">
            Send Message
          </Button>
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
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition">
              <PhoneCall className="w-6 h-6 text-gray-900 dark:text-white" />
              <span className="font-medium">+88801326153447</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition">
              <Mail className="w-6 h-6 text-gray-900 dark:text-white" />
              <span className="font-medium">hossenmukit7@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition">
              <Globe className="w-6 h-6 text-gray-900 dark:text-white" />
              <span className="font-medium">shadcnblocks.com</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
