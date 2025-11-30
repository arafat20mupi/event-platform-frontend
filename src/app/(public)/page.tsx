import Link from "next/link"
import Image from "next/image"
import { Button } from "@/src/components/ui/button"
import { ArrowRight, Sparkles, Users, Calendar, MapPin, TrendingUp } from "lucide-react"
import { EVENT_CATEGORIES, ROUTES } from "@/lib/constants"

// Mock data for featured events
const FEATURED_EVENTS = [
  {
    id: "1",
    title: "Tech Summit 2025",
    description: "Join industry leaders for the biggest tech conference of the year.",
    category: "tech" as const,
    startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    location: "San Francisco, CA",
    registeredCount: 842,
    capacity: 1000,
    price: 149,
    image: "/tech-summit-conference.jpg",
    host: { id: "1", name: "TechConf Inc" },
  },
  {
    id: "2",
    title: "Weekend Hiking Adventure",
    description: "Explore scenic trails with experienced guides and fellow hikers.",
    category: "wellness" as const,
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Boulder, CO",
    registeredCount: 45,
    capacity: 50,
    price: 35,
    image: "/hiking-trail-mountain-nature.jpg",
    host: { id: "2", name: "Adventure Crew" },
  },
  {
    id: "3",
    title: "Jazz Night Live Performance",
    description: "An evening of smooth jazz with local and international artists.",
    category: "music" as const,
    startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    location: "New York, NY",
    registeredCount: 320,
    capacity: 400,
    price: 45,
    image: "/jazz-concert-live-music-performance.jpg",
    host: { id: "3", name: "Jazz Collective" },
  },
]

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Explore Events",
    description: "Browse thousands of events happening in your area or worldwide.",
    icon: Sparkles,
  },
  {
    step: 2,
    title: "Reserve Your Spot",
    description: "Find an event you love and register in just a few clicks.",
    icon: Calendar,
  },
  {
    step: 3,
    title: "Connect & Share",
    description: "Meet like-minded people and build your community through events.",
    icon: Users,
  },
]

const FEATURED_HOSTS = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "S",
    bio: "Community organizer passionate about tech and wellness.",
    hostedEventsCount: 24,
    totalParticipants: 450,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "M",
    bio: "Professional event host with 10+ years of experience.",
    hostedEventsCount: 58,
    totalParticipants: 1200,
    rating: 4.9,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "E",
    bio: "Music enthusiast creating memorable experiences.",
    hostedEventsCount: 31,
    totalParticipants: 680,
    rating: 4.7,
  },
]

const TESTIMONIALS = [
  {
    name: "Jessica Lee",
    role: "Event Attendee",
    content:
      "I discovered amazing events through this platform and met people with similar interests. Best decision ever!",
    avatar: "J",
  },
  {
    name: "David Martinez",
    role: "Event Host",
    content:
      "Hosting events became so much easier. The platform handles everything, and I can focus on creating great experiences.",
    avatar: "D",
  },
  {
    name: "Alex Thompson",
    role: "Community Manager",
    content: "Events & Activities helped us build a vibrant community. The engagement metrics are impressive.",
    avatar: "A",
  },
]

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute -bottom-20 left-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Discover, Connect, Create
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight mb-6">
              Connect Through
              <br />
              <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Extraordinary Experiences
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-8 leading-relaxed">
              Join thousands of people discovering amazing events and building vibrant communities. Host your own or
              find your perfect experience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button
                size="lg"
                asChild
                className="bg-linear-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lg"
              >
                <Link href={ROUTES.EVENTS}>
                  Explore Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary/30 hover:bg-primary/5 bg-transparent"
              >
                <Link href={ROUTES.REGISTER}>Become a Host</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-border/50">
              <div className="group">
                <div className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-sm text-muted-foreground mt-1 group-hover:text-foreground transition-colors">
                  Events Hosted
                </div>
              </div>
              <div className="group">
                <div className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  500K+
                </div>
                <div className="text-sm text-muted-foreground mt-1 group-hover:text-foreground transition-colors">
                  Members
                </div>
              </div>
              <div className="group">
                <div className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  2M+
                </div>
                <div className="text-sm text-muted-foreground mt-1 group-hover:text-foreground transition-colors">
                  Attendees
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-24 bg-linear-to-b from-primary/5 to-secondary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Explore by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whatever your interests, you&apos;ll find events that match your passions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {EVENT_CATEGORIES.slice(0, 10).map((category) => (
              <Link key={category.value} href={`${ROUTES.EVENTS}?category=${category.value}`}>
                <div className="group p-4 rounded-lg border border-border hover:border-primary hover:shadow-md hover:bg-linear-to-br hover:from-primary/5 hover:to-secondary/5 transition-all cursor-pointer text-center">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📌</div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{category.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps and begin your event journey today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.step} className="relative group">
                  <div className="mb-6">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-linear-to-br from-primary to-secondary text-white group-hover:shadow-lg group-hover:scale-105 transition-all">
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    Step {item.step}: {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>

                  {/* Connector */}
                  {item.step !== 3 && (
                    <div className="hidden md:block absolute top-8 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-1 bg-linear-to-r from-primary via-secondary to-transparent opacity-30" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 sm:py-24 bg-linear-to-b from-transparent to-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Trending Events</h2>
              <p className="text-muted-foreground">Check out what&apos;s popular right now</p>
            </div>
            <Button variant="outline" asChild className="border-primary/30 hover:bg-primary/5 bg-transparent">
              <Link href={ROUTES.EVENTS}>
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {FEATURED_EVENTS.map((event) => (
              <div
                key={event.id}
                className="group flex flex-col md:flex-row gap-4 rounded-lg border border-border overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer bg-card"
              >
                <div className="relative h-48 w-full md:h-auto md:w-64 overflow-hidden bg-muted shrink-0">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent" />
                </div>

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-linear-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30">
                        {EVENT_CATEGORIES.find((c) => c.value === event.category)?.label}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                  </div>

                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>
                          {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "numeric",
                          }).format(new Date(event.startDate))}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span>
                          {event.registeredCount}/{event.capacity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                        ${event.price}
                      </div>
                      <Button
                        size="sm"
                        className="bg-linear-to-r from-primary to-secondary hover:opacity-90 text-white"
                        asChild
                      >
                        <Link href={ROUTES.EVENT_DETAIL(event.id)}>View Event</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hosts Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Top Hosts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet some of our most experienced and highly-rated event hosts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED_HOSTS.map((host) => (
              <div
                key={host.id}
                className="rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary/50 hover:bg-linear-to-br hover:from-primary/5 hover:to-transparent transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-16 w-16 rounded-full bg-linear-to-br from-primary to-secondary text-white flex items-center justify-center text-2xl font-bold">
                    {host.avatar}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold bg-linear-to-r from-accent to-secondary bg-clip-text text-transparent">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    {host.rating}
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{host.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{host.bio}</p>

                <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y border-border">
                  <div>
                    <div className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {host.hostedEventsCount}
                    </div>
                    <div className="text-xs text-muted-foreground">Events</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {host.totalParticipants}
                    </div>
                    <div className="text-xs text-muted-foreground">Attendees</div>
                  </div>
                </div>

                <Button
                  className="w-full bg-linear-to-r from-primary to-secondary hover:opacity-90 text-white"
                  asChild
                >
                  <Link href={ROUTES.USER_PROFILE(host.id)}>View Profile</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-linear-to-b from-primary/5 to-secondary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What People Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from community members about their experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-card p-8 relative hover:shadow-md hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-linear-to-br from-primary to-secondary text-white flex items-center justify-center font-bold shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold group-hover:text-primary transition-colors">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                <p className="text-muted-foreground italic">{testimonial.content}</p>

                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg text-accent">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-primary/30 bg-linear-to-br from-primary/10 via-secondary/5 to-accent/5 p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
              Join the community today and discover amazing events or share your passion with others.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-linear-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lg"
                asChild
              >
                <Link href={ROUTES.REGISTER}>
                  Create Your Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 hover:bg-primary/5 bg-transparent"
                asChild
              >
                <Link href={ROUTES.EVENTS}>Browse Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
