import Link from "next/link"
import Image from "next/image"
import { Heart, MapPin, Calendar, Users } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import type { Event } from "@/src/types/event"
import { EVENT_CATEGORIES, ROUTES } from "@/lib/constants"
import { formatDate, formatPrice } from "@/lib/format"

interface EventCardProps {
  event: Event
  showHost?: boolean
  isCompact?: boolean
}

export function EventCard({ event, showHost = true, isCompact = false }: EventCardProps) {
  const categoryLabel = EVENT_CATEGORIES.find((c) => c.value === event.category)?.label || event.category
  const availableSpots = event.capacity - event.registeredCount
  const isFull = availableSpots <= 0

  if (isCompact) {
    return (
      <Link href={ROUTES.EVENT_DETAIL(event.id)}>
        <div className="group rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
          {/* Image */}
          <div className="relative h-40 w-full overflow-hidden bg-muted">
            {event.image ? (
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground">No image</div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {categoryLabel}
              </Badge>
              <Heart className="h-4 w-4 text-muted-foreground group-hover:text-red-500 transition-colors" />
            </div>

            <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {event.title}
            </h3>

            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDate(event.startDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            </div>

            <div className="flex items-end justify-between mt-4">
              <div>
                <div className="text-lg font-bold text-primary">{formatPrice(event.price)}</div>
                <div className="text-xs text-muted-foreground">{availableSpots} spots left</div>
              </div>
              <Button size="sm" disabled={isFull}>
                {isFull ? "Full" : "View"}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={ROUTES.EVENT_DETAIL(event.id)}>
      <div className="group flex flex-col md:flex-row gap-4 rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        {/* Image */}
        <div className="relative h-48 w-full md:h-auto md:w-64 overflow-hidden bg-muted shrink-0">
          {event.image ? (
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground">No image</div>
          )}
          <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{categoryLabel}</Badge>
                <Badge variant={event.status === "upcoming" ? "default" : "outline"}>{event.status}</Badge>
              </div>
              <Heart className="h-5 w-5 text-muted-foreground group-hover:text-red-500 transition-colors shrink-0" />
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {event.title}
            </h3>

            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{event.description}</p>
          </div>

          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate(event.startDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  {event.registeredCount}/{event.capacity}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {showHost && event.host && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                    {event.host.name.charAt(0)}
                  </div>
                  <span className="text-muted-foreground">by {event.host.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{formatPrice(event.price)}</div>
                  <div className="text-xs text-muted-foreground">{availableSpots} spots</div>
                </div>
                <Button size="sm" disabled={isFull}>
                  {isFull ? "Full" : "Details"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
