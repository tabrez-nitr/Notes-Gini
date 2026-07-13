import React, { useEffect, useState } from 'react'
import RichTextEditor from './RichTextEditor'
import { useNotes } from '../context/NotesContext.jsx'
import { app } from '../context/Firebase.jsx'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext.jsx'

function NoteEditor() {
  const db = getFirestore(app)
  const { notes, setNotes } = useNotes()
  const [content, setContent] = useState('')
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
        console.log(error.message)
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
        console.error(error.message)
      }
    }
    updateNote()
  }, [notes, user])

  return (
    <div className="animate-fade-up mb-12">
      <div className="editor-card">
          <div className="composer-header">
            <span className="composer-icon"><i className="ri-quill-pen-line" /></span>
            <div><strong>New note</strong><span>Capture it before it slips away</span></div>
            <span className="composer-status"><i className="ri-checkbox-circle-line" /> Private draft</span>
          </div>
          <div className="p-3 sm:p-4">
            <RichTextEditor content={content} onChange={setContent} />
          </div>
      </div>
    </div>
  )
}

export default NoteEditor
