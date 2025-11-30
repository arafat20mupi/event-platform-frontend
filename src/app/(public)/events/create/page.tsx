
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { PageHeader } from "@/src/components/modules/common/page-header"
import { ROUTES } from "@/lib/constants"
import { CreateEventForm } from "@/src/components/modules/events/create-event-form"

export const metadata = {
  title: "Create Event | Events & Activities",
  description: "Create and host your own event on Events & Activities.",
}

export default function CreateEventPage() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <PageHeader
            title="Create a New Event"
            subtitle="Share your passion and bring people together. Fill in the details below to get started."
            action={
              <Button variant="outline" asChild>
                <Link href={ROUTES.EVENTS}>View All Events</Link>
              </Button>
            }
          />

          <CreateEventForm
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
