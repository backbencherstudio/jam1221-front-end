import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to the dashboard
  redirect("/admin/dashboard")

  return null
}

