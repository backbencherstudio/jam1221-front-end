import { QuestionForm } from "@/app/(admin)/admin/_components/questions/question-form"

export default async function EditQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; // Resolve the promise

  return (
    <span>
      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Question</h1>
        <QuestionForm questionId={resolvedParams.id} />
      </div>
    </span>
  );
}

