import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { useState } from 'react'
import { useNotes } from '../context/NotesContext'
import { GoogleGenAI } from '@google/genai'
import { Tooltip } from '@heroui/react'
import { toast, Bounce } from 'react-toastify'

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })

const RichTextEditor = ({ content, onChange }) => {
  const [title, setTitle] = useState('')
  const [editorContent, setEditorContent] = useState('')
  const [rewriting, setRewriting] = useState(false)

  const notes = useNotes()

  const rewrite = async (text) => {
    if (!text || !text.trim()) {
      toast.info('Write something first, then rewrite.', {
        position: 'bottom-right',
        autoClose: 2000,
        theme: 'dark',
        transition: Bounce,
      })
      return
    }
    setRewriting(true)
    try {
      const result = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: `Rewrite and complete it in under 50 words : ${text}`,
      })
      editor.commands.setContent(result.text)
      setEditorContent(result.text)
      onChange(result.text)
    } catch (error) {
      console.log(error)
      toast.error('Rewrite failed. Try again.', {
        position: 'bottom-right',
        autoClose: 2000,
        theme: 'dark',
        transition: Bounce,
      })
    } finally {
      setRewriting(false)
    }
  }

  const successToast = () => {
    toast.success('Note added!', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      theme: 'dark',
      transition: Bounce,
    })
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        Underline: false,
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'Start writing your note…',
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
      setEditorContent(html)
    },
  })

  if (!editor) return null

  const formatButtons = [
    {
      label: 'Bold',
      icon: 'ri-bold',
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive('bold'),
    },
    {
      label: 'Italic',
      icon: 'ri-italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive('italic'),
    },
    {
      label: 'Strike',
      icon: 'ri-strikethrough',
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive('strike'),
    },
    {
      label: 'Underline',
      icon: 'ri-underline',
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive('underline'),
    },
  ]

  return (
    <div className="note-composer">
      <div className="composer-field composer-title-field">
        <input
          id="note-title"
          type="text"
          placeholder="Give this thought a name"
          className="w-full bg-transparent text-2xl font-semibold tracking-tight text-[var(--ink)] placeholder:text-[var(--muted)] sm:text-3xl"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="composer-field composer-content-field">
        <EditorContent editor={editor} />
      </div>

      <div className="composer-toolbar">
        <div className="flex flex-wrap items-center gap-1">
          {formatButtons.map((btn) => (
            <Tooltip key={btn.label} content={btn.label} placement="bottom" className="text-[var(--ink)] bg-[var(--paper)] border border-[var(--line)] shadow-md font-sans text-xs">
              <button
                type="button"
                onClick={btn.action}
                className={`icon-btn ${btn.active ? 'active' : ''}`}
                aria-label={btn.label}
              >
                <i className={`${btn.icon} text-base`} />
              </button>
            </Tooltip>
          ))}

          <div className="mx-1.5 h-4 w-px bg-[var(--line)]" />

          <Tooltip content="Rewrite with AI" placement="bottom" className="text-[var(--ink)] bg-[var(--paper)] border border-[var(--line)] shadow-md font-sans text-xs">
            <button
              type="button"
              onClick={() => rewrite(editorContent)}
              disabled={rewriting}
              className="icon-btn disabled:opacity-50"
              aria-label="Rewrite with AI"
            >
              <i
                className={`ri-gemini-fill text-base ${
                  rewriting ? 'animate-pulse text-brand-500' : 'ai-shimmer-icon'
                }`}
              />
            </button>
          </Tooltip>
          <span className="toolbar-hint">Make clearer</span>
        </div>

        <Tooltip content="Add note" placement="bottom" className="text-[var(--ink)] bg-[var(--paper)] border border-[var(--line)] shadow-md font-sans text-xs">
          <button
            type="button"
            className="btn-add-note"
            aria-label="Add note"
            onClick={() => {
              notes.addNote(title, editorContent)
              editor.commands.clearContent()
              setTitle('')
              setEditorContent('')
              successToast()
            }}
          >
            <span>Save note</span><i className="ri-arrow-right-up-line" />
          </button>
        </Tooltip>
      </div>
    </div>
  )
}

export default RichTextEditor
