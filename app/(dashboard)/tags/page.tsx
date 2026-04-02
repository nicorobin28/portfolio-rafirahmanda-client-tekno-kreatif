"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { 
  Plus, 
  Trash2, 
  Loader2, 
  Tag as TagIcon, 
  Search, 
  MoreHorizontal, 
  Edit3,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import Modal from "@/components/ui/Modal"
import { motion, AnimatePresence } from "framer-motion"

interface Tag {
  id: string
  label: string
  color: string
  _count: {
    portfolios: number
  }
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTag, setActiveTag] = useState<Tag | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    label: "",
    color: "#6366f1"
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTags()
  }, [])

  const fetchTags = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("/api/tags")
      setTags(data)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenCreate = () => {
    setActiveTag(null)
    setFormData({ label: "", color: "#6366f1" })
    setError(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (tag: Tag) => {
    setActiveTag(tag)
    setFormData({ label: tag.label, color: tag.color || "#6366f1" })
    setError(null)
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    try {
      if (activeTag) {
        await axios.put(`/api/tags/${activeTag.id}`, formData)
      } else {
        await axios.post("/api/tags", formData)
      }
      fetchTags()
      setIsModalOpen(false)
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string, label: string) => {
    if (!confirm(`Are you sure you want to delete "${label}"? This will remove it from all portfolios.`)) return
    try {
      await axios.delete(`/api/tags/${id}`)
      fetchTags()
    } catch (err) {
      alert("Failed to delete tag")
    }
  }

  const filteredTags = tags.filter(t => 
    t.label.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    total: tags.length,
    mostUsed: [...tags].sort((a,b) => (b._count?.portfolios || 0) - (a._count?.portfolios || 0))[0]?.label || "-",
    totalUsage: tags.reduce((acc, t) => acc + (t._count?.portfolios || 0), 0)
  }

  const colorPresets = [
    "#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#f43f5e", "#06b6d4"
  ]

  if (loading && tags.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold uppercase tracking-wider">
            Management
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Tags Browser</h1>
          <p className="text-slate-500 font-medium max-w-md leading-relaxed">
            Organize and classify your work samples with custom tags and colors.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-950 text-white rounded-2xl shadow-xl shadow-slate-950/10 hover:bg-slate-800 transition-all font-semibold"
        >
          <Plus className="w-5 h-5" />
          Create New Tag
        </motion.button>
      </header>

      {/* Stats Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Total Tags", value: stats.total, icon: TagIcon, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Assignments", value: stats.totalUsage, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Most Popular", value: stats.mostUsed, icon: TargetIcon, color: "text-amber-600", bg: "bg-amber-50" }
        ].map((s, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 group hover:shadow-md transition-all duration-300">
            <div className={`p-4 rounded-2xl ${s.bg} ${s.color} group-hover:scale-110 transition-transform`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">{s.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="relative group max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-950 transition-colors" />
        <input 
          type="text"
          placeholder="Filter by tagline or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-600 shadow-sm"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTags.map((tag) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={tag.id}
              className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-500 overflow-hidden relative"
            >
              {/* Dynamic Tag Color Glow */}
              <div 
                className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-5 blur-2xl rounded-full"
                style={{ backgroundColor: tag.color }}
              />
              
              <div className="flex justify-between items-start mb-6">
                <div 
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-sm ring-1 ring-inset ring-slate-900/5 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${tag.color}15`, color: tag.color }}
                >
                  {tag.label}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenEdit(tag)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(tag.id, tag.label)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                   <p className="text-3xl font-bold text-slate-900 flex items-baseline gap-1.5 leading-none">
                     {tag._count?.portfolios || 0}
                     <span className="text-[10px] uppercase text-slate-400 tracking-tighter">Projects</span>
                   </p>
                </div>
                <div className="flex -space-x-2">
                   {[...Array(Math.min(tag._count?.portfolios || 0, 3))].map((_, i) => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                         {i === 2 ? `+${(tag._count?.portfolios || 0) - 2}` : ""}
                      </div>
                   ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredTags.length === 0 && !loading && (
          <div className="col-span-full py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center px-6">
            <AlertCircle className="w-10 h-10 text-slate-300 mb-4" />
            <h4 className="text-slate-600 font-bold text-lg">No tags discovered</h4>
            <p className="text-slate-400 text-sm max-w-xs mt-1">Try another search or create a new taxonomy from scratch.</p>
          </div>
        )}
      </div>

      {/* CRUD Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={activeTag ? "Refine Tag Identity" : "Launch New Tag"}>
        <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-right-4 duration-300">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-medium animate-in shake-in">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 ml-1 flex items-center gap-2">
                Label Name
                <span className="text-[10px] font-normal text-slate-400">(Required)</span>
              </label>
              <input 
                required
                autoFocus
                placeholder="Business, Creative, Tech..."
                value={formData.label}
                onChange={e => setFormData({...formData, label: e.target.value})}
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5 outline-none transition-all placeholder:text-slate-300 font-semibold text-slate-900"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-900 ml-1">Symbolic Color</label>
              <div className="flex flex-wrap gap-3">
                {colorPresets.map(color => (
                  <button 
                    key={color} 
                    type="button" 
                    onClick={() => setFormData({...formData, color})}
                    className={`w-10 h-10 rounded-xl border-4 transition-all ${formData.color === color ? 'border-slate-950 scale-110 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <div className="relative">
                  <input 
                    type="color" 
                    value={formData.color}
                    onChange={e => setFormData({...formData, color: e.target.value})}
                    className="w-10 h-10 rounded-xl cursor-pointer opacity-0 absolute inset-0 z-10"
                  />
                  <div 
                    className="w-10 h-10 rounded-xl border-2 border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 overflow-hidden" 
                    style={{ backgroundColor: formData.color }}
                  >
                    <Plus className="w-5 h-5 text-white mix-blend-difference" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-slate-100">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:flex-1 py-4 text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-colors"
            >
              Discard Changes
            </button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:flex-2 flex items-center justify-center gap-2 py-4 bg-slate-950 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 transition-all disabled:opacity-60 shadow-xl shadow-slate-950/10"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {activeTag ? "Commit Updates" : "Publish Taxonomy"}
            </motion.button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

function TargetIcon({ className }: { className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  )
}
