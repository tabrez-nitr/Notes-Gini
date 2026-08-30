import React from 'react'
import NoteEditor from './NoteEditor'
import DisplayNotes from './DisplayNotes'
import { ToastContainer, Bounce } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import 'react-toastify/dist/ReactToastify.css'

function NotePage() {
  const { user, signIn } = useAuth()

  if (user == null) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-12 text-center">
        <div className="max-w-sm w-full p-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border-main)] animate-fade-in">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded border border-[var(--border-main)] bg-[var(--bg-subtle)] text-[var(--text-primary)]">
            <i className="ri-lock-line text-lg" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
            Sign in to Workspace
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
            Your notes and Gemini AI refinements are private. Sign in with Google to access your cloud-synced notes.
          </p>
          <button
            type="button"
            className="btn-primary mt-6 w-full flex items-center justify-center gap-2"
            onClick={() => signIn()}
          >
            <i className="ri-google-fill text-sm" />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="workspace-container">
      <NoteEditor />
      <DisplayNotes />

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  )
}

export default NotePage
