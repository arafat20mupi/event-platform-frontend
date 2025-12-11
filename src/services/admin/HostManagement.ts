/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IHost } from "@/src/types/host.interface";
import { createHostZodSchema, updateHostZodSchema } from "@/src/zod/hosts.validation";

export interface IHostUpdate extends Partial<IHost> {
    id: string;
}

function parseBooleanFromFormValue(value: FormDataEntryValue | null) {
    return String(value) === "true";
}

export async function createHost(_prevState: any, formData: FormData) {
    // Build validation payload with correct field names
    const validationPayload: Partial<IHost> & { password?: string } = {
        name: (formData.get("name") as string) || "",
        email: (formData.get("email") as string) || "",
        bio: (formData.get("bio") as string) || undefined,
        location: (formData.get("location") as string) || undefined,
        contactNumber: (formData.get("contactNumber") as string) || undefined,
        profileImage: formData.get("file") as File,
        isVerified: parseBooleanFromFormValue(formData.get("isVerified")),
        isDeleted: parseBooleanFromFormValue(formData.get("isDeleted")),
        password: (formData.get("password") as string) || "",
    };

    const validatedPayload = zodValidator(validationPayload, createHostZodSchema);


    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: validatedPayload.success,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        };
    }

    const backendPayload = {
        password: validatedPayload.data.password,
        Host: {
            name: validatedPayload.data.name,
            email: validatedPayload.data.email,
            displayName: validatedPayload.data.displayName ?? validatedPayload.data.name,
            bio: validatedPayload.data.bio,
            contactNumber: validatedPayload.data.contactNumber,
            location: validatedPayload.data.location,
            isVerified: validatedPayload.data.isVerified ?? false,
            isDeleted: validatedPayload.data.isDeleted ?? false,
            role: "HOST",
        },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(backendPayload));

    // Append file only if present
    const file = formData.get("file") as File | null;
    if (file) newFormData.append("file", file);

    try {
        // NOTE: choose one consistent endpoint naming on backend; here kept "/Host"
        const response = await serverFetch.post("/user/create-host", {
            body: newFormData,
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
            formData: validationPayload,
        };
    }
}

export async function getHosts(queryString?: string) {
    try {
        const response = await serverFetch.get(`/user/get-hosts${queryString ? `?${queryString}` : ""}`);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
        };
    }
}

export async function getHostById(id: string) {
    try {
        const response = await serverFetch.get(`/Host/${id}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
        };
    }
}

export async function updateHost(id: string, _prevState: any, formData: FormData) {
    const validationPayload: Partial<IHost> = {
        name: (formData.get("name") as string) || undefined,
        email: (formData.get("email") as string) || undefined,
        bio: (formData.get("bio") as string) || undefined,
        location: (formData.get("location") as string) || undefined,
        profileImage: formData.get("file") as File,
        isVerified: parseBooleanFromFormValue(formData.get("isVerified")),
        isDeleted: parseBooleanFromFormValue(formData.get("isDeleted")),
    };

    const validatedPayload = zodValidator(validationPayload, updateHostZodSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: validatedPayload.success,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        };
    }

    const backendPayload = {
        Host: {
            name: validatedPayload.data.name,
            email: validatedPayload.data.email,
            displayName: validatedPayload.data.displayName ?? validatedPayload.data.name,
            bio: validatedPayload.data.bio,
            location: validatedPayload.data.location,
            isVerified: validatedPayload.data.isVerified,
            isDeleted: validatedPayload.data.isDeleted,
        },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(backendPayload));
    const file = formData.get("file") as File | null;
    if (file) newFormData.append("file", file);

    try {
        const response = await serverFetch.put(`/Host/${id}`, {
            body: newFormData,
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
            formData: validationPayload,
        };
    }
}

export async function softDeleteHost(id: string) {
    try {
        const response = await serverFetch.delete(`/user/host/${id}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
        };
    }
}

export async function deleteHost(id: string) {
    try {
        const response = await serverFetch.delete(`/Host/${id}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
        };
    }
}
