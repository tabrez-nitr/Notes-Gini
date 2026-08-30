import React from 'react'

const LoaderButton = () => {
  return (
    <div className="app-bg flex min-h-screen flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 rounded border border-[var(--border-main)] bg-[var(--text-primary)] text-[var(--bg-canvas)] flex items-center justify-center text-sm animate-pulse">
        <i className="ri-quill-pen-line" />
      </div>
      <p className="text-xs font-mono text-[var(--text-muted)] tracking-wider">
        loading...
      </p>
    </div>
  )
}

export default LoaderButton
