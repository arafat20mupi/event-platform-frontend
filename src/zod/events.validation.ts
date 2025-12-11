import z from "zod";

export const eventCategoryValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Category name is required" })
})

export const createEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  type: z.enum(["ONLINE", "OFFLINE", "HYBRID"], {
    error: "Event type is required",
  }),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  location: z.string().min(3, "Location is required"),
  capacity: z.coerce
    .number({ error: "Capacity must be a number" })
    .int()
    .positive("Capacity must be greater than 0"),
  minParticipants: z
    .coerce
    .number({ error: "Minimum participants must be a number" })
    .int()
    .positive()
    .optional(),
  price: z.coerce
    .number({ error: "Price must be a number" })
    .nonnegative("Price cannot be negative"),
  image: z
    .string()
    .url("Image must be a valid URL")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  status: z
    .enum(["OPEN", "CLOSED", "CANCELLED"])
    .default("OPEN")
    .optional(),
})

export type CreateEventFormData = z.infer<typeof createEventSchema>
