import z from "zod";

export const createAdminZodSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
    contactNumber: z.string().optional(),
});

export const updateAdminZodSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").optional(),
    email: z.email("Invalid email address").optional(),
    contactNumber: z.string().optional(),
    isDeleted: z.boolean().optional(),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
    profileImage: z.instanceof(File).optional(),
});

export type CreateAdminInput = z.infer<typeof createAdminZodSchema>;
export type UpdateAdminInput = z.infer<typeof updateAdminZodSchema>;