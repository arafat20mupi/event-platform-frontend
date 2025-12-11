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

export const EVENT_STATUSES = ["OPEN", "CLOSED", "CANCELLED"] as const

export const EVENT_TYPES = ["ONLINE", "OFFLINE", "HYBRID"] as const


export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  EVENTS: "/events",
  EVENT_DETAIL: (id: string) => `/events/${id}`,
  CREATE_EVENT: "/events/create",
  EDIT_EVENT: (id: string) => `/events/edit/${id}`,
  PROFILE: "/my-profile",
  USER_PROFILE: (id: string) => `/profile/${id}`,
  USER_DASHBOARD: "/dashboard",
  HOST_DASHBOARD: "/dashboard/host",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USERS: "/admin/dashboard/users",
  ADMIN_EVENTS: "/admin/dashboard/events",
  ADMIN_HOSTS: "/admin/dashboard/hosts",
} as const;
