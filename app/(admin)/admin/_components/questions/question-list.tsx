"use client"

import { useState } from "react"
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

// Mock data for questions
const initialQuestions = [
  {
    id: "1",
    question: "What does a red traffic light mean?",
    category: "TRAFFIC RULES",
    categoryId: "3",
    options: [
      { id: "1", text: "Stop", isCorrect: true },
      { id: "2", text: "Go", isCorrect: false },
      { id: "3", text: "Slow down", isCorrect: false },
      { id: "4", text: "Speed up", isCorrect: false },
    ],
  },
  {
    id: "2",
    question: "What is the purpose of a seatbelt?",
    category: "TRAFFIC SAFETY",
    categoryId: "2",
    options: [
      { id: "1", text: "To restrict movement", isCorrect: false },
      { id: "2", text: "To protect in case of accident", isCorrect: true },
      { id: "3", text: "For comfort", isCorrect: false },
      { id: "4", text: "It's just a legal requirement", isCorrect: false },
    ],
  },
  {
    id: "3",
    question: "What is the main cause of air pollution from vehicles?",
    category: "ENVIRONMENT",
    categoryId: "4",
    options: [
      { id: "1", text: "Tire wear", isCorrect: false },
      { id: "2", text: "Engine noise", isCorrect: false },
      { id: "3", text: "Exhaust emissions", isCorrect: true },
      { id: "4", text: "Air conditioning", isCorrect: false },
    ],
  },
  {
    id: "4",
    question: "What does a yellow traffic light indicate?",
    category: "TRAFFIC RULES",
    categoryId: "3",
    options: [
      { id: "1", text: "Stop", isCorrect: false },
      { id: "2", text: "Go faster", isCorrect: false },
      { id: "3", text: "Prepare to stop", isCorrect: true },
      { id: "4", text: "Turn right", isCorrect: false },
    ],
  },
  {
    id: "5",
    question: "What is the definition of a vehicle?",
    category: "CONCEPT",
    categoryId: "1",
    options: [
      { id: "1", text: "A device with wheels", isCorrect: false },
      { id: "2", text: "A means of transportation", isCorrect: true },
      { id: "3", text: "A motorized machine", isCorrect: false },
      { id: "4", text: "A personal property", isCorrect: false },
    ],
  },
]

// Mock data for categories
const categories = [
  { id: "1", name: "CONCEPT" },
  { id: "2", name: "TRAFFIC SAFETY" },
  { id: "3", name: "TRAFFIC RULES" },
  { id: "4", name: "ENVIRONMENT" },
]

export function QuestionList() {
  const [questions, setQuestions] = useState(initialQuestions)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 items-center gap-4">
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
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
        </div>
      </div>

      <div className="rounded-md border">
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
            {filteredQuestions.length === 0 ? (
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
  )
}

