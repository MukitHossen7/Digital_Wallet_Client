// import { RegisterForm } from "@/components/modules/authentication/RegisterForm";
// import { Helmet } from "react-helmet";

// const Register = () => {
//   return (
//     <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
//       <Helmet>
//         <title>Register - NEOPAY </title>
//         <meta name="description" content="This is Register Page" />
//       </Helmet>
//       <div className="w-full max-w-sm md:max-w-4xl">
//         <RegisterForm />
//       </div>
//     </div>
//   );
// };

// export default Register;

import { RegisterForm } from "@/components/modules/authentication/RegisterForm";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const Register = () => {
  return (
    <div className="relative min-h-svh flex items-center justify-center p-4 md:p-10 bg-background overflow-hidden">
      <Helmet>
        <title>Register - NEOPAY</title>
        <meta
          name="description"
          content="Create your secure NeoPay wallet account"
        />
      </Helmet>

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm md:max-w-4xl z-10"
      >
        <RegisterForm />
      </motion.div>
    </div>
  );
};

export default Register;
