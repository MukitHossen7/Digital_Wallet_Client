// import { Link } from "react-router";
// import logo from "../../assets/images/logo (1).png";
// const Footer = () => {
//   return (
//     <div>
//       <footer className=" w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto divide-y">
//         <div className="flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
//           <div className="lg:w-1/3">
//             <Link to="/">
//               <div className="flex items-center gap-1">
//                 <img className="w-8 h-8" src={logo} />
//                 <p className="text-xl font-bold uppercase">NeoPay</p>
//               </div>
//             </Link>
//           </div>
//           <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
//             <div className="space-y-3">
//               <h3 className="tracking-wide uppercase">Product</h3>
//               <ul className="space-y-1">
//                 <li>
//                   <Link to="/about">About</Link>
//                 </li>
//                 <li>
//                   <Link to="/feature">Features</Link>
//                 </li>
//                 <li>
//                   <Link to="/contact">Contact</Link>
//                 </li>
//                 <li>
//                   <Link to="/faq">FAQ</Link>
//                 </li>
//               </ul>
//             </div>
//             <div className="space-y-3">
//               <h3 className="tracking-wide uppercase">Company</h3>
//               <ul className="space-y-1">
//                 <li>
//                   <a>Privacy</a>
//                 </li>
//                 <li>
//                   <a>Terms of Service</a>
//                 </li>
//               </ul>
//             </div>
//             <div className="space-y-3">
//               <h3 className="uppercase">Developers</h3>
//               <ul className="space-y-1">
//                 <li>
//                   <a>Public API</a>
//                 </li>
//                 <li>
//                   <a>Documentation</a>
//                 </li>
//                 <li>
//                   <a>Guides</a>
//                 </li>
//               </ul>
//             </div>
//             <div className="space-y-3">
//               <div className="uppercase">Social media</div>
//               <div className="flex justify-start space-x-3">
//                 <a className="flex items-center p-1">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="currentColor"
//                     viewBox="0 0 32 32"
//                     className="w-5 h-5 fill-current"
//                   >
//                     <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
//                   </svg>
//                 </a>
//                 <a className="flex items-center p-1">
//                   <svg
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-5 h-5 fill-current"
//                   >
//                     <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
//                   </svg>
//                 </a>
//                 <a className="flex items-center p-1">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 32 32"
//                     fill="currentColor"
//                     className="w-5 h-5 fill-current"
//                   >
//                     <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z"></path>
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="py-6 text-sm text-center">
//           © 2025 <strong>NeoPay</strong>. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Footer;

import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

import { Logo } from "../layout/Logo";

const footerLinks = {
  product: [
    { label: "About Us", href: "/about" },
    { label: "Features", href: "/feature" },
    { label: "Pricing", href: "/pricing" },
    { label: "Merchant API", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Security", href: "#" },
    { label: "System Status", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Compliance", href: "#" },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card/30 border-t pt-16 pb-8 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="w-11/12 md:w-11/12 lg:w-11/12 xl:container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Description Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link
              to="/"
              className="flex items-center gap-1.5 sm:gap-2 transition-transform hover:scale-105 shrink-0"
            >
              <Logo className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />

              <div className="flex flex-col leading-none">
                <p className="text-lg sm:text-xl font-bold tracking-tight uppercase">
                  Neo<span className="text-primary">Pay</span>
                </p>
                <span className="hidden sm:block text-[8px] lg:text-[10px] font-medium text-muted-foreground tracking-[0.1em] lg:tracking-[0.2em] uppercase">
                  Digital Wallet
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              The next generation digital wallet for secure, instant, and
              borderless transactions. Empolwering your financial freedom
              anytime, anywhere.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Mail size={18} className="text-primary" />
                <span>support@neopay.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Phone size={18} className="text-primary" />
                <span>+880 123 456 789</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Product Links */}
            <div className="space-y-5">
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">
                Product
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-5">
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">
                Support
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-5">
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">
              Stay Updated
            </h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to get the latest news and updates.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-background border border-border rounded-lg py-3 px-4 outline-none focus:border-primary/50 transition-all pr-12"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-lg hover:scale-105 active:scale-95 transition-all">
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4 pt-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5 }}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer border border-primary/5"
                >
                  <Icon
                    size={18}
                    fill="currentColor"
                    className={
                      Icon === Linkedin || Icon === Twitter
                        ? ""
                        : "fill-current"
                    }
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear}{" "}
            <span className="font-bold text-foreground">NeoPay</span>. All
            rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-4 grayscale opacity-50 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-4 grayscale opacity-50 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              className="h-4 grayscale opacity-50 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
