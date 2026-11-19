"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { useSession } from "@/lib/auth-client"
import type { LucideIcon } from "lucide-react"
import {
  CalendarCheck,
  ClipboardList,
  Heart,
  Home,
  LayoutDashboard,
  Package,
  PackagePlus,
  Users,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export type Role = "customer" | "owner" | "admin"

export type MenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

// Menus follow the assignment: Customer / Owner / Admin dashboards
const menuItemsByRole: Record<Role, MenuItem[]> = {
  customer: [
    { id: "customer-dashboard", name: "Dashboard", url: "/dashboard/customer", icon: LayoutDashboard },
    { id: "customer-rentals", name: "My Rentals", url: "/dashboard/customer/rentals", icon: CalendarCheck },
    { id: "customer-favorites", name: "Favorites", url: "/dashboard/customer/favorites", icon: Heart },
    { id: "customer-profile", name: "Profile", url: "/profile", icon: User },
  ],
  owner: [
    { id: "owner-dashboard", name: "Dashboard", url: "/dashboard/owner", icon: LayoutDashboard },
    { id: "owner-add-equipment", name: "Add Equipment", url: "/dashboard/owner/add-equipment", icon: PackagePlus },
    { id: "owner-my-equipment", name: "My Equipment", url: "/dashboard/owner/my-equipment", icon: Package },
    { id: "owner-rentals", name: "My Equipment Rental", url: "/dashboard/owner/rentals", icon: ClipboardList },
    { id: "owner-profile", name: "My Profile", url: "/profile", icon: User },
  ],
  admin: [
    { id: "admin-dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { id: "admin-users", name: "All Users", url: "/dashboard/admin/users", icon: Users },
    { id: "admin-equipment", name: "All Equipment", url: "/dashboard/admin/equipment", icon: Package },
    { id: "admin-rentals", name: "All Rentals", url: "/dashboard/admin/rentals", icon: ClipboardList },
    { id: "admin-profile", name: "My Profile", url: "/profile", icon: User },
  ],
}

function isRole(value: unknown): value is Role {
  return value === "customer" || value === "owner" || value === "admin"
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session, isPending } = useSession()

  const role: Role = isRole(session?.user?.role) ? session.user.role : "customer"
  const menuItems = menuItemsByRole[role]

  // The dashboard root (e.g. /dashboard/owner) must match exactly,
  // other items stay active on nested routes too.
  const isActive = (url: string) =>
    url === `/dashboard/${role}`
      ? pathname === url
      : pathname === url || pathname.startsWith(`${url}/`)

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <Link href="/" className="text-lg font-bold text-green-600">
          Renthobe
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
        
{isPending ? (
  Array.from({ length: 5 }).map((_, i) => (
    <SidebarMenuItem key={i}>
      <div className="flex h-8 items-center gap-3 px-2">
        {/* Icon Skeleton */}
        <Skeleton className="h-4 w-4 rounded-md" />

        {/* Text Skeleton */}
        <Skeleton
          className={`h-4 ${
            i % 2 === 0 ? "w-3/4" : "w-1/2"
          }`}
        />
      </div>
    </SidebarMenuItem>
  ))
) : (
  <>
    {menuItems.map((item) => (
      <SidebarMenuItem key={item.id}>
        <SidebarMenuButton
          isActive={isActive(item.url)}
          render={<Link href={item.url} />}
        >
          <item.icon />
          <span>{item.name}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))}

    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={pathname === "/"}
        render={<Link href="/" />}
      >
        <Home />
        <span>Home</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </>
)}

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {isPending ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-36" />
          </div>
        ) : (
          session?.user && (
            <div className="min-w-0 text-sm">
              <p className="truncate font-medium">{session.user.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          )
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
