"use client"
import { BookOpen, Grid, HelpCircle, LayoutDashboard, List, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function DashboardSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-6 w-6" />
          <span>Quiz Admin</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto py-6">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">Dashboard</h2>
          <div className="space-y-1">
            <Button variant={isActive("/admin/dashboard") ? "secondary" : "ghost"} asChild className="w-full justify-start">
              <Link href="/admin/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </Link>
            </Button>
            <Button
              variant={isActive("/admin/dashboard/categories") ? "secondary" : "ghost"}
              asChild
              className="w-full justify-start"
            >
              <Link href="/admin/dashboard/categories">
                <Grid className="mr-2 h-4 w-4" />
                Categories
              </Link>
            </Button>
            <Button
              variant={isActive("/dashboard/questions") ? "secondary" : "ghost"}
              asChild
              className="w-full justify-start"
            >
              <Link href="/admin/dashboard/questions">
                <List className="mr-2 h-4 w-4" />
                Questions
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">Settings</h2>
          <div className="space-y-1">
            <Button
              variant={isActive("admin/dashboard/settings") ? "secondary" : "ghost"}
              asChild
              className="w-full justify-start"
            >
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                General
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link href="admin/dashboard/help">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}

