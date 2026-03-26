import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { FolderGit2, Briefcase, Target, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()
  
  // Ambil stat cepat dari database langsung (Server Component sangat efisien untuk ini)
  const portfoliosCount = await prisma.portfolio.count()
  const focusCount = await prisma.areaOfFocus.count()
  const expCount = await prisma.experience.count()

  // Ambil 3 portfolio terakhir untuk "Recent Activity"
  const recentPortfolios = await prisma.portfolio.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { images: { take: 1 } }
  })

  return (
    <div className="p-6 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Overview</p>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
            Welcome back, {session?.user?.name?.split(" ")[0]}
          </h1>
          <p className="text-slate-500">Here's a quick summary of your portfolio data today.</p>
        </div>
        <Link 
          href="/portfolios" 
          className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all active:scale-[0.98] shadow-sm"
        >
          Add New Project <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Portfolios</p>
              <h3 className="text-3xl font-semibold text-slate-900">{portfoliosCount}</h3>
            </div>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Focus Areas</p>
              <h3 className="text-3xl font-semibold text-slate-900">{focusCount}</h3>
            </div>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Experiences Configured</p>
              <h3 className="text-3xl font-semibold text-slate-900">{expCount}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Highlight using precise whitespace formatting */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-lg font-semibold text-slate-900">Recently Added Portfolios</h2>
          <Link href="/portfolios" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
            View all &rarr;
          </Link>
        </div>

        {recentPortfolios.length === 0 ? (
          <div className="py-12 bg-white border border-dashed border-slate-200 rounded-2xl text-center">
            <p className="text-sm text-slate-500">You haven't uploaded any portfolios yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPortfolios.map((p) => (
              <div key={p.id} className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-all">
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  {p.images[0]?.url ? (
                     <img src={p.images[0].url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium text-xs">No Cover Image</div>}
                </div>
                <div className="p-4 flex-1">
                  <p className="text-xs font-semibold text-indigo-600 mb-1">{p.year}</p>
                  <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">{p.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{p.company} &middot; {p.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}