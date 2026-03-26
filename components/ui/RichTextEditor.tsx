"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, Heading1, Heading2, List, ListOrdered, Quote, Palette } from 'lucide-react'

export default function RichTextEditor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Mulai menulis konten riwayat atau deskripsi panjang di sini..." }),
      Underline,
      TextStyle,
      Color,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none w-full outline-none min-h-[200px] text-sm leading-relaxed p-4'
      }
    }
  })

  // For controlled-component logic sync if value changes externally
  // useEffect(() => { if (editor && value !== editor.getHTML()) { editor.commands.setContent(value) } }, [value, editor])

  if (!editor) return null

  const ToolbarButton = ({ onClick, isActive, children }: any) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950/10 ${
        isActive ? 'bg-slate-200 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="w-full border border-slate-200 rounded-xl overflow-hidden bg-white focus-within:ring-4 focus-within:ring-slate-950/5 focus-within:border-slate-900 transition-all">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-100 bg-slate-50/50">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}><Bold className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}><Italic className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')}><UnderlineIcon className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}><Strikethrough className="w-4 h-4" /></ToolbarButton>
        <label className="p-2 cursor-pointer flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900" title="Text Color">
          <Palette className="w-4 h-4" />
          <input type="color" onInput={(event) => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()} value={editor.getAttributes('textStyle').color || '#000000'} className="absolute opacity-0 w-0 h-0" />
        </label>
        <div className="w-px h-6 bg-slate-200 mx-1 border-r border-slate-200" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}><Heading1 className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}><Heading2 className="w-4 h-4" /></ToolbarButton>
        <div className="w-px h-6 bg-slate-200 mx-1 border-r" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}><List className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}><ListOrdered className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')}><Quote className="w-4 h-4" /></ToolbarButton>
      </div>
      <EditorContent editor={editor} className="bg-white" />
    </div>
  )
}
