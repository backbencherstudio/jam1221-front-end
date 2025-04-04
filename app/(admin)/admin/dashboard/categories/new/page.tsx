
import { CategoryForm } from "@/app/(admin)/admin/_components/categories/category-form"

export default function NewCategoryPage() {
  return (
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Add New Category</h1>
          <CategoryForm />
        </div>
  )
}

