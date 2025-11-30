
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { PageHeader } from "@/src/components/modules/common/page-header"
import { ROUTES } from "@/lib/constants"
import { CreateEventForm } from "@/src/components/modules/events/create-event-form"

// Mock event data for editing
const MOCK_EVENT_FOR_EDIT = {
  title: "Annual Tech Conference 2025",
  description: "Join industry leaders and innovators for three days of talks, workshops, and networking.",
  category: "tech" as const,
  startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
  endDate: new Date(Date.now() + 47 * 24 * 60 * 60 * 1000).toISOString(),
  location: "San Francisco Convention Center, CA",
  capacity: 1000,
  price: 199,
}

export const metadata = {
  title: "Edit Event | Events & Activities",
  description: "Edit your event details.",
}

export default function EditEventPage() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <PageHeader
            title="Edit Event"
            subtitle="Update your event details and settings."
            action={
              <Button variant="outline" asChild>
                <Link href={ROUTES.EVENTS}>View All Events</Link>
              </Button>
            }
          />

          <CreateEventForm
            isEditing
            initialData={MOCK_EVENT_FOR_EDIT}
            onSuccess={() => {
              // Redirect to dashboard or event detail
              window.location.href = ROUTES.DASHBOARD
            }}
          />
        </div>
      </main>
    </>
  )
}
