export interface EventFilters {
    search?: string
    category?: string
    status?: string
    minPrice?: number
    maxPrice?: number
    sortBy?: "date" | "price" | "popularity"
}

export type EventCategory = {
  id: string
  name: string
  createdAt?: string
  updatedAt?: string
}

export type Event = {
  id: string
  title: string
  type: string
  description?: string | null
  date: string
  location: string
  image?: string | null
  minParticipants?: number | null
  maxParticipants?: number | null
  fee: number
  status: string
  categoryName: string
  hostId: string
  createdAt: string
  updatedAt: string
}

export type EventFormValues = {
  title: string
  description: string
  category: string
  type: string
  startDate: string
  endDate: string
  location: string
  capacity: number
  minParticipants?: number
  price: number
  file?: string
  status: string
}

export type EventFieldErrors = Partial<Record<keyof EventFormValues, string>>

export type EventState = {
  success: boolean
  message?: string
  error?: string
  fieldErrors?: EventFieldErrors
  values?: Partial<EventFormValues>
}
