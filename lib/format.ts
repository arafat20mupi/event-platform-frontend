import { formatDistanceToNow, format } from "date-fns"

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), "MMM d, yyyy")
}

export const formatTime = (date: string | Date): string => {
  return format(new Date(date), "h:mm a")
}

export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), "MMM d, yyyy h:mm a")
}

export const formatRelativeTime = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

export const truncateText = (text: string, length: number): string => {
  return text.length > length ? `${text.substring(0, length)}...` : text
}
