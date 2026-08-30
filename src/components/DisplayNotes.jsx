import React, { useState } from 'react'
import { useNotes } from '../context/NotesContext'
import { GoogleGenAI } from '@google/genai'
import { Tooltip } from '@heroui/react'
import { toast, Bounce } from 'react-toastify'

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })

function DisplayNotes() {
  const { deleteNotes, notes, updateNote } = useNotes()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'

  const [summaryId, setSummaryId] = useState(null)
  const [summary, setSummary] = useState('')
  const [summarizingId, setSummarizingId] = useState(null)

  const [isEditableId, setIsEditableId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  const stripHtmlTags = (html) => {
    if (!html) return ''
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  const summarizeNote = async (content, noteId) => {
    if (noteId === summaryId) {
      setSummaryId(null)
      setSummary('')
      return
    }

    const cleanContent = stripHtmlTags(content).trim()
    if (!cleanContent) {
      toast.info('Note content is empty to summarize.', {
        position: 'bottom-right',
        autoClose: 2000,
        theme: 'dark',
        transition: Bounce,
      })
      return
    }

    setSummarizingId(noteId)
    try {
      const result = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: `Provide a concise 2-3 sentence executive summary of this note:\n\n${cleanContent}`,
      })
      const summaryText = result.text.trim()
      setSummary(summaryText)
      setSummaryId(noteId)
    } catch (error) {
      console.error('Gemini summarize error:', error)
      toast.error('Could not generate summary. Please try again.', {
        position: 'bottom-right',
        autoClose: 2000,
        theme: 'dark',
        transition: Bounce,
      })
    } finally {
      setSummarizingId(null)
    }
  }

  const copyNoteContent = (title, content) => {
    const text = `${title ? title + '\n\n' : ''}${stripHtmlTags(content)}`
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard', {
      position: 'bottom-right',
      autoClose: 1500,
      theme: 'dark',
      transition: Bounce,
    })
  }

  const handleDelete = (id) => {
    deleteNotes(id)
    if (summaryId === id) {
      setSummaryId(null)
      setSummary('')
    }
    toast.error('Note deleted', {
      position: 'bottom-right',
      autoClose: 2000,
      theme: 'dark',
      transition: Bounce,
    })
  }

  const formatDate = (id) => {
    if (!id || typeof id !== 'number') return 'Saved'
    try {
      const date = new Date(id)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    } catch {
      return 'Saved'
    }
  }

  // Filter notes based on search query
  const filteredNotes = notes.filter((note) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    const matchTitle = (note.title || '').toLowerCase().includes(query)
    const matchContent = stripHtmlTags(note.content || '').toLowerCase().includes(query)
    return matchTitle || matchContent
  })

  if (!notes.length) {
    return (
      <div className="text-center py-16 px-4 border border-dashed border-[var(--border-main)] rounded-lg bg-[var(--bg-card)] max-w-md mx-auto animate-fade-in">
        <div className="w-10 h-10 rounded border border-[var(--border-main)] bg-[var(--bg-subtle)] text-[var(--text-primary)] flex items-center justify-center mx-auto mb-3 text-lg">
          <i className="ri-sticky-note-line" />
        </div>
        <h3 className="text-sm font-bold text-[var(--text-primary)]">Your workspace is clean</h3>
        <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto">
          Capture your first note or pick a starter template above. You can refine drafts and summarize ideas with Gemini AI anytime.
        </p>
      </div>
    )
  }

  return (
    <section className="animate-fade-in">
      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 text-xs bg-[var(--bg-card)] border border-[var(--border-main)] rounded text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:border-[var(--text-primary)] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs"
            >
              <i className="ri-close-line" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {filteredNotes.length} of {notes.length} {notes.length === 1 ? 'note' : 'notes'}
          </span>

          <div className="flex items-center gap-1 bg-[var(--bg-card)] border border-[var(--border-main)] p-0.5 rounded">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`w-6 h-6 flex items-center justify-center rounded text-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
              title="Grid view"
              aria-label="Grid view"
            >
              <i className="ri-grid-fill" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`w-6 h-6 flex items-center justify-center rounded text-xs transition-colors ${
                viewMode === 'list'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
              title="List view"
              aria-label="List view"
            >
              <i className="ri-list-check" />
            </button>
          </div>
        </div>
      </div>

      {/* No matching search results */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-12 px-4 border border-[var(--border-main)] rounded bg-[var(--bg-card)]">
          <p className="text-xs font-medium text-[var(--text-secondary)]">
            No notes matching &quot;{searchQuery}&quot;
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="mt-2 text-xs text-[var(--text-primary)] underline font-medium"
          >
            Clear search
          </button>
        </div>
      ) : (
        /* Notes Grid / List */
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5'
              : 'flex flex-col gap-2.5'
          }
        >
          {filteredNotes.map((note) => {
            const isEditing = isEditableId === note.id
            const isSummarizing = summarizingId === note.id
            const hasSummary = summaryId === note.id && summary

            return (
              <article
                key={note.id}
                className={viewMode === 'grid' ? 'note-card' : 'note-card-list'}
              >
                {isEditing ? (
                  /* Inline Edit Mode */
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Title"
                      className="text-sm font-bold bg-transparent border-b border-[var(--border-main)] pb-1 text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)]"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      placeholder="Note content..."
                      rows={4}
                      className="w-full text-xs bg-[var(--bg-subtle)] p-2 rounded border border-[var(--border-main)] text-[var(--text-primary)] focus:outline-none resize-y"
                    />
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsEditableId(null)}
                        className="btn-secondary !py-0.5 !px-2 !text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updateNote(note.id, editTitle, editContent)
                          setIsEditableId(null)
                          toast.success('Note updated', {
                            position: 'bottom-right',
                            autoClose: 1500,
                            theme: 'dark',
                            transition: Bounce,
                          })
                        }}
                        className="btn-primary !py-0.5 !px-2.5 !text-xs"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Display Mode */
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-sm tracking-tight text-[var(--text-primary)] line-clamp-1">
                        {note.title || 'Untitled Note'}
                      </h3>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] whitespace-nowrap pt-0.5">
                        {formatDate(note.id)}
                      </span>
                    </div>

                    <div
                      className="text-xs leading-relaxed text-[var(--text-secondary)] max-h-40 overflow-y-auto pr-1"
                      style={{ wordBreak: 'break-word' }}
                      dangerouslySetInnerHTML={{ __html: note.content }}
                    />
                  </div>
                )}

                {/* Gemini Summary Drawer */}
                {hasSummary && !isEditing && (
                  <div className="summary-drawer">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
                        <i className="ri-sparkling-fill" />
                        <span>AI Summary</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(summary)
                          toast.success('Summary copied', {
                            position: 'bottom-right',
                            autoClose: 1500,
                            theme: 'dark',
                            transition: Bounce,
                          })
                        }}
                        className="text-[10px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-xs leading-relaxed text-[var(--text-primary)]">
                      {summary}
                    </p>
                  </div>
                )}

                {/* Card Action Footer */}
                {!isEditing && (
                  <div className="mt-3.5 pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {/* AI Summarize */}
                      <Tooltip
                        content={hasSummary ? 'Hide summary' : 'Summarize'}
                        placement="bottom"
                        className="text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--border-main)] font-sans text-xs px-2 py-0.5 rounded"
                      >
                        <button
                          type="button"
                          className="icon-btn !w-6 !h-6"
                          aria-label="Summarize"
                          disabled={isSummarizing}
                          onClick={() => summarizeNote(note.content, note.id)}
                        >
                          <i
                            className={`ri-sparkling-line text-xs ${
                              hasSummary
                                ? 'text-[var(--text-primary)] font-bold'
                                : isSummarizing
                                  ? 'animate-spin text-[var(--text-primary)]'
                                  : 'text-[var(--text-muted)]'
                            }`}
                          />
                        </button>
                      </Tooltip>

                      {/* Copy note */}
                      <Tooltip
                        content="Copy content"
                        placement="bottom"
                        className="text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--border-main)] font-sans text-xs px-2 py-0.5 rounded"
                      >
                        <button
                          type="button"
                          className="icon-btn !w-6 !h-6"
                          aria-label="Copy note"
                          onClick={() => copyNoteContent(note.title, note.content)}
                        >
                          <i className="ri-file-copy-line text-xs" />
                        </button>
                      </Tooltip>

                      {/* Edit */}
                      <Tooltip
                        content="Edit note"
                        placement="bottom"
                        className="text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--border-main)] font-sans text-xs px-2 py-0.5 rounded"
                      >
                        <button
                          type="button"
                          className="icon-btn !w-6 !h-6"
                          aria-label="Edit note"
                          onClick={() => {
                            setIsEditableId(note.id)
                            setEditTitle(note.title || '')
                            setEditContent(stripHtmlTags(note.content || ''))
                          }}
                        >
                          <i className="ri-edit-line text-xs" />
                        </button>
                      </Tooltip>
                    </div>

                    {/* Delete */}
                    <Tooltip
                      content="Delete note"
                      placement="bottom"
                      className="text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--border-main)] font-sans text-xs px-2 py-0.5 rounded"
                    >
                      <button
                        type="button"
                        className="icon-btn !w-6 !h-6 hover:!bg-[var(--text-primary)] hover:!text-[var(--bg-canvas)] hover:!border-[var(--text-primary)]"
                        aria-label="Delete note"
                        onClick={() => handleDelete(note.id)}
                      >
                        <i className="ri-delete-bin-line text-xs" />
                      </button>
                    </Tooltip>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default DisplayNotes
