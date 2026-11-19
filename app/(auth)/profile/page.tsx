"use client"

import * as React from "react"
import { useSession } from "@/lib/auth-client"
import { ProfileUpdateDialog } from "@/components/profile/ProfileUpdateDialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  User,
  Shield,
  Clock,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

/**
 * Maps Better Auth internal role values to display-friendly labels.
 * Auth stores: "seeker" | "recruiter" | "admin"
 * Display:     "Customer" | "Owner" | "Admin"
 */
type AuthRole = "seeker" | "recruiter" | "admin"

type RoleInfo = {
  label: string
  value: "customer" | "owner" | "admin"
  variant: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link"
}

const ROLE_MAP: Record<AuthRole, RoleInfo> = {
  seeker: {
    label: "Customer",
    value: "customer",
    variant: "default",
  },
  recruiter: {
    label: "Owner",
    value: "owner",
    variant: "secondary",
  },
  admin: {
    label: "Admin",
    value: "admin",
    variant: "outline",
  },
}

function getRoleInfo(role: string | undefined): RoleInfo {
  if (role && role in ROLE_MAP) {
    return ROLE_MAP[role as AuthRole]
  }
  return {
    label: "Customer",
    value: "customer",
    variant: "default",
  }
}

function formatDate(dateValue: string | Date | undefined): string {
  if (!dateValue) return "Not available"
  try {
    const date =
      typeof dateValue === "string" ? new Date(dateValue) : dateValue
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return "Not available"
  }
}

export default function ProfilePage() {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const { data: session, isPending } = useSession()
  const router = useRouter()
  const user = session?.user

  // Redirect to sign-in if not authenticated
  if (!isPending && !user) {
    router.push("/sign-in")
    return null
  }

  if (!user) {
    return null
  }

  // Loading state
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3 animate-pulse">
          <Loader2 className="h-8 w-8 text-primary" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  const roleInfo = getRoleInfo(user?.role)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Profile header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/" className="text-sm font-medium text-primary">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Page title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              My Profile
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your account information
            </p>
          </div>

          {/* Profile card */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-start sm:gap-2">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-lg">
                  {user?.name || "Unnamed User"}
                </CardTitle>
                <Badge variant={roleInfo.variant} className="w-fit">
                  {roleInfo.label}
                </Badge>
              </div>
              <Button onClick={() => setDialogOpen(true)} size="sm">
                Update Profile
              </Button>
            </CardHeader>
            <Separator className="my-4" />
            <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="col-span-full sm:col-span-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      {user?.image ? (
                        <AvatarImage src={user.image} alt="Profile" />
                      ) : (
                        <AvatarFallback>
                          {user?.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {user?.email || "No email"}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail className="size-3.5" />
                      <span>{formatDate(user.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Account
                </h3>
                <p className="text-sm text-muted-foreground">
                  Member since {formatDate(user.createdAt)}
                </p>
              </div>

              <div className="border-t border-border pt-6 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Role
                </h3>
                <p className="text-sm text-muted-foreground">
                  {roleInfo.label} account
                </p>
              </div>

              <div className="border-t border-border pt-6 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Status
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm text-green-600 font-medium">
                    Active
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role-specific info section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">
                {roleInfo.label} Dashboard
              </h2>
              <Link
                href={`/dashboard/${roleInfo.value}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Go to Dashboard &rarr;
              </Link>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>
                  Quick actions for {roleInfo.label}s
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                {roleInfo.value === "customer" && (
                  <>
                    <Button variant="outline" className="w-full justify-between">
                      <span>Browse Equipment</span>
                      <User className="ml-2 size-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between">
                      <span>My Rentals</span>
                      <Shield className="ml-2 size-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between">
                      <span>Favorites</span>
                      <Clock className="ml-2 size-4" />
                    </Button>
                  </>
                )}
                {roleInfo.value === "owner" && (
                  <>
                    <Button variant="outline" className="w-full justify-between">
                      <span>Add Equipment</span>
                      <User className="ml-2 size-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between">
                      <span>My Equipment</span>
                      <Shield className="ml-2 size-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between">
                      <span>Rental Requests</span>
                      <Clock className="ml-2 size-4" />
                    </Button>
                  </>
                )}
                {roleInfo.value === "admin" && (
                  <>
                    <Button variant="outline" className="w-full justify-between">
                      <span>All Users</span>
                      <User className="ml-2 size-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between">
                      <span>All Equipment</span>
                      <Shield className="ml-2 size-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between">
                      <span>All Rentals</span>
                      <Clock className="ml-2 size-4" />
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </section>

          {dialogOpen && (
            <ProfileUpdateDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
            />
          )}
        </div>
      </main>
    </div>
  )
}
