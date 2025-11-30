"use client"

import { useState, useCallback } from "react"
import { Event, EventFilters } from "@/src/types/event"
import { PageHeader } from "@/src/components/modules/common/page-header"
import { EventFiltersComponent } from "@/src/components/modules/events/event-filters"
import { LoadingSkeleton } from "@/src/components/modules/common/loading-skeleton"
import { EmptyState } from "@/src/components/modules/common/empty-state"
import { EventCard } from "@/src/components/modules/common/event-card"

// Mock events data
const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Annual Tech Conference 2025",
    description: "Join industry leaders and innovators for three days of talks, workshops, and networking.",
    category: "tech",
    status: "upcoming",
    startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 47 * 24 * 60 * 60 * 1000).toISOString(),
    location: "San Francisco, CA",
    image: "/placeholder.svg?key=abcd1",
    hostId: "1",
    capacity: 1000,
    registeredCount: 752,
    price: 199,
    tags: ["tech", "conference", "startup"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    host: { id: "1", name: "TechConf Inc" },
  },
  {
    id: "2",
    title: "Weekend Hiking Adventure",
    description: "Explore scenic mountain trails with experienced guides in a group of nature enthusiasts.",
    category: "wellness",
    status: "upcoming",
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Boulder, Colorado",
    image: "/placeholder.svg?key=efgh2",
    hostId: "2",
    capacity: 50,
    registeredCount: 38,
    price: 45,
    tags: ["hiking", "nature", "wellness"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    host: { id: "2", name: "Adventure Crew" },
  },
  {
    id: "3",
    title: "Jazz Night Live",
    description: "An intimate evening of smooth jazz with renowned local and international artists.",
    category: "music",
    status: "upcoming",
    startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 21.5 * 24 * 60 * 60 * 1000).toISOString(),
    location: "New York, NY",
    image: "/placeholder.svg?key=ijkl3",
    hostId: "3",
    capacity: 400,
    registeredCount: 287,
    price: 65,
    tags: ["music", "jazz", "performance"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    host: { id: "3", name: "Jazz Collective" },
  },
  {
    id: "4",
    title: "Community Sports Tournament",
    description: "Join our annual sports tournament featuring basketball, volleyball, and more.",
    category: "sports",
    status: "upcoming",
    startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Austin, Texas",
    image: "/placeholder.svg?key=mnop4",
    hostId: "4",
    capacity: 200,
    registeredCount: 156,
    price: 35,
    tags: ["sports", "tournament", "community"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    host: { id: "4", name: "City Sports League" },
  },
  {
    id: "5",
    title: "Gourmet Food Festival",
    description: "Taste food from around the world prepared by award-winning chefs.",
    category: "food",
    status: "upcoming",
    startDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 20.5 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Los Angeles, CA",
    image: "/placeholder.svg?key=qrst5",
    hostId: "5",
    capacity: 500,
    registeredCount: 423,
    price: 85,
    tags: ["food", "festival", "culinary"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    host: { id: "5", name: "Culinary Masters" },
  },
  {
    id: "6",
    title: "Networking Breakfast",
    description: "Connect with professionals and entrepreneurs in your industry.",
    category: "networking",
    status: "upcoming",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 7.25 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Boston, MA",
    image: "/placeholder.svg?key=uvwx6",
    hostId: "6",
    capacity: 100,
    registeredCount: 87,
    price: 25,
    tags: ["networking", "business", "breakfast"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    host: { id: "6", name: "Business Connect" },
  },
]

export default function EventsPage() {
  const [filters, setFilters] = useState<EventFilters>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleFiltersChange = useCallback((newFilters: EventFilters) => {
    setIsLoading(true)
    setFilters(newFilters)
    // Simulate API call
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  // Filter events
  let filteredEvents = MOCK_EVENTS

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower),
    )
  }

  if (filters.category) {
    filteredEvents = filteredEvents.filter((e) => e.category === filters.category)
  }

  if (filters.status) {
    filteredEvents = filteredEvents.filter((e) => e.status === filters.status)
  }

  if (filters.minPrice !== undefined) {
    filteredEvents = filteredEvents.filter((e) => e.price >= filters.minPrice!)
  }

  if (filters.maxPrice !== undefined) {
    filteredEvents = filteredEvents.filter((e) => e.price <= filters.maxPrice!)
  }

  if (filters.sortBy === "price") {
    filteredEvents = [...filteredEvents].sort((a, b) => a.price - b.price)
  } else if (filters.sortBy === "popularity") {
    filteredEvents = [...filteredEvents].sort((a, b) => b.registeredCount - a.registeredCount)
  } else {
    filteredEvents = [...filteredEvents].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    )
  }

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <PageHeader title="Discover Events" subtitle="Find and join events that match your interests" />

          {/* Filters */}
          <div className="mb-8">
            <EventFiltersComponent onFiltersChange={handleFiltersChange} currentFilters={filters} />
          </div>

          {/* Events Grid */}
          {isLoading ? (
            <LoadingSkeleton />
          ) : filteredEvents.length === 0 ? (
            <EmptyState
              title="No events found"
              description="Try adjusting your filters or search terms to find events"
              action={{
                label: "Clear Filters",
                onClick: () => handleFiltersChange({}),
              }}
            />
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
              </div>
              <div className="grid gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
