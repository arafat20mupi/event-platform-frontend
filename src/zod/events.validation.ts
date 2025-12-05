import z from "zod";

export const eventCategoryValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Category name is required" })
})