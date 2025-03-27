

import { DashboardHeader } from "@/app/(admin)/admin/_components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/app/(admin)/admin/_components/dashboard/dashboard-sidebar"
import { DashboardOverview } from "@/app/(admin)/admin/_components/dashboard/dashboard-overview"

export default function Dashboard() {



  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <DashboardOverview />
        </div>
      </div>
    </div>
  )
}

