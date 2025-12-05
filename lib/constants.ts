import { fetchEventCategories } from "@/src/services/events/eventsCetegory";
import { EventCategory } from "@/src/types/event";

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

export const EVENT_STATUSES = async () => {
  const categories: EventCategory[] = await fetchEventCategories();
  return categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
}

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
  ADMIN: "/admin/dashboard",
  ADMIN_USERS: "/admin/dashboard/users",
  ADMIN_EVENTS: "/admin/dashboard/events",
  ADMIN_HOSTS: "/admin/dashboard/hosts",
} as const
