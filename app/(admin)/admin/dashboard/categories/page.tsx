import { DashboardHeader } from "@/app/(admin)/admin/_components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/app/(admin)/admin/_components/dashboard/dashboard-sidebar"
import { CategoryList } from "@/app/(admin)/admin/_components/categories/category-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function CategoriesPage() {
  return (

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Categories</h1>
            <Button asChild>
              <Link href="/admin/dashboard/categories/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Category
              </Link>
            </Button>
          </div>
          <CategoryList />
        </div>
  )
}

