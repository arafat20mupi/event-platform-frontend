/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/src/components/ui/button"
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { Card } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Heart, Share2, Calendar, MapPin, Star, ChevronLeft, Bell } from "lucide-react"
import { EVENT_CATEGORIES, ROUTES } from "@/lib/constants"
import { formatDate, formatTime } from "@/lib/format"
import { Badge } from "@/src/components/ui/badge"




// Mock event detail data
const MOCK_EVENT = {
  id: "1",
  title: "Annual Tech Conference 2025",
  description:
    "Join industry leaders and innovators for three days of talks, workshops, and networking. This conference brings together thousands of tech professionals to discuss the latest trends, tools, and technologies shaping our industry.",
  category: "tech" as const,
  status: "upcoming" as const,
  startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
  endDate: new Date(Date.now() + 47 * 24 * 60 * 60 * 1000).toISOString(),
  location: "San Francisco Convention Center, San Francisco, CA",
  image: "/placeholder.svg?key=tech-conference-hero",
  hostId: "1",
  capacity: 1000,
  registeredCount: 752,
  price: 199,
  tags: ["tech", "conference", "startup", "networking"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  host: {
    id: "1",
    name: "TechConf Inc",
    avatar: "T",
    bio: "Leading organizer of tech conferences",
    rating: 4.8,
  },
  reviews: [
    {
      id: "1",
      eventId: "1",
      userId: "user1",
      author: { name: "John Doe", avatar: "J" },
      rating: 5,
      content: "Amazing conference! Great speakers and networking opportunities.",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      eventId: "1",
      userId: "user2",
      author: { name: "Sarah Smith", avatar: "S" },
      rating: 4,
      content: "Very well organized. Would recommend to anyone in tech.",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  participants: [
    { id: "p1", name: "Alice Johnson" },
    { id: "p2", name: "Bob Wilson" },
    { id: "p3", name: "Carol Davis" },
  ],
}

interface ParticipantAvatarProps {
  name: string
}

function ParticipantAvatar({ name }: ParticipantAvatarProps) {
  return (
    <Avatar className="h-10 w-10 border-2 border-background">
      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
    </Avatar>
  )
}

export default function EventDetailPage() {
  const [isSaved, setIsSaved] = useState(false)
  const [isJoined, setIsJoined] = useState(false)

  const categoryLabel = EVENT_CATEGORIES.find((c) => c.value === MOCK_EVENT.category)?.label
  const spotsLeft = MOCK_EVENT.capacity - MOCK_EVENT.registeredCount
  const isFull = spotsLeft <= 0
  const occupancyPercent = (MOCK_EVENT.registeredCount / MOCK_EVENT.capacity) * 100

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Hero Image Section */}
        <div className="relative h-96 w-full overflow-hidden bg-muted">
          <Image src={MOCK_EVENT.image || "/placeholder.svg"} alt={MOCK_EVENT.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

          {/* Header Overlay */}
          <div className="absolute inset-0 flex items-start justify-between p-6">
            <Link href={ROUTES.EVENTS}>
              <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-background/80 backdrop-blur"
                onClick={() => setIsSaved(!isSaved)}
              >
                <Heart className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 mb-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title Section */}
              <Card className="p-8 mb-6">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{categoryLabel}</Badge>
                  <Badge variant={MOCK_EVENT.status === "upcoming" ? "default" : "outline"}>{MOCK_EVENT.status}</Badge>
                </div>

                <h1 className="text-4xl font-bold mb-4">{MOCK_EVENT.title}</h1>

                <div className="flex flex-wrap gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">{formatDate(MOCK_EVENT.startDate)}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatTime(MOCK_EVENT.startDate)} - {formatTime(MOCK_EVENT.endDate)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold line-clamp-1">{MOCK_EVENT.location}</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Description */}
              <Card className="p-8 mb-6">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">{MOCK_EVENT.description}</p>

                {/* Event Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Event Details</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-medium">{categoryLabel}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Capacity</span>
                        <span className="font-medium">{MOCK_EVENT.capacity} attendees</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Price</span>
                        <span className="font-medium">${MOCK_EVENT.price}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Event Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {MOCK_EVENT.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Host Section */}
              <Card className="p-8 mb-6">
                <h2 className="text-2xl font-bold mb-4">About the Host</h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback>{MOCK_EVENT.host.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold">{MOCK_EVENT.host.name}</h3>
                      <p className="text-muted-foreground">{MOCK_EVENT.host.bio}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-semibold">{MOCK_EVENT.host.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Contact Host</Button>
                </div>
              </Card>

              {/* Reviews Section */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Reviews</h2>
                <Tabs defaultValue="reviews" className="w-full">
                  <TabsList>
                    <TabsTrigger value="reviews">Reviews ({MOCK_EVENT.reviews?.length})</TabsTrigger>
                    <TabsTrigger value="participants">Participants ({MOCK_EVENT.participants?.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="reviews" className="space-y-4">
                    {MOCK_EVENT.reviews && MOCK_EVENT.reviews.length > 0 ? (
                      MOCK_EVENT.reviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-4 last:border-0">
                          <div className="flex items-start gap-3 mb-2">
                            <Avatar>
                              <AvatarFallback>{review.author?.name.charAt(0) || "A"}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold">{review.author?.name}</h4>
                                <div className="flex gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">{formatDate(review.createdAt)}</p>
                            </div>
                          </div>
                          <p className="text-muted-foreground">{review.content}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No reviews yet</p>
                    )}
                  </TabsContent>

                  <TabsContent value="participants" className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      {MOCK_EVENT.participants &&
                        MOCK_EVENT.participants.map((participant: any) => (
                          <ParticipantAvatar key={participant.id} name={participant.name} />
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-8 sticky top-20">
                {/* Price and Availability */}
                <div className="mb-8">
                  <div className="text-5xl font-bold text-primary mb-2">${MOCK_EVENT.price}</div>
                  <p className="text-muted-foreground">per person</p>

                  {/* Capacity Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">
                        {MOCK_EVENT.registeredCount}/{MOCK_EVENT.capacity} Registered
                      </span>
                      <span className="text-muted-foreground">{Math.round(occupancyPercent)}% full</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all" style={{ width: `${occupancyPercent}%` }} />
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2">
                    {spotsLeft > 0 ? `${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} available` : "Event is full"}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  <Button size="lg" className="w-full" disabled={isFull} onClick={() => setIsJoined(!isJoined)}>
                    {isJoined ? "Leave Event" : "Join Event"}
                  </Button>
                  <Button size="lg" variant="outline" className="w-full bg-transparent">
                    <Bell className="h-4 w-4 mr-2" />
                    Get Notified
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="space-y-3 border-t border-border pt-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Question?</p>
                    <Button variant="link" className="h-auto p-0 text-primary">
                      Contact the organizer
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
