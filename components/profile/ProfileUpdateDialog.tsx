"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { updateUser, useSession } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/* ---------------------------------- Config --------------------------------- */

// To add a field later (e.g. phone), add one entry here + one rule in `validate`.
const FIELDS = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    name: "image",
    label: "Profile Image URL",
    type: "url",
    placeholder: "https://example.com/profile-image.jpg",
  },
] as const

type FieldName = (typeof FIELDS)[number]["name"]
type Values = Record<FieldName, string>
type Errors = Partial<Record<FieldName, string>>

/* -------------------------------- Helpers ---------------------------------- */

function isHttpUrl(value: string) {
  try {
    const { protocol } = new URL(value)
    return protocol === "http:" || protocol === "https:"
  } catch {
    return false
  }
}

/** FormData -> plain object, with every value trimmed. */
function getValues(formData: FormData): Values {
  return Object.fromEntries(
    [...formData].map(([key, value]) => [key, String(value).trim()])
  ) as Values
}

function validate({ name, image }: Values): Errors {
  const errors: Errors = {}

  if (!name) errors.name = "Full name is required."
  else if (name.length < 2) errors.name = "Name must be at least 2 characters."

  // empty image is allowed (means "no profile picture")
  if (image && !isHttpUrl(image)) errors.image = "Please enter a valid image URL."

  return errors
}

/* ------------------------------- Components -------------------------------- */

type ProfileUpdateDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileUpdateDialog({ open, onOpenChange }: ProfileUpdateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Update your name and profile picture URL. Your role cannot be changed from here.
          </DialogDescription>
        </DialogHeader>

        {/* Mounted only while the dialog is open, so its state resets every time. */}
        <ProfileForm onDone={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}

function ProfileForm({ onDone }: { onDone: () => void }) {
  const { data: session } = useSession()
  const user = session?.user

  const [errors, setErrors] = React.useState<Errors>({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [previewUrl, setPreviewUrl] = React.useState(user?.image ?? "")

  const defaults: Values = { name: user?.name ?? "", image: user?.image ?? "" }

  const clearError = (field: FieldName) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const values = getValues(new FormData(e.currentTarget))
    const newErrors = validate(values)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setIsLoading(true)
    try {
      const { error } = await updateUser({
        ...values,
        image: values.image || null,
      })

      if (error) {
        toast.error(error.message || "Failed to update profile.")
        return
      }

      toast.success("Profile updated successfully.")
      onDone()
    } catch (err) {
      console.error("Profile update error:", err)
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {FIELDS.map(({ name, label, type, placeholder }) => (
        <div key={name} className="space-y-2">
          <Label htmlFor={`profile-${name}`}>{label}</Label>
          <Input
            id={`profile-${name}`}
            name={name}
            type={type}
            defaultValue={defaults[name]}
            placeholder={placeholder}
            disabled={isLoading}
            aria-invalid={!!errors[name]}
            aria-describedby={errors[name] ? `profile-${name}-error` : undefined}
            className={cn("h-10", errors[name] && "border-destructive focus-visible:ring-destructive")}
            onChange={(e) => {
              clearError(name)
              if (name === "image") setPreviewUrl(e.target.value.trim())
            }}
          />
          {errors[name] && (
            <p id={`profile-${name}-error`} className="text-xs text-destructive">
              {errors[name]}
            </p>
          )}
        </div>
      ))}

      {/* Live preview (only for a valid URL) */}
      {previewUrl && isHttpUrl(previewUrl) && (
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={previewUrl}
            src={previewUrl}
            alt="Profile preview"
            className="h-24 w-24 rounded-full border border-border object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      )}

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onDone} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Profile
        </Button>
      </DialogFooter>
    </form>
  )
}