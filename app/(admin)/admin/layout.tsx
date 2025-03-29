import { DashboardHeader } from "./_components/dashboard/dashboard-header"
import { DashboardSidebar } from "./_components/dashboard/dashboard-sidebar"




export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <div className="notranslate">
        <div className="flex h-screen bg-background">
          <DashboardSidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <DashboardHeader />
            {children}
          </div>
        </div>
      </div>
  )
}
