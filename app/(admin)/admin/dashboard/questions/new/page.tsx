import { DashboardHeader } from "@/app/(admin)/admin/_components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/app/(admin)/admin/_components/dashboard/dashboard-sidebar"
import { QuestionForm } from "@/app/(admin)/admin/_components/questions/question-form"

export default function NewQuestionPage() {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Add New Question</h1>
          <QuestionForm />
        </div>
      </div>
    </div>
  )
}

