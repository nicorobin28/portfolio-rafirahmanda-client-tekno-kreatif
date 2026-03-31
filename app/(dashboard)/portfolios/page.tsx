"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Plus, Edit2, FileText, Trash2, Image as ImageIcon, Loader2, UploadCloud, GripVertical } from "lucide-react"
import Modal from "@/components/ui/Modal"
import RichTextEditor from "@/components/ui/RichTextEditor"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const optimizeImage = async (file: File, maxWidth = 1920, quality = 0.8): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        const canvas = document.createElement("canvas")
        let { width, height } = img
        if (width > maxWidth) {
          height = (maxWidth / width) * height
          width = maxWidth
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0, width, height)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
                type: "image/webp",
                lastModified: Date.now(),
              })
              resolve(newFile)
            } else reject(new Error("Canvas to Blob failed"))
          },
          "image/webp",
          quality
        )
      }
      img.onerror = (err) => reject(err)
    }
    reader.onerror = (err) => reject(err)
  })
}

export default function PortfoliosPage() {
  const [portfolios, setPortfolios] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Modals state
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false)
  const [isContentModalOpen, setIsContentModalOpen] = useState(false)

  // Active items
  const [activePortfolio, setActivePortfolio] = useState<any>(null)
  const [activeContent, setActiveContent] = useState<any>(null)
  const [contentView, setContentView] = useState<"list" | "form">("list")

  // Submitting states
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    title: "", role: "", company: "", year: new Date().getFullYear().toString()
  })
  
  // Image handling
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState<any[]>([])

  const [contentFormData, setContentFormData] = useState({
    title: "", body: ""
  })

  useEffect(() => {
    fetchPortfolios()
  }, [])

  const fetchPortfolios = async () => {
    try {
      const { data } = await axios.get("/api/portfolios")
      setPortfolios(data)
      console.log(data)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this portfolio?")) return
    try {
      await axios.delete(`/api/portfolios/${id}`)
      fetchPortfolios()
    } catch (e) {
      alert("Failed to delete")
    }
  }

  const handleSavePortfolio = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = new FormData()
      payload.append("title", formData.title)
      payload.append("role", formData.role)
      payload.append("company", formData.company)
      payload.append("year", formData.year)

      // Optimize & append multi images
      for (const file of selectedFiles) {
        const optimized = await optimizeImage(file)
        payload.append("images", optimized)
      }

      if (activePortfolio) {
        await axios.put(`/api/portfolios/${activePortfolio.id}`, payload, { headers: { "Content-Type": "multipart/form-data" }})
      } else {
        await axios.post("/api/portfolios", payload, { headers: { "Content-Type": "multipart/form-data" }})
      }
      setIsPortfolioModalOpen(false)
      fetchPortfolios()
    } catch (error) {
      alert("Failed to save portfolio")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      let res;
      if (activeContent) {
        res = await axios.put(`/api/portfolios/${activePortfolio.id}/content`, {
          contentId: activeContent.id,
          title: contentFormData.title,
          body: contentFormData.body
        })
      } else {
        res = await axios.post(`/api/portfolios/${activePortfolio.id}/content`, contentFormData)
      }
      
      await fetchPortfolios()
      setActivePortfolio((prev: any) => {
         if(!prev) return prev;
         const updatedContents = activeContent 
           ? prev.contents.map((c: any) => c.id === activeContent.id ? res.data : c)
           : [...(prev.contents || []), res.data]
         return { ...prev, contents: updatedContents }
      })
      setContentView("list")
    } catch (error) {
       alert("Failed to save content")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteContent = async (contentId: string) => {
    if (!confirm("Are you sure you want to delete this content section?")) return
    try {
      await axios.delete(`/api/portfolios/${activePortfolio.id}/content?contentId=${contentId}`)
      await fetchPortfolios()
      setActivePortfolio((prev: any) => ({
        ...prev,
        contents: prev.contents.filter((c: any) => c.id !== contentId)
      }))
    } catch(err) { alert("Failed to delete content section") }
  }

  const handleReorderContent = async (newContents: any[]) => {
    // Optimistic update
    setActivePortfolio((prev: any) => ({ ...prev, contents: newContents }))
    try {
      await axios.patch(
        `/api/portfolios/${activePortfolio.id}/content`,
        { orderedIds: newContents.map((c: any) => c.id) }
      )
    } catch {
      alert("Failed to save new order — please refresh.")
    }
  }

  const handleUpdateImageAnchors = async (newImages: any[]) => {
    // Optimistic update
    setActivePortfolio((prev: any) => ({ ...prev, images: newImages }))
    try {
       await axios.patch(`/api/portfolios/${activePortfolio.id}/images`, {
          images: newImages.map(img => ({
             id: img.id,
             anchorContentId: img.anchorContentId,
             anchorPosition: img.anchorPosition
          }))
       })
    } catch {
       alert("Failed to save image anchors.")
       fetchPortfolios() // Rollback
    }
  }

  const openNewPortfolio = () => {
    setActivePortfolio(null)
    setFormData({ title: "", role: "", company: "", year: new Date().getFullYear().toString() })
    setSelectedFiles([])
    setExistingImages([])
    setIsPortfolioModalOpen(true)
  }

  const openEditPortfolio = (p: any) => {
    setActivePortfolio(p)
    setFormData({
      title: p.title, role: p.role, company: p.company, year: p.year?.toString() || ""
    })
    setSelectedFiles([])
    setExistingImages(p.images || [])
    setIsPortfolioModalOpen(true)
  }

  const openManageContent = (p: any) => {
    // Sort by order field so list reflects saved order
    const sorted = { ...p, contents: [...(p.contents || [])].sort((a, b) => a.order - b.order) }
    setActivePortfolio(sorted)
    if (sorted.contents?.length > 0) {
      setContentView("list")
    } else {
      setActiveContent(null)
      setContentFormData({ title: "Project Overview", body: "" })
      setContentView("form")
    }
    setIsContentModalOpen(true)
  }

  if (isLoading) {
     return <div className="p-8 flex items-center justify-center min-h-[50vh]"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Portfolios</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your professional work and case studies.</p>
        </div>
        <button 
          onClick={openNewPortfolio}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-all focus:ring-4 focus:ring-slate-950/10 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          Add Portfolio
        </button>
      </div>

      {portfolios.length === 0 ? (
        <div className="text-center py-24 px-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
           <ImageIcon className="mx-auto h-12 w-12 text-slate-300 mb-4" />
           <h3 className="text-sm font-medium text-slate-900">No portfolios yet</h3>
           <p className="mt-1 text-sm text-slate-500">Get started by creating your first portfolio project.</p>
           <button onClick={openNewPortfolio} className="mt-6 text-sm font-medium text-slate-900 hover:underline">Create new &rarr;</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((p) => {
            const hasContent = p.contents?.length > 0;
            return (
              <div key={p.id} className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300">
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  {p.images[0]?.url ? (
                    <img src={p.images[0].url} alt={p.images[0].altText} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400"><ImageIcon className="w-8 h-8 opacity-50" /></div>
                  )}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDelete(p.id)} className="p-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors shadow-sm">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">{p.year}</span>
                    <span className="text-xs font-medium text-slate-500 line-clamp-1">{p.company}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 leading-tight mb-1">{p.title}</h3>
                  <p className="text-sm text-slate-500 mb-6">{p.role}</p>

                  <div className="mt-auto flex items-center gap-2 pt-4 border-t border-slate-100">
                    <button onClick={() => openEditPortfolio(p)} className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg transition-all">
                      <Edit2 className="w-3.5 h-3.5" /> Details
                    </button>
                    <button onClick={() => openManageContent(p)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg transition-all ${hasContent ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100/50'}`}>
                      <FileText className="w-3.5 h-3.5" /> {hasContent ? "Manage Content" : "Add Content"}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Portfolio Details Modal */}
      <Modal isOpen={isPortfolioModalOpen} onClose={() => setIsPortfolioModalOpen(false)} title={activePortfolio ? "Edit Portfolio Details" : "Create New Portfolio"}>
        <form onSubmit={handleSavePortfolio} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-800">Title</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm text-slate-800 outline-none placeholder-slate-400" placeholder="e.g. Fintech Mobile App" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-800">Role</label>
              <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm text-slate-800 outline-none placeholder-slate-400" placeholder="e.g. Product Designer" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-800">Company / Client</label>
              <input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm text-slate-800 outline-none placeholder-slate-400" placeholder="e.g. Tokopedia" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-800">Year</label>
              <input required type="number" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm text-slate-800 outline-none placeholder-slate-400" placeholder="e.g. 2024" />
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100">
             <div className="flex items-center justify-between mb-3">
               <h4 className="text-sm font-semibold text-slate-900">Portfolio Images</h4>
               <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">Auto-compressed to WebP</span>
             </div>
             <div className="space-y-4">
               <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="w-6 h-6 text-slate-400 mb-2" />
                          <p className="text-sm text-slate-600 font-medium">Click to upload multiple images</p>
                          <p className="text-xs text-slate-400 mt-1">PNG, JPG or WEBP (Max 1920px)</p>
                      </div>
                      <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => {
                         if (e.target.files) setSelectedFiles(Array.from(e.target.files))
                      }} />
                  </label>
               </div>
               
               {/* Preview Area */}
               {(selectedFiles.length > 0 || existingImages.length > 0) && (
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                     {existingImages.length > 0 && selectedFiles.length === 0 && existingImages.map((img, idx) => (
                        <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                           <img src={img.url} className="w-full h-full object-cover" />
                        </div>
                     ))}
                     {selectedFiles.map((file, idx) => (
                        <div key={`new-${idx}`} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                           <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                           <div className="absolute top-1.5 right-1.5 bg-slate-900/70 rounded px-1.5 py-0.5 backdrop-blur-md text-[10px] font-semibold text-white">New</div>
                        </div>
                     ))}
                   </div>
               )}
             </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button type="button" onClick={() => setIsPortfolioModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting || (!activePortfolio && selectedFiles.length === 0)} className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-all disabled:opacity-60 focus:ring-4 focus:ring-slate-950/10 shadow-sm">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Portfolio
            </button>
          </div>
        </form>
      </Modal>

      {/* Portfolio Content Modal */}
      <Modal isOpen={isContentModalOpen} onClose={() => setIsContentModalOpen(false)} title={contentView === 'list' ? "Manage Content Sections" : activeContent ? "Edit Case Study Content" : "Add Case Study Content"}>
        {contentView === "list" ? (
          <div className="space-y-4">
            {activePortfolio?.contents?.length > 0 ? (
              <SortableContentList
                contents={activePortfolio.contents}
                portfolioImages={activePortfolio.images || []}
                onReorder={handleReorderContent}
                onEdit={(c) => { setActiveContent(c); setContentFormData({ title: c.title, body: c.body }); setContentView("form") }}
                onDelete={handleDeleteContent}
                onUpdateImageAnchors={handleUpdateImageAnchors}
              />
            ) : (
               <div className="text-center py-8 text-sm text-slate-500">No content sections exist yet.</div>
            )}

            <button onClick={() => { setActiveContent(null); setContentFormData({ title: "", body: "" }); setContentView("form"); }} className="w-full py-3 flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 text-slate-600 font-semibold text-sm rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all">
               <Plus className="w-4 h-4" /> Add New Section
            </button>
          </div>
        ) : (
          <form onSubmit={handleSaveContent} className="space-y-5 animate-in slide-in-from-right-4 duration-300">
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-800">Section Title</label>
                <input required value={contentFormData.title} onChange={e => setContentFormData({...contentFormData, title: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-sm text-slate-800 outline-none placeholder-slate-400 font-medium" placeholder="e.g. The Challenge" />
             </div>
             
             <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-800 flex items-center justify-between">
                  <span>Body Content</span>
                  <span className="text-xs font-normal text-slate-500">Supports rich text</span>
                </label>
                <RichTextEditor value={contentFormData.body} onChange={(val) => setContentFormData({...contentFormData, body: val})} />
             </div>

             <div className="flex justify-between items-center gap-3 pt-6 border-t border-slate-100">
               {activePortfolio?.contents?.length > 0 ? (
                 <button type="button" onClick={() => setContentView("list")} className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">&larr; Back to List</button>
               ) : <div/>}
               <div className="flex items-center gap-2">
                 <button type="button" onClick={() => setIsContentModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
                 <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-all disabled:opacity-60 focus:ring-4 focus:ring-slate-950/10 shadow-sm">
                   {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                   Save Content
                 </button>
               </div>
             </div>
          </form>
        )}
      </Modal>

    </div>
  )
}

// ─── Sortable sub-components ────────────────────────────────────────────────

interface SortableContentItemProps {
  content: any
  anchoredImages: any[]
  onEdit: (c: any) => void
  onDelete: (id: string) => void
  onManageLayout: (c: any) => void
}

function SortableContentItem({ 
  content: c, 
  anchoredImages, 
  onEdit, 
  onDelete, 
  onManageLayout 
}: SortableContentItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: c.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.85 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors ${
        isDragging
          ? "shadow-lg ring-2 ring-slate-900/10 rounded-xl bg-white z-50 transition-none"
          : "hover:bg-slate-100/60"
      }`}
    >
      <div className="flex items-center gap-2 p-3 sm:p-4">
        {/* Drag handle */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="p-1 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing rounded-md hover:bg-slate-200/60 transition-colors shrink-0 touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {/* Content info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-800 text-sm line-clamp-1">{c.title}</h4>
          <p className="text-xs text-slate-500 mt-0.5 max-w-[240px] line-clamp-1">
            {c.body.replace(/<[^>]+>/g, "") || "No content body..."}
          </p>

          {/* Anchored Images Count/Thumbnails */}
          {anchoredImages.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 no-scrollbar">
              {anchoredImages.map((img: any) => (
                <div key={img.id} className="relative w-8 h-8 rounded-md overflow-hidden border border-white ring-1 ring-slate-200 shadow-sm shrink-0">
                  <img src={img.url} className="w-full h-full object-cover" />
                  <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white shadow-xs ${img.anchorPosition === 'BEFORE' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                </div>
              ))}
              <span className="text-[10px] font-bold text-slate-400 ml-1 whitespace-nowrap">{anchoredImages.length} anchored</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onManageLayout(c)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-[11px] font-bold rounded-lg transition-all border border-indigo-100/50"
          >
            <ImageIcon className="w-3.5 h-3.5" /> Layout
          </button>
          <button
            type="button"
            onClick={() => onEdit(c)}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(c.id)}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-700 text-slate-500 text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

interface SortableContentListProps {
  contents: any[]
  portfolioImages: any[]
  onReorder: (newContents: any[]) => void
  onEdit: (c: any) => void
  onDelete: (id: string) => void
  onUpdateImageAnchors: (images: any[]) => void
}

function SortableContentList({ 
  contents, 
  portfolioImages, 
  onReorder, 
  onEdit, 
  onDelete,
  onUpdateImageAnchors
}: SortableContentListProps) {
  const [layoutModalOpen, setLayoutModalOpen] = useState(false)
  const [targetContent, setTargetContent] = useState<any>(null)
  const [isUpdatingLayout, setIsUpdatingLayout] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = contents.findIndex((c) => c.id === active.id)
    const newIndex = contents.findIndex((c) => c.id === over.id)
    const reordered = arrayMove(contents, oldIndex, newIndex)
    onReorder(reordered)
  }

  const handleToggleAnchor = (img: any, position: "BEFORE" | "AFTER" | null) => {
    const updatedImages = portfolioImages.map(i => {
      if (i.id === img.id) {
        // If clicking the current position again, nullify it. Else, set it.
        const isCurrentlyThere = i.anchorContentId === targetContent.id && i.anchorPosition === position
        return {
          ...i,
          anchorContentId: isCurrentlyThere ? null : targetContent.id,
          anchorPosition: isCurrentlyThere ? null : position
        }
      }
      return i
    })
    onUpdateImageAnchors(updatedImages)
  }

  return (
    <>
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
        {/* Header hint */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100/70 border-b border-slate-200">
          <GripVertical className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Drag to reorder sections
          </span>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={contents.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {contents.map((c) => (
              <SortableContentItem
                key={c.id}
                content={c}
                anchoredImages={portfolioImages.filter(img => img.anchorContentId === c.id)}
                onEdit={onEdit}
                onDelete={onDelete}
                onManageLayout={(item) => { setTargetContent(item); setLayoutModalOpen(true); }}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <Modal isOpen={layoutModalOpen} onClose={() => setLayoutModalOpen(false)} title={`Manage Layout: ${targetContent?.title}`}>
         <div className="space-y-6">
            <div className="text-sm text-slate-500">Pick images and their position relative to <span className="font-bold text-slate-900">"{targetContent?.title}"</span></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto p-1">
               {portfolioImages.map((img) => {
                  const isBefore = img.anchorContentId === targetContent?.id && img.anchorPosition === "BEFORE"
                  const isAfter = img.anchorContentId === targetContent?.id && img.anchorPosition === "AFTER"
                  const isOther = img.anchorContentId && img.anchorContentId !== targetContent?.id

                  return (
                    <div key={img.id} className={`group flex flex-col p-3 rounded-2xl border transition-all ${isBefore || isAfter ? 'bg-indigo-50/50 border-indigo-200 shadow-sm' : 'bg-white border-slate-100'} ${isOther ? 'opacity-40 grayscale-50' : ''}`}>
                       <div className="relative aspect-video rounded-xl overflow-hidden mb-3 shadow-xs">
                          <img src={img.url} className="w-full h-full object-cover" />
                          {isOther && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-xs flex items-center justify-center p-4">
                               <p className="text-[10px] font-bold text-slate-600 text-center leading-tight">Anchored to another section</p>
                            </div>
                          )}
                       </div>
                       
                       <div className="flex items-center gap-1.5">
                          <button 
                            onClick={() => handleToggleAnchor(img, "BEFORE")}
                            className={`flex-1 py-2 rounded-xl text-[10px] font-bold transition-all border ${isBefore ? 'bg-amber-400 text-white border-amber-500 shadow-md scale-105' : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'}`}
                          >
                             {isBefore ? "✓ BEFORE" : "BEFORE"}
                          </button>
                          <button 
                            onClick={() => handleToggleAnchor(img, "AFTER")}
                            className={`flex-1 py-2 rounded-xl text-[10px] font-bold transition-all border ${isAfter ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105' : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'}`}
                          >
                             {isAfter ? "✓ AFTER" : "AFTER"}
                          </button>
                       </div>
                    </div>
                  )
               })}
            </div>
            
            <div className="flex justify-end pt-4 border-t border-slate-100">
               <button onClick={() => setLayoutModalOpen(false)} className="px-6 py-2.5 bg-slate-950 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-950/20 active:scale-95">Done</button>
            </div>
         </div>
      </Modal>
    </>
  )
}
