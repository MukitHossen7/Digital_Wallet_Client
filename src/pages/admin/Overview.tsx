// /* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Users,
  UserCheck,
  CreditCard,
  BarChart2,
  LayoutDashboard,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllUserAndAgentQuery } from "@/redux/features/user/user.api";
import {
  useGetALLTransactionQuery,
  useGetAllTransactionVolumeQuery,
} from "@/redux/features/transaction/transaction.api";
import { Helmet } from "react-helmet";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Badge } from "@/components/ui/badge";
import { AdminAnalyticsChart } from "@/components/modules/admin/AdminChart";

export default function Overview() {
  const { data: userData, isLoading: userLoading } = useGetAllUserAndAgentQuery(
    { user: "user" }
  );
  const { data: agentData, isLoading: agentLoading } =
    useGetAllUserAndAgentQuery({ user: "agent" });

  const { data: transactionData, isLoading: transactionLoading } =
    useGetALLTransactionQuery({
      page: 1,
      limit: 0,
    });

  const { data: transactionVolume, isLoading: volumeLoading } =
    useGetAllTransactionVolumeQuery(undefined);

  const stats = [
    {
      title: "Total Users",
      value: userData?.data?.length || 0,
      description: "All registered users",
      icon: <Users className="h-6 w-6" />,
      color: "bg-blue-500/10 text-blue-500",
      isLoading: userLoading,
    },
    {
      title: "Total Agents",
      value: agentData?.data?.length || 0,
      description: "Verified providers",
      icon: <UserCheck className="h-6 w-6" />,
      color: "bg-amber-500/10 text-amber-500",
      isLoading: agentLoading,
    },
    {
      title: "Transactions",
      value: transactionData?.meta?.total || 0,
      description: "Total successful",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-emerald-500/10 text-emerald-500",
      isLoading: transactionLoading,
    },
    {
      title: "Volume",
      value: transactionVolume?.data || 0,
      description: "Money flow (BDT)",
      icon: <BarChart2 className="h-6 w-6" />,
      color: "bg-purple-500/10 text-purple-500",
      isLoading: volumeLoading,
    },
  ];

  return (
    <div className="max-w-7xl container mx-auto py-6 space-y-8 animate-in fade-in duration-500">
      <Helmet>
        <title>Admin Dashboard | NEOPAY</title>
      </Helmet>

      {/* Modern Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-card/40 backdrop-blur-md border border-border/50 p-6 rounded-lg shadow-none shadow-primary/5 transition-all">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/20 text-white">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              Admin <span className="text-primary">Overview</span>
            </h1>
            <p className="text-muted-foreground font-medium text-sm">
              Real-time platform analytics & statistics
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 self-end md:self-center">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <Badge
            variant="outline"
            className="font-bold uppercase tracking-widest text-[10px] px-3 py-1"
          >
            System Online
          </Badge>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-none shadow-sm shadow-black/[0.02] bg-card/60 backdrop-blur-sm rounded-3xl overflow-hidden group hover:scale-[1.02] transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <div
                className={`p-3 rounded-2xl ${stat.color} transition-colors group-hover:bg-primary group-hover:text-white`}
              >
                {stat.icon}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Snapshot
                </span>
                <Badge
                  variant="secondary"
                  className="text-[10px] font-bold text-emerald-500"
                >
                  +Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-sm font-bold text-muted-foreground/80">
                  {stat.title}
                </p>
                {stat.isLoading ? (
                  <Skeleton className="h-10 w-24 rounded-lg" />
                ) : (
                  <div className="text-3xl font-bold tracking-tighter text-foreground">
                    <NumberTicker value={stat.value} />
                  </div>
                )}
              </div>
              <p className="text-[11px] font-medium text-muted-foreground mt-4 border-t border-border/50 pt-2 italic">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Professional Overview Graph */}
      <AdminAnalyticsChart
        userData={userData}
        agentData={agentData}
        transactionData={transactionData}
        transactionVolume={transactionVolume}
        isLoading={
          userLoading || agentLoading || transactionLoading || volumeLoading
        }
      />
    </div>
  );
}
