"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FolderGit2, Briefcase, Target, LogOut, Menu, X, TerminalSquare, Tag as TagIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { signOut } from "next-auth/react"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Portfolios", href: "/portfolios", icon: FolderGit2 },
  { name: "Tags", href: "/tags", icon: TagIcon },
  { name: "Area of Focus", href: "/area-of-focus", icon: Target },
  { name: "Experience", href: "/experiences", icon: Briefcase },
]

export function SidebarNav({ user }: { user: any }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  const NavLinks = () => (
    <div className="space-y-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive 
                ? "bg-slate-100/80 text-slate-900 shadow-sm border border-slate-200/50" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
            }`}
          >
            <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-slate-900" : "text-slate-400 group-hover:text-slate-700"}`} />
            {item.name}
          </Link>
        )
      })}
    </div>
  )

  return (
    <>
      {/* Mobile Topbar & Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
           <TerminalSquare className="w-6 h-6 text-slate-900" />
           <span className="font-semibold text-sm tracking-tight text-slate-900">Workspace</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-slate-200/60 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Brand / Logo Area */}
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-slate-100">
           <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-white shadow-md">
             <TerminalSquare className="w-4 h-4" />
           </div>
           <span className="font-semibold text-sm tracking-tight text-slate-900">Rafirahmanda CMS</span>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
           <div className="mb-2 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Main Menu</div>
           <NavLinks />
        </div>

        {/* Custom User Profile Footer (Premium SaaS Pattern) */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 px-3 py-3 bg-white border border-slate-200 rounded-xl shadow-sm mb-3">
             <div className="w-9 h-9 rounded-md bg-linear-to-tr from-slate-200 to-slate-100 flex items-center justify-center border border-slate-300 font-semibold text-slate-700 text-sm">
               {user?.name?.charAt(0) || "U"}
             </div>
             <div className="flex-1 overflow-hidden">
               <p className="text-sm font-medium text-slate-900 truncate">{user?.name || "Admin User"}</p>
               <p className="text-xs text-slate-500 truncate">{user?.username || "@admin"}</p>
             </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </nav>
    </>
  )
}
