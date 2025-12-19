import { LoginForm } from "@/components/modules/authentication/LoginForm";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="relative min-h-svh flex items-center justify-center p-4 md:p-10 bg-background overflow-hidden">
      <Helmet>
        <title>Login - NEOPAY</title>
        <meta
          name="description"
          content="Securely login to your NeoPay account"
        />
      </Helmet>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm md:max-w-4xl z-10"
      >
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default Login;
