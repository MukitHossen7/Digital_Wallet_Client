import { LoginForm } from "@/components/modules/authentication/LoginForm";
import { Helmet } from "react-helmet";

const Login = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <Helmet>
        <title>Login - NEOPAY</title>
        <meta name="description" content="This is Login Page" />
      </Helmet>
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
