import { DashboardHeader } from "@/app/(admin)/admin/_components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/app/(admin)/admin/_components/dashboard/dashboard-sidebar"
import { QuestionForm } from "@/app/(admin)/admin/_components/questions/question-form"

export default function EditQuestionPage({ params }: { params: { id: string } }) {
  return (
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Edit Question</h1>
          <QuestionForm questionId={params.id} />
        </div>
  )
}

