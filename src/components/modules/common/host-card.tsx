import Link from "next/link"
import Image from "next/image"
import { Star, MessageCircle } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { ROUTES } from "@/lib/utils/constants"

interface HostCardProps {
  host: {
    id: string
    name: string
    avatar?: string
    bio?: string
    rating?: number
    hostedEventsCount: number
    totalParticipants: number
    reviewCount?: number
  }
}

export function HostCard({ host }: HostCardProps) {
  const avgRating = host.rating || 0

  return (
    <Link href={ROUTES.USER_PROFILE(host.id)}>
      <div className="group rounded-lg border border-border p-6 hover:shadow-md transition-shadow cursor-pointer">
        {/* Avatar */}
        <div className="flex items-start justify-between mb-4">
          <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold flex-shrink-0">
            {host.avatar ? (
              <Image
                src={host.avatar || "/placeholder.svg"}
                alt={host.name}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              host.name.charAt(0).toUpperCase()
            )}
          </div>
          {avgRating > 0 && (
            <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-full">
              <Star className="h-4 w-4 text-accent fill-accent" />
              <span className="text-sm font-semibold">{avgRating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{host.name}</h3>

        {host.bio && <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{host.bio}</p>}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y border-border">
          <div>
            <div className="text-2xl font-bold text-primary">{host.hostedEventsCount}</div>
            <div className="text-xs text-muted-foreground">Events Hosted</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{host.totalParticipants}</div>
            <div className="text-xs text-muted-foreground">Participants</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            View Profile
          </Button>
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  )
}
