"use client"

import { useState } from "react"
import { BarChart3, Home, LayoutDashboard, Package, Settings, Users } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <Link href="#" className="flex items-center gap-2 font-semibold">
          {!collapsed && <span>Dashboard</span>}
          <LayoutDashboard className="h-6 w-6" />
        </Link>
        <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setCollapsed(!collapsed)}>
          <ChevronLeft className={cn("h-4 w-4 transition-all", collapsed && "rotate-180")} />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <div className="px-3 py-2">
          <h2 className={cn("mb-2 text-xs font-semibold text-muted-foreground", collapsed && "sr-only")}>Menu</h2>
          <div className="space-y-1">
            <Button variant="ghost" asChild className={cn("w-full justify-start", collapsed ? "px-2" : "px-3")}>
              <Link href="#">
                <Home className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
                {!collapsed && <span>Home</span>}
              </Link>
            </Button>
            <Button variant="ghost" asChild className={cn("w-full justify-start", collapsed ? "px-2" : "px-3")}>
              <Link href="#">
                <BarChart3 className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
                {!collapsed && <span>Analytics</span>}
              </Link>
            </Button>
            <Button variant="ghost" asChild className={cn("w-full justify-start", collapsed ? "px-2" : "px-3")}>
              <Link href="#">
                <Users className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
                {!collapsed && <span>Customers</span>}
              </Link>
            </Button>
            <Button variant="ghost" asChild className={cn("w-full justify-start", collapsed ? "px-2" : "px-3")}>
              <Link href="#">
                <Package className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
                {!collapsed && <span>Products</span>}
              </Link>
            </Button>
            <Button variant="ghost" asChild className={cn("w-full justify-start", collapsed ? "px-2" : "px-3")}>
              <Link href="#">
                <Settings className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
                {!collapsed && <span>Settings</span>}
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}

function ChevronLeft(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

