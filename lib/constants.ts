export const EVENT_CATEGORIES = [
  { value: "sports", label: "Sports" },
  { value: "music", label: "Music" },
  { value: "tech", label: "Tech" },
  { value: "art", label: "Art" },
  { value: "food", label: "Food & Dining" },
  { value: "networking", label: "Networking" },
  { value: "wellness", label: "Wellness" },
  { value: "education", label: "Education" },
  { value: "social", label: "Social" },
  { value: "other", label: "Other" },
] as const

export const EVENT_STATUSES = [
  { value: "upcoming", label: "Upcoming" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const

export const USER_ROLES = [
  { value: "user", label: "User" },
  { value: "host", label: "Host" },
  { value: "admin", label: "Admin" },
] as const

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  EVENTS: "/events",
  EVENT_DETAIL: (id: string) => `/events/${id}`,
  CREATE_EVENT: "/events/create",
  EDIT_EVENT: (id: string) => `/events/edit/${id}`,
  PROFILE: "/profile/me",
  USER_PROFILE: (id: string) => `/profile/${id}`,
  DASHBOARD: "/dashboard",
  HOST_DASHBOARD: "/dashboard/host",
  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_EVENTS: "/admin/events",
  ADMIN_HOSTS: "/admin/hosts",
} as const
