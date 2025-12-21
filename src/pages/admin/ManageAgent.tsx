/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Separator } from "@/components/ui/separator";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllAgentStatisticsQuery } from "@/redux/features/stats/stats.api";
import {
  useApproveAgentMutation,
  useSuspendAgentMutation,
} from "@/redux/features/user/user.api";
import {
  MapPin,
  UserCheck,
  Users,
  UserX,
  ShieldCheck,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { FaBan } from "react-icons/fa";
import { MdCheckCircleOutline } from "react-icons/md";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

// Animation Settings
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const StatusBadge: React.FC<{ status?: string }> = ({ status }) => {
  const normalized = status?.toUpperCase() || "UNKNOWN";
  const isActive = normalized === "ACTIVE";
  return (
    <Badge
      className={`${
        isActive
          ? "bg-primary/10 text-primary border-primary/20"
          : "bg-destructive/10 text-destructive border-destructive/20"
      } rounded-full px-3 py-1 font-semibold text-[10px] md:text-xs`}
    >
      {isActive ? "● ACTIVE" : `● ${normalized}`}
    </Badge>
  );
};

const ManageAgent = () => {
  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();
  const { data: agentData = [], isLoading } =
    useGetAllAgentStatisticsQuery(null);

  const handleApproveAgent = async (id: string) => {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Processing agent approval...");
      const res = await approveAgent({ id: id }).unwrap();
      if (res.success)
        toast.success("Agent approved successfully", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed", { id: toastId });
    }
  };

  const handleSuspendAgent = async (id: string) => {
    let toastId: string | number | undefined;
    try {
      toastId = toast.loading("Processing agent suspension...");
      const res = await suspendAgent({ id: id }).unwrap();
      if (res.success)
        toast.success("Agent suspended successfully", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed", { id: toastId });
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl container mx-auto py-6 space-y-8"
    >
      <Helmet>
        <title>Agent Management | NEOPAY</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Agent <span className="text-primary">Directory</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage, Approve and Review all registered agents.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-lg border border-border w-fit hidden lg:flex">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Admin Control Panel
          </span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Total Agents",
            value: agentData?.data?.totalAgents,
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            desc: "Full network count",
          },
          {
            title: "Active Agents",
            value: agentData?.data?.activeAgents,
            icon: UserCheck,
            color: "text-primary",
            bg: "bg-primary/10",
            desc: "Currently operational",
          },
          {
            title: "Suspended",
            value: agentData?.data?.blockAgents,
            icon: UserX,
            color: "text-destructive",
            bg: "bg-destructive/10",
            desc: "Awaiting review/blocked",
          },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <Card className="h-full border shadow-none bg-card/50 backdrop-blur-sm transition-all hover:shadow-primary/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bg} p-2 rounded-xl`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black tracking-tighter">
                  <NumberTicker
                    className={`${stat.color}`}
                    value={stat.value ?? 0}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  {stat.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Network List ({agentData?.data?.totalAgents ?? 0})
          </h2>
        </div>

        {isLoading ? (
          <div className="p-8 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-2xl" />
            ))}
          </div>
        ) : agentData?.data?.data?.length > 0 ? (
          <div>
            {/* ---- TABLE VIEW (Visible on XL only) ---- */}
            <div className="hidden xl:block">
              <Card className="border-none shadow-none overflow-hidden bg-card/60 backdrop-blur-sm">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-muted/40">
                      <TableRow className="border-b border-border">
                        <TableHead className="font-bold py-5 px-6">
                          AGENT PROFILE
                        </TableHead>
                        <TableHead className="font-bold">
                          CONTACT INFO
                        </TableHead>
                        <TableHead className="font-bold">LOCATION</TableHead>
                        <TableHead className="font-bold">ROLE</TableHead>
                        <TableHead className="font-bold">STATUS</TableHead>
                        <TableHead className="font-bold text-right px-8">
                          ACTIONS
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agentData?.data?.data?.map((user: any) => (
                        <TableRow
                          key={user?._id}
                          className="hover:bg-primary/5 transition-colors border-b border-border"
                        >
                          <TableCell className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                  {user?.name
                                    ?.split(" ")
                                    ?.map((n: any) => n[0])
                                    ?.join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-bold text-base text-foreground">
                                  {user?.name}
                                </p>
                                <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
                                  {user?._id}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <span className="text-sm font-semibold flex items-center gap-2">
                                <Phone className="h-3 w-3 text-primary" />
                                {user?.phone ?? "No Phone"}
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center gap-2">
                                <Mail className="h-3 w-3" />
                                {user?.email}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground flex items-center gap-2">
                              <MapPin className="h-3.5 w-3.5 text-primary/60" />
                              {user?.address || "Bangladesh"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="capitalize border-primary/30 text-primary bg-primary/5 font-bold"
                            >
                              {user?.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={user?.isActive} />
                          </TableCell>
                          <TableCell className="text-right px-8">
                            {user?.isActive === "ACTIVE" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSuspendAgent(user?._id)}
                                className="border-destructive/30 text-destructive hover:bg-destructive hover:text-white rounded-lg transition-all"
                              >
                                <FaBan className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveAgent(user?._id)}
                                className="border-primary/30 text-primary hover:bg-primary hover:text-white rounded-lg transition-all"
                              >
                                <MdCheckCircleOutline className="h-5 w-5" />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            {/* ---- CARD VIEW (Visible on SM, MD, LG) ---- */}
            <div className="xl:hidden grid grid-cols-1 lg:grid-cols-2 gap-6">
              {agentData?.data?.data?.map((user: any) => (
                <motion.div
                  key={user?._id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden border-none shadow-sm bg-card/50 backdrop-blur-sm relative group">
                    <div className="absolute top-4 right-4">
                      <StatusBadge status={user?.isActive} />
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 border-2 border-primary/20 p-0.5">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {user?.name
                              ?.split(" ")
                              ?.map((n: any) => n[0])
                              ?.join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                            {user?.name}
                          </CardTitle>
                          <p className="text-[10px] font-mono text-muted-foreground">
                            ID: {user?._id?.slice(-10)}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <Separator className="opacity-50" />
                    <CardContent className="pt-5 space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase font-bold text-muted-foreground">
                            Contact
                          </p>
                          <div className="flex items-center gap-1.5">
                            <Phone className="h-3 w-3 text-primary" />
                            {user?.phone ?? "No Phone"}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase font-bold text-muted-foreground">
                            Rank
                          </p>
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="h-3 w-3 text-primary" />
                            {user?.role}
                          </div>
                        </div>
                        <div className="col-span-2 space-y-1">
                          <p className="text-[10px] uppercase font-bold text-muted-foreground">
                            Address
                          </p>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3 text-primary" />
                            {user?.address || "Dhaka, Bangladesh"}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        {user?.isActive === "ACTIVE" ? (
                          <Button
                            onClick={() => handleSuspendAgent(user?._id)}
                            variant="destructive"
                            className="w-full rounded-xl font-bold shadow-none shadow-destructive/20"
                          >
                            <FaBan className="mr-2 h-4 w-4" /> Suspend Agent
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleApproveAgent(user?._id)}
                            className="w-full bg-primary hover:bg-primary/90 rounded-xl font-bold shadow-none shadow-primary/20"
                          >
                            <MdCheckCircleOutline className="mr-2 h-5 w-5" />{" "}
                            Approve Agent
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border">
            <Users className="h-16 w-16 mx-auto text-muted-foreground opacity-20 mb-4" />
            <h3 className="text-xl font-bold">No Agents Found</h3>
            <p className="text-muted-foreground">
              Your network directory is empty.
            </p>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] ">
        <p>© {new Date().getFullYear()} Neopay Digital Ecosystem</p>
        <div className="flex gap-6">
          <span>Security Protocols Active</span>
          <span className="text-primary">Admin Terminal</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ManageAgent;
