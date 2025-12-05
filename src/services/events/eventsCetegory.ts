"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { EventCategory } from "@/src/types/event";
import { eventCategoryValidationZodSchema } from "@/src/zod/events.validation";

export type EventCategoryState = {
  success: boolean;
  message?: string;
  error?: string;
  formData?: {
    name?: string;
  };
};

export const eventsCategory = async (
  _prevState: EventCategoryState,
  formData: FormData
): Promise<EventCategoryState> => {
  try {
    const payload = {
      name: formData.get("name"),
    };

    const result: any = zodValidator(payload, eventCategoryValidationZodSchema);

    if (!result?.success) {
      const firstError =
        result?.error?.issues?.[0]?.message || "Invalid category data";
      return {
        success: false,
        message: firstError,
        error: firstError,
        formData: {
          name: String(payload.name ?? ""),
        },
      };
    }

    const categoryData = {
      name: result.data.name,
    };

    const res = await serverFetch.post("/events/categories", {
      body: JSON.stringify(categoryData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok || !data?.success) {
      const msg = data?.message || "Failed to create category";
      return {
        success: false,
        message: msg,
        error: msg,
        formData: {
          name: result.data.name,
        },
      };
    }

    return {
      success: true,
      message: data?.message || "Category created successfully",
      formData: {
        name: "",
      },
    };
  } catch (error) {
    console.error("eventsCategory error:", error);
    return {
      success: false,
      message: "Something went wrong while creating category",
      error: "Something went wrong while creating category",
    };
  }
};

export const fetchEventCategories = async (): Promise<EventCategory[]> => {
  try {
    const res = await serverFetch.get("/events/categories");
    const data = await res.json();

    if (!data?.success) {
      console.error("fetchEventCategories failed:", data);
      return [];
    }

    return data.data as EventCategory[];
  } catch (error) {
    console.error("fetchEventCategories error:", error);
    return [];
  }
};
