"use client";

import InputFieldError from "@/src/components/shared/InputFieldError";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Field, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { createHost, updateHost } from "@/src/services/admin/HostManagement";
import { IHost } from "@/src/types/host.interface";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IHostFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  host?: IHost;
}

const HostFormDialog = ({ open, onClose, onSuccess, host }: IHostFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!host;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isVerified, setIsVerified] = useState<"true" | "false">(
    host?.isVerified ? "true" : "false"
  );
  const [isDeleted, setIsDeleted] = useState<"true" | "false">(
    host?.isDeleted ? "true" : "false"
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const [state, formAction, pending] = useActionState(
    isEdit ? updateHost.bind(null, host!.id!) : createHost,
    null
  );

  // Prevent duplicate handling of the same successful state
  const handledSuccessRef = useRef(false);

  // Local-only reset (does NOT call parent onClose)
  const handleCloseLocalReset = () => {
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Clear selected file state
    if (selectedFile) {
      setSelectedFile(null);
    }
    // Reset form fields
    formRef.current?.reset();
    // Reset toggle fields back to host (or defaults)
    setIsVerified(host?.isVerified ? "true" : "false");
    setIsDeleted(host?.isDeleted ? "true" : "false");
    // Do not call onClose() here — this is intentionally local-only
  };

  // Explicit cancel handler that performs local reset then notifies parent
  const handleCancel = () => {
    handleCloseLocalReset();
    handledSuccessRef.current = false; // allow future successes to be handled
    onClose();
  };

  // Effect to watch action state and show toast / perform post-success behaviour
  useEffect(() => {
    if (state?.success && !handledSuccessRef.current) {
      // mark handled so we don't show duplicate toasts
      handledSuccessRef.current = true;

      toast.success(state.message);

      // local reset
      if (formRef.current) {
        formRef.current.reset();
      }
      // call parent's success handler
      onSuccess();

      // local cleanup then close dialog
      handleCloseLocalReset();
      onClose();
    } else if (state && !state.success) {
      // When we get a non-success state (validation error / server error),
      // clear the handledSuccess flag so future successes are handled.
      handledSuccessRef.current = false;

      // show error toast if message present
      if (state.message) {
        toast.error(state.message);
      }

      // Re-attach previously selected file on validation error so user doesn't lose it
      if (selectedFile && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(selectedFile);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, selectedFile, onSuccess, onClose]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        // only run local cleanup + notify parent when dialog is actually closing
        if (!isOpen) {
          handleCloseLocalReset();
          handledSuccessRef.current = false; // reset guard when dialog closes
          onClose();
        }
      }}
    >
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Host" : "Add New Host"}</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                defaultValue={
                  state?.formData?.name || (isEdit ? host?.name : "")
                }
              />
              <InputFieldError state={state} field="name" />
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="host@example.com"
                defaultValue={
                  state?.formData?.email || (isEdit ? host?.email : "")
                }
                disabled={isEdit}
              />
              <InputFieldError state={state} field="email" />
            </Field>

            {/* Password (only create) */}
            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="text"
                  defaultValue={state?.formData?.password || ""}
                  placeholder="Enter password"
                />
                <InputFieldError state={state} field="password" />
              </Field>
            )}

            {/* Bio */}
            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Short bio about the host"
                defaultValue={
                  state?.formData?.bio || (isEdit ? host?.bio || "" : "")
                }
              />
              <InputFieldError state={state} field="bio" />
            </Field>

            {/* Location */}
            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                placeholder="City, Country"
                defaultValue={
                  state?.formData?.location ||
                  (isEdit ? host?.location || "" : "")
                }
              />
              <InputFieldError state={state} field="location" />
            </Field>

            {/* contactNumber */}
            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                type="text"
                placeholder="Phone number"
                defaultValue={
                  state?.formData?.contactNumber ||
                  (isEdit ? host?.contactNumber || "" : "")
                }
              />
              <InputFieldError state={state} field="contactNumber" />
            </Field>

            {/* Is Verified */}
            <Field>
              <FieldLabel htmlFor="isVerified">Verified Status</FieldLabel>
              {/* hidden input to submit value */}
              <Input
                id="isVerified"
                name="isVerified"
                type="hidden"
                value={isVerified}
                readOnly
              />
              <Select
                value={isVerified}
                onValueChange={(value) =>
                  setIsVerified(value as "true" | "false")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select verification status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Verified</SelectItem>
                  <SelectItem value="false">Not Verified</SelectItem>
                </SelectContent>
              </Select>
              <InputFieldError state={state} field="isVerified" />
            </Field>

            {/* Is Deleted */}
            <Field>
              <FieldLabel htmlFor="isDeleted">Active Status</FieldLabel>
              {/* hidden input to submit value */}
              <Input
                id="isDeleted"
                name="isDeleted"
                type="hidden"
                value={isDeleted}
                readOnly
              />
              <Select
                value={isDeleted}
                onValueChange={(value) =>
                  setIsDeleted(value as "true" | "false")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">Active</SelectItem>
                  <SelectItem value="true">Deleted</SelectItem>
                </SelectContent>
              </Select>
              <InputFieldError state={state} field="isDeleted" />
            </Field>

            {/* Profile Photo (only create) */}
            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="file">Profile Photo</FieldLabel>
                {selectedFile && (
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Profile Photo Preview"
                    width={50}
                    height={50}
                    className="mb-2 rounded-full object-cover"
                  />
                )}
                <Input
                  ref={fileInputRef}
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a profile image for the host
                </p>
                <InputFieldError state={state} field="profileImage" />
              </Field>
            )}
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update Host" : "Create Host"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HostFormDialog;
