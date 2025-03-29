"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { addCategory, updateCategory } from "@/features/category/categorySlice"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  icon: z.string().min(1, {
    message: "Please provide an icon.",
  }),
})

export function CategoryForm({ categoryId }: { categoryId?: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const categories = useSelector((state: RootState) => state.category.categories)
  const dispatch = useDispatch()
  // Default values for the form
  const defaultValues = categoryId
    ? {
      name: "TRAFFIC SAFETY", // This would come from an API in a real app
      description: "Questions about traffic safety measures",
      icon: "🚧",
    }
    : {
      name: "",
      description: "",
      icon: "",
    }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    let newData = {
      id: categoryId ? categoryId : categories.length + 1,
      name: values.name,
      description: values.description,
      icon: values.icon,
    }
    // Simulate API call
    setTimeout(() => {
      // console.log(values)
      // setIsSubmitting(false)
      // console.log(values)
      // toast({
      //   title: categoryId ? "Category updated" : "Category created",
      //   description: `Successfully ${categoryId ? "updated" : "created"} ${values.name}`,
      // })

      dispatch(addCategory(newData))
      router.push("/admin/dashboard/categories")
    }, 1000)
  }

  return (
    <div>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., TRAFFIC RULES" {...field} />
                    </FormControl>
                    <FormDescription>This is the name that will be displayed to users.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what this category is about..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>A brief description of what questions this category contains.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 🚦 or icon URL" {...field} />
                    </FormControl>
                    <FormDescription>An emoji or URL to an icon image.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : categoryId ? "Update Category" : "Create Category"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard/categories")}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

