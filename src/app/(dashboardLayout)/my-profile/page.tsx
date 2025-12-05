"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Heart, Calendar, Users, Mail, Edit2, Save, X } from "lucide-react"
import { ROUTES } from "@/lib/constants"

// Mock user data
const MOCK_USER = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  bio: "Tech enthusiast and event organizer",
  avatar: "J",
  role: "host" as const,
  joinedDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
}

const MOCK_JOINED_EVENTS = [
  {
    id: "1",
    title: "Tech Summit 2025",
    status: "upcoming" as const,
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    image: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Jazz Night",
    status: "upcoming" as const,
    date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    image: "/placeholder.svg",
  },
]

const MOCK_HOSTED_EVENTS = [
  {
    id: "1",
    title: "Community Meetup",
    participants: 45,
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Workshop Series",
    participants: 120,
    date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

const MOCK_SAVED_EVENTS = [
  {
    id: "1",
    title: "Concert in the Park",
    date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Food Festival",
    date: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: MOCK_USER.name,
    bio: MOCK_USER.bio,
  })

  const handleSave = () => {
    // API call would happen here
    setIsEditing(false)
  }

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Profile Header */}
          <Card className="p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
              <Avatar className="h-20 w-20 text-lg font-bold">
                <AvatarFallback className="bg-primary text-primary-foreground">{MOCK_USER.avatar}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      placeholder="Name"
                    />
                    <Textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      placeholder="Bio"
                      rows={3}
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold mb-2">{MOCK_USER.name}</h1>
                    <p className="text-muted-foreground mb-2">{MOCK_USER.bio}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {MOCK_USER.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                        }).format(new Date(MOCK_USER.joinedDate))}
                      </div>
                      <Badge>{MOCK_USER.role}</Badge>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="joined" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="joined">Joined Events ({MOCK_JOINED_EVENTS.length})</TabsTrigger>
              <TabsTrigger value="hosted">Hosted Events ({MOCK_HOSTED_EVENTS.length})</TabsTrigger>
              <TabsTrigger value="saved">Saved Events ({MOCK_SAVED_EVENTS.length})</TabsTrigger>
            </TabsList>

            {/* Joined Events Tab */}
            <TabsContent value="joined">
              <div className="grid md:grid-cols-2 gap-6">
                {MOCK_JOINED_EVENTS.length > 0 ? (
                  MOCK_JOINED_EVENTS.map((event) => (
                    <Card key={event.id} className="p-6">
                      <h3 className="font-bold mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(new Date(event.date))}
                      </p>
                      <Badge variant="outline">{event.status}</Badge>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-full">No joined events yet</p>
                )}
              </div>
            </TabsContent>

            {/* Hosted Events Tab */}
            <TabsContent value="hosted">
              <div className="grid md:grid-cols-2 gap-6">
                {MOCK_HOSTED_EVENTS.length > 0 ? (
                  MOCK_HOSTED_EVENTS.map((event) => (
                    <Card key={event.id} className="p-6">
                      <h3 className="font-bold mb-2">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.participants} attendees
                        </div>
                        <div>
                          {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "numeric",
                          }).format(new Date(event.date))}
                        </div>
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`${ROUTES.EVENTS}/${event.id}`}>View Details</Link>
                      </Button>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-full">
                    No hosted events yet.{" "}
                    <Link href={ROUTES.CREATE_EVENT} className="text-primary hover:underline">
                      Create one now
                    </Link>
                  </p>
                )}
              </div>
            </TabsContent>

            {/* Saved Events Tab */}
            <TabsContent value="saved">
              <div className="grid md:grid-cols-2 gap-6">
                {MOCK_SAVED_EVENTS.length > 0 ? (
                  MOCK_SAVED_EVENTS.map((event) => (
                    <Card key={event.id} className="p-6 flex justify-between items-start">
                      <div>
                        <h3 className="font-bold mb-2">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }).format(new Date(event.date))}
                        </p>
                      </div>
                      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-full">No saved events yet</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
