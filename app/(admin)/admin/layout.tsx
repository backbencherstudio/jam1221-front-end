"use client";

import { useAuth } from "@/app/_components/AuthProviderContext";
import { DashboardHeader } from "./_components/dashboard/dashboard-header";
import { DashboardSidebar } from "./_components/dashboard/dashboard-sidebar";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();


  if (loading || user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirect if the user type is not 'user'
  if ((user?.type !== "admin")) {
    redirect("/");
  }

  return (
    <div className="">
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <div className="flex flex-col flex-1">
          <DashboardHeader />
          <span className="border-l mt-[64px]">
            {children}
          </span>
        </div>
      </div>
    </div>
  );
}
