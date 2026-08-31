import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { useState, useEffect } from 'react'
import { useNotes } from '../context/NotesContext'
import { Tooltip } from '@heroui/react'
import { toast, Bounce } from 'react-toastify'
import { generateGeminiContent } from '../services/aiService'

const RichTextEditor = ({ content, onChange, initialTitle = '', onSaved }) => {
  const [title, setTitle] = useState(initialTitle)
  const [editorContent, setEditorContent] = useState('')
  const [rewriting, setRewriting] = useState(false)

  const { addNote } = useNotes()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        Underline: false,
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'Write your thoughts, ideas, or meeting notes here…',
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      if (onChange) onChange(html)
      setEditorContent(html)
    },
  })

  // Synchronize when external content changes (e.g. from a template)
  useEffect(() => {
    if (editor && content !== undefined && content !== editor.getHTML()) {
      editor.commands.setContent(content)
      setEditorContent(content)
    }
  }, [content, editor])

  useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle)
    }
  }, [initialTitle])

  const rewriteWithAI = async (text) => {
    const cleanText = text.replace(/<[^>]*>?/gm, '').trim()
    if (!cleanText) {
      toast.info('Write some text first, then refine it with AI.', {
        position: 'bottom-right',
        autoClose: 2000,
        theme: 'dark',
        transition: Bounce,
      })
      return
    }

    setRewriting(true)
    try {
      const polishedText = await generateGeminiContent(
        `Rewrite and polish this note to be concise, clear, and well-structured with formatting if appropriate, in under 60 words: ${cleanText}`
      )
      editor.commands.setContent(polishedText)
      setEditorContent(polishedText)
      if (onChange) onChange(polishedText)

      toast.success('Polished with Gemini AI', {
        position: 'bottom-right',
        autoClose: 2000,
        theme: 'dark',
        transition: Bounce,
      })
    } catch (error) {
      console.error('Gemini rewrite error:', error)
      toast.error('AI refinement failed. Please try again.', {
        position: 'bottom-right',
        autoClose: 2000,
        theme: 'dark',
        transition: Bounce,
      })
    } finally {
      setRewriting(false)
    }
  }

  const handleSave = () => {
    const cleanText = editorContent.replace(/<[^>]*>?/gm, '').trim()
    if (!title.trim() && !cleanText) {
      toast.info('Note cannot be empty.', {
        position: 'bottom-right',
        autoClose: 2000,
        theme: 'dark',
        transition: Bounce,
      })
      return
    }

    addNote(title.trim() || 'Untitled Note', editorContent || '<p></p>')
    editor.commands.clearContent()
    setTitle('')
    setEditorContent('')

    toast.success('Note captured', {
      position: 'bottom-right',
      autoClose: 2000,
      theme: 'dark',
      transition: Bounce,
    })

    if (onSaved) onSaved()
  }

  if (!editor) return null

  // Calculate word count
  const rawText = editorContent.replace(/<[^>]*>?/gm, ' ').trim()
  const wordCount = rawText ? rawText.split(/\s+/).filter(Boolean).length : 0

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
      label: 'Underline',
      icon: 'ri-underline',
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive('underline'),
    },
    {
      label: 'Strike',
      icon: 'ri-strikethrough',
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive('strike'),
    },
    {
      label: 'Bullet list',
      icon: 'ri-list-unordered',
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive('bulletList'),
    },
    {
      label: 'Numbered list',
      icon: 'ri-list-ordered-2',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive('orderedList'),
    },
    {
      label: 'Quote',
      icon: 'ri-double-quotes-l',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive('blockquote'),
    },
    {
      label: 'Code',
      icon: 'ri-code-line',
      action: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive('code'),
    },
  ]

  return (
    <div
      className="flex flex-col"
      onKeyDown={(e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
          e.preventDefault()
          handleSave()
        }
      }}
    >
      {/* Title Field */}
      <div className="px-5 pt-4 pb-2">
        <input
          id="note-title"
          type="text"
          placeholder="Note title..."
          className="w-full bg-transparent text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] outline-none border-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* TipTap Editor */}
      <div className="flex-1">
        <EditorContent editor={editor} />
      </div>

      {/* Action Toolbar */}
      <div className="composer-toolbar">
        <div className="flex items-center gap-1 flex-wrap">
          {formatButtons.map((btn) => (
            <Tooltip
              key={btn.label}
              content={btn.label}
              placement="bottom"
              className="text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--border-main)] font-sans text-xs px-2 py-1 rounded"
            >
              <button
                type="button"
                onClick={btn.action}
                className={`icon-btn !w-8 !h-8 !border-0 ${btn.active ? 'active' : ''}`}
                aria-label={btn.label}
              >
                <i className={`${btn.icon} text-sm`} />
              </button>
            </Tooltip>
          ))}

          <div className="h-4 w-px bg-[var(--border-main)] mx-1" />

          {/* AI Refine Button */}
          <button
            type="button"
            onClick={() => rewriteWithAI(editorContent)}
            disabled={rewriting}
            className="btn-ai"
          >
            <i className={`ri-sparkling-fill text-xs ${rewriting ? 'animate-spin' : ''}`} />
            <span>{rewriting ? 'Polishing...' : 'Refine with AI'}</span>
          </button>
        </div>

        {/* Right side stats & Save */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--text-muted)] font-mono hidden sm:inline-block">
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </span>

          <button
            type="button"
            className="btn-primary"
            onClick={handleSave}
          >
            <span>Save Note</span>
            <i className="ri-check-line text-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default RichTextEditor
