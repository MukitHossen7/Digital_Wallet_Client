// src/pages/ContactPage.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from "react-icons/fi";
import { toast } from "sonner";
import ContactHero from "@/components/modules/contact/ContactHero";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <ContactHero />
      {/* Contact Form + Info */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <Card className="shadow-lg rounded-2xl bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Send us a message
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <Textarea
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                required
                className="h-32"
              />
              <Button
                type="submit"
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info + Map */}
        <div className="space-y-8">
          {/* Info */}
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <h2 className="text-xl font-semibold">Contact Info</h2>
            <p>📧 Email: support@neopay.com</p>
            <p>📞 Phone: +880 1234 567890</p>
            <p>🏢 Address: NeoPay HQ, Dhaka, Bangladesh</p>

            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-indigo-600">
                <FiFacebook size={24} />
              </a>
              <a href="#" className="hover:text-indigo-600">
                <FiTwitter size={24} />
              </a>
              <a href="#" className="hover:text-indigo-600">
                <FiLinkedin size={24} />
              </a>
              <a href="#" className="hover:text-indigo-600">
                <FiInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="w-full h-64 rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.903432227036!2d90.38702411543026!3d23.750899084585926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b08b9c1f3f%3A0x85b28b0f0a52a6d1!2sDhaka%20Bangladesh!5e0!3m2!1sen!2sus!4v1695999999999!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
