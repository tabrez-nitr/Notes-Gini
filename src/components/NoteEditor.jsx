import React, { useEffect, useState } from 'react'
import RichTextEditor from './RichTextEditor'
import { useNotes } from '../context/NotesContext.jsx'
import { app } from '../context/Firebase.jsx'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext.jsx'

const templates = [
  {
    label: 'Meeting Notes',
    icon: 'ri-calendar-event-line',
    title: 'Team Sync · ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    content: '<p><strong>Attendees:</strong> </p><p><strong>Agenda:</strong></p><ul><li>Topic 1</li><li>Topic 2</li></ul><p><strong>Action Items:</strong></p><ul><li>[ ] Task item</li></ul>',
  },
  {
    label: 'Brainstorm',
    icon: 'ri-lightbulb-line',
    title: 'Idea Brainstorm',
    content: '<p><strong>Problem Statement:</strong></p><p></p><p><strong>Possible Solutions:</strong></p><ul><li>Idea A</li><li>Idea B</li></ul><p><strong>Next Steps:</strong></p>',
  },
  {
    label: 'Daily Journal',
    icon: 'ri-book-open-line',
    title: 'Daily Reflection · ' + new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    content: '<p><strong>Highlights of the day:</strong></p><ul><li>Key win: </li><li>Learning: </li></ul><p><strong>Focus for tomorrow:</strong></p>',
  },
]

function NoteEditor() {
  const db = getFirestore(app)
  const { notes, setNotes } = useNotes()
  const [content, setContent] = useState('')
  const [initialTitle, setInitialTitle] = useState('')
  const [hasFetched, setHasFetched] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user == null) return

    const getNotes = async () => {
      try {
        const docRef = doc(db, 'notes', user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setNotes(docSnap.data().notes || [])
          setHasFetched(true)
        } else {
          await setDoc(docRef, { notes: [] })
          setNotes([])
          setHasFetched(true)
        }
      } catch (error) {
        console.error('Firestore load error:', error.message)
      }
    }
    getNotes()
  }, [user])

  useEffect(() => {
    if (!hasFetched || user == null) return

    const updateNote = async () => {
      try {
        const docRef = doc(db, 'notes', user.uid)
        await setDoc(docRef, { notes })
      } catch (error) {
        console.error('Firestore sync error:', error.message)
      }
    }
    updateNote()
  }, [notes, user, hasFetched])

  const applyTemplate = (template) => {
    setInitialTitle(template.title)
    setContent(template.content)
  }

  return (
    <div className="mb-10 animate-fade-in">
      {/* Quick Template Starters */}
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <span className="text-xs font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
          <i className="ri-quill-pen-line" />
          Create Note
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <span className="text-xs text-[var(--text-muted)] mr-1 hidden sm:inline">Templates:</span>
          {templates.map((tpl) => (
            <button
              key={tpl.label}
              type="button"
              onClick={() => applyTemplate(tpl)}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded border border-[var(--border-main)] hover:border-[var(--text-primary)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            >
              <i className={`${tpl.icon} text-xs text-[var(--text-primary)]`} />
              <span>{tpl.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Composer Card */}
      <div className="editor-card">
        <RichTextEditor
          content={content}
          onChange={setContent}
          initialTitle={initialTitle}
          onSaved={() => {
            setContent('')
            setInitialTitle('')
          }}
        />
      </div>
    </div>
  )
}

export default NoteEditor
