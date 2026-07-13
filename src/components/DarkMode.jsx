import React from 'react'
import useDarkMode from '../hooks/useDarkMode'

function DarkMode() {
  const [isDark, , toggleDarkMode] = useDarkMode();

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="icon-btn"
      onClick={toggleDarkMode}
    >
      <i
        className={`text-lg transition-transform duration-300 ${
          isDark ? 'ri-sun-line' : 'ri-moon-line'
        }`}
      />
    </button>
  )
}

export default DarkMode
