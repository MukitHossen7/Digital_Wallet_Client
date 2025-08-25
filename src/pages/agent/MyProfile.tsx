/* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from "react";
// import { useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { User, Mail } from "lucide-react";
// import { toast } from "sonner";

// export default function MyProfile() {
//   const [loading, setLoading] = useState(false);
//   const [profile, setProfile] = useState({
//     name: "Ayesha Khan",
//     email: "ayesha@example.com",
//     phone: "017XXXXXXXX",
//     password: "",
//     image: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, files } = e.target;
//     if (name === "image" && files) {
//       setProfile({ ...profile, image: URL.createObjectURL(files[0]) });
//     } else {
//       setProfile({ ...profile, [name]: value });
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       toast.success("Profile updated successfully!");
//     }, 1000);
//   };

//   return (
//     <div className="container mx-auto px-4 md:px-6 py-6">
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Left Side - Agent Info */}
//         <Card className="w-full lg:w-1/3 p-6">
//           <div className="flex flex-col items-center text-center gap-4">
//             <Avatar className="h-24 w-24">
//               {profile.image ? (
//                 <AvatarImage src={profile.image} />
//               ) : (
//                 <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
//               )}
//             </Avatar>
//             <h2 className="text-xl font-semibold">{profile.name}</h2>
//             <div className="flex items-center gap-2 text-muted-foreground">
//               <Mail className="h-4 w-4" /> {profile.email}
//             </div>
//             <div className="flex items-center gap-2 text-muted-foreground">
//               <User className="h-4 w-4" /> Agent
//             </div>
//           </div>
//         </Card>

//         {/* Right Side - Edit Form */}
//         <Card className="w-full lg:w-2/3 p-6">
//           <CardHeader>
//             <CardTitle>Update Profile</CardTitle>
//             <CardDescription>
//               Edit your personal information, password, and profile image.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Name</Label>
//                   <Input
//                     name="name"
//                     value={profile.name}
//                     onChange={handleChange}
//                     placeholder="Full Name"
//                   />
//                 </div>
//                 <div>
//                   <Label>Email</Label>
//                   <Input
//                     name="email"
//                     value={profile.email}
//                     onChange={handleChange}
//                     placeholder="Email Address"
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Phone</Label>
//                   <Input
//                     name="phone"
//                     value={profile.phone}
//                     onChange={handleChange}
//                     placeholder="Phone Number"
//                   />
//                 </div>
//                 <div>
//                   <Label>Password</Label>
//                   <Input
//                     type="password"
//                     name="password"
//                     value={profile.password}
//                     onChange={handleChange}
//                     placeholder="New Password"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <Label>Profile Image</Label>
//                 <Input
//                   type="file"
//                   name="image"
//                   accept="image/*"
//                   onChange={handleChange}
//                   className="pt-1"
//                 />
//               </div>
//               <Button type="submit" disabled={loading}>
//                 {loading ? "Saving..." : "Update Profile"}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { Camera, User } from "lucide-react";

// -------------------- Validation --------------------
const agentProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(20)
    .regex(
      /^(?:\+?88)?01[3-9][0-9]{8}$/,
      "Enter a valid Bangladeshi phone (e.g. 017XXXXXXXX)"
    ),
});

type AgentProfileForm = z.infer<typeof agentProfileSchema>;

// -------------------- Mock agent data --------------------
const MOCK_AGENT = {
  id: "agent_001",
  name: "Rahim Uddin",
  email: "rahim.agent@example.com",
  phone: "+8801712345678",
  avatarUrl: "",
};

export default function AgentProfile() {
  const [loading, setLoading] = useState(true);
  const [agent, setAgent] = useState<typeof MOCK_AGENT | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const agentForm = useForm<AgentProfileForm>({
    resolver: zodResolver(agentProfileSchema),
    defaultValues: { name: "", phone: "" },
    mode: "onChange",
  });

  useEffect(() => {
    // Simulate fetch agent (replace with RTK Query)
    const t = setTimeout(() => {
      setAgent(MOCK_AGENT);
      agentForm.reset({ name: MOCK_AGENT.name, phone: MOCK_AGENT.phone });
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  // Avatar change preview
  function handleAvatarChange(file?: File) {
    if (!file) return;
    setAvatarFile(file);
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  }

  async function onSubmitAgentProfile(values: AgentProfileForm) {
    try {
      await toast.promise(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              setAgent((a) =>
                a ? { ...a, name: values.name, phone: values.phone } : a
              );
              resolve(true);
            }, 900);
          }),
        {
          loading: "Updating agent profile...",
          success: "Agent profile updated successfully!",
          error: "Failed to update agent profile",
        }
      );

      if (avatarFile) {
        await new Promise((r) => setTimeout(r, 600));
        toast.success("Avatar uploaded");
      }
    } catch {
      toast.error("Failed to update agent profile");
    }
  }

  return (
    <div className="container mx-auto max-w-6xl px-3 md:px-6 py-6 md:py-8">
      <Toaster />

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <User className="h-6 w-6 text-primary" /> Agent Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Update your agent details and avatar
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: <span className="font-medium">Today</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Avatar & summary */}
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>Agent Info</CardTitle>
            <CardDescription>Personal details & avatar</CardDescription>
          </CardHeader>

          <CardContent>
            {loading || !agent ? (
              <div className="space-y-3">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-28 w-28">
                  {avatarPreview ? (
                    <AvatarImage src={avatarPreview} alt="avatar" />
                  ) : agent.avatarUrl ? (
                    <AvatarImage src={agent.avatarUrl} alt="avatar" />
                  ) : (
                    <AvatarFallback>
                      {agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="w-full space-y-2 text-center">
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="font-medium">{agent.name}</div>

                  <div className="text-sm text-muted-foreground mt-2">
                    Email
                  </div>
                  <div className="font-medium">{agent.email}</div>

                  <div className="text-sm text-muted-foreground mt-2">
                    Phone
                  </div>
                  <div className="font-medium">{agent.phone}</div>
                </div>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleAvatarChange(f);
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 rounded-xl"
                  >
                    <Camera className="h-4 w-4" /> Change avatar
                  </Button>
                </label>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right: Edit Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Update Agent Profile</CardTitle>
            <CardDescription>Edit name, phone, and avatar</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={agentForm.handleSubmit(onSubmitAgentProfile)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  placeholder="Full name"
                  {...agentForm.register("name")}
                  className="rounded-xl mt-1"
                />
                {agentForm.formState.errors.name && (
                  <p className="text-destructive text-xs mt-1">
                    {agentForm.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    +88
                  </span>
                  <Input
                    id="phone"
                    placeholder="17XXXXXXXX"
                    className="pl-12 rounded-xl"
                    {...agentForm.register("phone")}
                  />
                </div>
                {agentForm.formState.errors.phone && (
                  <p className="text-destructive text-xs mt-1">
                    {agentForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2 flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  type="button"
                  className="rounded-xl"
                  onClick={() =>
                    agentForm.reset(
                      agent ? { name: agent.name, phone: agent.phone } : {}
                    )
                  }
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl"
                  disabled={
                    !agentForm.formState.isValid ||
                    agentForm.formState.isSubmitting
                  }
                >
                  Save changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6" />
      <div className="text-sm text-muted-foreground">
        Need help? Contact support at{" "}
        <a className="underline" href="mailto:support@wallet.example">
          support@wallet.example
        </a>
      </div>
    </div>
  );
}
