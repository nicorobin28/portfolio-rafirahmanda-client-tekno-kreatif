"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { Plus, Edit2, Trash2, Loader2, Target } from "lucide-react"
import Modal from "@/components/ui/Modal"

export default function AreaOfFocusPage() {
  const [areas, setAreas] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeArea, setActiveArea] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ label: "", order: "0" })

  useEffect(() => { fetchAreas() }, [])

  const fetchAreas = async () => {
    try {
      const { data } = await axios.get("/api/area-of-focus")
      setAreas(data)
    } finally { setIsLoading(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this Area of Focus?")) return
    try {
      await axios.delete(`/api/area-of-focus/${id}`)
      fetchAreas()
    } catch (e) { alert("Failed to delete") }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (activeArea) await axios.put(`/api/area-of-focus/${activeArea.id}`, formData)
      else await axios.post("/api/area-of-focus", formData)
      setIsModalOpen(false)
      fetchAreas()
    } catch (error) { alert("Failed to save") } 
    finally { setIsSubmitting(false) }
  }

  const openNew = () => { setActiveArea(null); setFormData({ label: "", order: "0" }); setIsModalOpen(true) }
  const openEdit = (a: any) => { setActiveArea(a); setFormData({ label: a.label, order: a.order.toString() }); setIsModalOpen(true) }

  if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Area of Focus</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your professional domains and expertise.</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-all focus:ring-4 focus:ring-slate-950/10">
          <Plus className="w-4 h-4" /> Add Focus
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {areas.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">No areas of focus specified.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {areas.map((area) => (
              <div key={area.id} className="group flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500"><Target className="w-5 h-5" /></div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{area.label}</h3>
                    <p className="text-xs text-slate-500">Display Order: {area.order}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(area)} className="p-2 text-slate-400 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition-all shadow-sm"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(area.id)} className="p-2 text-red-400 hover:text-red-700 bg-white border border-slate-200 hover:border-red-200 rounded-lg transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={activeArea ? "Edit Focus Area" : "New Focus Area"}>
        <form onSubmit={handleSave} className="space-y-5">
           <div className="space-y-1.5">
             <label className="text-sm font-medium text-slate-800">Label (e.g. UI/UX Design)</label>
             <input required value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm text-slate-800 outline-none placeholder-slate-400" />
           </div>
           <div className="space-y-1.5">
             <label className="text-sm font-medium text-slate-800">Display Order</label>
             <input required type="number" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm text-slate-800 outline-none placeholder-slate-400" />
           </div>
           <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
             <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
             <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-all focus:ring-4 focus:ring-slate-950/10">
               {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
             </button>
           </div>
        </form>
      </Modal>
    </div>
  )
}
