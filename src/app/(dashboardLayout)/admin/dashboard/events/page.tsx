
import { PageHeader } from "@/src/components/modules/common/page-header"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Badge } from "@/src/components/ui/badge"
import { Search } from "lucide-react"
import { Input } from "@/src/components/ui/input"
import Link from "next/link"
import { ROUTES } from "@/lib/constants"

// Mock events data
const EVENTS = [
  {
    id: "1",
    title: "Tech Summit 2025",
    host: "TechConf Inc",
    participants: 752,
    status: "active",
    createdDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Jazz Night Live",
    host: "Jazz Collective",
    participants: 287,
    status: "active",
    createdDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Controversial Event",
    host: "Unknown",
    participants: 45,
    status: "flagged",
    createdDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const metadata = {
  title: "Events | Admin Dashboard | Events & Activities",
  description: "Manage platform events.",
}

export default function AdminEventsPage() {
  return (
    <>
      
      <main className="min-h-screen bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <PageHeader
            title="Events Management"
            subtitle="Monitor and manage platform events"
            action={
              <Button variant="outline" asChild>
                <Link href={ROUTES.ADMIN}>Back to Dashboard</Link>
              </Button>
            }
          />

          {/* Search */}
          <Card className="p-4 mb-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search events..." className="pl-10" />
              </div>
              <Button>Search</Button>
            </div>
          </Card>

          {/* Events Table */}
          <Card className="p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Title</TableHead>
                    <TableHead>Host</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {EVENTS.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{event.host}</TableCell>
                      <TableCell>{event.participants}</TableCell>
                      <TableCell>
                        <Badge variant={event.status === "active" ? "default" : "destructive"}>{event.status}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(new Date(event.createdDate))}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
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
