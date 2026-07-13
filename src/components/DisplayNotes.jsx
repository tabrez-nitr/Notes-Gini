import React, { useState } from 'react'
import { useNotes } from '../context/NotesContext'
import { GoogleGenAI } from '@google/genai'
import { Tooltip } from '@heroui/react'
import { toast, Bounce } from 'react-toastify'

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })

function DisplayNotes() {
  const [summaryId, setSummaryId] = useState(null)
  const [summary, setSummary] = useState('')
  const [summarizingId, setSummarizingId] = useState(null)

  const { deleteNotes, notes, updateNote } = useNotes()
  const [isEditableId, setIsEditableId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  const summarizeNote = async (content, noteId) => {
    if (noteId === summaryId) {
      setSummaryId(null)
      setSummary('')
      return
    }
    setSummarizingId(noteId)
    try {
      const result = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: `Summarize this note : ${content}`,
      })
      const summaryContent = await result.text
      setSummary(summaryContent)
      setSummaryId(noteId)
    } catch (error) {
      console.error(error)
      toast.error('Summary failed. Try again.', {
        position: 'bottom-right',
        autoClose: 2000,
        theme: 'dark',
        transition: Bounce,
      })
    } finally {
      setSummarizingId(null)
    }
  }

  const deleteNote = (id) => {
    deleteNotes(id)
    if (summaryId === id) {
      setSummaryId(null)
      setSummary('')
    }
  }

  const deleteToast = () => {
    toast.error('Note deleted', {
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

  const stripHtmlTags = (html) => {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  if (!notes.length) {
    return (
      <div className="animate-fade-up mx-auto mt-4 max-w-2xl rounded-2xl border border-dashed border-[var(--line)] bg-[var(--paper)] px-6 py-16 text-center backdrop-blur-sm shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] shadow-sm border border-[var(--line)]">
          <i className="ri-sticky-note-line text-2xl" />
        </div>
        <h3 className="font-display text-lg font-semibold text-[var(--ink)]">
          No notes yet
        </h3>
        <p className="mt-2 text-xs text-[var(--muted)] leading-relaxed">
          Capture a thought above, fill in the title, then click the <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/10 text-brand-500">+</span> button to create your first note.
        </p>
      </div>
    )
  }

  return (
    <section className="animate-fade-up">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight text-[var(--ink)]">
            Your notes
          </h2>
          <p className="text-xs text-[var(--muted)]">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note, index) => {
          const isEdit = isEditableId === note.id
          const isSummarizing = summarizingId === note.id

          return (
            <article
              key={note.id}
              className="note-card min-h-[180px]"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {isEdit ? (
                <div className="flex-1">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="font-display mb-2 w-full border-b border-[var(--line)] bg-transparent pb-1 text-lg font-semibold text-[var(--ink)] outline-none"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-28 w-full resize-none bg-transparent text-sm leading-relaxed text-[var(--ink)] outline-none"
                  />
                </div>
              ) : (
                <div className="flex-1">
                  <h3 className="font-display mb-2.5 border-b border-[var(--line)] pb-2 text-lg font-semibold tracking-tight text-[var(--ink)]">
                    {note.title || 'Untitled'}
                  </h3>
                  <div
                    className="prose-sm max-h-40 overflow-y-auto text-sm leading-relaxed text-[var(--muted)]"
                    style={{ wordWrap: 'break-word' }}
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                </div>
              )}

              {summaryId === note.id && summary && (
                <div className="mt-3 animate-fade-in">
                  <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                    <i className="ri-sparkling-2-line animate-pulse" />
                    Summary
                  </div>
                  <div className="summary-box text-xs leading-relaxed text-[var(--ink)]">
                    {summary}
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-3">
                <div className="flex items-center gap-1">
                  <Tooltip
                    content={isEdit ? 'Save' : 'Edit'}
                    placement="bottom"
                    className="text-[var(--ink)] bg-[var(--paper)] border border-[var(--line)] shadow-md font-sans text-xs"
                  >
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label={isEdit ? 'Save' : 'Edit'}
                      onClick={() => {
                        if (isEdit) {
                          updateNote(note.id, editTitle, editContent)
                          setIsEditableId(null)
                        } else {
                          setIsEditableId(note.id)
                          setEditTitle(note.title)
                          setEditContent(stripHtmlTags(note.content))
                        }
                      }}
                    >
                      <i
                        className={`${
                          isEdit ? 'ri-save-line' : 'ri-edit-2-line'
                        } text-base ${isEdit ? 'text-emerald-500' : 'text-brand-500'}`}
                      />
                    </button>
                  </Tooltip>

                  <Tooltip
                    content={summaryId === note.id ? 'Hide summary' : 'Summarize'}
                    placement="bottom"
                    className="text-[var(--ink)] bg-[var(--paper)] border border-[var(--line)] shadow-md font-sans text-xs"
                  >
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label="Summarize"
                      disabled={isSummarizing}
                      onClick={() =>
                        summarizeNote(stripHtmlTags(note.content), note.id)
                      }
                    >
                      <i
                        className={`ri-gemini-line text-base ${
                          summaryId === note.id
                            ? 'text-brand-500 font-bold'
                            : isSummarizing
                              ? 'animate-pulse text-brand-500'
                              : 'text-[var(--muted)]'
                        }`}
                      />
                    </button>
                  </Tooltip>
                </div>

                <Tooltip content="Delete" placement="bottom" className="text-[var(--ink)] bg-[var(--paper)] border border-[var(--line)] shadow-md font-sans text-xs">
                  <button
                    type="button"
                    className="icon-btn hover:!bg-rose-500/10 hover:!text-rose-500"
                    aria-label="Delete"
                    onClick={() => {
                      deleteNote(note.id)
                      deleteToast()
                    }}
                  >
                    <i className="ri-delete-bin-line text-base text-rose-500 dark:text-rose-400/90" />
                  </button>
                </Tooltip>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default DisplayNotes
