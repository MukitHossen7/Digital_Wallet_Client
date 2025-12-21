/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  ShieldMinus,
  UserCheck,
  Users,
  UserX,
  Filter,
  ShieldCheck,
  LayoutGrid,
  Phone,
  Mail,
} from "lucide-react";
import { useGetAllUsersStatisticsQuery } from "@/redux/features/stats/stats.api";
import { NumberTicker } from "@/components/ui/number-ticker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useHandleBlockMutation,
  useUnBlockUserMutation,
} from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MdBlockFlipped } from "react-icons/md";
import { Helmet } from "react-helmet";

const StatusBadge: React.FC<{ status?: string }> = ({ status }) => {
  const normalized = status?.toUpperCase() || "UNKNOWN";
  if (normalized === "ACTIVE")
    return (
      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 rounded-full px-3 py-1 font-bold text-[10px] tracking-widest">
        ● ACTIVE
      </Badge>
    );
  if (normalized === "BLOCKED" || normalized === "SUSPENDED")
    return (
      <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 rounded-full px-3 py-1 font-bold text-[10px] tracking-widest">
        ● {normalized}
      </Badge>
    );
  return <Badge variant="outline">{normalized}</Badge>;
};

export default function ManageUser() {
  const [handleBlock] = useHandleBlockMutation();
  const [unBlockUser] = useUnBlockUserMutation();
  const { data, isLoading } = useGetAllUsersStatisticsQuery(null);

  const handleBlockUser = async (id: string) => {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Processing user block...");
      const res = await handleBlock({ id: id }).unwrap();
      if (res.success) {
        toast.success("User blocked Successfully", { id: toastId });
      } else {
        toast.error("User blocked Failed", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  const handleUnblockUser = async (id: string) => {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Processing user unblock...");
      const res = await unBlockUser({ id: id }).unwrap();
      if (res.success) {
        toast.success("User unblocked Successfully", { id: toastId });
      } else {
        toast.error("User unblocked Failed", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div className="max-w-7xl container mx-auto py-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Helmet>
        <title>User Management | NEOPAY Admin</title>
      </Helmet>

      {/* Modern Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-card/40 backdrop-blur-md border border-border/50 p-6 md:p-8 rounded-lg shadow-none shadow-black/[0.02]">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-2xl shadow-none shadow-primary/20 text-white transform hover:rotate-6 transition-transform">
            <LayoutGrid className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              User <span className="text-primary">Management</span>
            </h1>
            <p className="text-muted-foreground font-medium text-sm md:text-base">
              Monitor, block, or verify system accounts
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-2xl font-bold text-xs uppercase tracking-widest hidden lg:flex"
          >
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center hidden lg:flex">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Total Users",
            value: data?.data?.totalUsers,
            icon: <Users />,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
          },
          {
            title: "Active Users",
            value: data?.data?.activeUsers,
            icon: <UserCheck />,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
          },
          {
            title: "Blocked Users",
            value: data?.data?.blockUsers,
            icon: <UserX />,
            color: "text-rose-500",
            bg: "bg-rose-500/10",
          },
        ].map((stat, idx) => (
          <Card
            key={idx}
            className="border shadow-sm shadow-black/[0.02] bg-card/60 backdrop-blur-sm rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-300"
          >
            <CardContent className="">
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:bg-primary group-hover:text-white transition-colors duration-500`}
                >
                  {stat.icon}
                </div>
                <Badge
                  variant="secondary"
                  className="font-black text-[10px] uppercase tracking-widest opacity-50"
                >
                  Snapshot
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-muted-foreground">
                  {stat.title}
                </p>
                <div className="text-3xl font-black tracking-tighter text-foreground">
                  <NumberTicker value={stat.value ?? 0} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Table Section */}
      <Card className="border-none shadow-none shadow-black/[0.03] rounded-lg overflow-hidden bg-card/40 backdrop-blur-xl border border-border/50">
        <CardHeader className="p-8 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" /> Registered
                Accounts
              </CardTitle>
              <CardDescription className="font-medium">
                Managing {data?.data?.userData?.length || 0} users in this view
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <Separator className="opacity-50" />

        <CardContent className="p-0">
          <div className="w-full">
            {isLoading ? (
              <div className="p-8 space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-2xl" />
                ))}
              </div>
            ) : data?.data?.userData?.length > 0 ? (
              <div className="w-full">
                {/* --- DESKTOP VIEW (Visible on LG, XL) --- */}

                <Table className="hidden xl:table w-full table-fixed">
                  <TableHeader className="bg-muted/30">
                    <TableRow className="border-none">
                      <TableHead className="py-6 pl-10 font-black uppercase text-[10px] tracking-widest text-muted-foreground w-[25%]">
                        Identity
                      </TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground w-[20%]">
                        Contact Info
                      </TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground w-[15%]">
                        Location
                      </TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground w-[10%] text-center">
                        Privilege
                      </TableHead>
                      <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground w-[15%] text-center">
                        Status
                      </TableHead>
                      <TableHead className="pr-10 font-black uppercase text-[10px] tracking-widest text-muted-foreground text-right w-[15%]">
                        Control
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data?.userData?.map((user: any) => (
                      <TableRow
                        key={user._id}
                        className="group border-b border-border/40 hover:bg-primary/[0.03] transition-colors"
                      >
                        <TableCell className="py-6 pl-10">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 border-2 border-background shadow-md">
                              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                {user.name
                                  .split(" ")
                                  .map((n: any) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="font-bold text-foreground leading-tight truncate">
                                {user.name}
                              </p>
                              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-tighter">
                                REF: {user._id.slice(-8)}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold">
                              {user.phone || "N/A"}
                            </span>
                            <span className="text-xs text-muted-foreground truncate">
                              {user.email}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="text-xs font-semibold">
                              {user?.address || "Bangladesh"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className="bg-background font-black text-[9px] uppercase tracking-tighter px-3"
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <StatusBadge status={user.isActive} />
                        </TableCell>
                        <TableCell className="pr-10">
                          <div className="flex justify-end items-center gap-3">
                            {user?.isActive === "ACTIVE" ? (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleBlockUser(user?._id)}
                                className="h-10 w-10 rounded-xl text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-none border border-rose-500/10"
                                title="Restrict Access"
                              >
                                <MdBlockFlipped className="h-5 w-5" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleUnblockUser(user?._id)}
                                className="h-10 w-10 rounded-xl text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-none border border-emerald-500/10"
                                title="Grant Access"
                              >
                                <ShieldMinus className="h-5 w-5" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* --- MOBILE & TABLET VIEW (Visible on SM, MD) --- */}
                <div className="xl:hidden  space-y-4">
                  {data?.data?.userData?.map((user: any) => (
                    <div
                      key={user._id}
                      className="bg-background/40 border border-border/50 rounded-2xl p-5 space-y-4 hover:shadow-md transition-all animate-in slide-in-from-right-4 duration-500"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-primary/20">
                            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs uppercase">
                              {user.name
                                .split(" ")
                                .map((n: any) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-foreground text-sm leading-tight">
                              {user.name}
                            </p>
                            <StatusBadge status={user.isActive} />
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-[9px] font-black uppercase tracking-tighter"
                        >
                          {user.role}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 py-3 border-y border-border/30">
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                            <Phone className="h-2.5 w-2.5" /> Contact
                          </p>
                          <p className="text-xs font-bold text-foreground truncate">
                            {user.phone || "N/A"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                            <Mail className="h-2.5 w-2.5" /> Email
                          </p>
                          <p className="text-xs font-bold text-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-1">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="text-[11px] font-medium">
                            {user?.address || "Bangladesh"}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          {user?.isActive === "ACTIVE" ? (
                            <Button
                              onClick={() => handleBlockUser(user?._id)}
                              size="sm"
                              variant="destructive"
                              className="rounded-xl h-6 px-4 font-bold text-[10px] uppercase shadow-sm"
                            >
                              <MdBlockFlipped className="mr-1.5 h-3 w-3" />{" "}
                              Block
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleUnblockUser(user?._id)}
                              size="sm"
                              className="rounded-xl h-6 px-4 font-bold text-[10px] uppercase bg-emerald-500 hover:bg-emerald-600 shadow-sm"
                            >
                              <ShieldMinus className="mr-1.5 h-3 w-3" /> Unblock
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-24 text-center">
                <div className="inline-flex p-8 rounded-full bg-muted/30 mb-6 animate-bounce">
                  <Users className="h-12 w-12 text-muted-foreground opacity-20" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  No users found
                </h3>
                <p className="text-muted-foreground max-w-xs mx-auto mt-2">
                  We couldn't find any registered accounts at this moment.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
