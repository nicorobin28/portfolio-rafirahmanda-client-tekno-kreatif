"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Palette,
} from "lucide-react";

const EDITOR_STYLES = `
  .ProseMirror {
    color: rgb(48, 48, 48);
    outline: none;
    min-height: 200px;
    padding: 1rem;
    font-size: 0.875rem;
    line-height: 1.625;
  }

  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #94a3b8;
    pointer-events: none;
    height: 0;
  }

  /* Headings */
  .ProseMirror h1 {
    font-size: 1.875rem;
    font-weight: 700;
    line-height: 1.2;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
    color: rgb(48, 48, 48);
  }

  .ProseMirror h2 {
    font-size: 1.375rem;
    font-weight: 600;
    line-height: 1.3;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: rgb(48, 48, 48);
  }

  /* Lists */
  .ProseMirror ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .ProseMirror ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .ProseMirror li {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }

  .ProseMirror li > p {
    margin: 0;
  }

  /* Blockquote */
  .ProseMirror blockquote {
    border-left: 3px solid #cbd5e1;
    padding-left: 1rem;
    margin-left: 0;
    color: #64748b;
    font-style: italic;
  }

  /* Paragraphs */
  .ProseMirror p {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
`;

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder:
          "Mulai menulis konten riwayat atau deskripsi panjang di sini...",
      }),
      Underline,
      TextStyle,
      Color,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        // Hapus prose class — kita pakai CSS eksplisit via <style> tag di bawah
        class: "w-full",
      },
    },
  });

  if (!editor) return null;

  const ToolbarButton = ({ onClick, isActive, children }: any) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950/10 ${
        isActive
          ? "bg-slate-200 text-slate-900 shadow-sm"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {children}
    </button>
  );

  return (
    <>
      {/* Inject ProseMirror styles sekali — tidak bergantung pada Tailwind prose */}
      <style>{EDITOR_STYLES}</style>

      <div className="w-full border border-slate-200 rounded-xl overflow-hidden bg-white focus-within:ring-4 focus-within:ring-slate-950/5 focus-within:border-slate-900 transition-all">
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-100 bg-slate-50/50">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
          >
            <UnderlineIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
          >
            <Strikethrough className="w-4 h-4" />
          </ToolbarButton>
          <label
            className="p-2 cursor-pointer flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900"
            title="Text Color"
          >
            <Palette className="w-4 h-4" />
            <input
              type="color"
              onInput={(event) =>
                editor
                  .chain()
                  .focus()
                  .setColor((event.target as HTMLInputElement).value)
                  .run()
              }
              value={editor.getAttributes("textStyle").color || "#303030"}
              className="absolute opacity-0 w-0 h-0"
            />
          </label>
          <div className="w-px h-6 bg-slate-200 mx-1 border-r border-slate-200" />
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive("heading", { level: 1 })}
          >
            <Heading1 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
          >
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          <div className="w-px h-6 bg-slate-200 mx-1 border-r" />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
          >
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>
        </div>
        <EditorContent editor={editor} className="bg-white" />
      </div>
    </>
  );
}
