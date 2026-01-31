import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, Vote, TrendingUp, Activity, Calendar, Settings, 
  LogOut, Shield, ChevronRight, BarChart3, Clock, UserCheck,
  MapPin, FileText, CheckCircle, XCircle, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Registered Voters",
      value: "2,45,678",
      change: "+1,234 today",
      changeType: "positive",
      icon: Users,
      color: "text-primary bg-primary/10",
    },
    {
      title: "Votes Cast",
      value: "1,87,432",
      change: "76.3% turnout",
      changeType: "neutral",
      icon: Vote,
      color: "text-success bg-success/10",
    },
    {
      title: "Active Elections",
      value: "3",
      change: "2 closing soon",
      changeType: "warning",
      icon: Activity,
      color: "text-warning bg-warning/10",
    },
    {
      title: "Pending Verifications",
      value: "1,256",
      change: "-89 from yesterday",
      changeType: "positive",
      icon: UserCheck,
      color: "text-info bg-info/10",
    },
  ];

  const recentApplications = [
    { id: "SEC12345678", name: "Amit Kumar", state: "Karnataka", status: "pending", date: "10 mins ago" },
    { id: "SEC12345679", name: "Priya Sharma", state: "Maharashtra", status: "pending", date: "25 mins ago" },
    { id: "SEC12345680", name: "Rahul Verma", state: "Delhi", status: "success", date: "1 hour ago" },
    { id: "SEC12345681", name: "Sneha Patel", state: "Gujarat", status: "error", date: "2 hours ago" },
    { id: "SEC12345682", name: "Vikram Singh", state: "Punjab", status: "success", date: "3 hours ago" },
  ];

  const constituencies = [
    { name: "Bangalore South", registered: 45678, voted: 34567, turnout: 75.7 },
    { name: "Bangalore Central", registered: 52345, voted: 41234, turnout: 78.8 },
    { name: "Bangalore North", registered: 38901, voted: 28456, turnout: 73.1 },
    { name: "Mysore", registered: 41234, voted: 31567, turnout: 76.5 },
  ];

  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: BarChart3 },
    { id: "voters", label: "Voter Verification", icon: UserCheck },
    { id: "elections", label: "Elections", icon: Vote },
    { id: "results", label: "Results", icon: TrendingUp },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-sidebar-foreground">SecureVote</h1>
              <p className="text-xs text-sidebar-foreground/70">Admin Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeTab === item.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground">
              <span className="font-semibold">AD</span>
            </div>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
              <p className="text-xs text-sidebar-foreground/70">Super Admin</p>
            </div>
          </div>
          <Link to="/">
            <Button variant="ghost" size="sm" className="w-full text-sidebar-foreground/70 hover:text-sidebar-foreground">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-card border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-sm text-muted-foreground">Real-time election monitoring and management</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Last updated: Just now
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success">
              <span className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
              Live
            </Badge>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="stats-card">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("p-3 rounded-lg", stat.color)}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className={cn(
                  "text-xs mt-2",
                  stat.changeType === "positive" ? "text-success" :
                  stat.changeType === "warning" ? "text-warning" : "text-muted-foreground"
                )}>
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Applications */}
            <div className="lg:col-span-2 card-elevated">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Recent Voter Applications
                </h2>
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentApplications.map((app) => (
                    <TableRow key={app.id} className="admin-table-row">
                      <TableCell className="font-mono text-sm">{app.id}</TableCell>
                      <TableCell className="font-medium">{app.name}</TableCell>
                      <TableCell>{app.state}</TableCell>
                      <TableCell>
                        <StatusBadge status={app.status as any} />
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{app.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {app.status === "pending" && (
                            <>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Constituency Turnout */}
            <div className="card-elevated">
              <div className="p-4 border-b">
                <h2 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Constituency Turnout
                </h2>
              </div>
              <div className="p-4 space-y-4">
                {constituencies.map((cons, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{cons.name}</span>
                      <span className="text-muted-foreground">{cons.turnout}%</span>
                    </div>
                    <Progress value={cons.turnout} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{cons.voted.toLocaleString()} voted</span>
                      <span>{cons.registered.toLocaleString()} registered</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Election Status */}
          <div className="card-elevated p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Active Elections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-success/10 text-success">Live</Badge>
                  <span className="text-xs text-muted-foreground">Ends in 2h 30m</span>
                </div>
                <h3 className="font-semibold">Lok Sabha Elections 2024</h3>
                <p className="text-sm text-muted-foreground">Phase 3 - Karnataka</p>
                <div className="mt-3 flex items-center gap-2">
                  <Progress value={76} className="h-2 flex-1" />
                  <span className="text-sm font-medium">76%</span>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-warning/10 text-warning">Scheduled</Badge>
                  <span className="text-xs text-muted-foreground">Starts in 2 days</span>
                </div>
                <h3 className="font-semibold">State Assembly Elections</h3>
                <p className="text-sm text-muted-foreground">Maharashtra</p>
                <div className="mt-3 text-sm text-muted-foreground">
                  Apr 17, 2024 • 7:00 AM - 6:00 PM
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-info/10 text-info">Completed</Badge>
                  <span className="text-xs text-muted-foreground">Results pending</span>
                </div>
                <h3 className="font-semibold">Municipal Elections</h3>
                <p className="text-sm text-muted-foreground">Bangalore City</p>
                <div className="mt-3 flex items-center gap-2">
                  <Progress value={100} className="h-2 flex-1" />
                  <span className="text-sm font-medium text-success">Done</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
