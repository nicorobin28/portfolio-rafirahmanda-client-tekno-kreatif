// src/app/(dashboard)/layout.tsx
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { SidebarNav } from "@/components/dashboard/SidebarNav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-slate-200">
      <SidebarNav user={session.user} />
      
      {/* Main Content Area (Offset for Sidebar Desktop & Mobile Topbar) */}
      <main className="lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
        <div className="flex-1 pt-16 lg:pt-0 pb-10">
          {children}
        </div>
      </main>
    </div>
  )
}