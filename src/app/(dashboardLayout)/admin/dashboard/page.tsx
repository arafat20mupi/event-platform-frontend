import { Users, Calendar, TrendingUp, AlertCircle } from "lucide-react"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { PageHeader } from "@/src/components/modules/common/page-header"
import { DashboardStatCard } from "@/src/components/modules/common/dashboard-stat-card"

// Mock admin stats
const ADMIN_STATS = {
  totalUsers: 15420,
  activeEvents: 324,
  totalEvents: 8950,
  platformRevenue: 125400,
}

export const metadata = {
  title: "Admin Dashboard | Events & Activities",
  description: "Administrative dashboard for platform management.",
}

export default function AdminDashboardPage() {
  return (
    <>
      <main className="min-h-screen bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <PageHeader title="Admin Dashboard" subtitle="Platform management and analytics" />

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <DashboardStatCard
              title="Total Users"
              value={ADMIN_STATS.totalUsers.toLocaleString()}
              icon={<Users className="h-5 w-5" />}
              trend={{ value: 12, isPositive: true }}
              subtext="Active users"
            />
            <DashboardStatCard
              title="Active Events"
              value={ADMIN_STATS.activeEvents}
              icon={<Calendar className="h-5 w-5" />}
              trend={{ value: 8, isPositive: true }}
              subtext="Currently running"
            />
            <DashboardStatCard
              title="Total Events"
              value={ADMIN_STATS.totalEvents.toLocaleString()}
              icon={<TrendingUp className="h-5 w-5" />}
              trend={{ value: 25, isPositive: true }}
              subtext="All time"
            />
            <DashboardStatCard
              title="Platform Revenue"
              value={`$${ADMIN_STATS.platformRevenue.toLocaleString()}`}
              icon={<TrendingUp className="h-5 w-5" />}
              trend={{ value: 18, isPositive: true }}
              subtext="This month"
            />
          </div>

          <div className="grid  gap-6">
            {/* System Health */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">System Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>API Response Time</span>
                  <span className="text-green-600 font-medium">120ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Database Status</span>
                  <span className="text-green-600 font-medium">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Server Uptime</span>
                  <span className="text-green-600 font-medium">99.98%</span>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Flagged Content</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border border-destructive/30 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium">Inappropriate Event Description</p>
                    <p className="text-xs text-muted-foreground">Event ID: 12345</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
