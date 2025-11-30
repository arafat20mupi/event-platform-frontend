"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card } from "@/src/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { createEventSchema, type CreateEventFormData } from "@/lib/utils/validation"
import { EVENT_CATEGORIES } from "@/lib/utils/constants"
import { eventService } from "@/services/api/event.service"

interface CreateEventFormProps {
  onSuccess?: () => void
  initialData?: Partial<CreateEventFormData>
  isEditing?: boolean
}

export function CreateEventForm({ onSuccess, initialData, isEditing = false }: CreateEventFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventSchema),
    defaultValues: initialData,
  })

  const startDate = watch("startDate")
  const endDate = watch("endDate")

  const onSubmit = async (data: CreateEventFormData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      if (isEditing && initialData) {
        // await eventService.updateEvent(initialData.id, data);
      } else {
        await eventService.createEvent(data)
      }

      setSuccess(true)
      setTimeout(() => {
        onSuccess?.()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while creating the event")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Alert */}
      {success && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-600 dark:text-green-400">
            {isEditing ? "Event updated successfully!" : "Event created successfully!"}
          </AlertDescription>
        </Alert>
      )}

      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6">Basic Information</h2>

        <div className="space-y-4">
          {/* Event Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Event Title *
            </label>
            <Input
              id="title"
              placeholder="e.g., Annual Tech Conference 2025"
              {...register("title")}
              disabled={isLoading}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && <p className="text-xs text-destructive mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description *
            </label>
            <Textarea
              id="description"
              placeholder="Describe your event in detail..."
              rows={6}
              {...register("description")}
              disabled={isLoading}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && <p className="text-xs text-destructive mt-1">{errors.description.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">
              Category *
            </label>
            <Select defaultValue={initialData?.category} onValueChange={(value) => setValue("category", value as any)}>
              <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {EVENT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-xs text-destructive mt-1">{errors.category.message}</p>}
          </div>
        </div>
      </Card>

      {/* Date & Time */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6">Date & Time</h2>

        <div className="grid md:grid-cols-2 gap-4 space-y-4 md:space-y-0">
          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium mb-2">
              Start Date & Time *
            </label>
            <Input
              id="startDate"
              type="datetime-local"
              {...register("startDate")}
              disabled={isLoading}
              className={errors.startDate ? "border-destructive" : ""}
            />
            {errors.startDate && <p className="text-xs text-destructive mt-1">{errors.startDate.message}</p>}
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium mb-2">
              End Date & Time *
            </label>
            <Input
              id="endDate"
              type="datetime-local"
              {...register("endDate")}
              disabled={isLoading}
              className={errors.endDate ? "border-destructive" : ""}
            />
            {errors.endDate && <p className="text-xs text-destructive mt-1">{errors.endDate.message}</p>}
          </div>
        </div>

        {startDate && endDate && new Date(endDate) <= new Date(startDate) && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>End date must be after start date</AlertDescription>
          </Alert>
        )}
      </Card>

      {/* Location & Capacity */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6">Location & Capacity</h2>

        <div className="space-y-4">
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-2">
              Location *
            </label>
            <Input
              id="location"
              placeholder="e.g., San Francisco Convention Center, CA"
              {...register("location")}
              disabled={isLoading}
              className={errors.location ? "border-destructive" : ""}
            />
            {errors.location && <p className="text-xs text-destructive mt-1">{errors.location.message}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Capacity */}
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium mb-2">
                Capacity *
              </label>
              <Input
                id="capacity"
                type="number"
                min="1"
                placeholder="Number of attendees"
                {...register("capacity", { valueAsNumber: true })}
                disabled={isLoading}
                className={errors.capacity ? "border-destructive" : ""}
              />
              {errors.capacity && <p className="text-xs text-destructive mt-1">{errors.capacity.message}</p>}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-2">
                Price (USD) *
              </label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                {...register("price", { valueAsNumber: true })}
                disabled={isLoading}
                className={errors.price ? "border-destructive" : ""}
              />
              {errors.price && <p className="text-xs text-destructive mt-1">{errors.price.message}</p>}
            </div>
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button type="submit" size="lg" disabled={isLoading} className="flex-1">
          {isLoading ? "Creating..." : isEditing ? "Update Event" : "Create Event"}
        </Button>
        <Button type="button" variant="outline" size="lg" disabled={isLoading} onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
