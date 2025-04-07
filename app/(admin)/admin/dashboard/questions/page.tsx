
import { QuestionList } from "@/app/(admin)/admin/_components/questions/question-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function QuestionsPage() {
  return (
    <span>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Questions</h1>
          <Button asChild>
            <Link href="/admin/dashboard/questions/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Question
            </Link>
          </Button>
        </div>
        <QuestionList />
      </div>
    </span>
  )
}

