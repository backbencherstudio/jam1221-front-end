"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { deleteCategory } from "@/features/category/categorySlice"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock data for categories
const initialCategories = [
  {
    id: "1",
    name: "CONCEPT",
    description: "Basic concepts and theory questions",
    questionCount: 30,
    icon: "📚",
  },
  {
    id: "2",
    name: "TRAFFIC SAFETY",
    description: "Questions about traffic safety measures",
    questionCount: 25,
    icon: "🚧",
  },
  {
    id: "3",
    name: "TRAFFIC RULES",
    description: "Questions about traffic rules and regulations",
    questionCount: 40,
    icon: "🚦",
  },
  {
    id: "4",
    name: "ENVIRONMENT",
    description: "Questions about environmental impact and regulations",
    questionCount: 25,
    icon: "🌍",
  },
]

export function CategoryList() {
  // const [categories, setCategories] = useState(initialCategories)
  // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  // const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

  // const handleDeleteClick = (categoryId: string) => {
  //   setCategoryToDelete(categoryId)
  //   setDeleteDialogOpen(true)
  // }

  // const confirmDelete = () => {
  //   if (categoryToDelete) {
  //     setCategories(categories.filter((category) => category.id !== categoryToDelete))
  //     setCategoryToDelete(null)
  //   }
  //   setDeleteDialogOpen(false)
  // }

  const categories = useSelector((state: RootState) => state.category.categories)
  const dispatch = useDispatch()

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

  const handleDeleteClick = (categoryId: string) => {
    setCategoryToDelete(categoryId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (categoryToDelete) {
      dispatch(deleteCategory(categoryToDelete))
      setCategoryToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  return (
    <span>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-3xl">{category.icon}</div>
                  <CardTitle>{category.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/dashboard/categories/${category.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDeleteClick(category.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">{category.questionCount} questions</div>
              <div className="mt-4">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/admin/dashboard/questions?category=${category.id}`}>View Questions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <div>
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this category and all associated questions. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
      </div>
    </span>
  )
}

