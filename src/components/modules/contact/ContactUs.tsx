import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Mail, PhoneCall } from "lucide-react";

const ContactUs = () => {
  return (
    <section className="py-12 md:pt-0 md:pb-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:gap-20 p-10">
        {/* Contact Form - Left Side */}
        <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border p-10 lg:mx-0">
          <div className="flex gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="firstname">First Name</Label>
              <Input type="text" id="firstname" placeholder="First Name" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="lastname">Last Name</Label>
              <Input type="text" id="lastname" placeholder="Last Name" />
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Input type="text" id="subject" placeholder="Subject" />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea placeholder="Type your message here." id="message" />
          </div>
          <Button className="w-full">Send Message</Button>
        </div>

        {/* Contact Details - Right Side */}
        <div className="mx-auto flex max-w-sm flex-col justify-end gap-10 lg:mx-0">
          <div className="mx-auto w-fit lg:mx-0">
            <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
              Contact Details
            </h3>
            <div className="">
              <div className="flex items-center gap-3 mb-2">
                <PhoneCall className="w-6 h-6" />
                <span className="font-bold">Phone: </span>
                +88801326153447
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-6 h-6" />
                <span className="font-bold"> Email: </span>
                hossenmukit7@gmail.com
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-6 h-6" />
                <span className="font-bold">Web: </span>
                shadcnblocks.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
