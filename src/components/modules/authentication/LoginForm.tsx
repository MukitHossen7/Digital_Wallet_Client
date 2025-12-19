// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import loginImg from "../../../assets/images/login.jpg";
// import { Link, useNavigate } from "react-router";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import Password from "@/components/ui/Password";
// import z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
// import { useLoginMutation } from "@/redux/features/auth/auth.api";
// import config from "@/config";
// import { ChevronLeft } from "lucide-react";
// import ForgotPasswordDialog from "./ForgotPasswordDialog";

// const loginSchema = z.object({
//   email: z.email(),
//   password: z.string().min(8, {
//     error: "password is short!",
//   }),
// });
// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const [login] = useLoginMutation();
//   const navigate = useNavigate();
//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const demoUsers = [
//     { label: "Admin", email: "admin@gmail.com", password: "Admin123@" },
//     { label: "User", email: "hossenmukit7@gmail.com", password: "User123@" },
//     { label: "Agent", email: "mukithossen7@gmail.com", password: "Agent123@" },
//   ];

//   const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
//     let toastId: string | number | undefined;
//     try {
//       const loginData = {
//         email: data.email,
//         password: data.password,
//       };
//       toastId = toast.loading("Logging in, please wait...");
//       const res = await login(loginData).unwrap();
//       if (res.success) {
//         toast.success("Login Successfully", { id: toastId });
//         navigate("/");
//       } else {
//         toast.error("Invalid credentials", { id: toastId });
//       }
//     } catch (error: any) {
//       const message =
//         error?.data?.message || "Something went wrong. Please try again.";
//       toast.error(message, { id: toastId });

//       // if (message === "Password is incorrect") {
//       //   toast.error("Invalid credentials");
//       //   return;
//       // }

//       if (message === "Your account is not Verified") {
//         toast.error("Your account is not Verified");
//         navigate("/verify", { state: data.email });
//       }

//       console.error(error);
//     }
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card className="overflow-hidden p-0">
//         <CardContent className="grid p-0 md:grid-cols-2">
//           <Form {...form}>
//             <form
//               className="p-6 md:p-8"
//               onSubmit={form.handleSubmit(handleSubmit)}
//             >
//               <div className="flex flex-col gap-6">
//                 <div className="flex justify-start">
//                   <Button
//                     asChild
//                     variant="outline"
//                     size="sm"
//                     className="flex items-center gap-2"
//                   >
//                     <Link to="/">
//                       <ChevronLeft className="h-4 w-4" />
//                       Back to Home
//                     </Link>
//                   </Button>
//                 </div>

//                 <div className="flex flex-col items-center text-center">
//                   <h1 className="text-2xl font-bold">Welcome back</h1>
//                   <p className="text-muted-foreground text-balance">
//                     Login to your NeoPay account
//                   </p>
//                 </div>
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="john@gamil.com"
//                           type="email"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormDescription className="sr-only">
//                         This is your public display email.
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <div className="flex items-center">
//                         <FormLabel>Password</FormLabel>
//                         <p className="ml-auto text-sm underline-offset-2 hover:underline hover:cursor-pointer">
//                           <ForgotPasswordDialog />
//                         </p>
//                       </div>
//                       <FormControl>
//                         <Password {...field} />
//                       </FormControl>
//                       <FormDescription className="sr-only">
//                         This is your public display password.
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button type="submit" className="w-full">
//                   Login
//                 </Button>
//                 <div className="text-center mb-4">
//                   <h2 className="text-sm font-medium text-muted-foreground mb-2">
//                     Demo Users
//                   </h2>
//                   <div className="flex flex-wrap justify-center gap-2">
//                     {demoUsers.map((user) => (
//                       <Button
//                         key={user.label}
//                         size="sm"
//                         variant="outline"
//                         onClick={() => {
//                           form.setValue("email", user.email);
//                           form.setValue("password", user.password);
//                         }}
//                       >
//                         {user.label}
//                       </Button>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
//                   <span className="bg-card text-muted-foreground relative z-10 px-2">
//                     Or continue with
//                   </span>
//                 </div>
//                 <div className=" gap-4">
//                   <Button
//                     variant="outline"
//                     type="button"
//                     className="w-full cursor-pointer"
//                     onClick={() =>
//                       (window.location.href = `${config.base_url}/auth/google`)
//                     }
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                       <path
//                         d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
//                         fill="currentColor"
//                       />
//                     </svg>
//                     <span className="">Login with Google</span>
//                   </Button>
//                 </div>
//                 <div className="text-center text-sm">
//                   Don&apos;t have an account?{" "}
//                   <Link to="/register" className="underline underline-offset-4">
//                     Sign up
//                   </Link>
//                 </div>
//               </div>
//             </form>
//           </Form>
//           <div className="bg-muted relative hidden md:block">
//             <img
//               src={loginImg}
//               alt="Image"
//               className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
//             />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import loginImg from "../../../assets/images/login.jpg";
import { Link, useNavigate } from "react-router";

import { useForm } from "react-hook-form";
import Password from "@/components/ui/Password";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import config from "@/config";
import { ChevronLeft, KeyRound, Mail } from "lucide-react";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const demoUsers = [
    { label: "Admin", email: "admin@gmail.com", password: "Admin123@" },
    { label: "User", email: "hossenmukit7@gmail.com", password: "User123@" },
    { label: "Agent", email: "mukithossen7@gmail.com", password: "Agent123@" },
  ];

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    const toastId: string | number | undefined = toast.loading(
      "Securely logging in..."
    );
    try {
      const res = await login(data).unwrap();
      if (res.success) {
        toast.success("Welcome to NeoPay!", { id: toastId });
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed", { id: toastId });

      if (error?.data?.message === "Your account is not Verified") {
        navigate("/verify", { state: data.email });
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-none shadow-none rounded-lg bg-card/80 backdrop-blur-xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                {/* Header Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-6">
                    <Link
                      to="/"
                      className="flex items-center text-sm font-semibold text-primary hover:gap-1 transition-all"
                    >
                      <ChevronLeft className="h-4 w-4" /> Back to Home
                    </Link>
                  </div>
                  <h1 className="text-3xl font-black tracking-tight text-foreground">
                    Welcome <span className="text-primary">Back</span>
                  </h1>
                  <p className="text-muted-foreground text-sm font-medium">
                    Access your secure NeoPay wallet dashboard.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="name@email.com"
                              className="pl-10 h-12 bg-background border-border/50 focus-visible:ring-1 rounded-md"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Password
                          </FormLabel>
                          <ForgotPasswordDialog />
                        </div>
                        <FormControl>
                          <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                            <Password
                              className="pl-10 h-12 bg-background border-border/50 focus-visible:ring-1 rounded-md"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-bold rounded-md shadow-none shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95"
                >
                  Secure Login
                </Button>

                <div className="space-y-3 pt-2">
                  <p className="text-[10px] text-center font-bold uppercase tracking-widest text-muted-foreground">
                    Quick Access Demo
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {demoUsers.map((user) => (
                      <button
                        key={user.label}
                        type="button"
                        onClick={() => {
                          form.setValue("email", user.email);
                          form.setValue("password", user.password);
                        }}
                        className="px-3 py-1.5 text-xs font-bold rounded-sm border border-border hover:border-primary hover:text-primary transition-all bg-background/50"
                      >
                        {user.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground font-semibold tracking-tighter">
                      Secure Social Access
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full h-12 rounded-md border-border/50 hover:bg-secondary font-semibold transition-all"
                  onClick={() =>
                    (window.location.href = `${config.base_url}/auth/google`)
                  }
                >
                  <motion.svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </motion.svg>
                  Sign in with Google
                </Button>

                <p className="text-center text-sm text-muted-foreground font-medium">
                  New to NeoPay?{" "}
                  <Link
                    to="/register"
                    className="text-primary font-bold hover:underline underline-offset-4"
                  >
                    Create Account
                  </Link>
                </p>
              </form>
            </Form>
          </div>

          {/* Right Side Image Section */}
          <div className="relative hidden md:block bg-primary/5">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            <img
              src={loginImg}
              alt="Digital Wallet"
              className="absolute inset-0 h-full w-full object-cover dark:opacity-50 rounded"
            />
            <div className="absolute bottom-10 left-10 z-20 text-white max-w-xs">
              <h2 className="text-2xl font-bold mb-2 italic tracking-tighter">
                NeoPay Wallet
              </h2>
              <p className="text-sm font-medium opacity-90 leading-relaxed">
                Experience the next generation of mobile financial services.
                Fast, Secure, and Reliable.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
