import ContactHero from "@/components/modules/contact/ContactHero";
import ContactUs from "@/components/modules/contact/ContactUs";
import { Helmet } from "react-helmet";

const Contact = () => {
  return (
    <div className="">
      <Helmet>
        <title>Contact - NEOPAY</title>
        <meta name="description" content="This is Contact Page" />
      </Helmet>
      <ContactHero />
      <ContactUs />
    </div>
  );
};

export default Contact;
