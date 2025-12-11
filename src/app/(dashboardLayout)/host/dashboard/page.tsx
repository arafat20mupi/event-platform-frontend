
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Badge } from "@/src/components/ui/badge"
import { Calendar, Users, TrendingUp, Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { ROUTES } from "../../../../../lib/constants"
import { PageHeader } from "@/src/components/modules/common/page-header"
import { DashboardStatCard } from "@/src/components/modules/common/dashboard-stat-card"

// Mock host dashboard data
const HOST_STATS = {
  activeEvents: 5,
  totalParticipants: 1250,
  avgRating: 4.8,
  totalRevenue: 8500,
}

const HOST_EVENTS = [
  {
    id: "1",
    title: "Community Meetup",
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    participants: 45,
    capacity: 50,
    status: "confirmed" as const,
    revenue: 1350,
  },
  {
    id: "2",
    title: "Workshop Series",
    date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    participants: 120,
    capacity: 150,
    status: "confirmed" as const,
    revenue: 3600,
  },
  {
    id: "3",
    title: "Networking Event",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    participants: 32,
    capacity: 100,
    status: "cancelled" as const,
    revenue: 0,
  },
]

export const metadata = {
  title: "Host Dashboard | Events & Activities",
  description: "Manage your hosted events and view analytics.",
}

export default function HostDashboardPage() {
  return (
    <>
      <main className="min-h-screen bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <PageHeader
            title="Host Dashboard"
            subtitle="Manage your events and view performance analytics"
            action={
              <Button asChild>
                <Link href={ROUTES.CREATE_EVENT}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Link>
              </Button>
            }
          />

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <DashboardStatCard
              title="Active Events"
              value={HOST_STATS.activeEvents}
              icon={<Calendar className="h-5 w-5" />}
              subtext="Currently running"
            />
            <DashboardStatCard
              title="Total Participants"
              value={HOST_STATS.totalParticipants}
              icon={<Users className="h-5 w-5" />}
              trend={{ value: 22, isPositive: true }}
              subtext="All time"
            />
            <DashboardStatCard
              title="Avg Rating"
              value={HOST_STATS.avgRating}
              icon={<TrendingUp className="h-5 w-5" />}
              subtext="From reviews"
            />
            <DashboardStatCard
              title="Total Revenue"
              value={`$${HOST_STATS.totalRevenue}`}
              icon={<TrendingUp className="h-5 w-5" />}
              trend={{ value: 18, isPositive: true }}
              subtext="This month"
            />
          </div>

          {/* Events Table */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Your Events</h2>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {HOST_EVENTS.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(new Date(event.date))}
                      </TableCell>
                      <TableCell>
                        {event.participants}/{event.capacity}
                      </TableCell>
                      <TableCell>
                        <Badge variant={event.status === "confirmed" ? "default" : "secondary"}>{event.status}</Badge>
                      </TableCell>
                      <TableCell>${event.revenue}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={ROUTES.EDIT_EVENT(event.id)}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}
