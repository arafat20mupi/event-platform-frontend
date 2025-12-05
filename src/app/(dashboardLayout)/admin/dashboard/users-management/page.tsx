import { PageHeader } from "@/src/components/modules/common/page-header"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Badge } from "@/src/components/ui/badge"
import { Search } from "lucide-react"
import Link from "next/link"
import { ROUTES } from "@/lib/constants"
import { Input } from "@/src/components/ui/input"

// Mock users data
const USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "host",
    joinDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "user",
    joinDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "user",
    joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: "suspended",
  },
]

export const metadata = {
  title: "Users | Admin Dashboard | Events & Activities",
  description: "Manage platform users.",
}

export default function AdminUsersPage() {
  return (
    <>
      <main className="min-h-screen bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <PageHeader
            title="Users Management"
            subtitle="View and manage platform users"
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
                <Input placeholder="Search users..." className="pl-10" />
              </div>
              <Button>Search</Button>
            </div>
          </Card>

          {/* Users Table */}
          <Card className="p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {USERS.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(new Date(user.joinDate))}
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "default" : "destructive"}>{user.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          View
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
