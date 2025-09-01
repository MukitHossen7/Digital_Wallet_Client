import { RegisterForm } from "@/components/modules/authentication/RegisterForm";
import { Helmet } from "react-helmet";

const Register = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <Helmet>
        <title>Register - NEOPAY </title>
        <meta name="description" content="This is Register Page" />
      </Helmet>
      <div className="w-full max-w-sm md:max-w-4xl">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
