// /* eslint-disable @typescript-eslint/no-explicit-any */
// import SingleImageUploader from "@/components/SingleImageUploader";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useGetMeQuery } from "@/redux/features/auth/auth.api";
// import { useUpdateUserProfileMutation } from "@/redux/features/user/user.api";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { SquarePen } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import z from "zod";

// const profileSchema = z.object({
//   name: z.string().min(2, { error: "Name is Required" }).max(50),
//   phone: z
//     .string()
//     .min(10, { error: "Enter a valid phone number" })
//     .max(20)
//     .regex(
//       /^(?:\+?88)?01[3-9][0-9]{8}$/,
//       "Enter a valid Bangladeshi phone (e.g. 017XXXXXXXX)"
//     ),
//   address: z.string().min(2, { error: "Address is Required" }),
// });

// type ProfileForm = z.infer<typeof profileSchema>;

// const ProfileModal = () => {
//   const [open, setOpen] = useState(false);
//   const [image, setImage] = useState<File | null>(null);
//   const [updateUserProfile] = useUpdateUserProfileMutation();
//   const { data: adminData } = useGetMeQuery(undefined);

//   const profileForm = useForm<ProfileForm>({
//     resolver: zodResolver(profileSchema),
//     defaultValues: {
//       name: "",
//       phone: "",
//       address: "",
//     },
//   });

//   useEffect(() => {
//     if (adminData?.data) {
//       profileForm.reset({
//         name: adminData.data.name ?? "",
//         phone: adminData.data.phone ?? "",
//         address: adminData.data.address ?? "",
//       });
//     }
//   }, [adminData, profileForm]);

//   async function onSubmitProfile(values: ProfileForm) {
//     let toastId: string | number | undefined;
//     try {
//       toastId = toast.loading("Processing update profile...");
//       const formData = new FormData();
//       formData.append("data", JSON.stringify(values));
//       if (image) {
//         formData.append("file", image as File);
//       }
//       const res = await updateUserProfile(formData).unwrap();
//       if (res.success) {
//         toast.success("Update Profile Successfully", { id: toastId });
//       } else {
//         toast.error("Update Profile Failed", { id: toastId });
//       }
//     } catch (error: any) {
//       if (toastId) {
//         toast.error(error?.data?.message, { id: toastId });
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline" size="sm">
//           <SquarePen className="w-4 h-4" />
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Update Profile</DialogTitle>
//           <DialogDescription>
//             Make your profile look professional.
//           </DialogDescription>
//         </DialogHeader>
//         <form
//           onSubmit={profileForm.handleSubmit(onSubmitProfile)}
//           className="space-y-4"
//         >
//           <Card>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="name">Full Name</Label>
//                   <Input
//                     id="name"
//                     placeholder="Your full name"
//                     className="mt-1"
//                     {...profileForm.register("name")}
//                   />
//                   {profileForm.formState.errors.name && (
//                     <p className="text-red-500 text-sm">
//                       {profileForm.formState.errors.name.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <Label htmlFor="phone">Phone</Label>
//                   <div className="relative mt-1">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
//                       +88
//                     </span>
//                     <Input
//                       id="phone"
//                       placeholder="17XXXXXXXX"
//                       className="pl-12"
//                       {...profileForm.register("phone")}
//                     />
//                   </div>
//                   {profileForm.formState.errors.phone && (
//                     <p className="text-red-500 text-sm">
//                       {profileForm.formState.errors.phone.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="address">Address</Label>
//                 <Input
//                   id="address"
//                   placeholder="Your address"
//                   className="mt-1"
//                   {...profileForm.register("address")}
//                 />
//                 {profileForm.formState.errors.address && (
//                   <p className="text-red-500 text-sm">
//                     {profileForm.formState.errors.address.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label className="mb-1">Profile Image</Label>
//                 <SingleImageUploader onChange={setImage} />
//               </div>
//             </CardContent>
//           </Card>

//           <DialogFooter className="flex justify-end gap-2">
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <Button type="submit">Save Changes</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ProfileModal;

/* eslint-disable @typescript-eslint/no-explicit-any */
import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { useUpdateUserProfileMutation } from "@/redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SquarePen,
  User,
  Phone as PhoneIcon,
  MapPin,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Camera,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { motion, Variants } from "framer-motion";

// -------------------- Validation Schema --------------------
const profileSchema = z.object({
  name: z.string().min(2, { error: "Name is Required" }).max(50),
  phone: z
    .string()
    .min(10, { error: "Enter a valid phone number" })
    .max(20)
    .regex(
      /^(?:\+?88)?01[3-9][0-9]{8}$/,
      "Enter a valid Bangladeshi phone (e.g. 017XXXXXXXX)"
    ),
  address: z.string().min(2, { error: "Address is Required" }),
});

type ProfileForm = z.infer<typeof profileSchema>;

// --- FIXED ANIMATION VARIANTS WITH PROPER TYPES ---
const formItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const ProfileModal = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const { data: adminData } = useGetMeQuery(undefined);

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (adminData?.data) {
      profileForm.reset({
        name: adminData.data.name ?? "",
        phone: adminData.data.phone ?? "",
        address: adminData.data.address ?? "",
      });
    }
  }, [adminData, profileForm]);

  async function onSubmitProfile(values: ProfileForm) {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Processing update profile...");
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      if (image) {
        formData.append("file", image as File);
      }
      const res = await updateUserProfile(formData).unwrap();
      if (res.success) {
        toast.success("Update Profile Successfully", { id: toastId });
        setOpen(false);
      } else {
        toast.error("Update Profile Failed", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-primary/10 hover:bg-primary text-primary hover:text-white border-primary/20 font-bold gap-2 rounded-xl transition-all duration-300"
        >
          <SquarePen className="w-4 h-4" />
          <span className="hidden md:inline">Edit Profile</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-none bg-background shadow-2xl ring-1 ring-primary/10">
        {/* Fintech Styled Top Banner */}
        <div className="bg-primary px-6 py-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
            <User className="w-32 h-32 text-white" />
          </div>
          <DialogHeader className="relative z-10 text-left">
            <DialogTitle className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <Camera className="w-6 h-6" /> Profile{" "}
              <span className="text-white/80">Settings</span>
            </DialogTitle>
            <DialogDescription className="text-white/80 font-medium">
              Update your personal identity for a better user experience.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="max-h-[75vh] overflow-y-auto px-6 py-6 custom-scrollbar">
          <form
            onSubmit={profileForm.handleSubmit(onSubmitProfile)}
            className="space-y-6"
          >
            <div className="space-y-5">
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={formItemVariants}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="name"
                    className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-primary" /> Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    className="h-12 rounded-xl border-primary/10 bg-secondary/20 focus:bg-background focus:ring-primary/20 transition-all font-semibold"
                    {...profileForm.register("name")}
                  />
                  {profileForm.formState.errors.name && (
                    <p className="text-destructive text-[11px] font-bold mt-1">
                      {profileForm.formState.errors.name.message}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={formItemVariants}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="phone"
                    className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"
                  >
                    <PhoneIcon className="w-3.5 h-3.5 text-primary" /> Phone
                    Number
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-primary border-r border-primary/20 pr-3">
                      +88
                    </span>
                    <Input
                      id="phone"
                      placeholder="017XXXXXXXX"
                      className="h-12 pl-16 rounded-xl border-primary/10 bg-secondary/20 focus:bg-background font-semibold"
                      {...profileForm.register("phone")}
                    />
                  </div>
                  {profileForm.formState.errors.phone && (
                    <p className="text-destructive text-[11px] font-bold mt-1">
                      {profileForm.formState.errors.phone.message}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Row 2: Address */}
              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={formItemVariants}
                className="space-y-2"
              >
                <Label
                  htmlFor="address"
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Branch
                  Location / Address
                </Label>
                <Input
                  id="address"
                  placeholder="Type your current address"
                  className="h-12 rounded-xl border-primary/10 bg-secondary/20 focus:bg-background font-semibold"
                  {...profileForm.register("address")}
                />
                {profileForm.formState.errors.address && (
                  <p className="text-destructive text-[11px] font-bold mt-1">
                    {profileForm.formState.errors.address.message}
                  </p>
                )}
              </motion.div>

              {/* Image Upload Area */}
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={formItemVariants}
                className="space-y-2"
              >
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-primary" /> Profile
                  Photo
                </Label>
                <div className="rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 p-4 hover:bg-primary/10 transition-colors">
                  <SingleImageUploader onChange={setImage} />
                </div>
              </motion.div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full sm:w-auto font-bold text-muted-foreground hover:bg-muted rounded-xl h-12 px-8"
                >
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs h-12 px-10 rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Update Now
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
