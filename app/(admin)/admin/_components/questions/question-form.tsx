"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/app/_components/AuthProviderContext"

// Mock data for categories
// const validCategories = ['concepts', 'trafficRules', 'trafficSafety', 'enviroment', 'generalQuestion'];
const categories = [
  { id: "1", name: "THEORY QUIZ" },
  { id: "2", name: "CONCEPT" },
  { id: "3", name: "TRAFFIC RULES" },
  { id: "4", name: "TRAFFIC SAFETY" },
  { id: "5", name: "ENVIRONMENT" },
]
const validCategories = [
  { id: "1", name: "generalQuestion" },
  { id: "2", name: "concepts" },
  { id: "3", name: "trafficRules" },
  { id: "4", name: "trafficSafety" },
  { id: "5", name: "enviroment" },
]

const optionSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, "Option text is required"),
})

const formSchema = z.object({
  question: z.string().min(5, {
    message: "Question must be at least 5 characters.",
  }),
  categoryId: z.string({
    required_error: "Please select a category.",
  }),
  options: z.array(optionSchema).min(2, "At least 2 options are required"),
  correctOptionIndex: z.string({
    required_error: "Please select the correct answer.",
  }),
})

export function QuestionForm({ questionId }: { questionId?: string }) {
  const router = useRouter()
  const {token} = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Default values for the form
  const defaultValues = questionId
    ? {
        question: "What does a red traffic light mean?", // This would come from an API in a real app
        categoryId: "3",
        options: [
          { id: "1", text: "Stop" },
          { id: "2", text: "Go" },
          { id: "3", text: "Slow down" },
          { id: "4", text: "Speed up" },
        ],
        correctOptionIndex: "0", // Index of the correct option
      }
    : {
        question: "",
        categoryId: "",
        options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
        correctOptionIndex: "",
      }


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
console.log(values)
    const payload = {
      category: validCategories.find((cat) => cat.id === values.categoryId)?.name,
      // category:values.
      // category: validCategories.find((cat) => cat === values.categoryId),
      questions: [
        {
          question: values.question,
          options: values.options.map((option) => option.text),
          answer: values.options[parseInt(values.correctOptionIndex)].text,
        },
      ],
    };
    console.log("Payload:", payload)
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload-question`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      console.log("Response data:", data)
    }catch (error) {
      console.error("Error submitting answers:", error);
    }
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)

      toast({
        title: questionId ? "Question updated" : "Question created",
        description: `Successfully ${questionId ? "updated" : "created"} question`,
      })

      router.push("/admin/dashboard/questions")
    }, 1000)
  }

  const addOption = () => {
    const currentOptions = form.getValues("options")
    form.setValue("options", [...currentOptions, { text: "" }])
  }

  const removeOption = (index: number) => {
    const currentOptions = form.getValues("options")
    if (currentOptions.length <= 2) {
      toast({
        title: "Cannot remove option",
        description: "You need at least 2 options for a question",
        variant: "destructive",
      })
      return
    }

    const newOptions = currentOptions.filter((_, i) => i !== index)
    form.setValue("options", newOptions)

    // If the removed option was the correct one, reset the correct option
    const correctIndex = Number.parseInt(form.getValues("correctOptionIndex"))
    if (correctIndex === index) {
      form.setValue("correctOptionIndex", "")
    } else if (correctIndex > index) {
      // Adjust the index if the removed option was before the correct one
      form.setValue("correctOptionIndex", (correctIndex - 1).toString())
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your question here..." className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">Options</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={addOption}>
                  Add Option
                </Button>
              </div>

              <FormField
                control={form.control}
                name="correctOptionIndex"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                        {form.watch("options").map((_, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                            <FormField
                              control={form.control}
                              name={`options.${index}.text`}
                              render={({ field }) => (
                                <FormItem className="flex-1 flex items-center gap-2">
                                  <FormControl>
                                    <Input placeholder={`Option ${index + 1}`} {...field} />
                                  </FormControl>
                                  <Button type="button" variant="ghost" size="icon" onClick={() => removeOption(index)}>
                                    <Trash className="h-4 w-4" />
                                    <span className="sr-only">Remove option</span>
                                  </Button>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>Select the radio button next to the correct answer.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : questionId ? "Update Question" : "Create Question"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard/questions")}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

