import { motion } from "framer-motion";
import { Mail, PhoneCall, Send, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ContactUs = () => {
  return (
    <section className="relative py-20  bg-background overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Side: Contact Details & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full lg:max-w-md"
          >
            <div className="mb-10">
              <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">
                Reach Out to Us
              </h2>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
                Let&apos;s talk about your{" "}
                <span className="text-primary">NeoPaay</span> experience.
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you’re an agent, merchant, or user, our dedicated team
                is here 24/7 to help you manage your digital assets.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                {
                  icon: <PhoneCall />,
                  title: "Call Center",
                  detail: "+880 1326 153447",
                  sub: "Available 24/7",
                },
                {
                  icon: <Mail />,
                  title: "Support Email",
                  detail: "hossenmukit7@gmail.com",
                  sub: "Response within 2 hours",
                },
                {
                  icon: <Clock />,
                  title: "Working Hours",
                  detail: "Sunday - Thursday",
                  sub: "9:00 AM - 6:00 PM",
                },
                {
                  icon: <MapPin />,
                  title: "Headquarters",
                  detail: "Banani, Dhaka, Bangladesh",
                  sub: "NeoPay Finance Tower",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-5 p-4 rounded-2xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-base font-bold text-foreground">
                      {item.detail}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <Card className="border-none shadow-none shadow-primary/5 bg-card/60 backdrop-blur-md overflow-hidden relative border border-border">
              {/* Form Top Accent */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />

              <CardHeader className="pt-10 px-8">
                <CardTitle className="text-3xl font-bold">
                  Send Message
                </CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and an expert will reach out shortly.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-8 pb-10">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstname" className="font-semibold ml-1">
                        First Name
                      </Label>
                      <Input
                        id="firstname"
                        placeholder="John"
                        className="h-12 bg-background/50 border-border focus-visible:ring-1 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastname" className="font-semibold ml-1">
                        Last Name
                      </Label>
                      <Input
                        id="lastname"
                        placeholder="Doe"
                        className="h-12 bg-background/50 border-border focus-visible:ring-1 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-semibold ml-1">
                      Corporate Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      className="h-12 bg-background/50 border-border focus-visible:ring-1 rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-semibold ml-1">
                      Inquiry Type
                    </Label>
                    <Input
                      id="subject"
                      placeholder="e.g. Agent Account Request"
                      className="h-12 bg-background/50 border-border focus-visible:ring-1 rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-semibold ml-1">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you scale today?"
                      className="min-h-[150px] bg-background/50 border-border focus-visible:ring-1 rounded-lg resize-none"
                    />
                  </div>

                  <Button className="w-full h-14 text-lg font-bold rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                    <Send className="w-5 h-5 mr-2" />
                    Connect with NeoPay
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
