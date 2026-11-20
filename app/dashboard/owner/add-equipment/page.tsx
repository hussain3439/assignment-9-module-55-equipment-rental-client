"use client"

import { Equipment } from "@/app/types/type"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { postEquipment } from "@/lib/actions/equipment"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

const categories = [
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Electronics",
  "Event Equipment",
]

const conditions = ["New", "Like New", "Good", "Fair"]

const AddEquipmentForm = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const equipmentFormData = new FormData(e.currentTarget)
    const data = Object.fromEntries(equipmentFormData.entries())
    console.log(data, "the equipment form data is")

    if (!session?.user) {
      toast.error("Please login first!")
      return
    }
    const equipment = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
      status: "pending",
      ownerId: session?.user?.id,
      ownerName: session?.user?.name,
      ownerEmail: session?.user?.email,
    }
    try {
      const result = await postEquipment(equipment as Equipment)

      if (result) {
        toast.success("Equipment added!")
        router.push("/dashboard/owner/my-equipment")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Add New Equipment
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Fill in the details below. Your listing will be reviewed by an admin
          before it goes live.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Tell customers what you are renting out.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Equipment Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Canon EOS R5 Camera"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category">
                <SelectTrigger id="category" className="h-11 w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. Barishal"
                className="h-11"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Describe features, usage and what is included..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Availability */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Pricing & Availability</CardTitle>
            <CardDescription>
              Set your price, rental period and stock.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Rental Price (৳)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min={0}
                placeholder="0"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Available Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                placeholder="e.g. 3"
                className="h-11"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Rental Type</Label>
              <RadioGroup
                name="rentalType"
                defaultValue="daily"
                className="grid grid-cols-1 gap-3 sm:grid-cols-3"
              >
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Daily</Label>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">Weekly</Label>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Monthly</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Details */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Equipment Details</CardTitle>
            <CardDescription>
              Help renters know exactly what they get.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select name="condition">
                <SelectTrigger id="condition" className="h-11 w-full">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                name="brand"
                placeholder="e.g. Canon"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                name="model"
                placeholder="e.g. EOS R5"
                className="h-11"
              />
            </div>
          </CardContent>
        </Card>

        {/* Image & Terms */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Image & Terms</CardTitle>
            <CardDescription>
              Add a photo link and your rental rules.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="image">Equipment Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://i.ibb.co/example/camera.jpg"
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">
                Paste a direct link to the image.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="terms">Rental Terms and Conditions</Label>
              <Textarea
                id="terms"
                name="terms"
                rows={4}
                placeholder="e.g. security deposit, late fees, damage policy..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Owner & Status */}
        <Card className="rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Owner & Status</CardTitle>
            <CardDescription>
              These are filled in automatically.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Status</Label>
              <div>
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                  Pending
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Owner Information</Label>
              <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image ?? ""}
                    alt={session?.user?.name}
                  />
                  <AvatarFallback>
                    {session?.user?.name?.[0] ?? "O"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {session?.user?.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" className="h-11 sm:px-8">
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-11 bg-green-600 hover:bg-green-700 sm:px-8"
          >
            Add Equipment
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddEquipmentForm

/*
npx shadcn@latest add card input label textarea select button badge avatar radio-group
*/
