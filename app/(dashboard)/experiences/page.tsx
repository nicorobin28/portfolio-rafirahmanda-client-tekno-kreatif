"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { Plus, Edit2, Trash2, Loader2, Briefcase } from "lucide-react"
import Modal from "@/components/ui/Modal"

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeExp, setActiveExp] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    company: "", position: "", startDate: "", endDate: "", isCurrent: false, order: "0"
  })

  useEffect(() => { fetchExperiences() }, [])

  const fetchExperiences = async () => {
    try {
      const { data } = await axios.get("/api/experiences")
      setExperiences(data)
    } finally { setIsLoading(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience?")) return
    try {
      await axios.delete(`/api/experiences/${id}`)
      fetchExperiences()
    } catch(e) {}
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (activeExp) await axios.put(`/api/experiences/${activeExp.id}`, formData)
      else await axios.post("/api/experiences", formData)
      setIsModalOpen(false)
      fetchExperiences()
    } catch (error) {} 
    finally { setIsSubmitting(false) }
  }

  const openNew = () => { setActiveExp(null); setFormData({ company: "", position: "", startDate: "", endDate: "", isCurrent: false, order: "0" }); setIsModalOpen(true) }
  const openEdit = (exp: any) => { setActiveExp(exp); setFormData({ company: exp.company, position: exp.position, startDate: exp.startDate, endDate: exp.endDate || "", isCurrent: exp.isCurrent, order: exp.order.toString() }); setIsModalOpen(true) }

  if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Experience</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your professional career timeline.</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-all focus:ring-4 focus:ring-slate-950/10">
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {experiences.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">No experiences listed yet.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {experiences.map((exp) => (
              <div key={exp.id} className="group flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 mt-1 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0"><Briefcase className="w-5 h-5" /></div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{exp.position}</h3>
                    <p className="text-sm text-slate-700">{exp.company}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {exp.startDate} &mdash; {exp.isCurrent ? "Present" : exp.endDate} &middot; Order: {exp.order}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(exp)} className="p-2 text-slate-400 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition-all shadow-sm"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(exp.id)} className="p-2 text-red-400 hover:text-red-700 bg-white border border-slate-200 hover:border-red-200 rounded-lg transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={activeExp ? "Edit Experience" : "Add Experience"}>
        <form onSubmit={handleSave} className="space-y-5">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="space-y-1.5">
               <label className="text-sm font-medium text-slate-800">Company</label>
               <input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm text-slate-800 outline-none placeholder-slate-400" />
             </div>
             <div className="space-y-1.5">
               <label className="text-sm font-medium text-slate-800">Position</label>
               <input required value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm text-slate-800 outline-none placeholder-slate-400" />
             </div>
             <div className="space-y-1.5">
               <label className="text-sm font-medium text-slate-800">Start Date (e.g. Jan 2022)</label>
               <input required value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm text-slate-800 outline-none placeholder-slate-400" />
             </div>
             <div className="space-y-1.5">
               <label className="text-sm font-medium text-slate-800">End Date</label>
               <input disabled={formData.isCurrent} required={!formData.isCurrent} value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm text-slate-800 outline-none placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-400" placeholder={formData.isCurrent ? "Present" : ""} />
             </div>
           </div>
           
           <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                 <input type="checkbox" checked={formData.isCurrent} onChange={e => setFormData({...formData, isCurrent: e.target.checked})} className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                 <span className="text-sm font-medium text-slate-700">I currently work here</span>
              </label>
              <div className="flex items-center gap-2 w-32">
                <label className="text-sm font-medium text-slate-800">Order</label>
                <input required type="number" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:border-slate-900 transition-all text-sm text-slate-800 outline-none placeholder-slate-400 text-center" />
              </div>
           </div>

           <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
             <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
             <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-all focus:ring-4 focus:ring-slate-950/10">
               {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Experience"}
             </button>
           </div>
        </form>
      </Modal>
    </div>
  )
}
