"use client"

import { useEffect, useState, useActionState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { Card } from "@/src/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import type { CreateEventFormData } from "@/src/zod/events.validation"
import { createEvent } from "@/src/services/events/events"
import {
  EventCategory,
  EventFormValues,
  EventState,
} from "@/src/types/event.interface"
import { EVENT_STATUSES, EVENT_TYPES } from "@/lib/constants"
import { initialEventState } from "@/src/services/events/eventState"

interface CreateEventFormProps {
  onSuccess?: () => void
  initialData?: Partial<CreateEventFormData>
  isEditing?: boolean
  categories: EventCategory[]
}

export function CreateEventForm({
  onSuccess,
  initialData,
  isEditing = false,
  categories,
}: CreateEventFormProps) {
  const [startDate, setStartDate] = useState(initialData?.startDate ?? "")
  const [endDate, setEndDate] = useState(initialData?.endDate ?? "")

  const [state, formAction, isPending] = useActionState<EventState, FormData>(
    createEvent,
    initialEventState
  )

  const isLoading = isPending

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        onSuccess?.()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [state.success, onSuccess])

  const fieldError = (name: keyof NonNullable<EventState["fieldErrors"]>) =>
    state.fieldErrors?.[name]

  const value = (name: keyof NonNullable<EventState["values"]>, fallback = "") =>
    (state.values?.[name] as string | number | undefined) ??
    ((initialData as EventFormValues)?.[name] ?? fallback)

  return (
    <form action={formAction} className="space-y-8">
      {/* Error Alert */}
      {state.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {typeof state.error === "string"
              ? state.error
              : "Something went wrong. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      {/* Success Alert */}
      {state.success && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-600 dark:text-green-400">
            {isEditing
              ? "Event updated successfully!"
              : "Event created successfully!"}
          </AlertDescription>
        </Alert>
      )}

      {/* Basic Information */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-bold">Basic Information</h2>
          <span className="text-xs text-muted-foreground">
            Fields marked * are required
          </span>
        </div>

        {/* Event Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Event Title *
          </label>
          <Input
            id="title"
            name="title"
            placeholder="e.g., Annual Tech Conference 2025"
            defaultValue={String(value("title"))}
            disabled={isLoading}
            className={fieldError("title") ? "border-destructive" : ""}
          />
          {fieldError("title") && (
            <p className="text-xs text-destructive mt-1">
              {fieldError("title")}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Description *
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe your event in detail..."
            rows={6}
            defaultValue={String(value("description"))}
            disabled={isLoading}
            className={fieldError("description") ? "border-destructive" : ""}
          />
          {fieldError("description") && (
            <p className="text-xs text-destructive mt-1">
              {fieldError("description")}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category *
          </label>
          <Select
            name="category"
            defaultValue={String(value("category"))}
            disabled={isLoading}
          >
            <SelectTrigger
              className={fieldError("category") ? "border-destructive" : ""}
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldError("category") && (
            <p className="text-xs text-destructive mt-1">
              {fieldError("category")}
            </p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium mb-2">
            Event Type *
          </label>
          <Select
            name="type"
            defaultValue={String(value("type"))}
            disabled={isLoading}
          >
            <SelectTrigger
              className={fieldError("type") ? "border-destructive" : ""}
            >
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t.charAt(0) + t.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldError("type") && (
            <p className="text-xs text-destructive mt-1">
              {fieldError("type")}
            </p>
          )}
        </div>

        {/* Image */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Cover Image
          </label>
          <Input
            id="image"
            name="file"
            type="file"
            disabled={isLoading}
            className={fieldError("file") ? "border-destructive" : ""}
          />
          {fieldError("file") && (
            <p className="text-xs text-destructive mt-1">
              {fieldError("file")}
            </p>
          )}
        </div>
      </Card>

      {/* Date & Time */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold mb-2">Date & Time</h2>

        <div className="grid md:grid-cols-2 gap-4 space-y-4 md:space-y-0">
          {/* Start Date */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium mb-2"
            >
              Start Date & Time *
            </label>
            <Input
              id="startDate"
              name="startDate"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={isLoading}
              className={fieldError("startDate") ? "border-destructive" : ""}
            />
            {fieldError("startDate") && (
              <p className="text-xs text-destructive mt-1">
                {fieldError("startDate")}
              </p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium mb-2">
              End Date & Time *
            </label>
            <Input
              id="endDate"
              name="endDate"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={isLoading}
              className={fieldError("endDate") ? "border-destructive" : ""}
            />
            {fieldError("endDate") && (
              <p className="text-xs text-destructive mt-1">
                {fieldError("endDate")}
              </p>
            )}
          </div>
        </div>

        {startDate && endDate && new Date(endDate) <= new Date(startDate) && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              End date must be after start date
            </AlertDescription>
          </Alert>
        )}
      </Card>

      {/* Location & Capacity */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Location & Capacity</h2>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Location *
          </label>
          <Input
            id="location"
            name="location"
            placeholder="e.g., San Francisco Convention Center, CA"
            defaultValue={String(value("location"))}
            disabled={isLoading}
            className={fieldError("location") ? "border-destructive" : ""}
          />
          {fieldError("location") && (
            <p className="text-xs text-destructive mt-1">
              {fieldError("location")}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Capacity */}
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium mb-2">
              Capacity *
            </label>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              min="1"
              placeholder="Number of attendees"
              defaultValue={value("capacity", "")}
              disabled={isLoading}
              className={fieldError("capacity") ? "border-destructive" : ""}
            />
            {fieldError("capacity") && (
              <p className="text-xs text-destructive mt-1">
                {fieldError("capacity")}
              </p>
            )}
          </div>

          {/* Minimum Participants */}
          <div>
            <label
              htmlFor="minParticipants"
              className="block text-sm font-medium mb-2"
            >
              Minimum Participants
            </label>
            <Input
              id="minParticipants"
              name="minParticipants"
              type="number"
              min="1"
              placeholder="e.g., 5"
              defaultValue={value("minParticipants", "")}
              disabled={isLoading}
              className={
                fieldError("minParticipants") ? "border-destructive" : ""
              }
            />
            {fieldError("minParticipants") && (
              <p className="text-xs text-destructive mt-1">
                {fieldError("minParticipants")}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-2">
              Price (USD) *
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              defaultValue={value("price", "")}
              disabled={isLoading}
              className={fieldError("price") ? "border-destructive" : ""}
            />
            {fieldError("price") && (
              <p className="text-xs text-destructive mt-1">
                {fieldError("price")}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-2">
              Status
            </label>
            <Select
              name="status"
              defaultValue={String(value("status", "OPEN"))}
              disabled={isLoading}
            >
              <SelectTrigger
                className={fieldError("status") ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {EVENT_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0) + s.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldError("status") && (
              <p className="text-xs text-destructive mt-1">
                {fieldError("status")}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button type="submit" size="lg" disabled={isLoading} className="flex-1">
          {isLoading ? "Creating..." : isEditing ? "Update Event" : "Create Event"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={isLoading}
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
