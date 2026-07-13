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
      <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center">
        <div className="animate-fade-up signin-gate max-w-sm px-8 py-12">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
            <i className="ri-lock-2-line text-2xl" />
          </div>
          <h1 className="font-serif text-3xl">Your space is waiting</h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Your notes workspace is private. Please sign in securely with Google to create, edit, and access Gemini AI writing features.
          </p>
          <button
            type="button"
            className="btn-primary mt-8 w-full flex items-center justify-center gap-2"
            onClick={() => signIn()}
          >
            <i className="ri-google-fill text-lg" />
            Sign in with Google
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="workspace">

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
