"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { toast } from "sonner";

import {
  eventsCategory,
  type EventCategoryState,
} from "@/src/services/events/eventsCetegory";
import { EventCategory } from "@/src/types/event";

type EventCategoriesProps = {
  categories?: EventCategory[];
};

const initialState: EventCategoryState = {
  success: false,
  message: "",
  error: "",
  formData: { name: "" },
};

const EventCategoriesClient = ({ categories = [] }: EventCategoriesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<EventCategoryState>(initialState);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await eventsCategory(state, formData);
      setState(result);

      if (!result.success) {
        if (result.message) {
          toast.error(result.message);
        }
        return;
      }

      toast.success(result.message || "Category created successfully");
      setIsOpen(false);
      router.refresh();
    });
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setState(initialState); // ফর্ম ক্লিন
    }
    setIsOpen(open);
  };

  return (
    <div className="space-y-6">
      {/* Header + Create button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Event Categories</h1>

        <Dialog open={isOpen} onOpenChange={handleDialogChange}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)}>Create Category</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new category</DialogTitle>
            </DialogHeader>

            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Tech Meetup"
                  required
                  disabled={isPending}
                  defaultValue={state.formData?.name || ""}
                />
              </div>

              {state.error && (
                <p className="text-sm text-red-500">{state.error}</p>
              )}

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating..." : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* All Categories List */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium">All Categories</h2>
        {categories.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No categories found. Create one to get started.
          </p>
        ) : (
          <ul className="divide-y rounded-md border">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex items-center justify-between px-4 py-2"
              >
                <span>{category.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventCategoriesClient;
