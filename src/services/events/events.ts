"use server"

import { serverFetch } from "@/lib/server-fetch"
import {
  EventFieldErrors,
  EventFormValues,
  EventState,
  Event,
} from "@/src/types/event.interface"
import { createEventSchema } from "@/src/zod/events.validation"

export const createEvent = async (
  _prevState: EventState,
  formData: FormData
): Promise<EventState> => {
  try {
    const values: EventFormValues = {
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),
      category: String(formData.get("category") || ""),
      type: String(formData.get("type") || ""),
      startDate: String(formData.get("startDate") || ""),
      endDate: String(formData.get("endDate") || ""),
      location: String(formData.get("location") || ""),
      capacity: Number(formData.get("capacity") || 0),
      minParticipants: formData.get("minParticipants")
        ? Number(formData.get("minParticipants"))
        : undefined,
      price: Number(formData.get("price") || 0),
      status: String(formData.get("status") || "OPEN"),
    }

    const parsed = createEventSchema.safeParse(values)

    if (!parsed.success) {
      const fieldErrors: EventFieldErrors = {}

      for (const issue of parsed.error.issues) {
        const path = issue.path?.[0] as keyof EventFormValues
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = issue.message
        }
      }

      return {
        success: false,
        message: "Validation failed",
        error: "Please fix the highlighted fields.",
        fieldErrors,
        values,
      }
    }

    const valid = parsed.data

    const backendPayload = {
      title: valid.title,
      description: valid.description,
      location: valid.location,
      date: valid.startDate,
      type: valid.type,
      fee: valid.price,
      maxParticipants: valid.capacity,
      minParticipants: valid.minParticipants ?? 1,
      status: valid.status || "OPEN",
      categoryName: valid.category,
    }

    const newFormData = new FormData()
    newFormData.append("data", JSON.stringify(backendPayload))

    const file = formData.get("file")
    if (file instanceof Blob) {
      newFormData.append("file", file)
    }

    const res = await serverFetch.post("/events", {
      body: newFormData,
    })

    const data = await res.json()

    if (!res.ok || !data?.success) {
      return {
        success: false,
        message: data?.message || "Failed to create event",
        error: data?.error || "Failed to create event",
        values,
      }
    }

    return {
      success: true,
      message: data?.message || "Event created successfully",
      error: "",
      fieldErrors: {},
      values: {},
    }
  } catch (error) {
    console.error("createEvent error:", error)
    return {
      success: false,
      message: "Something went wrong while creating event",
      error: "Something went wrong while creating event",
    }
  }
}

export const fetchEvent = async (): Promise<Event[]> => {
  try {
    const res = await serverFetch.get("/events")
    const data = await res.json()

    if (!data?.success) {
      console.error("fetchEvent failed:", data)
      return []
    }

    return data.data as Event[]
  } catch (error) {
    console.error("fetchEvent error:", error)
    return []
  }
}
