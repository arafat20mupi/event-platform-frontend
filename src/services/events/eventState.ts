import type { EventState } from "@/src/types/event.interface"

export const initialEventState: EventState = {
  success: false,
  message: "",
  error: "",
  fieldErrors: {},
  values: {},
}
