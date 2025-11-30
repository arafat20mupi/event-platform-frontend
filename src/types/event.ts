export interface Event {
    id: string
    title: string
    description: string
    category: string
    status: string
    startDate: string
    endDate: string
    location: string
    image: string
    hostId: string
    capacity: number
    registeredCount: number
    price: number
    tags: string[]
    createdAt: string
    updatedAt: string
    host: {
        id: string
        name: string
    }
}

export interface EventFilters {
    search?: string
    category?: string
    status?: string
    minPrice?: number
    maxPrice?: number
    sortBy?: "date" | "price" | "popularity"
}