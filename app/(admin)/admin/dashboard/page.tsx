
import { DashboardOverview } from "@/app/(admin)/admin/_components/dashboard/dashboard-overview"

export default function Dashboard() {



  return (
    <span>
      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <DashboardOverview />
      </div>
    </span>
  )
}

