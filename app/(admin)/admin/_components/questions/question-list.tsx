"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/app/_components/AuthProviderContext"


// Define types for the API responses
interface ApiQuestion {
  question: string
  options: string[]
  answer: string
}

interface ApiResponse {
  success: boolean
  questions: ApiQuestion[]
}

// Define the structure for our processed questions
interface Question {
  id: string
  question: string
  category: string
  categoryId: string
  options: {
    id: string
    text: string
    isCorrect: boolean
  }[]
}

// Category definitions
const categories = [
  { id: "2", name: "CONCEPT", apiPath: "concepts" },
  { id: "3", name: "TRAFFIC SAFETY", apiPath: "trafficSafety" },
  { id: "4", name: "TRAFFIC RULES", apiPath: "trafficRules" },
  { id: "5", name: "ENVIRONMENT", apiPath: "enviroment" }, // Note: API path has a typo "enviroment" not "environment"
]

export function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { token } = useAuth()

  // Fetch questions from all APIs and combine them
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      setError(null)

      try {
        const allQuestions: Question[] = []
        let questionCounter = 1

        // Fetch questions from each API endpoint
        for (const category of categories) {
          try {
            const questionResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload-question/${category.apiPath}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              }
            });
            const data: ApiResponse = await questionResponse.json()
            
            console.log(data,"API response for category:")
            if (data.success && data.questions) {
              // Map API questions to our question format
              const processedQuestions = data.questions.map((q) => {
                // Create options with correct/incorrect flags based on the answer
                const options = q.options.map((optionText, optIdx) => ({
                  id: String(optIdx + 1),
                  text: optionText,
                  isCorrect: optionText === q.answer,
                }))

                return {
                  id: String(questionCounter++),
                  question: q.question,
                  category: category.name,
                  categoryId: category.id,
                  options,
                }
              })

              allQuestions.push(...processedQuestions)
            }
          } catch (err) {
            console.error(`Error fetching ${category.name} questions:`, err)
          }
        }

        setQuestions(allQuestions)
      } catch (err) {
        setError("Failed to fetch questions. Please try again later.")
        console.error("Error fetching questions:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [token])

  const handleDeleteClick = (questionId: string) => {
    setQuestionToDelete(questionId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (questionToDelete) {
      setQuestions(questions.filter((question) => question.id !== questionToDelete))
      setQuestionToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  // Filter questions based on category and search query
  const filteredQuestions = questions.filter((question) => {
    const matchesCategory = selectedCategory === "all" || question.categoryId === selectedCategory
    const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <span>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-1 items-center gap-4">
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <span className="notranslate">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </span>
          </div>
        </div>

        <div className="rounded-md border  ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Options</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <div className="flex justify-center items-center">
                      <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
                      <span className="ml-2">Loading questions...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-destructive">
                    {error}
                  </TableCell>
                </TableRow>
              ) : filteredQuestions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No questions found. Try adjusting your filters or add a new question.
                  </TableCell>
                </TableRow>
              ) : (
                filteredQuestions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="font-medium">{question.question}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{question.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {question.options.map((option) => (
                          <div key={option.id} className="text-sm">
                            {option.isCorrect ? (
                              <span className="text-green-600 font-medium">✓ {option.text}</span>
                            ) : (
                              <span className="text-muted-foreground">{option.text}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
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
                            <Link href={`/admin/dashboard/questions/${question.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/dashboard/questions/${question.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteClick(question.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this question and all its options. This action cannot be undone.
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
    </span>
  )
}

