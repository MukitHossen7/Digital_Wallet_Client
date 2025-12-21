/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
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
  Phone,
  TrendingUp,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { FaBan } from "react-icons/fa";
import { MdCheckCircleOutline } from "react-icons/md";
import { toast } from "sonner";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const StatusBadge: React.FC<{ status?: string }> = ({ status }) => {
  const normalized = status?.toUpperCase() || "UNKNOWN";
  const isActive = normalized === "ACTIVE";
  return (
    <Badge
      className={`${
        isActive
          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
          : "bg-destructive/10 text-destructive border-destructive/20"
      } rounded-full px-3 py-1 font-bold text-[10px] md:text-xs tracking-tight`}
    >
      {isActive ? "● ACTIVE" : `● ${normalized}`}
    </Badge>
  );
};

const ManageAgent = () => {
  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();
  const { data: agentData, isLoading } = useGetAllAgentStatisticsQuery(null);

  const agents = agentData?.data?.data || [];

  const handleApproveAgent = async (id: string) => {
    const toastId = toast.loading("Processing approval...");
    try {
      const res = await approveAgent({ id }).unwrap();
      if (res.success)
        toast.success("Agent approved successfully", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed", { id: toastId });
    }
  };

  const handleSuspendAgent = async (id: string) => {
    const toastId = toast.loading("Processing suspension...");
    try {
      const res = await suspendAgent({ id }).unwrap();
      if (res.success)
        toast.success("Agent suspended successfully", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed", { id: toastId });
    }
  };

  // Stats Data Preparation
  const statsData = [
    {
      label: "Total Agents",
      val: agentData?.data?.totalAgents,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-600/10",
      border: "border-blue-200 dark:border-blue-900/30",
      description: "Total registered network",
    },
    {
      label: "Active Network",
      val: agentData?.data?.activeAgents,
      icon: UserCheck,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20 dark:border-primary/10",
      description: "Agents currently online",
    },
    {
      label: "Suspended",
      val: agentData?.data?.blockAgents,
      icon: UserX,
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/20 dark:border-destructive/10",
      description: "Account access revoked",
    },
  ];

  return (
    <div className="max-w-7xl container mx-auto py-6 space-y-8 ">
      <Helmet>
        <title>Agent Management | NEOPAY</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Agent <span className="text-primary">Directory</span>
          </h1>
          <p className="text-muted-foreground font-medium text-sm md:text-base">
            Securely manage and monitor your financial agent network.
          </p>
        </div>
      </div>

      {/* --- PROFESSIONAL STATS SECTION --- */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {statsData.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group"
          >
            <Card
              className={`relative overflow-hidden border ${item.border} bg-card/50 backdrop-blur-xl shadow-sm shadow-black/5 transition-all duration-300 rounded-lg`}
            >
              {/* Decorative Background Icon */}
              <item.icon
                className={`absolute -right-4 -bottom-4 h-24 w-24 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform duration-500`}
              />

              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase text-muted-foreground tracking-[0.2em]">
                    {item.label}
                  </CardTitle>
                  <p className="text-[9px] font-medium text-muted-foreground/70 uppercase">
                    {item.description}
                  </p>
                </div>
                <div
                  className={`${item.bg} p-3 rounded-2xl ring-1 ring-inset ring-white/10 shadow-inner`}
                >
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
              </CardHeader>
              <CardContent className="">
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-black tracking-tighter  text-foreground">
                    <NumberTicker value={item.val ?? 0} />
                  </div>
                  <div className="pb-1.5 text-xs font-bold text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                    Live
                  </div>
                </div>
              </CardContent>

              {/* Bottom accent line */}
              <div
                className={`h-1.5 w-full ${item.color.replace(
                  "text",
                  "bg"
                )} opacity-20`}
              />
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Directory List
          <Badge variant="secondary" className="rounded-md font-mono">
            {agents.length}
          </Badge>
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        ) : agents.length > 0 ? (
          <div className="w-full">
            {/* ---- MOBILE & TABLET VIEW (Visible on SM, MD, LG) ---- */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1  lg:grid-cols-2 gap-6 xl:hidden"
            >
              {agents.map((user: any) => (
                <motion.div key={user?._id} variants={itemVariants}>
                  <Card className="border-none border-border/50 shadow-sm bg-card relative overflow-hidden h-full">
                    <div className="absolute top-4 right-4">
                      <StatusBadge status={user?.isActive} />
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border border-primary/10">
                          <AvatarFallback className="bg-primary/5 text-primary font-bold">
                            {user?.name?.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 pr-10">
                          <CardTitle className="text-base font-bold truncate">
                            {user?.name}
                          </CardTitle>
                          <p className="text-[10px] font-mono text-muted-foreground truncate uppercase">
                            ID: {user?._id?.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <Separator className="opacity-50" />
                    <CardContent className="pt-5 space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" /> Phone
                          </span>
                          <span className="font-semibold">
                            {user?.phone || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> Region
                          </span>
                          <span className="font-semibold truncate max-w-[150px]">
                            {user?.address || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="pt-2">
                        {user?.isActive === "ACTIVE" ? (
                          <Button
                            onClick={() => handleSuspendAgent(user?._id)}
                            variant="destructive"
                            className="w-full rounded-lg font-bold"
                          >
                            <FaBan className="mr-2 h-4 w-4" /> Suspend
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleApproveAgent(user?._id)}
                            className="w-full bg-primary hover:bg-primary/90 rounded-lg font-bold"
                          >
                            <MdCheckCircleOutline className="mr-2 h-5 w-5" />{" "}
                            Approve
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* ---- TABLE VIEW (Visible on XL only) ---- */}
            <div className="hidden xl:block overflow-hidden rounded-lg border-none border-border">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="font-bold py-4 px-6">
                      AGENT IDENTITY
                    </TableHead>
                    <TableHead className="font-bold">CONTACT</TableHead>
                    <TableHead className="font-bold">REGION</TableHead>
                    <TableHead className="font-bold">STATUS</TableHead>
                    <TableHead className="text-right px-8">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((user: any) => (
                    <TableRow
                      key={user?._id}
                      className="hover:bg-muted/10 transition-colors"
                    >
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>
                              {user?.name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-bold">{user?.name}</span>
                            <span className="text-[10px] text-muted-foreground">
                              ID: {user?._id}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{user?.phone}</div>
                        <div className="text-xs text-muted-foreground">
                          {user?.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {user?.address || "N/A"}
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
                            className="text-destructive border-destructive/20 hover:bg-destructive hover:text-white"
                          >
                            <FaBan className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApproveAgent(user?._id)}
                            className="text-primary border-primary/20 hover:bg-primary hover:text-white"
                          >
                            <MdCheckCircleOutline className="h-5 w-5" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/5 rounded-3xl border-2 border-dashed border-border">
            <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground">
              No Agents Found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAgent;
