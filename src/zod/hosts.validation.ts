import { z } from "zod";

export const createHostZodSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
    bio: z.string().optional(),
    location: z.string().optional(),
    profileImage: z.instanceof(File).optional(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    isVerified: z.boolean().optional(),
    contactNumber: z.string().optional(),
    isDeleted: z.boolean().optional(),
});

export const updateHostZodSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").optional(),
    email: z.email("Invalid email address").optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
    profileImage: z.instanceof(File).optional(),
    isVerified: z.boolean().optional(),
    contactNumber: z.string().optional(),
    isDeleted: z.boolean().optional()
});

export type CreateHostInput = z.infer<typeof createHostZodSchema>;
export type UpdateHostInput = z.infer<typeof updateHostZodSchema>;

