/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import loginImg from "../../../assets/images/login.jpg";
import { Link, useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Password from "@/components/ui/Password";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import config from "@/config";
import { ChevronLeft } from "lucide-react";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, {
    error: "password is short!",
  }),
});
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const demoUsers = [
    { label: "Admin", email: "admin@gmail.com", password: "Admin123@" },
    { label: "User", email: "hossenmukit7@gmail.com", password: "User123@" },
    { label: "Agent", email: "mukithossen7@gmail.com", password: "Agent123@" },
  ];

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    let toastId: string | number | undefined;
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };
      toastId = toast.loading("Logging in, please wait...");
      const res = await login(loginData).unwrap();
      if (res.success) {
        toast.success("Login Successfully", { id: toastId });
        navigate("/");
      }
    } catch (error: any) {
      const message = error?.data?.message || "Something went wrong";
      if (toastId) {
        toast.error(message, { id: toastId });
      } else {
        toast.error(message);
      }

      if (message === "Password is incorrect") {
        toast.error("Invalid credentials");
        return;
      }

      if (message === "Your account is not Verified") {
        toast.error("Your account is not Verified");
        navigate("/verify", { state: data.email });
      }

      console.error(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              className="p-6 md:p-8"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className="flex flex-col gap-6">
                <div className="flex justify-start">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Link to="/">
                      <ChevronLeft className="h-4 w-4" />
                      Back to Home
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your NeoPay account
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@gamil.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <p className="ml-auto text-sm underline-offset-2 hover:underline hover:cursor-pointer">
                          <ForgotPasswordDialog />
                        </p>
                      </div>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <div className="text-center mb-4">
                  <h2 className="text-sm font-medium text-muted-foreground mb-2">
                    Demo Users
                  </h2>
                  <div className="flex flex-wrap justify-center gap-2">
                    {demoUsers.map((user) => (
                      <Button
                        key={user.label}
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          form.setValue("email", user.email);
                          form.setValue("password", user.password);
                        }}
                      >
                        {user.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className=" gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full cursor-pointer"
                    onClick={() =>
                      (window.location.href = `${config.base_url}/auth/google`)
                    }
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="">Login with Google</span>
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={loginImg}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
